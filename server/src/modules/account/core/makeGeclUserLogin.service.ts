import type { Request, Response } from "express";
import crypto from "crypto";
import { signAccessToken } from "../../../helpers/jwt.helper.js";
import { sendCookie } from "../../../helpers/response.helper.js";
import GeclUser from "../../../models/gecl_user.model.js";
import GeclRefreshSession from "../../../models/gecl_refreshSession.model.js";
import { buildUserAccessCache } from "./buildUserAccessCache.service.js";

// Import your error classes
import {
  NotFoundError,
  ForbiddenError,
  InternalServerError,
} from "../../../errors/httpErrors.err.js"; // Adjust path as needed

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

function getClientIp(req: Request): string | null {
  const xff = req.headers?.["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0)
    return xff.split(",")[0]?.trim() || null;
  if (Array.isArray(xff) && xff.length > 0) return xff[0]?.trim() || null;
  return req.ip ?? req.connection?.remoteAddress ?? null;
}

export const makeGeclUserLogin = async ({
  userId,
  loginMethod,
  req,
  res,
}: MakeLoginInput) => {
  // 1. Fetch User Data
  // Note: 'allow', 'deny', 'allowExtra' are now at root level based on your updated schema
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

  // 5. Create Session in DB
  const ip = getClientIp(req);
  const userAgent = req.headers["user-agent"] || null;

  try {
    const newSession = await GeclRefreshSession.create({
      userId: userId,
      refreshTokenHash: refreshTokenHash, // Store Hash Only
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),
      loginMethod: loginMethod,
      loginAt: new Date(),
      ip,
      userAgent,
      isRevoked: false,
      lastUsedAt: new Date(),
    });

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
  res.locals.publicData.GECL_ACCESS_TOKEN = {
    token: accessToken,
    expiresAt: new Date(Date.now() + ACCESS_MIN * 60 * 1000),
    // Correctly mapped from root level
    allow: user.allow ?? [],
    deny: user.deny ?? [],
    allowExtra: user.allowExtra ?? [],
    role: user.role,
    personType: user.personType,
    branch: user.branch ?? [],
  };
};
