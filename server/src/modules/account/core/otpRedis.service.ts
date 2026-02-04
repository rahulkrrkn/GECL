import bcrypt from "bcrypt";
import { getRedis } from "../../../config/redis.config.js";
import { BadRequestError } from "../../../errors/httpErrors.err.js";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const DEFAULT_OTP_TTL_SECONDS = 5 * 60; // 5 minutes
const DEFAULT_MAX_ATTEMPTS = 5;
const BCRYPT_ROUNDS = 6; // OTP ≠ password

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type OtpPurpose =
  | "AUTH"
  | "RESET_PASSWORD"
  | "VERIFY_EMAIL"
  | "VERIFY_MOBILE"
  | "VERIFY_REGISTRATION";

export type OtpStoredData = {
  otpHash: string;
  attempts: number;
  maxAttempts: number;
  purpose: OtpPurpose;
};

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function otpKey(channel: string, identifier: string, purpose: OtpPurpose) {
  return `GECL:otp:${purpose}:${normalize(channel)}:${normalize(identifier)}`;
}

/* -------------------------------------------------------------------------- */
/*                                   SAVE OTP                                 */
/* -------------------------------------------------------------------------- */

export async function saveOtp(input: {
  channel: string;
  identifier: string;
  otp: string;
  purpose?: OtpPurpose;
  ttlSeconds?: number;
  maxAttempts?: number;
}) {
  const redis = getRedis();

  const purpose = input.purpose ?? "AUTH";
  const ttlSeconds = input.ttlSeconds ?? DEFAULT_OTP_TTL_SECONDS;
  const maxAttempts = input.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;

  if (!input.otp?.trim()) {
    throw new BadRequestError("OTP is required", "OTP_REQUIRED");
  }

  const key = otpKey(input.channel, input.identifier, purpose);
  const otpHash = await bcrypt.hash(input.otp, BCRYPT_ROUNDS);

  await redis.hset(key, {
    otpHash,
    attempts: "0",
    maxAttempts: String(maxAttempts),
    purpose,
  });

  await redis.expire(key, ttlSeconds);
}

/* -------------------------------------------------------------------------- */
/*                                  VERIFY OTP                                */
/* -------------------------------------------------------------------------- */

export async function verifyOtp(input: {
  channel: string;
  identifier: string;
  otp: string;
  purpose?: OtpPurpose;
}): Promise<{ ok: true; reason: "OTP_VALID" }> {
  const redis = getRedis();
  const purpose = input.purpose ?? "AUTH";

  if (!input.otp?.trim()) {
    throw new BadRequestError("OTP is required", "OTP_REQUIRED");
  }

  const key = otpKey(input.channel, input.identifier, purpose);
  const data = await redis.hgetall(key);

  if (!data || !data.otpHash) {
    throw new BadRequestError("OTP expired", "OTP_EXPIRED");
  }

  const attempts = Number(data.attempts ?? 0);
  const maxAttempts = Number(data.maxAttempts ?? DEFAULT_MAX_ATTEMPTS);

  if (attempts >= maxAttempts) {
    await redis.del(key);
    throw new BadRequestError("Too many attempts", "TOO_MANY_ATTEMPTS");
  }

  const isMatch = await bcrypt.compare(input.otp, data.otpHash);

  if (!isMatch) {
    await redis.hincrby(key, "attempts", 1);
    throw new BadRequestError("OTP invalid", "OTP_INVALID");
  }

  // success → one-time use
  await redis.del(key);

  return { ok: true, reason: "OTP_VALID" };
}

/* -------------------------------------------------------------------------- */
/*                                  CLEAR OTP                                 */
/* -------------------------------------------------------------------------- */

export async function clearOtp(params: {
  channel: string;
  identifier: string;
  purpose?: OtpPurpose;
}) {
  const redis = getRedis();
  const purpose = params.purpose ?? "AUTH";

  await redis.del(otpKey(params.channel, params.identifier, purpose));
}
