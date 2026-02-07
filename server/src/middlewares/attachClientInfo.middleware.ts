import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// ==========================================
// 2. The "Best" IP Extractor Helper
// ==========================================
const getClientIp = (req: Request): string => {
  // 1. Get the raw header value (can be string, string[], or undefined)
  const forwarded = req.headers["x-forwarded-for"];

  // 2. CASE A: It is a String (e.g., "203.0.113.195, 70.41.3.18")
  if (typeof forwarded === "string") {
    // We split by comma.
    const parts = forwarded.split(",");
    // We explicitly check if the first part exists before trimming.
    if (parts.length > 0 && parts[0]) {
      return parts[0].trim();
    }
  }

  // 3. CASE B: It is an Array (e.g., ["203.0.113.195"])
  if (Array.isArray(forwarded)) {
    // We explicitly check if the array has elements.
    if (forwarded.length > 0 && forwarded[0]) {
      return forwarded[0].trim();
    }
  }

  // 4. CASE C: Fallback to Socket Remote Address
  // (req.socket might be undefined in some mock testing environments)
  if (req.socket && req.socket.remoteAddress) {
    return req.socket.remoteAddress;
  }

  // 5. Absolute Fallback
  return "0.0.0.0";
};

// ==========================================
// 3. The Middleware
// ==========================================
export const attachClientInfo = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const ip = getClientIp(req);
  const userAgent = (req.headers["user-agent"] || "unknown").trim();

  // Create unique ID for this request (Traceability)
  const requestId = crypto.randomUUID();

  // Create device fingerprint (Security)
  const deviceHash = crypto
    .createHash("md5")
    .update(`${ip}-${userAgent}`)
    .digest("hex");

  // Attach to Context
  req.context = {
    ip,
    userAgent,
    requestId,
    deviceHash,
    country: (req.headers["cf-ipcountry"] as string) || "unknown",
  };

  next();
};
