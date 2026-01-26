// src/services/fileRenameAndUpload.service.ts

import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../config/r2Client.config.js";

type UploadedFile = Express.Multer.File & {
  folder: string;
  field: string;
  uniqueName: string;
};

export type FileNamesPayload = Record<string, string[]>;

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getExt(originalName: string) {
  const parts = originalName.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "bin";
}

async function keyExists(bucket: string, key: string): Promise<boolean> {
  try {
    await r2.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (err: any) {
    if (err?.$metadata?.httpStatusCode === 404) return false;
    if (err?.name === "NotFound") return false;
    return false;
  }
}

async function getUniqueKey(params: {
  bucket: string;
  folder: string;
  baseName: string;
  ext: string;
}) {
  const { bucket, folder } = params;

  const safeFolder = folder.replace(/^\/+|\/+$/g, "");
  const safeBase = slugify(params.baseName) || "file";
  const safeExt = params.ext || "bin";

  let attempt = 0;

  while (true) {
    const finalBase = attempt === 0 ? safeBase : `${safeBase}-${attempt}`;
    const key = `${safeFolder}/${finalBase}.${safeExt}`;

    const exists = await keyExists(bucket, key);
    if (!exists) return key;

    attempt++;
    if (attempt > 500) throw new Error("Too many duplicate names in storage");
  }
}

function buildPublicUrl(key: string) {
  const base = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
  return `${base}/${key}`;
}

export async function renameToR2(params: {
  req: Express.Request;
  fileNames?: FileNamesPayload;
}) {
  const bucket = process.env.R2_BUCKET_NAME as string;
  const filesByField = params.req.files as Record<string, any[]>;
  // const { filesByField } = params;
  const fileNames = params.fileNames || {};

  const uploadedResult: Record<string, any[]> = {};

  for (const [fieldName, filesMaybe] of Object.entries(filesByField)) {
    const files = filesMaybe ?? []; // ✅ fixes "file possibly undefined"
    const names = Array.isArray(fileNames[fieldName])
      ? fileNames[fieldName]
      : [];

    uploadedResult[fieldName] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue; // extra safety

      const ext = getExt(file.originalname);

      let baseName = "";

      if (names.length > 1) {
        baseName = names[i] || "";
      } else if (names.length === 1) {
        baseName = `${names[0]}-${i + 1}`;
      } else {
        baseName = `${fieldName}-${i + 1}`;
      }

      if (!baseName.trim()) {
        baseName = `${fieldName}-${i + 1}`;
      }

      const key = await getUniqueKey({
        bucket,
        folder: file.folder,
        baseName,
        ext,
      });

      await r2.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      uploadedResult[fieldName].push({
        originalName: file.originalname,
        finalName: key.split("/").pop() ?? "",
        key,
        url: buildPublicUrl(key),
        mimeType: file.mimetype,
        size: file.size,
      });
    }
  }

  return uploadedResult;
}

// =====================
// How to use
// =====================
// const fileNames = { images: ["a", "b"], document: ["my-doc"] };

// const uploaded = await renameToR2({
//   bucket: process.env.R2_BUCKET_NAME as string,
//   filesByField,
//   fileNames,
// });
