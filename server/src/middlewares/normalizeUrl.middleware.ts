import type { Request, Response, NextFunction } from "express";

export function normalizeUrl(req: Request, res: Response, next: NextFunction) {
  const originalUrl = req.originalUrl;

  const [rawPath, query] = originalUrl.split("?");
  let path = rawPath ?? "/";

  // Normalize slashes
  path = path.replace(/\/{2,}/g, "/");

  // Remove trailing slash (except root)
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  // Lowercase (safe since no /api and no case-sensitive routes)
  path = path.toLowerCase();

  const normalizedUrl = query ? `${path}?${query}` : path;

  if (normalizedUrl !== originalUrl) {
    const status = process.env.NODE_ENV === "production" ? 301 : 302;
    return res.redirect(status, normalizedUrl);
  }

  next();
}
