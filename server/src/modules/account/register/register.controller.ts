import type { Request, Response } from "express";
import crypto from "node:crypto";

import { Email } from "../../../library/email/index.js";
import { emailNormalization } from "../../../utils/emailNormalization.utils.js";
import { BadRequestError } from "../../../errors/httpErrors.err.js";
import { saveOtp, verifyOtp } from "../core/otpRedis.service.js";
import { sendSuccess } from "../../../helpers/response.helper.js";
import { getRedis } from "../../../config/redis.config.js";
import { RegisterService } from "./register.service.js";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                    */
/* -------------------------------------------------------------------------- */

const OTP_TTL_SECONDS = 5 * 60; // 5 minutes
const OTP_RESEND_COOLDOWN = 60; // 1 minute
const OTP_MAX_ATTEMPTS = 3;

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                   */
/* -------------------------------------------------------------------------- */

function registrationKey(email: string) {
  return `GECL:VERIFY_REGISTRATION:${email}`;
}

function otpRedisKey(email: string) {
  return `GECL:otp:VERIFY_REGISTRATION:email:${email}`;
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* -------------------------------------------------------------------------- */
/*                                CONTROLLER                                   */
/* -------------------------------------------------------------------------- */

export class RegisterController {
  // ==============================
  // ✅ SEND OTP (EMAIL)
  // ==============================
  static async sendOtp(req: Request, res: Response) {
    const redis = getRedis();

    const rawEmail = req?.validatedBody?.email;
    const email = emailNormalization(rawEmail);

    if (!email) {
      throw new BadRequestError("Invalid email", "INVALID_EMAIL");
    }

    const otpKey = otpRedisKey(email);

    // 1️⃣ Check if OTP already exists
    const exists = await redis.exists(otpKey);

    if (exists) {
      const ttl = await redis.ttl(otpKey);

      // cooldown logic
      if (ttl > OTP_TTL_SECONDS - OTP_RESEND_COOLDOWN) {
        const waitSeconds = OTP_RESEND_COOLDOWN - (OTP_TTL_SECONDS - ttl);

        throw new BadRequestError(
          `OTP already sent. Please wait ${waitSeconds}s`,
          "OTP_ALREADY_SENT",
        );
      }
    }

    // 2️⃣ Generate OTP
    const otp = generateOtp();

    // 3️⃣ Save OTP to Redis
    await saveOtp({
      channel: "email",
      identifier: email,
      otp,
      purpose: "VERIFY_REGISTRATION",
      ttlSeconds: OTP_TTL_SECONDS,
      maxAttempts: OTP_MAX_ATTEMPTS,
    });

    // 4️⃣ Send OTP email
    await Email.sendRegisterOtp(email, otp);

    return sendSuccess(res, "OTP sent successfully", { email });
  }

  // ==============================
  // ✅ VERIFY OTP (EMAIL)
  // ==============================
  static async verifyOtp(req: Request, res: Response) {
    const redis = getRedis();

    const rawEmail = req?.validatedBody?.email;
    const otp = req?.validatedBody?.otp?.trim();

    if (!rawEmail || !otp) {
      throw new BadRequestError(
        "Email or OTP is required",
        "MISSING_EMAIL_OR_OTP",
      );
    }

    const email = emailNormalization(rawEmail);

    if (!email) {
      throw new BadRequestError("Invalid email", "INVALID_EMAIL");
    }

    // 1️⃣ Verify OTP (throws if invalid / expired / too many attempts)
    await verifyOtp({
      channel: "email",
      identifier: email,
      otp,
      purpose: "VERIFY_REGISTRATION",
    });

    // 2️⃣ Create temporary registration token
    const registrationToken = crypto.randomBytes(32).toString("hex");
    const ttlSeconds = 60 * 60; // 1 hour

    await redis.set(
      registrationKey(email),
      registrationToken,
      "EX",
      ttlSeconds,
    );

    return sendSuccess(res, "OTP verified successfully", {
      email,
      REGISTRATION_KEY: registrationToken,
    });
  }

  static async registerStudent(req: Request, res: Response) {
    const result = await RegisterService.registerStudent(req);

    return sendSuccess(
      res,
      "Registration successful. Your application is under verification.",
      result,
      { status: 200, code: "STUDENT_REGISTRATION_SUCCESS" },
    );
  }

  static async registerTeacher(req: Request, res: Response) {
    const result = await RegisterService.registerTeacher(req);

    return sendSuccess(
      res,
      "Registration successful. Your application is under verification.",
      result,
      { status: 200, code: "EMPLOYEE_REGISTRATION_SUCCESS" },
    );
  }
}
