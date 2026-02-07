import multer from "multer";
import type { Request, Response, NextFunction } from "express";

import { BadRequestError, ValidationError } from "../errors/httpErrors.err.js";

/* ================================
   MIME GROUPS
================================ */
export const MIME_GROUPS = {
  images: ["image/jpeg", "image/png", "image/webp"],
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
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
  min?: number; // ✅ New: Minimum files required for this specific field
  max: number; // ✅ Existing: Max files allowed (handled by Multer)
  mimeTypes: readonly MimeType[];
  sizeInKb: number;
  folder: string;
};

export type UploadMiddlewareConfig = {
  minTotalFiles?: number; // Global Min
  maxTotalFiles?: number; // Global Max
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

  // Pre-calculate maps for faster lookups during the request
  const allowedTypesByField = new Map<string, Set<string>>();
  const maxSizeBytesByField = new Map<string, number>();
  const folderByField = new Map<string, string>();
  const minCountByField = new Map<string, number>(); // Map for Min checks

  for (const field of config.fields) {
    allowedTypesByField.set(field.name, new Set(field.mimeTypes));
    maxSizeBytesByField.set(field.name, field.sizeInKb * 1024);
    folderByField.set(field.name, `${baseFolder}/${safeFolder(field.folder)}`);
    if (field.min) minCountByField.set(field.name, field.min);
  }

  // Configure Multer
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 50 * 1024 * 1024, // Global Hard Cap (Safety net)
    },
    fileFilter(req, file, cb) {
      const allowed = allowedTypesByField.get(file.fieldname);

      // 1. Check if field is allowed at all
      if (!allowed) {
        return cb(
          new ValidationError(
            `Unexpected field "${file.fieldname}"`,
            "UNEXPECTED_FIELD",
            { allowedFields: [...allowedTypesByField.keys()] },
          ),
        );
      }

      // 2. Check Mime Type
      if (!allowed.has(file.mimetype)) {
        return cb(
          new ValidationError(
            `Invalid file type for "${file.fieldname}"`,
            "INVALID_FILE_TYPE",
            { received: file.mimetype, allowed: [...allowed] },
          ),
        );
      }

      cb(null, true);
    },
  });

  // Create the Multer handler with Max counts per field
  const multerHandler = upload.fields(
    config.fields.map((f) => ({ name: f.name, maxCount: f.max })),
  );

  return function uploadMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    multerHandler(req, res, (err: unknown) => {
      /* =========================================
         1. HANDLE MULTER ERRORS (Max Checks)
      ========================================= */
      if (err) {
        if (err instanceof multer.MulterError) {
          switch (err.code) {
            case "LIMIT_FILE_SIZE":
              return next(
                new ValidationError(
                  "File too large (Max 50MB)",
                  "FILE_TOO_LARGE",
                ),
              );

            // Multer throws LIMIT_UNEXPECTED_FILE when maxCount is exceeded for a field
            case "LIMIT_UNEXPECTED_FILE":
              return next(
                new ValidationError(
                  `Too many files or invalid field: "${err.field}"`,
                  "MAX_FILES_EXCEEDED_OR_INVALID_FIELD",
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
        if (err instanceof Error) return next(err);
        return next(
          new BadRequestError("Unknown upload error", "UPLOAD_ERROR"),
        );
      }

      /* =========================================
         2. PREPARE FILE DATA
      ========================================= */
      const filesByField =
        (req.files as Record<string, Express.Multer.File[]>) ?? {};

      /* =========================================
         3. CHECK PER-FIELD MINIMUMS (Crucial Fix)
      ========================================= */
      for (const field of config.fields) {
        const uploadedFiles = filesByField[field.name] || [];
        const count = uploadedFiles.length;
        const minRequired = field.min ?? 0;

        if (count < minRequired) {
          return next(
            new ValidationError(
              `Field "${field.name}" requires at least ${minRequired} file(s). You uploaded ${count}.`,
              "MIN_FILES_PER_FIELD_NOT_MET",
              { field: field.name, required: minRequired, received: count },
            ),
          );
        }
      }

      /* =========================================
         4. CHECK GLOBAL MIN/MAX
      ========================================= */
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

      /* =========================================
         5. CHECK SIZES & ATTACH METADATA
      ========================================= */
      const enhanced: Record<string, UploadedFileWithMeta[]> = {};

      for (const [fieldName, files] of Object.entries(filesByField)) {
        const maxSizeBytes =
          maxSizeBytesByField.get(fieldName) ?? 5 * 1024 * 1024;
        const folder = folderByField.get(fieldName)!;

        for (const file of files) {
          if (file.size > maxSizeBytes) {
            return next(
              new ValidationError(
                `File in "${fieldName}" exceeds size limit of ${maxSizeBytes / 1024}KB`,
                "FIELD_FILE_TOO_LARGE",
                { field: fieldName, size: file.size, limit: maxSizeBytes },
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

      // Replace req.files with our enhanced version containing folder meta
      req.files = enhanced as any;
      next();
    });
  };
}
