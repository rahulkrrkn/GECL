import crypto from "crypto";
import { Types } from "mongoose";

import {
  sendCookie,
  sendError,
  sendSuccess,
} from "../../../helpers/response.helper.js";

import GeclRefreshSession from "../../../models/gecl_refreshSession.model.js";
import GeclUser from "../../../models/gecl_user.model.js";
import { getRedis } from "../../../config/redis.config.js";

/* -------------------------------------------------------------------------- */
/*                                   REDIS                                     */
/* -------------------------------------------------------------------------- */

const redis = getRedis();

const keyGeclUserPageAccess = (userId: string) =>
  `GECL:userPageAccess:${userId}`;

/* -------------------------------------------------------------------------- */
/*                               COOKIE HELPER                                 */
/* -------------------------------------------------------------------------- */

const clearCookie = (res: any, name: string) => {
  // Must match original cookie options (path, domain, sameSite, etc.)
  sendCookie(res, name, "", 0);
};

/* -------------------------------------------------------------------------- */
/*                                   LOGOUT                                    */
/* -------------------------------------------------------------------------- */

export const geclLogout = async (req: any, res: any) => {
  try {
    const rawCookie = req.cookies?.GECL_REFRESH_TOKEN;

    /* ---------------------------------------------------------------------- */
    /* No cookie → already logged out (idempotent)                             */
    /* ---------------------------------------------------------------------- */

    if (!rawCookie) {
      clearCookie(res, "GECL_REFRESH_TOKEN");
      return sendSuccess(res, "LOGOUT_SUCCESS", {}, { code: "LOGOUT_SUCCESS" });
    }

    let sid: string | null = null;
    let rt: string | null = null;

    /* ---------------------------------------------------------------------- */
    /* Parse cookie                                                            */
    /* ---------------------------------------------------------------------- */

    try {
      const parsed = JSON.parse(rawCookie);
      sid = parsed?.sid ?? null;
      rt = parsed?.rt ?? null;
    } catch {
      clearCookie(res, "GECL_REFRESH_TOKEN");
      return sendSuccess(res, "LOGOUT_SUCCESS", {}, { code: "LOGOUT_SUCCESS" });
    }

    if (!sid || !rt || !Types.ObjectId.isValid(sid)) {
      clearCookie(res, "GECL_REFRESH_TOKEN");
      return sendSuccess(res, "LOGOUT_SUCCESS", {}, { code: "LOGOUT_SUCCESS" });
    }

    /* ---------------------------------------------------------------------- */
    /* Hash refresh token                                                      */
    /* ---------------------------------------------------------------------- */

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(rt)
      .digest("hex");

    /* ---------------------------------------------------------------------- */
    /* Find refresh session                                                    */
    /* ---------------------------------------------------------------------- */

    const session = await GeclRefreshSession.findOne({ _id: sid })
      .select("_id userId refreshTokenHash isRevoked")
      .lean();

    if (session && session.refreshTokenHash === refreshTokenHash) {
      /* -------------------------------------------------------------------- */
      /* Revoke session                                                        */
      /* -------------------------------------------------------------------- */

      if (!session.isRevoked) {
        await GeclRefreshSession.updateOne(
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

      /* -------------------------------------------------------------------- */
      /* Optional cleanup: user + redis                                        */
      /* -------------------------------------------------------------------- */

      if (session.userId) {
        const userId = session.userId.toString();

        // Optional audit info on user
        await GeclUser.updateOne(
          { _id: session.userId },
          { $set: { lastLogoutAt: new Date() } },
        );

        // Clear cached page access / permissions
        await redis.del(keyGeclUserPageAccess(userId));
      }
    }

    /* ---------------------------------------------------------------------- */
    /* Always clear cookie                                                     */
    /* ---------------------------------------------------------------------- */

    clearCookie(res, "GECL_REFRESH_TOKEN");

    return sendSuccess(res, "LOGOUT_SUCCESS", {}, { code: "LOGOUT_SUCCESS" });
  } catch (err) {
    /* ---------------------------------------------------------------------- */
    /* Internal log only                                                       */
    /* ---------------------------------------------------------------------- */

    console.error("GECL LOGOUT ERROR:", err);

    /* ---------------------------------------------------------------------- */
    /* Always clear cookie                                                     */
    /* ---------------------------------------------------------------------- */

    clearCookie(res, "GECL_REFRESH_TOKEN");

    /* ---------------------------------------------------------------------- */
    /* User-safe error                                                         */
    /* ---------------------------------------------------------------------- */

    return sendError(res, "LOGOUT_FAILED", {
      status: 500,
      code: "LOGOUT_FAILED",
      message: "Unable to logout at this time. Please try again.",
    });
  }
};
