import mongoose, { Schema, Types, Document } from "mongoose";

/* ===========================
   1. TypeScript Interfaces
=========================== */

// Attachment Sub-Interface
export interface IAttachment {
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number; // bytes
}

// Main Notice Interface
export interface INotice extends Document {
  source: "GECL" | "BEU";

  title: string;
  slug: string;
  content: string;

  category:
    | "ACADEMIC"
    | "EXAM"
    | "ADMISSION"
    | "SCHOLARSHIP"
    | "PLACEMENT"
    | "HOLIDAY"
    | "TENDER"
    | "EVENT"
    | "GENERAL"
    | "URGENT";

  department:
    | "ALL"
    | "CSE_AI"
    | "CSE_DS"
    | "CIVIL"
    | "EE"
    | "ME"
    | "SCIENCE_HUMANITIES";

  audience: ("PUBLIC" | "STUDENTS" | "FACULTY" | "STAFF")[];

  attachments: IAttachment[];

  isPinned: boolean;

  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "DELETED" | "PENDING";

  publishAt: Date;
  expireAt?: Date | null;

  addedBy: Types.ObjectId;
  updatedBy?: Types.ObjectId | null;

  viewsCount: number;
  downloadsCount: number;

  createdAt: Date;
  updatedAt: Date;
}

/* ===========================
   2. Sub-Schemas
=========================== */

const AttachmentSchema = new Schema<IAttachment>(
  {
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
  },
  { _id: false },
);

/* ===========================
   3. Main Schema
=========================== */

export const NoticeSchema = new Schema<INotice>(
  {
    source: {
      type: String,
      required: true,
      enum: ["GECL", "BEU"],
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
    },

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

    attachments: {
      type: [AttachmentSchema],
      default: [],
    },

    isPinned: {
      type: Boolean,
      default: false,
      index: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED", "DELETED", "PENDING"],
      default: "DRAFT",
      index: true,
    },

    publishAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    expireAt: {
      type: Date,
      default: null,
      index: true,
    },

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

    viewsCount: {
      type: Number,
      default: 0,
    },

    downloadsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "gecl_notices",
    timestamps: true,
    versionKey: false,
  },
);

/* ===========================
   4. mongoose.model Export (Safe)
=========================== */

const Notice =
  mongoose.models.gecl_notice ||
  mongoose.model<INotice>("gecl_notice", NoticeSchema);

export default Notice;
