import mongoose, { Schema, Types, model, Document } from "mongoose";

// ===========================
// 1. Define TypeScript Interface
// ===========================

export interface IGeclRefreshSession extends Document {
  userId: Types.ObjectId;
  refreshTokenHash: string;

  createdAt: Date;
  expiresAt: Date;

  loginMethod:
    | "email-password"
    | "mobile-password"
    | "email-otp"
    | "refresh-token"
    | "google"
    | "google-sub"
    | "google-email";

  loginAt: Date;

  // Metadata
  ip?: string | null;
  userAgent?: string | null;
  device?: string | null;
  location?: {
    country?: string | null;
    state?: string | null;
    city?: string | null;
  } | null;

  // Token Rotation
  rotatedFrom?: Types.ObjectId | null;

  // Session Control
  isRevoked: boolean;
  revokedAt?: Date | null;
  revokeReason?: string | null;

  lastUsedAt?: Date | null;
}

// ===========================
// 2. Schema Definition
// ===========================

export const GeclRefreshSessionSchema = new Schema<IGeclRefreshSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "gecl_user", // ✅ matches user model name
      required: true,
      index: true,
    },

    // store HASH of refresh token (never store plain token)
    refreshTokenHash: {
      type: String,
      required: true,
      index: true,
    },

    createdAt: { type: Date, default: Date.now },
    expiresAt: {
      type: Date,
      required: true,
      index: true, // TTL index candidate
    },

    /* ==============================
       FIRST LOGIN INFO
    ============================== */
    loginMethod: {
      type: String,
      enum: [
        "email-password",
        "mobile-password",
        "email-otp",
        "refresh-token",
        "google",
        "google-sub",
        "google-email",
      ],
      required: true,
      index: true,
    },

    loginAt: { type: Date, default: Date.now },

    /* ==============================
       METADATA
    ============================== */
    ip: { type: String, default: null },
    userAgent: { type: String, default: null },
    device: { type: String, default: null },

    location: {
      country: { type: String, default: null },
      state: { type: String, default: null },
      city: { type: String, default: null },
    },

    /* ==============================
       TOKEN ROTATION
    ============================== */
    rotatedFrom: {
      type: Schema.Types.ObjectId,
      ref: "gecl_refresh_session",
      default: null,
    },

    /* ==============================
       SESSION CONTROL
    ============================== */
    isRevoked: { type: Boolean, default: false, index: true },
    revokedAt: { type: Date, default: null },
    revokeReason: { type: String, default: null },

    lastUsedAt: { type: Date, default: null },
  },
  {
    collection: "gecl_refresh_session",
    timestamps: false,
    versionKey: false,
  },
);

// ===========================
// 3. Model Export with Interface
// ===========================

// ✅ ESM-safe model reuse (prevents OverwriteModelError)
const GeclRefreshSession =
  mongoose.models.gecl_refresh_session ||
  model<IGeclRefreshSession>("gecl_refresh_session", GeclRefreshSessionSchema);

export default GeclRefreshSession;
