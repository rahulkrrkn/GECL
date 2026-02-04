import mongoose, { Schema, model, Types } from "mongoose";

/* -------------------------------------------------------------------------- */
/*                         SUB-SCHEMA: FAILED ITEMS                            */
/* -------------------------------------------------------------------------- */

const FailedItemSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "gecl_user",
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

/* -------------------------------------------------------------------------- */
/*                             MAIN SCHEMA                                     */
/* -------------------------------------------------------------------------- */

const NotificationSchema = new Schema(
  {
    /* ===========================
       SOURCE
    =========================== */
    source: {
      type: String,
      required: true,
      enum: ["GECL", "BEU"],
      index: true,
    },

    /* ===========================
       OPTIONAL NOTICE LINK
    =========================== */
    noticeId: {
      type: Types.ObjectId,
      ref: "gecl_notice",
      default: null,
      index: true,
    },

    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    link: { type: String, default: null },

    /* ===========================
       CHANNELS
    =========================== */
    channels: {
      type: [String],
      required: true,
      enum: ["EMAIL", "WHATSAPP", "WEB_PUSH", "APP_PUSH", "VOICE_CALL"],
    },

    /* ===========================
       TARGETING
    =========================== */
    target: {
      department: {
        type: String,
        enum: [
          "ALL",

          // match GeclUser.branch exactly
          "CSE",
          "ECE",
          "EE",
          "ME",
          "CE",
          "CSE-AI",
          "CSE-DS",
          "EEE",
          "ASH",
        ],
        default: "ALL",
        index: true,
      },

      role: {
        type: String,
        enum: ["ALL", "student", "teacher", "staff"],
        default: "ALL",
        index: true,
      },
    },

    /* ===========================
       PRIORITY & STATUS
    =========================== */
    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
      default: "NORMAL",
      index: true,
    },

    status: {
      type: String,
      enum: ["QUEUED", "PROCESSING", "DONE", "FAILED"],
      default: "QUEUED",
      index: true,
    },

    scheduledAt: { type: Date, default: null, index: true },

    /* ===========================
       STATS
    =========================== */
    stats: {
      total: { type: Number, default: 0 },
      sent: { type: Number, default: 0 },
      failed: { type: Number, default: 0 },
      skipped: { type: Number, default: 0 },
    },

    /* ===========================
       FAILED LOGS (LIMIT SIZE!)
    =========================== */
    failed: {
      type: [FailedItemSchema],
      default: [],
    },

    /* ===========================
       AUDIT
    =========================== */
    addedBy: {
      type: Types.ObjectId,
      ref: "gecl_user",
      required: true,
      index: true,
    },

    updatedBy: {
      type: Types.ObjectId,
      ref: "gecl_user",
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

/* -------------------------------------------------------------------------- */
/*                           MODEL EXPORT (ESM SAFE)                           */
/* -------------------------------------------------------------------------- */

const Notification =
  mongoose.models.gecl_notification ||
  model("gecl_notification", NotificationSchema);

export default Notification;
