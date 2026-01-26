import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";

import { ValidationError } from "../errors/ValidationError.err.js";
import { formatZodError } from "../errors/zodFormatter.err.js";

export const validateBody =
  <T>(schema: ZodSchema<T>): RequestHandler =>
  (req, _res, next) => {
    console.log("Request Headers :", req.headers);

    const result = schema.safeParse(req.body);
    console.log("Request Body original:", req.body);
    console.log("Request Body  result:", result);
    if (!schema) {
      return next(
        new Error(
          "validateBody() schema is undefined. Check your import/export.",
        ),
      );
    }
    if (!result.success) {
      return next(new ValidationError(formatZodError(result.error)));
    }

    // req.body

    req.validatedBody = result.data; // overwrite with clean data
    next();
  };
