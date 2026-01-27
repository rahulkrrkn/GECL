import type { Request, Response } from "express";
import crypto from "crypto";
import { Types } from "mongoose";

import {
  sendCookie,
  sendError,
  sendSuccess,
} from "../../helpers/response.helper.js";
import { signAccessToken } from "../../helpers/jwt.helper.js";

import { getGeclUserFUIConn } from "../../models/gecl_user.model.js";
import { getGeclRefreshSessionFUIConn } from "../../models/gecl_refreshSession.model.js";

import { buildUserAccessCache } from "../../services/auth/buildUserAccessCache.service.js";

// ==============================
// Helpers
// ==============================
function getClientIp(req: any) {
  const xff = req.headers?.["x-forwarded-for"];

  // x-forwarded-for can be: string | string[] | undefined
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0]?.trim() || null;
  }

  if (Array.isArray(xff) && xff.length > 0) {
    return xff[0]?.trim() || null;
  }

  return req.ip ?? req.connection?.remoteAddress ?? null;
}

// ==============================
// ✅ REFRESH ACCESS TOKEN (GECL)
// ==============================
export const refreshAccessToken = async (req: Request, res: Response) => {
  const raw = req.cookies?.GECL_REFRESH_TOKEN;

  if (!raw) {
    return sendError(res, "No refresh token", {
      status: 401,
      code: "NO_REFRESH",
    });
  }

  let cookieData: { sid: string; rt: string };

  try {
    cookieData = JSON.parse(raw);
  } catch {
    return sendError(res, "Invalid refresh cookie", {
      status: 401,
      code: "REFRESH_COOKIE_INVALID",
    });
  }

  const { sid, rt } = cookieData;

  if (!sid || !rt) {
    return sendError(res, "Invalid refresh cookie data", {
      status: 401,
      code: "REFRESH_COOKIE_BAD_DATA",
    });
  }

  if (!Types.ObjectId.isValid(sid)) {
    return sendError(res, "Invalid session id", {
      status: 401,
      code: "REFRESH_SESSION_INVALID",
    });
  }

  const RefreshSession = await getGeclRefreshSessionFUIConn();

  const session = await RefreshSession.findOne({ _id: sid }).lean();

  if (!session) {
    return sendError(res, "Session not found", {
      status: 401,
      code: "REFRESH_SESSION_NOT_FOUND",
    });
  }

  // revoked?
  if (session.isRevoked) {
    return sendError(res, "Session revoked", {
      status: 401,
      code: "REFRESH_SESSION_REVOKED",
    });
  }

  // expired?
  if (session.expiresAt && new Date(session.expiresAt).getTime() < Date.now()) {
    return sendError(res, "Session expired", {
      status: 401,
      code: "REFRESH_SESSION_EXPIRED",
    });
  }

  // verify refresh token hash
  const incomingHash = crypto.createHash("sha256").update(rt).digest("hex");

  if (incomingHash !== session.refreshTokenHash) {
    // ❌ token mismatch => revoke current session (security)
    await RefreshSession.updateOne(
      { _id: sid },
      {
        $set: {
          isRevoked: true,
          revokedAt: new Date(),
          revokeReason: "TOKEN_MISMATCH",
        },
      },
    );

    return sendError(res, "Refresh token mismatch", {
      status: 401,
      code: "REFRESH_TOKEN_MISMATCH",
    });
  }

  // load user
  const AuthUser = await getGeclUserFUIConn();

  const user = await AuthUser.findOne({ _id: session.userId })
    .select("_id email role status")
    .lean();

  if (!user) {
    return sendError(res, "User not found", {
      status: 401,
      code: "USER_NOT_FOUND",
    });
  }

  if (user.status !== "active") {
    return sendError(res, "User is blocked", {
      status: 401,
      code: "USER_BLOCKED",
    });
  }

  // rebuild redis access cache
  const cacheRes = await buildUserAccessCache(String(user._id));
  if (!cacheRes.ok) {
    return sendError(res, "Access cache failed", {
      status: 403,
      code: cacheRes.code,
    });
  }

  // new access token
  const newAccessToken = signAccessToken({
    userId: String(user._id),
    email: user.email,
    role: user.role,
  });

  // ==============================
  // Rotate refresh token (new session)
  // ==============================
  const newRefreshToken = crypto.randomBytes(48).toString("hex");
  const newRefreshHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  const REFRESH_DAYS = Number(
    process.env.GECL_REFRESH_SESSION_EXPIRES_DAYS || 7,
  );

  const ip = getClientIp(req);
  const userAgent = req.headers?.["user-agent"] ?? null;

  const newSession = await RefreshSession.create({
    userId: session.userId,
    refreshTokenHash: newRefreshHash,

    createdAt: new Date(),
    expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),

    // ✅ keep FIRST login info (do NOT change on refresh)
    loginMethod: "refresh-token",
    loginAt: session.loginAt,

    // metadata
    ip,
    userAgent,
    device: session.device ?? null,
    location: session.location ?? {
      country: null,
      state: null,
      city: null,
    },

    rotatedFrom: session._id,

    isRevoked: false,
    revokedAt: null,
    revokeReason: null,

    lastUsedAt: new Date(),
  });

  // revoke old session
  await RefreshSession.updateOne(
    { _id: sid },
    {
      $set: {
        isRevoked: true,
        revokedAt: new Date(),
        revokeReason: "ROTATED",
        lastUsedAt: new Date(),
      },
    },
  );

  // set new refresh cookie
  sendCookie(
    res,
    "GECL_REFRESH_TOKEN",
    JSON.stringify({ sid: newSession._id.toString(), rt: newRefreshToken }),
    24 * REFRESH_DAYS,
  );

  // response
  res.locals.publicData = res.locals.publicData || {};

  // Create access token data
  const ACCESS_MIN = Number(process.env.GECL_JWT_ACCESS_EXPIRES_MIN) || 15;

  res.locals.publicData = res.locals.publicData || {};
  const accessTokenData: any = {
    token: newAccessToken,
    expiresAt: new Date(Date.now() + ACCESS_MIN * 60 * 1000),
    allow: user.pageAccess?.allow ?? [],
    deny: user.pageAccess?.deny ?? [],
    allowExtra: user.pageAccess?.allowExtra ?? [],
    role: user.role,
    personType: user.personType,
  };
  res.locals.publicData.GECL_ACCESS_TOKEN = accessTokenData;
  return sendSuccess(res, "Access token refreshed", {
    // GECL_ACCESS_TOKEN: newAccessToken,
  });
};
