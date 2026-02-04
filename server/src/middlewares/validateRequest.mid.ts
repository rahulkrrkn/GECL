import type { RequestHandler } from "express";
import { ZodError } from "zod";
import type { ZodSchema } from "zod";

import { ValidationError } from "../errors/httpErrors.err.js";
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
    try {
      const validateSection = <T>(
        schema: ZodSchema<T> | undefined,
        value: unknown,
        assign: (data: T) => void,
      ) => {
        if (!schema) return;

        const result = schema.safeParse(value);
        if (!result.success) {
          // ✅ throw raw ZodError
          throw result.error;
        }

        assign(result.data);
      };

      validateSection(schemas.body, req.body, (data) => {
        req.validatedBody = data;
      });

      validateSection(schemas.query, req.query, (data) => {
        req.validatedQuery = data;
      });

      validateSection(schemas.params, req.params, (data) => {
        req.validatedParams = data;
      });

      validateSection(schemas.headers, req.headers, (data) => {
        req.validatedHeaders = data;
      });

      next();
    } catch (err) {
      // ✅ SINGLE NORMALIZATION POINT
      if (err instanceof ZodError) {
        const formatted = formatZodError(err);

        return next(
          new ValidationError(
            formatted.message, // ✅ user-friendly message
            "REQUEST_VALIDATION_FAILED",
            { errors: formatted.errors }, // ✅ detailed field errors
          ),
        );
      }

      next(err);
    }
  };
