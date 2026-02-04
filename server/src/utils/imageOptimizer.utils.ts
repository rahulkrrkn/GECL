import sharp from "sharp";

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 75;
const WEBP_EFFORT = 4;

/**
 * Fully optimizes images:
 * - Auto-rotate
 * - Resize safely
 * - Convert to WebP
 * - Metadata removed by default
 * - Safe fallback
 */
export async function optimizeImage(params: {
  buffer: Buffer;
  mimeType: string;
}): Promise<{
  buffer: Buffer;
  ext: string | null;
  mimeType: string;
}> {
  const { buffer, mimeType } = params;

  // Non-images → untouched
  if (!mimeType.startsWith("image/")) {
    return {
      buffer,
      ext: null,
      mimeType,
    };
  }

  try {
    const optimizedBuffer = await sharp(buffer)
      .rotate() // auto-orient (EXIF removed automatically)
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      })
      .webp({
        quality: WEBP_QUALITY,
        effort: WEBP_EFFORT,
      })
      .toBuffer();

    return {
      buffer: optimizedBuffer,
      ext: "webp",
      mimeType: "image/webp",
    };
  } catch {
    // HARD fallback
    return {
      buffer,
      ext: null,
      mimeType,
    };
  }
}
