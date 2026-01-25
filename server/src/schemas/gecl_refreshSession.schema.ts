import { Schema, Types } from "mongoose";

export const GeclRefreshSessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "gecl_user", // ✅ your user model name
      required: true,
      index: true,
    },

    // we store HASH of refresh token (not plain token)
    refreshTokenHash: { type: String, required: true, index: true },

    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: true },

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
      ref: "gecl_refresh_session", // ✅ correct
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

// indexes
GeclRefreshSessionSchema.index({ userId: 1, isRevoked: 1 });
GeclRefreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
GeclRefreshSessionSchema.index({ userId: 1, loginMethod: 1 });
