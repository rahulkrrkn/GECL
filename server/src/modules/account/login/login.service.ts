import { Types } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import type { Request, Response } from "express";

// Models
import GeclUser from "../../../models/gecl_user.model.js";
import GeclRefreshSession from "../../../models/gecl_refreshSession.model.js";

// Helpers & Utils
import { emailNormalization } from "../../../utils/emailNormalization.utils.js";
import { saveOtp, verifyOtp } from "../core/otpRedis.service.js";
import { makeGeclUserLogin } from "./../core/makeGeclUserLogin.service.js";
import { buildUserAccessCache } from "../core/buildUserAccessCache.service.js";
import { signAccessToken } from "../../../helpers/jwt.helper.js";
import { sendCookie } from "../../../helpers/response.helper.js";

// Errors
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  InternalServerError,
} from "../../../errors/httpErrors.err.js";
import { Email } from "../../../library/email/index.js";

const GECL_GOOGLE_CLIENT_ID = process.env.GECL_GOOGLE_CLIENT_ID || "";
const googleClient = new OAuth2Client(GECL_GOOGLE_CLIENT_ID);

export class LoginService {
  /* ==========================================
     1. Password Login
  ========================================== */
  static async loginUsingPassword({
    id,
    password,
    req,
    res,
  }: {
    id: string;
    password: string;
    req: Request;
    res: Response;
  }) {
    const rawId = id.toString().trim();
    const pass = password.toString().trim();

    if (!rawId || !pass)
      throw new BadRequestError(
        "ID and password are required",
        "INVALID_INPUT",
      );

    // Detect Email vs Mobile
    const isEmail = rawId.includes("@");
    const query: any = {};

    if (isEmail) {
      const normalizedEmail = emailNormalization(rawId.toLowerCase());
      if (!normalizedEmail)
        throw new BadRequestError("Invalid email format", "INVALID_EMAIL");
      query.email = normalizedEmail;
    } else {
      const mobile = rawId.replace(/\s+/g, "");
      if (!/^\d{10,15}$/.test(mobile))
        throw new BadRequestError("Invalid mobile number", "INVALID_MOBILE");
      query.mobile = mobile;
    }

    // Find User
    const user = await GeclUser.findOne(query).select("+passwordHash").lean();

    if (!user?._id)
      throw new UnauthorizedError("Invalid credentials", "INVALID_CREDENTIALS");

    // Status Check
    if (user.status === "unverified")
      throw new ForbiddenError(
        "Account is not verified",
        "ACCOUNT_NOT_VERIFIED",
      );
    if (user.status !== "active")
      throw new ForbiddenError("Account is blocked", "ACCOUNT_BLOCKED");

    // Password Check
    if (!user.passwordHash) {
      throw new ForbiddenError(
        "Password login is not enabled for this account",
        "PASSWORD_NOT_SET",
      );
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch)
      throw new UnauthorizedError("Invalid credentials", "INVALID_CREDENTIALS");

    // Login
    const loginResult = await makeGeclUserLogin({
      loginMethod: isEmail ? "email-password" : "mobile-password",
      userId: user._id.toString(),
      req,
      res,
    });

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    };
  }

  /* ==========================================
     2. Send Email OTP
  ========================================== */
  static async sendEmailOtp(rawEmail: string) {
    if (!rawEmail)
      throw new BadRequestError("Email is required", "INVALID_INPUT");

    const email = emailNormalization(rawEmail);
    if (!email) throw new BadRequestError("Invalid email", "INVALID_EMAIL");

    const user = await GeclUser.findOne({ email }).select("_id status").lean();

    if (!user)
      throw new NotFoundError("Account not found", "ACCOUNT_NOT_FOUND");
    if (user.status !== "active")
      throw new ForbiddenError(
        "Account is blocked or unverified",
        "ACCOUNT_BLOCKED",
      );

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Redis OTP Save
    await saveOtp({
      channel: "email",
      identifier: email,
      otp,
      purpose: "AUTH",
      ttlSeconds: 300,
      maxAttempts: 5,
    });
    await Email.sendLoginOtp(email, otp);

    return { email };
  }

  /* ==========================================
     3. Verify Email OTP
  ========================================== */
  static async verifyEmailOtp({
    email: rawEmail,
    otp,
    req,
    res,
  }: {
    email: string;
    otp: string;
    req: Request;
    res: Response;
  }) {
    if (!rawEmail || !otp)
      throw new BadRequestError("Email and OTP are required", "INVALID_INPUT");

    const email = emailNormalization(rawEmail);
    if (!email) throw new BadRequestError("Invalid email", "INVALID_EMAIL");

    // Verify OTP Redis
    const otpResult = await verifyOtp({
      channel: "email",
      identifier: email,
      otp: otp.trim(),
      purpose: "AUTH",
    });

    if (!otpResult.ok)
      throw new BadRequestError("OTP verification failed", otpResult.reason);

    const user = await GeclUser.findOne({ email })
      .select("_id email role status")
      .lean();
    if (!user)
      throw new NotFoundError("Account not found", "ACCOUNT_NOT_FOUND");
    if (user.status !== "active")
      throw new ForbiddenError("Account is blocked", "ACCOUNT_BLOCKED");

    await makeGeclUserLogin({
      loginMethod: "email-otp",
      userId: user._id.toString(),
      req,
      res,
    });

    return {
      user: { id: user._id, email: user.email, role: user.role },
    };
  }

  /* ==========================================
     4. Google Login
  ========================================== */
  static async loginUsingGoogle({
    token,
    req,
    res,
  }: {
    token: string;
    req: Request;
    res: Response;
  }) {
    if (!GECL_GOOGLE_CLIENT_ID)
      throw new InternalServerError("Server config error", "MISSING_GOOGLE_ID");
    if (!token) throw new BadRequestError("Token required", "INVALID_INPUT");

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token.trim(),
        audience: GECL_GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (e) {
      throw new UnauthorizedError("Invalid Google Token", "INVALID_TOKEN");
    }

    if (!payload?.email || !payload?.sub)
      throw new BadRequestError("Invalid Payload", "INVALID_PAYLOAD");

    const email = emailNormalization(payload.email);
    if (!email)
      throw new BadRequestError("Invalid email from Google", "INVALID_EMAIL");
    const googleSub = payload.sub;

    // Strategy: Sub -> Email -> Error
    let user = await GeclUser.findOne({ googleSub })
      .select("_id email role status")
      .lean();
    let method: any = "google-sub";

    if (!user) {
      user = await GeclUser.findOne({ email })
        .select("_id email role status")
        .lean();
      if (user) {
        await GeclUser.updateOne({ _id: user._id }, { $set: { googleSub } });
        method = "google-email";
      }
    }

    if (!user)
      throw new NotFoundError("Account not found", "ACCOUNT_NOT_FOUND");
    if (user.status !== "active")
      throw new ForbiddenError("Account blocked", "ACCOUNT_BLOCKED");

    const loginResult = await makeGeclUserLogin({
      loginMethod: method,
      userId: user._id.toString(),
      req,
      res,
    });

    return { user: { id: user._id, email: user.email, role: user.role } };
  }

  /* ==========================================
     5. Refresh Access Token
  ========================================== */
  static async refreshAccessToken({
    cookieRaw,
    clientIp,
    userAgent,
    res,
  }: {
    cookieRaw: string;
    clientIp: string | null;
    userAgent: string | null;
    res: Response;
  }) {
    let cookieData;
    try {
      cookieData = JSON.parse(cookieRaw);
    } catch {
      throw new UnauthorizedError(
        "Invalid refresh cookie",
        "REFRESH_COOKIE_INVALID",
      );
    }

    const { sid, rt } = cookieData;
    if (!sid || !rt || !Types.ObjectId.isValid(sid)) {
      throw new UnauthorizedError(
        "Invalid refresh data",
        "REFRESH_COOKIE_BAD_DATA",
      );
    }

    const session = await GeclRefreshSession.findOne({ _id: sid }).lean();
    if (!session)
      throw new UnauthorizedError(
        "Session not found",
        "REFRESH_SESSION_NOT_FOUND",
      );
    if (session.isRevoked)
      throw new UnauthorizedError("Session revoked", "REFRESH_SESSION_REVOKED");
    if (
      session.expiresAt &&
      new Date(session.expiresAt).getTime() < Date.now()
    ) {
      throw new UnauthorizedError("Session expired", "REFRESH_SESSION_EXPIRED");
    }

    // Hash check
    const incomingHash = crypto.createHash("sha256").update(rt).digest("hex");
    if (incomingHash !== session.refreshTokenHash) {
      await GeclRefreshSession.updateOne(
        { _id: sid },
        {
          $set: {
            isRevoked: true,
            revokeReason: "TOKEN_MISMATCH",
            revokedAt: new Date(),
          },
        },
      );
      throw new UnauthorizedError("Token mismatch", "REFRESH_TOKEN_MISMATCH");
    }

    // Get User
    const user = await GeclUser.findOne({ _id: session.userId })
      .select("_id email role status branch pageAccess personType")
      .lean();
    if (!user) throw new UnauthorizedError("User not found", "USER_NOT_FOUND");
    if (user.status !== "active")
      throw new ForbiddenError("User blocked", "USER_BLOCKED");

    // Rebuild Redis Cache
    await buildUserAccessCache(String(user._id));

    // Rotate Session
    const newRefreshToken = crypto.randomBytes(48).toString("hex");
    const newRefreshHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");
    const REFRESH_DAYS = Number(
      process.env.GECL_REFRESH_SESSION_EXPIRES_DAYS || 7,
    );

    const newSession = await GeclRefreshSession.create({
      userId: user._id,
      refreshTokenHash: newRefreshHash,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000),
      loginMethod: "refresh-token",
      loginAt: session.loginAt,
      ip: clientIp,
      userAgent,
      rotatedFrom: session._id,
      isRevoked: false,
      lastUsedAt: new Date(),
    });

    // Revoke Old
    await GeclRefreshSession.updateOne(
      { _id: sid },
      {
        $set: {
          isRevoked: true,
          revokeReason: "ROTATED",
          revokedAt: new Date(),
        },
      },
    );

    // Send Cookie
    sendCookie(
      res,
      "GECL_REFRESH_TOKEN",
      JSON.stringify({ sid: newSession._id.toString(), rt: newRefreshToken }),
      24 * REFRESH_DAYS,
    );

    // Return Access Token Data
    const ACCESS_MIN = Number(process.env.GECL_JWT_ACCESS_EXPIRES_MIN) || 15;
    return {
      token: signAccessToken({
        userId: String(user._id),
        email: user.email,
        role: user.role,
        branch: user.branch ?? [],
      }),
      expiresAt: new Date(Date.now() + ACCESS_MIN * 60 * 1000),
      allow: user.pageAccess?.allow ?? [],
      deny: user.pageAccess?.deny ?? [],
      allowExtra: user.pageAccess?.allowExtra ?? [],
      role: user.role,
      personType: user.personType,
      branch: user.branch ?? [],
    };
  }
}
