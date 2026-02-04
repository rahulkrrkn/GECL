import type { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../helpers/jwt.helper.js";
import { getRedis } from "../config/redis.config.js";

import {
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
} from "../errors/httpErrors.err.js";

import {
  ROLE_PERMISSIONS,
  type PermissionKey,
} from "../config/pagePermissionData.config.js";

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

export function getBearerToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return null;

  return token;
}

const keyGeclUserPageAccess = (userId: string) =>
  `GECL:userPageAccess:${userId}`;

/* -------------------------------------------------------------------------- */
/*                         REQUIRE PERMISSION                                  */
/* -------------------------------------------------------------------------- */

export const requirePermission = (
  permissionKey: PermissionKey,
): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      /* ---------------- Step 1: Token ---------------- */

      const token = getBearerToken(req);
      if (!token) {
        throw new UnauthorizedError("Missing bearer token", "NO_AUTH");
      }

      /* ---------------- Step 2: Verify Token ---------- */

      let userId: string;
      let emailId: string;

      try {
        const payload = verifyAccessToken(token);
        userId = payload.userId;
        emailId = payload.email;
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new UnauthorizedError("Access expired", "ACCESS_EXPIRED", {
            GECL_IS_ACCESS_TOKEN_EXPIRED: true,
          });
        }
        throw new UnauthorizedError("Invalid token", "ACCESS_INVALID");
      }

      /* ---------------- Step 3: Redis Session ---------- */

      const redis = getRedis();
      const redisRawData = await redis.get(keyGeclUserPageAccess(userId));

      if (!redisRawData) {
        throw new UnauthorizedError(
          "Session expired or invalid",
          "ACCESS_EXPIRED",
          { GECL_IS_ACCESS_TOKEN_EXPIRED: true },
        );
      }

      const redisData = JSON.parse(redisRawData);

      /* ---------------- Step 4: Permission Check ------- */

      // Explicit deny
      if (redisData.deny?.includes(permissionKey)) {
        throw new ForbiddenError("Access denied", "ACCESS_DENIED");
      }

      let isAllowed = false;

      // Role based permissions
      if (Array.isArray(redisData.role)) {
        for (const role of redisData.role) {
          const permissions =
            ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];

          if (permissions?.includes(permissionKey)) {
            isAllowed = true;
            break;
          }
        }
      }

      // Extra allow
      if (!isAllowed && redisData.allowExtra?.includes(permissionKey)) {
        isAllowed = true;
      }

      // Legacy allow
      if (!isAllowed && redisData.allow?.includes(permissionKey)) {
        isAllowed = true;
      }

      if (!isAllowed) {
        throw new ForbiddenError("Access denied", "ACCESS_DENIED");
      }

      /* ---------------- Step 5: Attach User ------------ */

      req.user = {
        _id: userId,
        userId,
        email: emailId,
        role: redisData.role,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};

/* -------------------------------------------------------------------------- */
/*                          CHECK USER (SOFT AUTH)                             */
/* -------------------------------------------------------------------------- */

export const checkUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = getBearerToken(req);
    if (!token) return next();

    const payload = verifyAccessToken(token);

    req.user = {
      _id: payload.userId,
      userId: payload.userId,
      email: payload.email,
    };

    const redis = getRedis();
    const redisRawData = await redis.get(keyGeclUserPageAccess(payload.userId));

    if (redisRawData) {
      const redisData = JSON.parse(redisRawData);
      if (redisData.role) {
        req.user.role = redisData.role;
      }
    }

    next();
  } catch {
    // Soft auth → never block request
    next();
  }
};
