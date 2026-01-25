import crypto from "crypto";
import { Types } from "mongoose";

import {
  sendCookie,
  sendError,
  sendSuccess,
} from "../../helpers/response.helper.js";
import { getGeclRefreshSessionFUIConn } from "../../models/gecl_refreshSession.model.js";
import { getRedis } from "../../config/redis.config.js";

// Redis key (same pattern as login)
const redis = getRedis();
const keyGeclUserPageAccess = (userId: string) =>
  `GECL:userPageAccess:${userId}`;

// clear cookie helper
const clearCookie = (res: any, name: string) => {
  // Must match cookie options (path etc.)
  sendCookie(res, name, "", 0);
};

export const geclLogout = async (req: any, res: any) => {
  try {
    const RefreshSession = await getGeclRefreshSessionFUIConn();

    const rawCookie = req.cookies?.GECL_REFRESH_TOKEN;

    // ✅ If cookie not present -> already logged out -> SUCCESS
    if (!rawCookie) {
      clearCookie(res, "GECL_REFRESH_TOKEN");
      return sendSuccess(res, "LOGOUT_SUCCESS_", {}, { code: "LOGOUT_SUCCESS_" });
    }

    let sid: string | null = null;
    let rt: string | null = null;

    // cookie contains JSON string: { sid, rt }
    try {
      const parsed = JSON.parse(rawCookie);
      sid = parsed?.sid ?? null;
      rt = parsed?.rt ?? null;
    } catch {
      // invalid cookie -> clear it -> SUCCESS
      clearCookie(res, "GECL_REFRESH_TOKEN");
      return sendSuccess(res, "LOGOUT_SUCCESS", {}, { code: "LOGOUT_SUCCESS" });
    }

    // missing or invalid data -> clear -> SUCCESS
    if (!sid || !rt || !Types.ObjectId.isValid(sid)) {
      clearCookie(res, "GECL_REFRESH_TOKEN");
      return sendSuccess(res, "LOGOUT_SUCCESS", {}, { code: "LOGOUT_SUCCESS" });
    }

    // hash refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(rt)
      .digest("hex");

    // find session
    const session = await RefreshSession.findOne({ _id: sid })
      .select("_id userId refreshTokenHash isRevoked")
      .lean();

    // if session exists & token matches -> revoke it
    if (session && session.refreshTokenHash === refreshTokenHash) {
      // revoke only if not already revoked
      if (!session.isRevoked) {
        await RefreshSession.updateOne(
          { _id: sid },
          {
            $set: {
              isRevoked: true,
              revokedAt: new Date(),
              revokeReason: "USER_LOGOUT",
            },
          },
        );
      }

      // optional: clear redis cache
      if (session.userId) {
        await redis.del(keyGeclUserPageAccess(session.userId.toString()));
      }
    }

    // always clear cookie
    clearCookie(res, "GECL_REFRESH_TOKEN");

    // always success (even if session not found)
    return sendSuccess(res, "LOGOUT_SUCCESS", {}, { code: "LOGOUT_SUCCESS" });
  } catch (err) {
    // even on error, clear cookie
    clearCookie(res, "GECL_REFRESH_TOKEN");

    return sendError(res, "LOGOUT_FAILED", {
      status: 500,
      code: "LOGOUT_FAILED",
      details: err,
    });
  }
};
