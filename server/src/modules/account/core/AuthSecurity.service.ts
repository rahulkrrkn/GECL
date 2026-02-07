import crypto from "crypto";
import type { Request } from "express";
import { UAParser } from "ua-parser-js";
import GeclAuthLog from "../../../models/gecl_auth_logs.model.js";
import GeclUser from "../../../models/gecl_user.model.js";
import {
  ForbiddenError,
  TooManyRequestsError,
} from "../../../errors/httpErrors.err.js";
import { getRedis } from "../../../config/redis.config.js";

const redisClient = getRedis();

// ==========================================
// SECURITY CONFIGURATION
// ==========================================
const CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5, // Lock account after 5 wrong passwords
  LOCK_DURATION: 900, // 15 Minutes lock (in seconds)
  IP_RATE_LIMIT: 50, // Max 50 requests per 10 mins per IP
  IP_WINDOW: 600, // 10 Minutes window
  OTP_RESEND_LIMIT: 3, // Max 3 OTPs per 10 mins
  OTP_COOLDOWN: 60, // 60 Seconds strict wait between OTPs
  HIGH_RISK_SCORE: 70, // Score above this flags "isSuspicious"
  BAN_THRESHOLD: 15, // If IP fails 15 times rapidly, ban it temporarily
};

export class AuthSecurity {
  /* ========================================================================
     1. THE GATEKEEPER (Run BEFORE any DB calls)
     Checks if IP or User is blocked/banned in Redis.
  ======================================================================== */
  static async gatekeeper(req: Request, identifier: string): Promise<void> {
    const ip = this.getClientIp(req);

    // A. Check Global IP Blacklist
    const isIpBanned = await redisClient.get(`auth:ban:ip:${ip}`);
    if (isIpBanned) {
      throw new ForbiddenError(
        "Your IP has been flagged for suspicious activity. Try again later.",
      );
    }

    // B. Check IP Velocity (Rate Limit)
    const ipKey = `auth:rate:ip:${ip}`;
    const ipRequestCount = await redisClient.incr(ipKey);
    if (ipRequestCount === 1) await redisClient.expire(ipKey, CONFIG.IP_WINDOW);

    if (ipRequestCount > CONFIG.IP_RATE_LIMIT) {
      throw new TooManyRequestsError(
        "Too many requests from this IP. Please wait.",
      );
    }

    // C. Check User Lockout (Smart Lock)
    if (identifier) {
      const isAccountLocked = await redisClient.get(
        `auth:lock:user:${identifier}`,
      );
      if (isAccountLocked) {
        const ttl = await redisClient.ttl(`auth:lock:user:${identifier}`);
        const minutes = Math.ceil(ttl / 60);
        throw new ForbiddenError(
          `Account locked due to multiple failed attempts. Try again in ${minutes} minutes.`,
        );
      }
    }
  }

  /* ========================================================================
     2. OTP GUARD (Run BEFORE sending OTP)
     Prevents SMS bombing and enforces cooldowns.
  ======================================================================== */
  static async checkOtpEligibility(identifier: string, req: Request) {
    const ip = this.getClientIp(req);

    // A. Strict Cooldown (60s Timer)
    const cooldownKey = `auth:otp:cooldown:${identifier}`;
    const inCooldown = await redisClient.get(cooldownKey);
    if (inCooldown) {
      const ttl = await redisClient.ttl(cooldownKey);
      throw new ForbiddenError(
        `Please wait ${ttl} seconds before resending OTP.`,
      );
    }

    // B. Rate Limit Per User (Max 3 per 10 mins)
    const userLimitKey = `auth:rate:otp:user:${identifier}`;
    const userOtpCount = await redisClient.incr(userLimitKey);
    if (userOtpCount === 1) await redisClient.expire(userLimitKey, 600);

    if (userOtpCount > CONFIG.OTP_RESEND_LIMIT) {
      throw new TooManyRequestsError(
        "Too many OTP requests. Please wait 10 minutes.",
      );
    }

    // C. Rate Limit Per IP (Prevent botnets)
    const ipLimitKey = `auth:rate:otp:ip:${ip}`;
    const ipOtpCount = await redisClient.incr(ipLimitKey);
    if (ipOtpCount === 1) await redisClient.expire(ipLimitKey, 600);

    if (ipOtpCount > 10) {
      throw new ForbiddenError("Too many OTP requests from this device.");
    }
  }

