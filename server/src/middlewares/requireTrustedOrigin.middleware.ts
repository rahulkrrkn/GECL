import type { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/httpErrors.err.js";

function getTrustedOrigins(): Set<string> {
  const values = [
    process.env.GECL_CLIENT_URL ?? "",
    process.env.CORS_ALLOWED_ORIGINS ?? "",
  ];

  const origins = new Set<string>();
  for (const value of values) {
    if (!value) continue;
    for (const raw of value.split(",")) {
      const origin = raw.trim();
      if (origin) origins.add(origin);
    }
  }

  return origins;
}

function isDevOrigin(origin: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

export function requireTrustedOrigin(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const origin = req.headers.origin;

  // Non-browser and same-origin server calls often don't include Origin.
  if (!origin) return next();

  const trustedOrigins = getTrustedOrigins();
  const isDev = process.env.NODE_ENV !== "production";

  if (trustedOrigins.has(origin) || (isDev && isDevOrigin(origin))) {
    return next();
  }

  throw new ForbiddenError("Invalid request origin", "ORIGIN_NOT_ALLOWED");
}
