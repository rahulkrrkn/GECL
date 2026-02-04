import { AppError } from "./AppError.err.js";

export class ValidationError extends AppError {
  constructor(
    message = "validation error",
    resultCode?: string,
    data?: unknown,
  ) {
    super({
      message,
      code: "VALIDATION_ERROR",
      resultCode,
      statusCode: 422,
      data,
    });
  }
}

export class BadRequestError extends AppError {
  constructor(message = "bad request", resultCode?: string, data?: unknown) {
    super({
      message,
      code: "BAD_REQUEST",
      resultCode,
      statusCode: 400,
      data,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "unauthorized", resultCode?: string, data?: unknown) {
    super({
      message,
      code: "UNAUTHORIZED",
      resultCode,
      statusCode: 401,
      data,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "forbidden", resultCode?: string, data?: unknown) {
    super({
      message,
      code: "FORBIDDEN",
      resultCode,
      statusCode: 403,
      data,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "not found", resultCode?: string, data?: unknown) {
    super({
      message,
      code: "NOT_FOUND",
      resultCode,
      statusCode: 404,
      data,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(
    message = "internal server error",
    resultCode?: string,
    data?: unknown,
  ) {
    super({
      message,
      code: "INTERNAL_SERVER_ERROR",
      resultCode,
      statusCode: 500,
      data,
    });
  }
}
const httpErrors = {
  ValidationError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};

export default httpErrors;
