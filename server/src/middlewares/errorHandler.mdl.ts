import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.err.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error: AppError;

  if (err instanceof AppError) {
    error = err;
  } else {
    console.error("Unhandled error:", err);
    error = new AppError({
      message: "internal server error",
      code: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      success: false,
    });
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    code: error.code,
    resultCode: error.resultCode, // ✅ FIX
    success: false,
    data: error.data, // ✅ FIX
  });
};
