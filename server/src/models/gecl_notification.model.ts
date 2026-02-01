import { Schema, model, models, Types } from "mongoose";

// --- Sub-Schema for Failed Logs ---
const FailedItemSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId, // Updated to Types.ObjectId
      ref: "gecl_user", // ✅ Changed "User" to "gecl_user" to match your User model
      required: true,
      index: true,
    },

    channel: {
      type: String,
      required: true,
      enum: ["EMAIL", "WHATSAPP", "WEB_PUSH", "APP_PUSH", "VOICE_CALL"],
    },

    error: { type: String, required: true },
  },
  { _id: false },
);

// --- Main Schema ---
const NotificationSchema = new Schema(
  {
    // GECL / BEU
    source: {
      type: String,
      required: true,
      enum: ["GECL", "BEU"],
      index: true,
    },

    // optional link with notice
    noticeId: {
      type: Types.ObjectId,
      ref: "gecl_notice", // ✅ Assumed you will have a "gecl_notice" model
      default: null,
      index: true,
    },

    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    link: { type: String, default: null }, // "/notices/slug"

    channels: {
      type: [String],
      required: true,
      enum: ["EMAIL", "WHATSAPP", "WEB_PUSH", "APP_PUSH", "VOICE_CALL"],
    },

    target: {
      department: {
        type: String,
        required: true,
        // ⚠️ NOTE: Ensure these match your User model branch enums exactly
        // (e.g., if User has "CSE-AI", this should probably be "CSE-AI" not "CSE_AI")
        enum: [
          "ALL",
          "CSE_AI",
          "CSE_DS",
          "CIVIL",
          "EE",
          "ME",
          "SCIENCE_HUMANITIES",
        ],
        default: "ALL",
        index: true,
      },

      role: {
        type: String,
        required: true,
        enum: ["ALL", "STUDENT", "FACULTY", "STAFF"],
        default: "ALL",
        index: true,
      },
    },

    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
      default: "NORMAL",
      index: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["QUEUED", "PROCESSING", "DONE", "FAILED"],
      default: "QUEUED",
      index: true,
    },

    scheduledAt: { type: Date, default: null, index: true },

    stats: {
      total: { type: Number, default: 0 },
      sent: { type: Number, default: 0 },
      failed: { type: Number, default: 0 },
      skipped: { type: Number, default: 0 },
    },

    // keep only failed logs for performance
    failed: { type: [FailedItemSchema], default: [] },

    addedBy: {
      type: Types.ObjectId,
      ref: "gecl_user", // ✅ Changed from "User" to "gecl_user"
      required: true,
      index: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "gecl_user", // ✅ Changed from "User" to "gecl_user"
      default: null,
      index: true,
    },
  },
  {
    collection: "gecl_notifications",
    timestamps: true,
    versionKey: false,
  },
);

// --- Create and Export Model ---

// Prevent model recompilation (Hot Reload / Serverless Fix)
const Notification =
  models.gecl_notification || model("gecl_notification", NotificationSchema);

export default Notification;
