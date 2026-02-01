// src/common/response/api-response.ts

export type ApiStatus = 'success' | 'error';

export interface SuccessOptions {
  statusCode?: number;
  code?: string;
  meta?: Record<string, unknown>;
}

export interface ErrorOptions {
  statusCode?: number;
  code?: string;
  details?: unknown;
  meta?: Record<string, unknown>;
}

export class ApiResponse<T = unknown> {
  statusCode: number;
  status: ApiStatus;
  code: string;
  message: string;
  data: T | null;
  error: unknown;
  meta?: Record<string, unknown>;

  private constructor(payload: ApiResponse<T>) {
    Object.assign(this, payload);
  }

  /* ========= SUCCESS ========= */

  static success<T>(
    message: string,
    data: T = null as T,
    options: SuccessOptions = {},
  ): ApiResponse<T> {
    return new ApiResponse<T>({
      statusCode: options.statusCode ?? 200,
      status: 'success',
      code: options.code ?? 'SUCCESS',
      message,
      data,
      error: null,
      meta: options.meta,
    });
  }

  /* ========= ERROR ========= */

  static error(message: string, options: ErrorOptions = {}): ApiResponse<null> {
    return new ApiResponse<null>({
      statusCode: options.statusCode ?? 500,
      status: 'error',
      code: options.code ?? 'INTERNAL_ERROR',
      message,
      data: null,
      error: options.details ?? null,
      meta: options.meta,
    });
  }
}
