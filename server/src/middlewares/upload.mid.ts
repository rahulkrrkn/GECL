import multer from "multer";
import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";
import { sendError } from "../helpers/response.helper.js";

export const MIME_GROUPS = {
  images: ["image/jpeg", "image/png", "image/webp"],
  documents: ["application/pdf"],
  videos: ["video/mp4", "video/webm"],
} as const;

type MimeType = string;

export type UploadFieldConfig = {
  name: string;
  min?: number;
  max: number;
  mimeTypes: MimeType[];

  // per field max file size in KB
  sizeInKb: number;

  // folder inside bucket
  folder: string; // ex: "images", "documents"
};

export type UploadMiddlewareConfig = {
  minTotalFiles?: number;
  maxTotalFiles?: number;
  fields: UploadFieldConfig[];

  // optional
  seoTitleFromBodyKey?: string;

  // ✅ new: global prefix for all folders
  baseFolder?: string; // ex: "GECL"
};

export type UploadedFileWithMeta = Express.Multer.File & {
  uniqueName: string;
  folder: string; // full folder: GECL/images
  field: string;
};

function safeFolder(folder: string) {
  return folder.replace(/^\/+|\/+$/g, "").replace(/\s+/g, "-");
}

function getExt(originalName: string) {
  const parts = originalName.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

function formatDateTime() {
  const d = new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}-${hh}-${mi}-${ss}`;
}

/**
 * Required filename format:
 * temp-YYYY-MM-DD-HH-mm-ss-uuid.ext
 */
function generateUniqueName(originalName: string) {
  const ext = getExt(originalName);

  const safeExt =
    ext && ["jpg", "jpeg", "png", "webp", "pdf", "mp4", "webm"].includes(ext)
      ? ext
      : "bin";

  const stamp = formatDateTime();
  const id = crypto.randomUUID().slice(0, 10);

  return `temp-${stamp}-${id}.${safeExt}`;
}

export function createUploadMiddleware(config: UploadMiddlewareConfig) {
  const baseFolder = safeFolder(config.baseFolder || "GECL");

  // Build maps
  const allowedTypesByField = new Map<string, Set<string>>();
  const maxSizeBytesByField = new Map<string, number>();
  const folderByField = new Map<string, string>();

  for (const field of config.fields) {
    allowedTypesByField.set(field.name, new Set(field.mimeTypes));
    maxSizeBytesByField.set(field.name, field.sizeInKb * 1024);

    // ✅ auto prefix folder with GECL/
    const finalFolder = `${baseFolder}/${safeFolder(field.folder || "uploads")}`;
    folderByField.set(field.name, finalFolder);
  }

  const upload = multer({
    storage: multer.memoryStorage(),

    // Multer global limit (keep high)
    limits: { fileSize: 50 * 1024 * 1024 },

    fileFilter: (req: Request, file, cb) => {
      const allowedSet = allowedTypesByField.get(file.fieldname);

      if (!allowedSet) {
        return cb(
          new Error(
            `Unexpected field "${file.fieldname}". Allowed: ${config.fields
              .map((x) => x.name)
              .join(", ")}`,
          ),
        );
      }

      if (!allowedSet.has(file.mimetype)) {
        return cb(
          new Error(
            `Invalid file type for "${file.fieldname}". Received: ${file.mimetype}`,
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
    multerHandler(req, res, (err: any) => {
      // Multer errors
      if (err) {
        if (err?.code === "LIMIT_FILE_SIZE") {
          return sendError(res, "File too large (global limit)", {
            status: 413,
          });
        }
        return sendError(res, err.message || "Upload error", { status: 400 });
      }

      const filesByField = (req.files || {}) as Record<
        string,
        Express.Multer.File[]
      >;

      console.log("Content-Type:", req.headers["content-type"]);
      // Total count
      const totalFiles = Object.values(filesByField).reduce(
        (sum, arr) => sum + arr.length,
        0,
      );

      if (
        config.minTotalFiles !== undefined &&
        totalFiles < config.minTotalFiles
      ) {
        return sendError(
          res,
          `Minimum total files required: ${config.minTotalFiles}`,
          { status: 400 },
        );
      }

      if (
        config.maxTotalFiles !== undefined &&
        totalFiles > config.maxTotalFiles
      ) {
        return sendError(
          res,
          `Maximum total files allowed: ${config.maxTotalFiles}`,
          { status: 400 },
        );
      }

      // Per field min/max
      for (const field of config.fields) {
        const count = filesByField[field.name]?.length || 0;

        if (field.min !== undefined && count < field.min) {
          return sendError(
            res,
            `Field "${field.name}" requires minimum ${field.min} file(s)`,
            { status: 400 },
          );
        }

        if (count > field.max) {
          return sendError(
            res,
            `Field "${field.name}" allows maximum ${field.max} file(s)`,
            { status: 400 },
          );
        }
      }

      // ✅ Enhance files (NO THROW)
      const enhanced: Record<string, UploadedFileWithMeta[]> = {};

      for (const [fieldName, files] of Object.entries(filesByField)) {
        const maxSizeBytes =
          maxSizeBytesByField.get(fieldName) ?? 5 * 1024 * 1024;

        const folder = folderByField.get(fieldName) ?? `${baseFolder}/uploads`;

        // Validate file size per field safely
        for (const file of files) {
          if (file.size > maxSizeBytes) {
            return sendError(
              res,
              `File too large in "${fieldName}". Max allowed: ${Math.floor(
                maxSizeBytes / 1024,
              )}KB`,
              { status: 413 },
            );
          }
        }

        // Add unique name
        enhanced[fieldName] = files.map((file) => {
          const uniqueName = generateUniqueName(file.originalname);

          return Object.assign(file, {
            uniqueName,
            folder,
            field: fieldName,
          });
        });
      }

      req.files = enhanced as any;
      console.log("Files:", req.files);
      next();
    });
  };
}

// =========================
// How to use
// =========================
// export const uploadAssets = createUploadMiddleware({
//   minTotalFiles: 1,
//   maxTotalFiles: 7,
//   baseFolder: "GECL", // always GECL/

//   fields: [
//     {
//       name: "images",
//       min: 1,
//       max: 6,
//       mimeTypes: [...MIME_GROUPS.images],
//       sizeInKb: 1024, // 1MB
//       folder: "images", // becomes GECL/images
//     },
//     {
//       name: "document",
//       min: 0,
//       max: 1,
//       mimeTypes: [...MIME_GROUPS.documents],
//       sizeInKb: 1000, // 100KB
//       folder: "documents", // becomes GECL/documents
//     },
//   ],
// });
