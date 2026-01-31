import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

import { r2Client, R2_CONFIG } from './r2.config';

type FieldConfig = Record<
  string,
  [string?, number?, number?] // [seoName, width, quality]
>;

type UploadItem = {
  seoName: string;
  key: string;
  url: string;
  type: string;
};

type UploadResult = Record<string, UploadItem[]>;

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function getExt(name: string) {
  return name.split('.').pop()?.toLowerCase() || 'bin';
}

async function keyExists(key: string) {
  try {
    await r2Client.send(
      new HeadObjectCommand({
        Bucket: R2_CONFIG.bucket,
        Key: key,
      }),
    );
    return true;
  } catch {
    return false;
  }
}

async function getUniqueKey(folder: string, base: string, ext: string) {
  let i = 0;

  while (true) {
    const suffix = i === 0 ? '' : `-${i}`;
    const key = `${folder}/${base}${suffix}.${ext}`;

    if (!(await keyExists(key))) return key;

    i++;
  }
}

async function optimizeImage(buffer: Buffer, width = 1200, quality = 80) {
  return sharp(buffer)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
}

function publicUrl(key: string) {
  return `${R2_CONFIG.publicUrl}/${key}`;
}

export class SeoUploadService {
  static async upload(
    files: Record<string, Express.Multer.File[]>,
    config: FieldConfig = {},
  ): Promise<UploadResult> {
    const result: UploadResult = {};

    for (const field of Object.keys(files)) {
      const arr = files[field];
      if (!arr?.length) continue;

      const [seoName, width, quality] = config[field] || [];

      result[field] = [];

      for (let i = 0; i < arr.length; i++) {
        const file = arr[i];

        const isImage = file.mimetype.startsWith('image/');

        const ext = isImage ? 'webp' : getExt(file.originalname);

        const base = seoName ? `${slugify(seoName)}` : `${field}-${i + 1}`;

        const folder = `GECL/${field}`;

        // ✅ IMAGE → compress
        const body = isImage
          ? await optimizeImage(file.buffer, width || 1200, quality || 80)
          : file.buffer;

        const key = await getUniqueKey(folder, slugify(base), ext);

        await r2Client.send(
          new PutObjectCommand({
            Bucket: R2_CONFIG.bucket,
            Key: key,
            Body: body,
            ContentType: isImage ? 'image/webp' : file.mimetype,
          }),
        );

        result[field].push({
          seoName: base,
          key,
          url: publicUrl(key),
          type: file.mimetype,
        });
      }
    }

    return result;
  }
}
