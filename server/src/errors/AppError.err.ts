import type { ResponseStatus } from "./error.types.js";

export type AppErrorOptions = {
  status?: ResponseStatus; // default: "error"
  message: string;
  code: string;
  resultCode?: string | undefined;
  statusCode: number;
  data?: unknown;
  success?: boolean;
};

export class AppError extends Error {
  public readonly status: ResponseStatus;
  public readonly statusCode: number;
  public readonly code: string;
  public readonly resultCode?: string | undefined;
  public readonly data?: unknown;
  public readonly success: boolean;

  constructor({
    status = "error",
    message,
    code,
    resultCode,
    statusCode,
    data,
    success,
  }: AppErrorOptions) {
    console.log("data", data);

    super(message);

    this.status = status;
    this.statusCode = statusCode;
    this.code = code;
    this.resultCode = resultCode;
    this.data = data;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      resultCode: this.resultCode,
      data: this.data,
    };
  }
}
