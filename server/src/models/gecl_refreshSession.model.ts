import { Schema, Types, model, models } from "mongoose";

export const GeclRefreshSessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "gecl_user", // ✅ Matches your User model name
      required: true,
      index: true,
    },

    // we store HASH of refresh token (not plain token)
    refreshTokenHash: { type: String, required: true, index: true },

    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: true }, // TTL index candidate

    // ==============================
    // ✅ FIRST LOGIN INFO (store once)
    // ==============================
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

    // ==============================
    // metadata (preserve old info)
    // ==============================
    ip: { type: String, default: null },
    userAgent: { type: String, default: null },
    device: { type: String, default: null },

    location: {
      country: { type: String, default: null },
      state: { type: String, default: null },
      city: { type: String, default: null },
    },

    // ==============================
    // rotation support
    // ==============================
    rotatedFrom: {
      type: Types.ObjectId,
      ref: "gecl_refresh_session", // ✅ Matches the model name below
      default: null,
    },

    // session control
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

// --- Create and Export Model ---

// 1. Check if model already exists (prevents OverwriteModelError in Next.js)
// 2. If not, create it using the name "gecl_refresh_session"
const GeclRefreshSession =
  models.gecl_refresh_session ||
  model("gecl_refresh_session", GeclRefreshSessionSchema);

export default GeclRefreshSession;
