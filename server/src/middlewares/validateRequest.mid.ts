import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";

import { ValidationError } from "../errors/ValidationError.err.js";
import { formatZodError } from "../errors/zodFormatter.err.js";

export type RequestSchemas = {
  body?: ZodSchema<unknown>;
  query?: ZodSchema<unknown>;
  params?: ZodSchema<unknown>;
  headers?: ZodSchema<unknown>;
};
export const validateRequest =
  (schemas: RequestSchemas): RequestHandler =>
  (req, _res, next) => {
    const validateSection = <T>(
      schema: ZodSchema<T> | undefined,
      value: unknown,
      assign: (data: T) => void,
    ): ValidationError | null => {
      if (!schema) return null;

      const result = schema.safeParse(value);
      if (!result.success) {
        return new ValidationError(formatZodError(result.error));
      }

      assign(result.data);
      return null;
    };

    const error =
      validateSection(schemas.body, req.body, (data) => {
        req.validatedBody = data;
      }) ||
      validateSection(schemas.query, req.query, (data) => {
        req.validatedQuery = data;
      }) ||
      validateSection(schemas.params, req.params, (data) => {
        req.validatedParams = data;
      }) ||
      validateSection(schemas.headers, req.headers, (data) => {
        req.validatedHeaders = data;
      });

    if (error) {
      return next(error);
    }

    next();
  };
