import { Types } from "mongoose";
import type { Redis } from "ioredis";

import { getRedis } from "../../config/redis.config.js";
import { getGeclUserFUIConn } from "../../models/gecl_user.model.js";

const redis: Redis = getRedis();

// ✅ Redis key (must start with GECL:)
const keyUserPageAccess = (userId: string) => `GECL:userPageAccess:${userId}`;

/**
 * Builds Redis cache for AuthUser.pageAccess
 * Stored shape:
 * {
 *   role,
 *   allow: [],
 *   deny: [],
 *   allowExtra: []
 * }
 */
export const buildUserAccessCache = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    return { ok: false as const, code: "INVALID_USER_ID" as const };
  }

  const AuthUser = await getGeclUserFUIConn();

  const user = await AuthUser.findOne({ _id: userId })
    .select("status role pageAccess")
    .lean();

  if (!user) {
    return { ok: false as const, code: "USER_NOT_FOUND" as const };
  }

  if (user.status !== "active") {
    return { ok: false as const, code: "USER_BLOCKED" as const };
  }

  const ACCESS_MIN = Number(process.env.GECL_JWT_ACCESS_EXPIRES_MIN || 15);
  const CACHE_MIN_FROM_ENV = Number(
    process.env.GECL_REDIS_USER_ACCESS_TTL_MIN || 0,
  );

  // cache must be >= access token expiry + 1 minute
  const CACHE_MIN = Math.max(CACHE_MIN_FROM_ENV, ACCESS_MIN + 1);
  const CACHE_SECONDS = CACHE_MIN * 60;

  await redis.set(
    keyUserPageAccess(userId),
    JSON.stringify({
      role: user.role,
      allow: user.pageAccess?.allow ?? [],
      deny: user.pageAccess?.deny ?? [],
      allowExtra: user.pageAccess?.allowExtra ?? [],
    }),
    "EX",
    CACHE_SECONDS,
  );

  return { ok: true as const };
};
