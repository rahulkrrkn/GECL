import { Types } from "mongoose";
import type { Redis } from "ioredis";
import GeclUser from "../../../models/gecl_user.model.js";
import { getRedis } from "../../../config/redis.config.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../../../errors/httpErrors.err.js";

const redis: Redis = getRedis();

// ✅ Redis Key Generator
const keyUserPageAccess = (userId: string) => `GECL:userPageAccess:${userId}`;

/**
 * Builds Redis cache for AuthUser permissions
 */
export const buildUserAccessCache = async (userId: string) => {
  // 1. Validate ID
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestError("Invalid User ID");
  }

  // 2. Fetch User
  // ✅ FIX: Added 'email' to selection
  const user = await GeclUser.findById(userId)
    .select("email status role branch allow deny allowExtra")
    .lean();

  // 3. Check Existence
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // 4. Check Status
  if (user.status !== "active") {
    throw new ForbiddenError("User is blocked");
  }

  // 5. Calculate TTL
  const ACCESS_MIN = Number(process.env.GECL_JWT_ACCESS_EXPIRES_MIN || 15);
  // Ensure cache lives at least as long as the access token + buffer
  const CACHE_SECONDS = (ACCESS_MIN + 5) * 60;

  // 6. Set Redis Cache
  await redis.set(
    keyUserPageAccess(userId),
    JSON.stringify({
      role: user.role,
      branch: user.branch ?? [],
      email: user.email, // Now this will work
      allow: user.allow ?? [],
      deny: user.deny ?? [],
      allowExtra: user.allowExtra ?? [],
    }),
    "EX",
    CACHE_SECONDS,
  );
};
