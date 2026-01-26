import { Schema } from "mongoose";

const FailedItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

export const NotificationSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "Notice",
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
  },
  { collection: "gecl_notifications", timestamps: true, versionKey: false },
);

// best indexes
NotificationSchema.index({ source: 1, status: 1, createdAt: -1 });
NotificationSchema.index({ scheduledAt: 1, status: 1 });
NotificationSchema.index({ noticeId: 1 });
