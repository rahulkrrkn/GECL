import { Types } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import type { Request, Response } from "express";

// Models
import GeclUser from "../../../models/gecl_user.model.js";
import GeclRefreshSession from "../../../models/gecl_refreshSession.model.js";
import GeclAuthLog from "../../../models/gecl_auth_logs.model.js";

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
import { AuthSecurity } from "../core/AuthSecurity.service.js";

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
    const rawId = id?.toString().trim();

    // 1. SECURITY: GATEKEEPER
    // Stops the request here if IP is banned or User is locked.
    await AuthSecurity.gatekeeper(req, rawId);

    if (!rawId || !password)
      throw new BadRequestError("ID and password are required");

    // Detect Email vs Mobile
    const isEmail = rawId.includes("@");
    const query: any = {};

    if (isEmail) {
      const normalizedEmail = emailNormalization(rawId.toLowerCase());
      if (!normalizedEmail) throw new BadRequestError("Invalid email format");
      query.email = normalizedEmail;
    } else {
      // Mobile validation
      const mobile = rawId.replace(/\s+/g, "");
      if (!/^\d{10,15}$/.test(mobile))
        throw new BadRequestError("Invalid mobile number");
      query.mobile = mobile;
    }

    // 2. FIND USER
    const user = await GeclUser.findOne(query)
      .select("+passwordHash +status")
      .lean();

    // 3. SECURITY: HANDLE "USER NOT FOUND"
    // We delay the response slightly or throw a generic error to prevent enumeration,
    // but we LOG the specific failure internally.
    if (!user) {
      await AuthSecurity.handleFailure(req, rawId, "USER_NOT_FOUND");
      throw new UnauthorizedError("Invalid credentials");
    }

    if (user.status !== "active") {
      throw new ForbiddenError("Account is disabled or unverified");
    }

    // 4. VERIFY PASSWORD
    const isMatch = await bcrypt.compare(password, user.passwordHash || "");

    if (!isMatch) {
      // 5. SECURITY: HANDLE WRONG PASSWORD
      // This increments the failure counter and might LOCK the account.
      await AuthSecurity.handleFailure(req, rawId, "WRONG_PASSWORD");
      throw new UnauthorizedError("Invalid credentials");
    }

    // 6. SECURITY: HANDLE SUCCESS
    // Resets counters and checks for "New Device" risk
    await AuthSecurity.handleSuccess(req, user, "PASSWORD");

    // 7. GENERATE JWT
    await makeGeclUserLogin({
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

  /* ========================================================================
     2. Send / Resend Email OTP (SECURED)
     ------------------------------------------------------------------------
     - Checks Eligibility (Spam protection)
     - Sets strict cooldowns
  ======================================================================== */
  static async sendEmailOtp(
    rawEmail: string,
    req: Request,
    isResend: boolean = false,
  ) {
    if (!rawEmail) throw new BadRequestError("Email is required");

    const email = emailNormalization(rawEmail);
    if (!email) throw new BadRequestError("Invalid email");

    // 1. SECURITY: CHECK OTP ELIGIBILITY
    // Stops request if they are spamming or in cooldown
    await AuthSecurity.checkOtpEligibility(email, req);

    const user = await GeclUser.findOne({ email }).select("_id status").lean();
    if (!user) throw new NotFoundError("Account not found");
    if (user.status !== "active")
      throw new ForbiddenError("Account is blocked");

    // 2. GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. SAVE TO REDIS (TTL 5 Mins)
    await saveOtp({
      channel: "email",
      identifier: email,
      otp,
      purpose: "AUTH",
      ttlSeconds: 300,
      maxAttempts: 3, // Strict verify limit
    });

    // 4. SEND EMAIL
    await Email.sendLoginOtp(email, otp);

    // 5. SECURITY: SET COOLDOWN & LOG
    await AuthSecurity.setOtpCooldown(email);

    await AuthSecurity.log({
      req,
      identifier: email,
      userId: user._id,
      event: isResend ? "RESEND_OTP" : "OTP_REQUEST",
      status: "SUCCESS",
      method: "OTP",
    });

    return {
      message: "OTP sent successfully",
      nextRetry: 60, // Inform client to disable button for 60s
    };
  }
  /* ========================================================================
     3. Verify Email OTP (SECURED)
     ------------------------------------------------------------------------
  ======================================================================== */
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
      throw new BadRequestError("Email and OTP are required");

    const email = emailNormalization(rawEmail);
    if (!email) throw new BadRequestError("Invalid email");

    // 1. SECURITY: GATEKEEPER
    await AuthSecurity.gatekeeper(req, email);

    // 2. VERIFY OTP
    const otpResult = await verifyOtp({
      channel: "email",
      identifier: email,
      otp: otp.trim(),
      purpose: "AUTH",
    });

    if (!otpResult.ok) {
      // Log Failure
      await AuthSecurity.handleFailure(req, email, "INVALID_OTP");
      throw new BadRequestError("Invalid or Expired OTP");
    }

    // 3. FIND USER
    const user = await GeclUser.findOne({ email })
      .select("_id email role status")
      .lean();
    if (!user) throw new NotFoundError("Account not found");
    if (user.status !== "active")
      throw new ForbiddenError("Account is blocked");

    // 4. SECURITY: SUCCESS
    await AuthSecurity.handleSuccess(req, user, "OTP");

    // 5. LOGIN
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

  /* ========================================================================
     4. Google Login (SECURED)
     ------------------------------------------------------------------------
  ======================================================================== */
  static async loginUsingGoogle({
    token,
    req,
    res,
  }: {
    token: string;
    req: Request;
    res: Response;
  }) {
    // 1. GATEKEEPER (IP Check only, as we don't have user ID yet)
    await AuthSecurity.gatekeeper(req, "google-login");

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

    // Find User Logic
    let user = await GeclUser.findOne({ googleSub })
      .select("_id email role status")
      .lean();

    // Fallback: Link by Email
    if (!user) {
      user = await GeclUser.findOne({ email })
        .select("_id email role status")
        .lean();
      if (user) {
        // Auto-link Google ID if emails match
        await GeclUser.updateOne({ _id: user._id }, { $set: { googleSub } });
      }
    }

    if (!user) {
      await AuthSecurity.log({
        req,
        event: "LOGIN_ATTEMPT",
        status: "FAILED",
        reason: "NO_LINKED_ACCOUNT",
        method: "GOOGLE",
      });
      throw new NotFoundError("Account not found");
    }

    if (user.status !== "active") throw new ForbiddenError("Account blocked");

    // 2. SECURITY: SUCCESS
    await AuthSecurity.handleSuccess(req, user, "GOOGLE");

    await makeGeclUserLogin({
      loginMethod: "google",
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
