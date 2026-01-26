import { Schema } from "mongoose";

const AttachmentSchema = new Schema(
  {
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true }, // pdf, jpg, png
    fileSize: { type: Number, required: true }, // bytes
  },
  { _id: false },
);

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

    viewsCount: { type: Number, default: 0 },
    downloadsCount: { type: Number, default: 0 },
  },
  { collection: "gecl_notices", timestamps: true, versionKey: false },
);

// optional but best indexes
NoticeSchema.index({ title: "text", content: "text" });
NoticeSchema.index({ source: 1, status: 1, publishAt: -1 });
NoticeSchema.index({ isPinned: -1, publishAt: -1 });
