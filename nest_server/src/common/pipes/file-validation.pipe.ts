import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import type { FileRule, FileType } from './file-validation.interface';
import { FileTypePatterns } from './file-validation.interface';

// Type for the incoming Multer object
type FileMap = Record<string, Express.Multer.File[]>;

@Injectable()
export class FileValidationPipe implements PipeTransform {
  // We now accept an ARRAY of objects directly
  constructor(private readonly rules: FileRule[]) {}

  transform(value: unknown): FileMap {
    // 1. Basic Object Check
    if (!value || typeof value !== 'object') {
      // Check if any rule required files (minCount > 0)
      this.validateRequiredFields({});
      return {} as FileMap;
    }

    const files = value as FileMap;

    // 2. Iterate through YOUR config array
    for (const rule of this.rules) {
      const fieldName = rule.name;
      const uploadedFiles = files[fieldName] || [];

      // --- A. Count Validation ---
      const min = rule.minCount ?? 0;
      const max = rule.maxCount ?? 1;

      if (uploadedFiles.length < min) {
        throw new BadRequestException(
          `Field '${fieldName}' requires at least ${min} file(s).`,
        );
      }

      if (uploadedFiles.length > max) {
        throw new BadRequestException(
          `Field '${fieldName}' accepts a maximum of ${max} file(s).`,
        );
      }

      // --- B. Content Validation (Size & Type) ---
      for (const file of uploadedFiles) {
        // Size Check (KB to Bytes conversion handled in config, or here if you prefer)
        // Assuming your config passes bytes (e.g. 5 * 1024 * 1024)
        if (file.size > rule.size) {
          const mb = (rule.size / (1024 * 1024)).toFixed(2);
          throw new BadRequestException(
            `File '${file.originalname}' is too large. Max allowed: ${mb} MB.`,
          );
        }

        // Type Check
        if (rule.type && !this.isValidType(file.mimetype, rule.type)) {
          throw new BadRequestException(
            `File '${file.originalname}' has an invalid type.`,
          );
        }
      }
    }

    return files;
  }

  // --- Helper: Validate Types (Strings or Arrays) ---
  private isValidType(
    mimeType: string,
    allowed: FileType | FileType[],
  ): boolean {
    const allowedTypes = Array.isArray(allowed) ? allowed : [allowed];

    // Returns TRUE if at least one type matches
    return allowedTypes.some((type) => {
      const pattern = FileTypePatterns[type];
      return pattern ? pattern.test(mimeType) : false;
    });
  }

  // --- Helper: Check missing required fields ---
  private validateRequiredFields(files: FileMap): void {
    for (const rule of this.rules) {
      if (rule.minCount && rule.minCount > 0) {
        if (!files[rule.name] || files[rule.name].length === 0) {
          throw new BadRequestException(`Field '${rule.name}' is required.`);
        }
      }
    }
  }
}
