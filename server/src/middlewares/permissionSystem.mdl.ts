import type { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../helpers/jwt.helper.js";
import { getRedis } from "../config/redis.config.js";

import { UnauthorizedError, ForbiddenError } from "../errors/httpErrors.err.js";

import {
  ROLE_PERMISSIONS,
  type PermissionKey,
} from "../config/pagePermissionData.config.js";

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

function getBearerToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return null;

  return token;
}

const redisUserPermissionKey = (userId: string) =>
  `GECL:userPageAccess:${userId}`;

/* -------------------------------------------------------------------------- */
/*                         REQUIRE PERMISSION (HARD AUTH)                      */
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
      let email: string;

      try {
        const payload = verifyAccessToken(token);
        userId = payload.userId;
        email = payload.email;
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
      const redisRaw = await redis.get(redisUserPermissionKey(userId));

      if (!redisRaw) {
        throw new UnauthorizedError(
          "Session expired or invalid",
          "ACCESS_EXPIRED",
          { GECL_IS_ACCESS_TOKEN_EXPIRED: true },
        );
      }

      const redisData = JSON.parse(redisRaw);

      /* ---------------- Step 4: Permission Check ------- */

      // Explicit deny
      if (
        Array.isArray(redisData.deny) &&
        redisData.deny.includes(permissionKey)
      ) {
        throw new ForbiddenError("Access denied", "ACCESS_DENIED");
      }

      let isAllowed = false;

      // Role-based permissions
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
      if (
        !isAllowed &&
        Array.isArray(redisData.allowExtra) &&
        redisData.allowExtra.includes(permissionKey)
      ) {
        isAllowed = true;
      }

      // Legacy allow
      if (
        !isAllowed &&
        Array.isArray(redisData.allow) &&
        redisData.allow.includes(permissionKey)
      ) {
        isAllowed = true;
      }

      if (!isAllowed) {
        throw new ForbiddenError("Access denied", "ACCESS_DENIED");
      }

      /* ---------------- Step 5: Attach User ------------ */

      req.user = {
        _id: userId,
        userId,
        email,
        role: redisData.role,
        branch: redisData.branch,
        personType: redisData.personType,
        allow: redisData.allow,
        deny: redisData.deny,
        allowExtra: redisData.allowExtra,
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
    /* ---------------- Step 1: Token ---------------- */

    const token = getBearerToken(req);
    if (!token) return next();

    /* ---------------- Step 2: Verify Token ---------- */

    const payload = verifyAccessToken(token);

    /* ---------------- Step 3: Base User -------------- */

    /* ---------------- Step 4: Redis Lookup ---------- */

    const redis = getRedis();
    const redisRaw = await redis.get(redisUserPermissionKey(payload.userId));

    if (!redisRaw) return next();

    const redisData = JSON.parse(redisRaw);

    /* ---------------- Step 5: Merge Redis Data ------- */

    req.user = {
      _id: payload.userId,
      userId: payload.userId,
      email: redisData.email,
      role: redisData.role,
      branch: redisData.branch,
      personType: redisData.personType,
      allow: redisData.allow,
      deny: redisData.deny,
      allowExtra: redisData.allowExtra,
    };

    next();
  } catch {
    // Soft auth → never block request
    next();
  }
};

export const verifyUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new UnauthorizedError("Missing user", "NO_USER");
  }
  next();
};
