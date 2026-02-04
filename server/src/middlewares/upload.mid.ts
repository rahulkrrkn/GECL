import multer from "multer";
import type { Request, Response, NextFunction } from "express";

import { BadRequestError, ValidationError } from "../errors/httpErrors.err.js";

/* ================================
   MIME GROUPS
================================ */
export const MIME_GROUPS = {
  images: ["image/jpeg", "image/png", "image/webp"],
  documents: ["application/pdf"],
  videos: ["video/mp4", "video/webm"],
} as const;

type MimeType =
  | (typeof MIME_GROUPS.images)[number]
  | (typeof MIME_GROUPS.documents)[number]
  | (typeof MIME_GROUPS.videos)[number];

/* ================================
   TYPES
================================ */
export type UploadFieldConfig = {
  name: string;
  min?: number;
  max: number;
  mimeTypes: readonly MimeType[];
  sizeInKb: number;
  folder: string;
};

export type UploadMiddlewareConfig = {
  minTotalFiles?: number;
  maxTotalFiles?: number;
  fields: UploadFieldConfig[];
  baseFolder?: string;
};

export type UploadedFileWithMeta = Express.Multer.File & {
  folder: string;
  field: string;
};

/* ================================
   HELPERS
================================ */
function safeFolder(folder: string) {
  return folder.replace(/^\/+|\/+$/g, "").replace(/\s+/g, "-");
}

/* ================================
   MAIN FACTORY
================================ */
export function createUploadMiddleware(config: UploadMiddlewareConfig) {
  const baseFolder = safeFolder(config.baseFolder ?? "GECL");

  const allowedTypesByField = new Map<string, Set<string>>();
  const maxSizeBytesByField = new Map<string, number>();
  const folderByField = new Map<string, string>();

  for (const field of config.fields) {
    allowedTypesByField.set(field.name, new Set(field.mimeTypes));
    maxSizeBytesByField.set(field.name, field.sizeInKb * 1024);
    folderByField.set(field.name, `${baseFolder}/${safeFolder(field.folder)}`);
  }

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter(req, file, cb) {
      const allowed = allowedTypesByField.get(file.fieldname);

      if (!allowed) {
        return cb(
          new ValidationError(
            `Unexpected field "${file.fieldname}"`,
            "UNEXPECTED_FIELD",
            { allowedFields: [...allowedTypesByField.keys()] },
          ),
        );
      }

      if (!allowed.has(file.mimetype)) {
        return cb(
          new ValidationError(
            `Invalid file type for "${file.fieldname}"`,
            "INVALID_FILE_TYPE",
            { received: file.mimetype },
          ),
        );
      }

      cb(null, true);
    },
  });

  const multerHandler = upload.fields(
    config.fields.map((f) => ({ name: f.name, maxCount: f.max })),
  );

  return function uploadMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    multerHandler(req, res, (err: unknown) => {
      /* ========= MULTER CORE ERRORS ========= */
      if (err) {
        if (err instanceof multer.MulterError) {
          switch (err.code) {
            case "LIMIT_FILE_SIZE":
              return next(
                new ValidationError("File too large", "FILE_TOO_LARGE"),
              );

            case "LIMIT_UNEXPECTED_FILE":
              return next(
                new ValidationError(
                  `Unexpected field "${err.field}"`,
                  "UNEXPECTED_FIELD",
                  { field: err.field },
                ),
              );

            case "LIMIT_FILE_COUNT":
              return next(
                new ValidationError(
                  "Too many files uploaded",
                  "TOO_MANY_FILES",
                ),
              );

            default:
              return next(
                new ValidationError(
                  "Upload validation failed",
                  "UPLOAD_VALIDATION_FAILED",
                ),
              );
          }
        }

        // already app error
        if (err instanceof Error) {
          return next(err);
        }

        return next(new BadRequestError("Upload error", "UPLOAD_ERROR"));
      }

      /* ========= POST-UPLOAD VALIDATION ========= */
      const filesByField =
        (req.files as Record<string, Express.Multer.File[]>) ?? {};

      const totalFiles = Object.values(filesByField).reduce(
        (sum, arr) => sum + arr.length,
        0,
      );

      if (
        config.minTotalFiles !== undefined &&
        totalFiles < config.minTotalFiles
      ) {
        return next(
          new ValidationError(
            `Minimum total files required: ${config.minTotalFiles}`,
            "MIN_TOTAL_FILES",
          ),
        );
      }

      if (
        config.maxTotalFiles !== undefined &&
        totalFiles > config.maxTotalFiles
      ) {
        return next(
          new ValidationError(
            `Maximum total files allowed: ${config.maxTotalFiles}`,
            "MAX_TOTAL_FILES",
          ),
        );
      }

      const enhanced: Record<string, UploadedFileWithMeta[]> = {};

      for (const [fieldName, files] of Object.entries(filesByField)) {
        const maxSizeBytes =
          maxSizeBytesByField.get(fieldName) ?? 5 * 1024 * 1024;

        const folder = folderByField.get(fieldName)!;

        for (const file of files) {
          if (file.size > maxSizeBytes) {
            return next(
              new ValidationError(
                `File too large in "${fieldName}"`,
                "FIELD_FILE_TOO_LARGE",
              ),
            );
          }
        }

        enhanced[fieldName] = files.map((file) => ({
          ...file,
          folder,
          field: fieldName,
        }));
      }

      req.files = enhanced as any;
      next();
    });
  };
}
