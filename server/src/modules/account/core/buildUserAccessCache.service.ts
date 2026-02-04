import { Types } from "mongoose";
import type { Redis } from "ioredis";

import { getRedis } from "../../../config/redis.config.js";
import GeclUser from "../../../models/gecl_user.model.js";

// Import custom errors
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../../../errors/httpErrors.err.js";

const redis: Redis = getRedis();

// ✅ Redis key
const keyUserPageAccess = (userId: string) => `GECL:userPageAccess:${userId}`;

/**
 * Builds Redis cache for AuthUser permissions
 * Stored shape:
 * {
 * role,
 * branch,
 * allow,
 * deny,
 * allowExtra
 * }
 */
export const buildUserAccessCache = async (userId: string) => {
  // 1. Validate ID
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestError("Invalid User ID", "INVALID_USER_ID");
  }

  // 2. Fetch User
  // ✅ UPDATED: Select root-level permission fields (allow, deny, allowExtra)
  // instead of the old 'pageAccess' object.
  const user = await GeclUser.findOne({ _id: userId })
    .select("status role branch allow deny allowExtra")
    .lean();

  // 3. Check Existence
  if (!user) {
    throw new NotFoundError("User not found", "USER_NOT_FOUND");
  }

  // 4. Check Status
  if (user.status !== "active") {
    throw new ForbiddenError("User is blocked", "USER_BLOCKED");
  }

  // 5. Calculate TTL
  const ACCESS_MIN = Number(process.env.GECL_JWT_ACCESS_EXPIRES_MIN || 15);
  const CACHE_MIN_FROM_ENV = Number(
    process.env.GECL_REDIS_USER_ACCESS_TTL_MIN || 0,
  );

  // cache must be >= access token expiry + 1 minute
  const CACHE_MIN = Math.max(CACHE_MIN_FROM_ENV, ACCESS_MIN + 1);
  const CACHE_SECONDS = CACHE_MIN * 60;

  // 6. Set Redis Cache
  await redis.set(
    keyUserPageAccess(userId),
    JSON.stringify({
      role: user.role,
      branch: user.branch ?? [],
      // ✅ Use root-level properties
      allow: user.allow ?? [],
      deny: user.deny ?? [],
      allowExtra: user.allowExtra ?? [],
    }),
    "EX",
    CACHE_SECONDS,
  );
};
