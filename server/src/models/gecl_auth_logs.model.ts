import mongoose, { Schema, model, Types, Document } from "mongoose";

// ===========================
// 1. TypeScript Interfaces
// ===========================

// Device Info Interface
interface IDeviceInfo {
  type?: "mobile" | "desktop" | "tablet" | "unknown" | null;
  os?: string | null;
  browser?: string | null;
}

// Location Interface
interface ILocationInfo {
  country?: string | null;
  region?: string | null;
  city?: string | null;
}

// Main Auth Log Interface
export interface IGeclAuthLog extends Document {
  userId?: Types.ObjectId | null;
  email?: string | null; // Capture email even if user doesn't exist (for logs)
  mobile?: string | null; // Capture mobile if used

  // Expanded Events to cover full security lifecycle
  event:
    | "LOGIN_ATTEMPT"
    | "OTP_REQUEST"
    | "RESEND_OTP"
    | "OTP_VERIFY"
    | "LOGOUT"
    | "BLOCK_ACTION";

  status: "SUCCESS" | "FAILED" | "BLOCKED" | "WARNING";

  // Detailed Failure Reasons for Security Analysis
  failureReason?:
    | "WRONG_PASSWORD"
    | "INVALID_OTP"
    | "USER_NOT_FOUND"
    | "ACCOUNT_LOCKED"
    | "IP_BLACKLISTED"
    | "VELOCITY_LIMIT_EXCEEDED" // Too many requests
    | "SUSPICIOUS_DEVICE"
    | "INVALID_TOKEN"
    | "NO_LINKED_ACCOUNT"
    | null;

  loginMethod: "PASSWORD" | "OTP" | "GOOGLE" | "GITHUB" | "SSO" | "UNKNOWN";

  // Network & Device Fingerprinting
  ipAddress: string;
  forwardedIp?: string | null;
  userAgent?: string | null;

  // NEW: specific hash to track devices across different accounts/IPs
  deviceHash?: string | null;

  device?: IDeviceInfo;
  location?: ILocationInfo;

  // Risk Engine Data
  isSuspicious: boolean;
  riskScore: number; // 0 - 100

  // NEW: Store extra attack data (e.g. payload size, specific headers)
  meta?: any;

  occurredAt: Date;
}

// ===========================
// 2. Schema Definition
// ===========================

const GeclAuthLogSchema = new Schema<IGeclAuthLog>(
  {
    // ===========================
    // USER INFO
    // ===========================
    userId: {
      type: Types.ObjectId,
      ref: "gecl_user", // Ensure this matches your User model name exactly
      default: null,
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
      index: true,
    },

    mobile: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },

    // ===========================
    // EVENT INFO
    // ===========================
    event: {
      type: String,
      enum: [
        "LOGIN_ATTEMPT",
        "OTP_REQUEST",
        "RESEND_OTP",
        "OTP_VERIFY",
        "LOGOUT",
        "BLOCK_ACTION",
      ],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "BLOCKED", "WARNING"],
      required: true,
      index: true,
    },

    failureReason: {
      type: String,
      enum: [
        "WRONG_PASSWORD",
        "INVALID_OTP",
        "USER_NOT_FOUND",
        "ACCOUNT_LOCKED",
        "IP_BLACKLISTED",
        "VELOCITY_LIMIT_EXCEEDED",
        "SUSPICIOUS_DEVICE",
        "INVALID_TOKEN",
        "NO_LINKED_ACCOUNT",
        null,
      ],
      default: null,
    },

    loginMethod: {
      type: String,
      enum: ["PASSWORD", "OTP", "GOOGLE", "GITHUB", "SSO", "UNKNOWN"],
      default: "UNKNOWN",
      index: true,
    },

    // ===========================
    // NETWORK & FINGERPRINT
    // ===========================
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },

    forwardedIp: { type: String, default: null },

    userAgent: { type: String, default: "unknown" },

    // Vital for tracking bots that rotate IPs but keep same headers/config
    deviceHash: {
      type: String,
      index: true,
      default: null,
    },

    device: {
      type: {
        type: String,
        enum: ["mobile", "desktop", "tablet", "unknown"],
        default: "unknown",
      },
      os: { type: String, default: "unknown" },
      browser: { type: String, default: "unknown" },
    },

    location: {
      country: { type: String, default: null },
      region: { type: String, default: null },
      city: { type: String, default: null },
    },

    // ===========================
    // RISK ENGINE
    // ===========================
    isSuspicious: {
      type: Boolean,
      default: false,
      index: true,
    },

    riskScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      index: true,
    },

    meta: {
      type: Schema.Types.Mixed, // Flexible field for attack payloads/debug info
      default: {},
    },

    // ===========================
    // TIME & RETENTION
    // ===========================
    occurredAt: {
      type: Date,
      default: Date.now,
      index: true,
      expires: "180d", // Automatically delete logs after 6 months
    },
  },
  {
    collection: "gecl_auth_logs",
    versionKey: false,
    timestamps: false, // We use occurredAt instead
  },
);

// ===========================
// 3. Model Export
// ===========================

const GeclAuthLog =
  mongoose.models.gecl_auth_logs ||
  model<IGeclAuthLog>("gecl_auth_logs", GeclAuthLogSchema);

export default GeclAuthLog;
