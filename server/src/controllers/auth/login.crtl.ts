import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { emailNormalization } from "../../utils/index.js";

import { sendEmailOtp } from "../../lib/email/senders/auth.emails.js";
import { saveOtp, verifyOtp } from "../../services/auth/otpRedis.service.js";

import { getGeclUserFUIConn } from "../../models/gecl_user.model.js";
import { makeGeclUserLogin } from "../../services/auth/makeGeclUserLogin.service.js";

import bcrypt from "bcrypt";
// ==============================
// ✅ SEND OTP (EMAIL) - ONLY IF ACCOUNT EXISTS
// ==============================
export const geclEmailSendOtp = async (req: Request, res: Response) => {
  const rawEmail = req?.validatedBody?.email?.toLowerCase().trim();

  if (!rawEmail) {
    return sendError(res, "Email is required", {
      status: 400,
      code: "INVALID_EMAIL",
    });
  }

  const email = emailNormalization(rawEmail);

  if (!email) {
    return sendError(res, "Invalid email", {
      status: 400,
      code: "INVALID_EMAIL",
    });
  }

  const AuthUser = await getGeclUserFUIConn();

  const user = await AuthUser.findOne({ email })
    .select("_id email status")
    .lean();

  // ❌ IMPORTANT: do not auto create account
  if (!user) {
    return sendError(res, "Account not found. Please contact admin.", {
      status: 404,
      code: "ACCOUNT_NOT_FOUND",
    });
  }

  if (user.status === "unverified") {
    return sendError(res, "Account is not verified", {
      status: 403,
      code: "ACCOUNT_NOT_VERIFIED",
    });
  }

  if (user.status !== "active") {
    return sendError(res, "Account is blocked", {
      status: 403,
      code: "ACCOUNT_BLOCKED",
    });
  }

  // ✅ Always random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await saveOtp({
    channel: "email",
    identifier: email,
    otp,
    purpose: "AUTH",
    ttlSeconds: 300,
    maxAttempts: 5,
  });

  await sendEmailOtp(email, otp);

  return sendSuccess(res, "OTP sent successfully", { email });
};

// ==============================
// ✅ VERIFY OTP (EMAIL) -> LOGIN
// ==============================
export const geclEmailVerifyOtp = async (req: Request, res: Response) => {
  const rawEmail = req?.validatedBody?.email?.toLowerCase().trim();
  const otp = req?.validatedBody?.otp?.trim();

  if (!rawEmail || !otp) {
    return sendError(res, "Email and OTP are required", {
      status: 400,
      code: "INVALID_INPUT",
    });
  }

  const email = emailNormalization(rawEmail);

  if (!email) {
    return sendError(res, "Invalid email", {
      status: 400,
      code: "INVALID_EMAIL",
    });
  }

  // 1) verify OTP from redis
  const otpResult = await verifyOtp({
    channel: "email",
    identifier: email,
    otp,
    purpose: "AUTH",
  });

  if (!otpResult.ok) {
    return sendError(res, "OTP verification failed", {
      status: 400,
      code: otpResult.reason,
    });
  }

  // 2) user must exist (NO auto register)
  const AuthUser = await getGeclUserFUIConn();

  const user = await AuthUser.findOne({ email })
    .select("_id email role status")
    .lean();

  if (!user?._id) {
    return sendError(res, "Account not found", {
      status: 404,
      code: "ACCOUNT_NOT_FOUND",
    });
  }

  if (user.status !== "active") {
    return sendError(res, "Account is blocked", {
      status: 403,
      code: "ACCOUNT_BLOCKED",
    });
  }

  // 3) login system (access token + refresh session cookie)
  const loginResult = await makeGeclUserLogin({
    loginMethod: "email-otp",
    userId: user._id.toString(),
    req,
    res,
  });

  if (!loginResult.ok) {
    return sendError(res, "Login failed", {
      status: 401,
      code: loginResult.code,
    });
  }

  return sendSuccess(res, "Logged in successfully", {
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
  });
};

// ==============================
// ✅ ID + PASSWORD LOGIN
// id can be email or mobile number
// ==============================
export const geclIdPasswordLogin = async (req: Request, res: Response) => {
  const rawId = req?.validatedBody?.id?.toString()?.trim();
  const password = req?.validatedBody?.password?.toString()?.trim();

  if (!rawId || !password) {
    return sendError(res, "ID and password are required", {
      status: 400,
      code: "INVALID_INPUT",
    });
  }

  const AuthUser = await getGeclUserFUIConn();

  // ==============================
  // Detect email or mobile
  // ==============================
  const isEmail = rawId.includes("@");

  let query: any = {};

  if (isEmail) {
    const normalizedEmail = emailNormalization(rawId.toLowerCase());

    if (!normalizedEmail) {
      return sendError(res, "Invalid email", {
        status: 400,
        code: "INVALID_EMAIL",
      });
    }

    query.email = normalizedEmail;
  } else {
    // mobile number login
    const mobile = rawId.replace(/\s+/g, "");

    // basic validation (you can improve with country rules)
    if (!/^\d{10,15}$/.test(mobile)) {
      return sendError(res, "Invalid mobile number", {
        status: 400,
        code: "INVALID_MOBILE",
      });
    }

    query.mobile = mobile;
  }

  // ==============================
  // Find user
  // ==============================
  const user = await AuthUser.findOne(query)
    .select("_id email mobile role status passwordHash")
    .lean();

  if (!user?._id) {
    return sendError(res, "Invalid credentials", {
      status: 401,
      code: "INVALID_CREDENTIALS",
    });
  }

  if (user.status === "unverified") {
    return sendError(res, "Account is not verified", {
      status: 403,
      code: "ACCOUNT_NOT_VERIFIED",
    });
  }

  if (user.status !== "active") {
    return sendError(res, "Account is blocked", {
      status: 403,
      code: "ACCOUNT_BLOCKED",
    });
  }

  // ==============================
  // Password verify
  // ==============================
  if (!user.passwordHash) {
    return sendError(res, "Password login is not enabled for this account", {
      status: 403,
      code: "PASSWORD_NOT_SET",
    });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    return sendError(res, "Invalid credentials", {
      status: 401,
      code: "INVALID_CREDENTIALS",
    });
  }

  // ==============================
  // Login (tokens + cookie)
  // ==============================
  const loginResult = await makeGeclUserLogin({
    loginMethod: isEmail ? "email-password" : "mobile-password",
    userId: user._id.toString(),
    req,
    res,
  });

  if (!loginResult.ok) {
    return sendError(res, "Login failed", {
      status: 401,
      code: loginResult.code,
    });
  }

  return sendSuccess(res, "Logged in successfully", {
    user: {
      id: user._id.toString(),
      email: user.email ?? null,
      mobile: user.mobile ?? null,
      role: user.role,
    },
  });
};
