import crypto from "crypto";
import { Types } from "mongoose";

import { sendCookie } from "../../helpers/response.helper.js";
import { signAccessToken } from "../../helpers/jwt.helper.js";

import { getRedis } from "../../config/redis.config.js";

import { getGeclRefreshSessionFUIConn } from "../../models/gecl_refreshSession.model.js";
import { getGeclUserFUIConn } from "../../models/gecl_user.model.js";

// ==============================
// Types
// ==============================
type LoginMethod = "email-password" | "mobile-password" | "email-otp";

// ==============================
// Redis Keys (GECL: prefix)
// ==============================
const redis = getRedis();

const keyGeclUserPageAccess = (userId: string) =>
  `GECL:userPageAccess:${userId}`;

// ==============================
// Build Page Access Cache (Redis)
// ==============================
async function buildGeclPageAccessCache({
  userId,
  role,
  pageAccess,
}: {
  userId: string;
  role: string;
  pageAccess?: any;
}) {
  const ACCESS_MIN = Number(process.env.GECL_JWT_ACCESS_EXPIRES_MIN || 15);
  const CACHE_MIN_FROM_ENV = Number(process.env.REDIS_GECL_ACCESS_TTL_MIN || 0);

  // cache must be >= access token expiry + 1 minute
  const CACHE_MIN = Math.max(CACHE_MIN_FROM_ENV, ACCESS_MIN + 1);
  const CACHE_SECONDS = CACHE_MIN * 60;

  await redis.set(
    keyGeclUserPageAccess(userId),
    JSON.stringify({
      role,
      allow: pageAccess?.allow ?? [],
      deny: pageAccess?.deny ?? [],
      allowExtra: pageAccess?.allowExtra ?? [],
    }),
    "EX",
    CACHE_SECONDS,
  );

  return { ok: true as const };
}

// ==============================
// ✅ Make User Login (GECL)
// ==============================
export const makeGeclUserLogin = async ({
  userId,
  req,
  res,
  device = null,
  loginMethod,
}: {
  userId: string;
  req: any;
  res: any;
  device?: string | null;
  loginMethod: LoginMethod; // ✅ required now
}) => {
  if (!Types.ObjectId.isValid(userId)) {
    return { ok: false as const, code: "INVALID_USER_ID" };
  }

  if (!loginMethod) {
    return { ok: false as const, code: "LOGIN_METHOD_REQUIRED" };
  }

  const GeclUser = await getGeclUserFUIConn();

  // ✅ single query only
  const user = await GeclUser.findOne({ _id: userId })
    .select("_id email role status personType pageAccess")
    .lean();

  if (!user) return { ok: false as const, code: "USER_NOT_FOUND" };
  if (user.status !== "active")
    return { ok: false as const, code: "USER_BLOCKED" };

  if (!user.personType) {
    return { ok: false as const, code: "GECL_PROFILE_NOT_FOUND" };
  }

  // 1) build redis cache for page access
  try {
    await buildGeclPageAccessCache({
      userId,
      role: user.role,
      pageAccess: user.pageAccess,
    });
  } catch (err) {
    return { ok: false as const, code: "REDIS_CACHE_FAILED" };
  }

  // 2) create access token
  const accessToken = signAccessToken({
    userId,
    email: user.email,
    role: user.role,
  });

  // 3) create refresh token (opaque) + hash
  const refreshToken = crypto.randomBytes(48).toString("hex");
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const REFRESH_DAYS = Number(
    process.env.GECL_REFRESH_SESSION_EXPIRES_DAYS || 7,
  );

  const RefreshSession = await getGeclRefreshSessionFUIConn();

  // 4) create refresh session doc (✅ store loginMethod ONLY HERE)
  const session = await RefreshSession.create({
    userId: new Types.ObjectId(userId),
    refreshTokenHash,
    expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),

    // ✅ NEW fields
    loginMethod,
    loginAt: new Date(),

    ip: req.ip ?? null,
    userAgent: req.headers?.["user-agent"] ?? null,
    device,

    isRevoked: false,
    revokedAt: null,
    revokeReason: null,

    lastUsedAt: new Date(),
    rotatedFrom: null,
  });

  // 5) update login metadata
  await GeclUser.updateOne(
    { _id: userId },
    {
      $set: {
        lastLoginAt: new Date(),
        lastLoginIp: req.ip ?? null,
      },
    },
  );

  // 6) set refresh cookie
  sendCookie(
    res,
    "GECL_REFRESH_TOKEN",
    JSON.stringify({ sid: session._id.toString(), rt: refreshToken }),
    24 * REFRESH_DAYS,
  );

  // 7) set response token
  res.locals.publicData = res.locals.publicData || {};
  res.locals.publicData.GECL_ACCESS_TOKEN = accessToken;

  return { ok: true as const, code: "LOGIN_SUCCESS" };
};
