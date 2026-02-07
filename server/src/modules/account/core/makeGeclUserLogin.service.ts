import type { Request, Response } from "express";
import crypto from "crypto";
import { signAccessToken } from "../../../helpers/jwt.helper.js";
import { sendCookie } from "../../../helpers/response.helper.js";
import GeclUser from "../../../models/gecl_user.model.js";
import GeclRefreshSession from "../../../models/gecl_refreshSession.model.js";
import { buildUserAccessCache } from "./buildUserAccessCache.service.js";
import {
  NotFoundError,
  ForbiddenError,
  InternalServerError,
} from "../../../errors/httpErrors.err.js";

import { Email } from "../../../library/email/index.js";

interface MakeLoginInput {
  userId: string;
  loginMethod:
    | "email-password"
    | "mobile-password"
    | "email-otp"
    | "google"
    | "google-sub"
    | "google-email";
  req: Request;
  res: Response;
}

export const makeGeclUserLogin = async ({
  userId,
  loginMethod,
  req,
  res,
}: MakeLoginInput) => {
  // 1. Fetch User Data
  const user = await GeclUser.findOne({ _id: userId })
    .select("_id email role status allow deny allowExtra personType branch")
    .lean();

  if (!user) {
    throw new NotFoundError("User not found", "USER_NOT_FOUND");
  }

  if (user.status !== "active") {
    throw new ForbiddenError("User account is blocked", "USER_BLOCKED");
  }

  // 2. Build Redis Cache (Permissions + Branch)
  await buildUserAccessCache(userId);

  // 3. Generate Access Token (JWT)
  const accessToken = signAccessToken({
    userId: userId,
    email: user.email,
    role: user.role,
    branch: user.branch,
  });

  // 4. Generate Refresh Token (Opaque) & Hash it
  const refreshToken = crypto.randomBytes(48).toString("hex");
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const REFRESH_DAYS = Number(
    process.env.GECL_REFRESH_SESSION_EXPIRES_DAYS || 7,
  );

  // 5. Create Session in DB using Request Context
  // We use the exact data provided by your 'attachClientInfo' middleware
  const { ip, userAgent, deviceHash, country } = req.context;

  try {
    const newSession = await GeclRefreshSession.create({
      userId: userId,
      refreshTokenHash: refreshTokenHash, // Store Hash Only

      // Validity
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),
      isRevoked: false,

      // Metadata
      loginMethod: loginMethod,
      loginAt: new Date(),
      lastUsedAt: new Date(),

      // Tracking Info (Direct from Context)
      ip: ip,
      userAgent: userAgent,
      deviceHash: deviceHash,
      location: country, // Map 'country' to 'location' in your schema
    });

    try {
      const userName = user.firstName
        ? `${user.firstName} ${user.lastName || ""}`.trim()
        : "User";

      await Email.sendLoginSuccess({
        to: user.email,
        name: userName,
        ip: req.context.ip,
        loginAt: new Date(),
        device: req.context.userAgent, // e.g., "Chrome on Windows"
        platform: req.context.deviceHash,
        location: req.context.country, // Don't send "unknown"
      });
    } catch (emailErr) {
      console.error("Failed to send login email:", emailErr);
    }

    // 6. Set Cookie (SID + Raw Token)
    sendCookie(
      res,
      "GECL_REFRESH_TOKEN",
      JSON.stringify({ sid: newSession._id.toString(), rt: refreshToken }),
      24 * REFRESH_DAYS,
    );
  } catch (err) {
    console.error("Session creation error:", err);
    throw new InternalServerError("Session creation failed", "DB_ERROR");
  }

  // 7. Prepare Public Response Data
  const ACCESS_MIN = Number(process.env.GECL_JWT_ACCESS_EXPIRES_MIN) || 15;

  res.locals.publicData = res.locals.publicData || {};

  // Attach Access Token Details
  res.locals.publicData.GECL_ACCESS_TOKEN = {
    token: accessToken,
    expiresAt: new Date(Date.now() + ACCESS_MIN * 60 * 1000),

    // User Context
    userId: user._id,
    email: user.email,
    role: user.role,
    personType: user.personType,
    branch: user.branch ?? [],

    // Permissions (mapped from root level)
    allow: user.allow ?? [],
    deny: user.deny ?? [],
    allowExtra: user.allowExtra ?? [],
  };
};
