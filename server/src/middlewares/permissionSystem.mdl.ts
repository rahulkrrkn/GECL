import type { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../helpers/jwt.helper.js";
import { sendError } from "../helpers/response.helper.js";
import getRedis from "../config/redis.config.js";
import { ROLE_PERMISSIONS } from "../config/pagePermissionData.config.js";

// Helper to extract Bearer token securely
export function getBearerToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return null;

  return token;
}

const keyGeclUserPageAccess = (userId: string) =>
  `GECL:userPageAccess:${userId}`;

/* ==============================
   ✅ Require Permission Middleware
============================== */
export const requirePermission = (permissionKey: string): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // ===========================
    // Step 1: Get Access Token
    // ===========================
    const token = getBearerToken(req);

    if (!token) {
      return sendError(res, "Missing bearer token", {
        status: 401,
        code: "NO_AUTH",
      });
    }

    // ===========================
    // Step 2: Verify Access Token
    // ===========================
    let userId: string;
    let emailId: string;

    try {
      const payload = verifyAccessToken(token);
      userId = payload.userId;
      emailId = payload.email;
    } catch (err: any) {
      if (err instanceof jwt.TokenExpiredError)
        return sendError(res, "Access expired", {
          status: 401,
          code: "ACCESS_EXPIRED",
        });

      return sendError(res, "Invalid token", {
        status: 401,
        code: "ACCESS_INVALID",
      });
    }

    // ===========================
    // Step 3: Load Redis Access Object
    // ===========================
    const redis = getRedis();
    const redisKey = keyGeclUserPageAccess(userId);
    const redisRawData = await redis.get(redisKey);

    // 🔒 SECURITY: If no session in Redis, force logout (Fail Closed)
    if (!redisRawData) {
      return sendError(res, "Session expired or invalid", {
        status: 401,
        code: "ACCESS_EXPIRED",
      });
    }

    const redisData = JSON.parse(redisRawData);

    // ===========================
    // Step 4: Check Permission Access
    // ===========================

    if (redisData.deny && redisData.deny.includes(permissionKey)) {
      return sendError(res, "Access denied", {
        status: 403,
        code: "ACCESS_DENIED",
      });
    }

    let isAllowed = false;

    if (redisData.role && Array.isArray(redisData.role)) {
      redisData.role.forEach((roleName: string) => {
        if (roleName in ROLE_PERMISSIONS) {
          const permissions =
            ROLE_PERMISSIONS[roleName as keyof typeof ROLE_PERMISSIONS];

          if ((permissions as readonly string[]).includes(permissionKey)) {
            isAllowed = true;
          }
        }
      });
    }

    if (redisData.allowExtra && redisData.allowExtra.includes(permissionKey)) {
      isAllowed = true;
    }

    if (redisData.allow && redisData.allow.includes(permissionKey)) {
      isAllowed = true;
    }

    if (!isAllowed) {
      return sendError(res, "Access denied", {
        status: 403,
        code: "ACCESS_DENIED",
      });
    }

    // ===========================
    // Step 5: Attach User to Request
    // ===========================

    (req as any).user = {
      _id: userId,
      userId: userId,
      email: emailId,
      roles: redisData.role,
    };

    next();
  };
};
