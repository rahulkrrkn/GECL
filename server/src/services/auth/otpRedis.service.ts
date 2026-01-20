import bcrypt from "bcrypt";
import { getRedis } from "../../config/redis.config.js";

const DEFAULT_OTP_TTL_SECONDS = 5 * 60; // 5 minutes
const DEFAULT_MAX_ATTEMPTS = 5;

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

function otpKey(
  channel: string,
  identifier: string,
  purpose: OtpPurpose = "AUTH",
) {
  return `GECL:otp:${purpose}:${channel}:${identifier}`;
}

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

  if (!input.otp || input.otp.trim().length === 0) {
    throw new Error("OTP is required");
  }

  const otpHash = await bcrypt.hash(input.otp, 10);

  const payload: OtpStoredData = {
    otpHash,
    attempts: 0,
    maxAttempts,
    purpose,
  };

  await redis.set(
    otpKey(input.channel, input.identifier, purpose),
    JSON.stringify(payload),
    "EX",
    ttlSeconds,
  );
}

export async function verifyOtp(input: {
  channel: string;
  identifier: string;
  otp: string;
  purpose?: OtpPurpose;
}): Promise<
  | { ok: true; reason: "OTP_VALID" }
  | { ok: false; reason: "OTP_EXPIRED" | "OTP_INVALID" | "TOO_MANY_ATTEMPTS" }
> {
  const redis = getRedis();

  const purpose = input.purpose ?? "AUTH";
  const key = otpKey(input.channel, input.identifier, purpose);

  const raw = await redis.get(key);

  if (!raw) {
    return { ok: false, reason: "OTP_EXPIRED" };
  }

  const data: OtpStoredData = JSON.parse(raw);

  // too many attempts -> delete OTP
  if (data.attempts >= data.maxAttempts) {
    await redis.del(key);
    return { ok: false, reason: "TOO_MANY_ATTEMPTS" };
  }

  if (!input.otp || input.otp.trim().length === 0) {
    return { ok: false, reason: "OTP_INVALID" };
  }

  const isMatch = await bcrypt.compare(input.otp, data.otpHash);

  if (!isMatch) {
    data.attempts += 1;

    // keep same remaining ttl
    const ttl = await redis.ttl(key);

    const nextTtl = ttl > 0 ? ttl : DEFAULT_OTP_TTL_SECONDS;

    await redis.set(key, JSON.stringify(data), "EX", nextTtl);

    return { ok: false, reason: "OTP_INVALID" };
  }

  // success -> delete OTP (one-time use)
  await redis.del(key);

  return { ok: true, reason: "OTP_VALID" };
}

export async function clearOtp(params: {
  channel: string;
  identifier: string;
  purpose?: OtpPurpose;
}) {
  const redis = getRedis();
  const purpose = params.purpose ?? "AUTH";

  await redis.del(otpKey(params.channel, params.identifier, purpose));
}
