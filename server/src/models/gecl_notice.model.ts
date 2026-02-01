import { Schema, model, models, Types } from "mongoose";

// --- Sub-Schema ---
const AttachmentSchema = new Schema(
  {
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true }, // pdf, jpg, png
    fileSize: { type: Number, required: true }, // bytes
  },
  { _id: false },
);

// --- Main Schema ---
export const NoticeSchema = new Schema(
  {
    source: {
      type: String,
      required: true,
      enum: ["GECL", "BEU"],
      index: true,
    },

    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    content: { type: String, required: true },

    category: {
      type: String,
      required: true,
      enum: [
        "ACADEMIC",
        "EXAM",
        "ADMISSION",
        "SCHOLARSHIP",
        "PLACEMENT",
        "HOLIDAY",
        "TENDER",
        "EVENT",
        "GENERAL",
        "URGENT",
      ],
      index: true,
    },

    department: {
      type: String,
      required: true,
      // ⚠️ Check: Ensure these match your User model branch enums
      // (e.g. "CSE-AI" vs "CSE_AI") to avoid filtering issues.
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

    audience: {
      type: [String],
      required: true,
      default: ["PUBLIC"],
      enum: ["PUBLIC", "STUDENTS", "FACULTY", "STAFF"],
      index: true,
    },

    attachments: { type: [AttachmentSchema], default: [] },

    isPinned: { type: Boolean, default: false, index: true },

    status: {
      type: String,
      required: true,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED", "DELETED", "PENDING"],
      default: "DRAFT",
      index: true,
    },

    publishAt: { type: Date, default: Date.now, index: true },
    expireAt: { type: Date, default: null, index: true },

    addedBy: {
      type: Types.ObjectId,
      ref: "gecl_user", // ✅ Changed from "User" to match your User model name
      required: true,
      index: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "gecl_user", // ✅ Changed from "User"
      default: null,
      index: true,
    },

    viewsCount: { type: Number, default: 0 },
    downloadsCount: { type: Number, default: 0 },
  },
  {
    collection: "gecl_notices",
    timestamps: true,
    versionKey: false,
  },
);

// --- Create and Export Model ---

// Prevent model recompilation (Hot Reload / Serverless Fix)
const Notice = models.gecl_notice || model("gecl_notice", NoticeSchema);

export default Notice;
