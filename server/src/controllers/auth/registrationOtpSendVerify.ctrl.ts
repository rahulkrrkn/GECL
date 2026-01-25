import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { emailNormalization } from "../../utils/index.js";

import { sendEmailOtp } from "../../lib/email/senders/auth.emails.js";
import { saveOtp, verifyOtp } from "../../services/auth/otpRedis.service.js";
import { getGeclUserFUIConn } from "../../models/gecl_user.model.js";
import { makeGeclUserLogin } from "../../services/auth/makeGeclUserLogin.service.js";

import { getRedis } from "../../config/redis.config.js";
import crypto from "node:crypto";
import e from "express";
function registrationKey(email: string) {
  return `GECL:VERIFY_REGISTRATION:${email}`;
}

// ==============================
// ✅ SEND OTP (EMAIL) - ONLY IF ACCOUNT NOT EXISTS
// ==============================
export async function studentRegSendOtp(req: Request, res: Response) {
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

  if (user) {
    return sendError(res, "Email Already registered", {
      status: 400,
      code: "EMAIL_ALREADY_REGISTERED",
    });
  }

  // TODO: Replace with random OTP in production
  // const otp = "123456";
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await saveOtp({
    channel: "email",
    identifier: email,
    otp,
    purpose: "VERIFY_REGISTRATION",
    ttlSeconds: 300,
    maxAttempts: 3,
  });

  await sendEmailOtp(email, otp);

  return sendSuccess(res, "OTP sent successfully", { email });
}

// ==============================
// ✅ VERIFY OTP (EMAIL) -> LOGIN
// ==============================
export const studentRegEmailVerifyOtp = async (req: Request, res: Response) => {
  const redis = getRedis();
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
    purpose: "VERIFY_REGISTRATION",
  });

  if (!otpResult.ok) {
    return sendError(res, "OTP verification failed", {
      status: 400,
      code: otpResult.reason,
    });
  }
  const redisRegistrationKey = registrationKey(email);
  const redisPayload = crypto.randomBytes(32).toString("hex");
  const ttlSeconds = 60 * 60 * 1;

  await redis.set(
    registrationKey(email),
    JSON.stringify(redisPayload),
    "EX",
    ttlSeconds,
  );

  return sendSuccess(res, "OTP verified successfully", {
    email,
    REGISTRATION_KEY: redisPayload,
  });
};