  /* ========================================================================
     3. FAILURE HANDLER (Run when Password/OTP fails)
     Increments counters -> LOCKS ACCOUNT or BANS IP.
  ======================================================================== */
  static async handleFailure(req: Request, identifier: string, reason: string) {
    const ip = this.getClientIp(req);

    // A. Increment User Failures
    const failKey = `auth:fail:user:${identifier}`;
    const failures = await redisClient.incr(failKey);
    if (failures === 1) await redisClient.expire(failKey, CONFIG.LOCK_DURATION);

    // B. Increment IP Failures (Bot detection)
    const ipFailKey = `auth:fail:ip:${ip}`;
    const ipFailures = await redisClient.incr(ipFailKey);
    if (ipFailures === 1) await redisClient.expire(ipFailKey, 3600); // 1 Hour

    // C. LOCK ACCOUNT?
    if (failures >= CONFIG.MAX_LOGIN_ATTEMPTS) {
      // 1. Lock in Redis (Fast Rejection)
      await redisClient.setex(
        `auth:lock:user:${identifier}`,
        CONFIG.LOCK_DURATION,
        "LOCKED",
      );

      // 2. Lock in DB (Permanent record)
      await GeclUser.updateOne(
        { $or: [{ email: identifier }, { mobile: identifier }] },
        {
          $set: {
            // status: "suspended",
            suspendedReason: "Too many failed login attempts (Auto-Lock)",
          },
        },
      );

      // 3. Log Critical Alert
      await this.log({
        req,
        identifier,
        event: "BLOCK_ACTION",
        status: "BLOCKED",
        reason: "ACCOUNT_LOCKED",
        riskScore: 100,
      });
      return;
    }

    // D. BAN IP?
    if (ipFailures >= CONFIG.BAN_THRESHOLD) {
      await redisClient.setex(`auth:ban:ip:${ip}`, 3600, "BANNED");
    }

    // E. Log the failure
    await this.log({
      req,
      identifier,
      event: "LOGIN_ATTEMPT",
      status: "FAILED",
      reason,
      riskScore: 30 + failures * 10,
    });
  }

  /* ========================================================================
     4. SUCCESS HANDLER (Run when Login Succeeds)
     Resets counters and analyzes risk.
  ======================================================================== */
  static async handleSuccess(req: Request, user: any, method: string) {
    // Reset Failure Counters
    if (user.email) await redisClient.del(`auth:fail:user:${user.email}`);
    if (user.mobile) await redisClient.del(`auth:fail:user:${user.mobile}`);

    // Risk Engine
    const deviceHash = this.generateDeviceHash(req);
    let riskScore = 0;

    // Check previous login
    const previousLogin = await GeclAuthLog.findOne({
      userId: user._id,
      status: "SUCCESS",
    }).sort({ occurredAt: -1 });

    if (previousLogin) {
      if (previousLogin.deviceHash !== deviceHash) riskScore += 40; // New Device
      if (previousLogin.ipAddress !== this.getClientIp(req)) riskScore += 20; // New IP
    } else {
      riskScore += 10; // First login
    }

    const isSuspicious = riskScore >= CONFIG.HIGH_RISK_SCORE;

    // Log Success
    await this.log({
      req,
      identifier: user.email || user.mobile,
      userId: user._id,
      event: "LOGIN_ATTEMPT",
      status: "SUCCESS",
      method,
      riskScore,
      isSuspicious,
    });
  }

  /* ========================================================================
     5. LOGGING ENGINE (Private)
  ======================================================================== */
  static async log(params: {
    req: Request;
    identifier?: string;
    userId?: any;
    event:
      | "LOGIN_ATTEMPT"
      | "OTP_REQUEST"
      | "RESEND_OTP"
      | "OTP_VERIFY"
      | "BLOCK_ACTION";
    status: "SUCCESS" | "FAILED" | "BLOCKED" | "WARNING";
    method?: string;
    reason?: string;
    riskScore?: number;
    isSuspicious?: boolean;
  }) {
    try {
      const {
        req,
        identifier,
        userId,
        event,
        status,
        method,
        reason,
        riskScore,
        isSuspicious,
      } = params;
      const ua = new UAParser(req.headers["user-agent"] || "");
      const deviceData = ua.getResult();

      await GeclAuthLog.create({
        userId: userId || null,
        email: identifier && identifier.includes("@") ? identifier : null,
        mobile: identifier && !identifier.includes("@") ? identifier : null,
        event,
        status,
        failureReason: reason || null,
        loginMethod: method || "UNKNOWN",
        ipAddress: this.getClientIp(req),
        userAgent: req.headers["user-agent"] || "unknown",
        deviceHash: this.generateDeviceHash(req),
        device: {
          type: deviceData.device.type || "desktop",
          os: deviceData.os.name,
          browser: deviceData.browser.name,
        },
        riskScore: riskScore || 0,
        isSuspicious: isSuspicious || false,
        occurredAt: new Date(),
      });
    } catch (e) {
      console.error("CRITICAL: Auth Logging Failed", e);
    }
  }

  /* ========================================================================
     6. HELPERS
  ======================================================================== */

  static async setOtpCooldown(identifier: string) {
    await redisClient.setex(
      `auth:otp:cooldown:${identifier}`,
      CONFIG.OTP_COOLDOWN,
      "1",
    );
  }

  private static generateDeviceHash(req: Request): string {
    const raw = `${this.getClientIp(req)}-${req.headers["user-agent"]}-${req.headers["accept-language"]}`;
    return crypto.createHash("md5").update(raw).digest("hex");
  }

  // Robust & Type-Safe IP Extraction
  private static getClientIp(req: Request): string {
    const forwarded = req.headers["x-forwarded-for"];

    // Case 1: String (Standard)
    if (typeof forwarded === "string") {
      const parts = forwarded.split(",");
      if (parts.length > 0 && parts[0]) {
        return parts[0].trim();
      }
    }

    // Case 2: Array (Express edge case)
    if (Array.isArray(forwarded)) {
      if (forwarded.length > 0 && forwarded[0]) {
        return forwarded[0].trim();
      }
    }

    // Case 3: Socket Fallback
    if (req.socket && req.socket.remoteAddress) {
      return req.socket.remoteAddress;
    }

    // Case 4: Absolute Fallback
    return "0.0.0.0";
  }
}
