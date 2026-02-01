// src/common/response/zod-error.mapper.ts

import type { ZodIssue } from 'zod';

export function mapZodErrors(issues: ZodIssue[]) {
  const fieldErrors: Record<string, string> = {};
  const messages: string[] = [];

  for (const issue of issues) {
    const field = issue.path.length > 0 ? issue.path.join('.') : 'root';

    fieldErrors[field] = issue.message;
    messages.push(`${field}: ${issue.message}`);
  }

  return {
    fieldErrors,
    messages,
  };
}
