import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
  },
  { _id: false },
);

const contentSchema = new mongoose.Schema(
  {
    /* ───────────────── CORE ───────────────── */

    contentType: {
      type: String,
      enum: ["event", "news"],
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    summary: {
      type: String,
      maxLength: 300,
    },

    content: {
      type: String,
      required: true,
    },

    /* ───────────────── TARGETING ───────────────── */

    branches: {
      type: [String], // CSE, ECE, ME
      default: [],
    },

    years: {
      type: [Number], // 1–4
      default: [],
    },

    semesters: {
      type: [Number], // 1–8
      default: [],
    },

    /* ───────────────── MEDIA ───────────────── */

    coverImage: {
      type: String,
    },

    attachments: {
      type: [attachmentSchema],
      default: [],
    },

    /* ───────────────── NEWS FIELDS ───────────────── */

    category: {
      type: String,
      enum: ["announcement", "notice", "exam", "result", "general"],
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    /* ───────────────── EVENT FIELDS ───────────────── */

    eventType: {
      type: String,
      enum: ["seminar", "workshop", "fest", "sports", "other"],
    },

    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
    },

    venue: {
      type: String,
    },

    meetingLink: {
      type: String,
    },

    startDateTime: {
      type: Date,
    },

    endDateTime: {
      type: Date,
    },

    registrationRequired: {
      type: Boolean,
      default: false,
    },

    registrationDeadline: {
      type: Date,
    },

    maxParticipants: {
      type: Number,
    },

    /* ───────────────── WORKFLOW ───────────────── */

    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishAt: {
      type: Date,
    },

    /* ───────────────── META ───────────────── */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/* ───────────────── INDEXES ───────────────── */

contentSchema.index({ contentType: 1, isPublished: 1 });
contentSchema.index({ startDateTime: 1 });
contentSchema.index({ publishAt: 1 });

export const Content = mongoose.model("Content", contentSchema);
