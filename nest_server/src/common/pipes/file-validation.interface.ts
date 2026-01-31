// 1. Regex Patterns
export const FileTypePatterns = {
  IMAGE: /^image\/(jpg|jpeg|png|webp|gif|svg\+xml)$/,
  DOCUMENT:
    /^application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.ms-excel|plain|rtf)$/,
  VIDEO: /^video\/(mp4|mpeg|x-msvideo|quicktime|webm)$/,
  AUDIO: /^audio\/(mpeg|wav|ogg|mp4)$/,
};

// 2. Allowed Types (Single or Array)
export type FileType = 'IMAGE' | 'DOCUMENT' | 'VIDEO' | 'AUDIO';

// 3. The Object Structure You Requested
export interface FileRule {
  name: string; // e.g. "profile_photo"
  minCount?: number; // Default: 0
  maxCount?: number; // Default: 1
  size: number; // Size in BYTES (e.g., 2048)
  type?: FileType | FileType[]; // e.g. ['IMAGE', 'DOCUMENT']
}
