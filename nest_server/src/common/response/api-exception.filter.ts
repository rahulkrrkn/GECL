// src/common/response/api-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import type { ZodIssue } from 'zod';

import { ApiResponse } from './api-response';
import { ApiErrorCode } from './api-error-codes';
import { mapZodErrors } from './zod-error.mapper';

interface HttpExceptionResponse {
  message?: string | string[];
  code?: string;
  errors?: unknown;
}

/* ---------- TYPE GUARD ---------- */
function isZodIssueArray(value: unknown): value is ZodIssue[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        typeof v === 'object' && v !== null && 'path' in v && 'message' in v,
    )
  );
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code: string = ApiErrorCode.INTERNAL_ERROR;
    let details: unknown = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const raw = exception.getResponse();

      if (typeof raw === 'string') {
        message = raw;
      } else if (typeof raw === 'object' && raw !== null) {
        const response = raw as HttpExceptionResponse;

        /* ===== ZOD VALIDATION ERROR ===== */
        if (isZodIssueArray(response.errors)) {
          const { fieldErrors, messages } = mapZodErrors(response.errors);

          message = messages.join(' | ');
          code = ApiErrorCode.VALIDATION_FAILED;
          details = fieldErrors;
        } else {
          const resolvedMessage = Array.isArray(response.message)
            ? response.message.join(', ')
            : response.message;

          message = resolvedMessage ?? message;
          code = response.code ?? code;
          details = response.errors ?? null;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      details = process.env.NODE_ENV === 'development' ? exception.stack : null;
    }

    res.status(status).json(
      ApiResponse.error(message, {
        statusCode: status,
        code,
        details,
      }),
    );
  }
}
