import { InternalServerErrorException } from '@nestjs/common';

export function safeJsonParse<T>(value: string): T {
  if (!value) {
    throw new InternalServerErrorException('Cached value is empty');
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    throw new InternalServerErrorException('Corrupted cached data');
  }
}
