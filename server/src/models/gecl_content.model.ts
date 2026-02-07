import mongoose, { Schema, Types, Document } from "mongoose";

/* =========================
   ENUMS
========================= */

export enum ContentSubType {
  NOTICE = "NOTICE",
  NEWS = "NEWS",
  EVENT = "EVENT",
}

export enum ContentStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum AudienceType {
  PUBLIC = "PUBLIC",
  STUDENTS = "STUDENTS",
  FACULTY = "FACULTY",
  STAFF = "STAFF",
}

export enum NoticeSource {
  GECL = "GECL",
  BEU = "BEU",
}

/* =========================
   INTERFACE
========================= */

export interface IContent extends Document {
  subType: ContentSubType;

  title: string;
  slug: string;
  summary?: string;
  content: string;

  categories: string[];

  branches: string[];
  audience: AudienceType[];

  attachments: {
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }[];

  meta?: {
    event?: {
      startDate: Date;
      endDate?: Date;
      venue?: string;
      isOnline?: boolean;
      registrationLink?: string;
    };
  };

  /* NOTICE ONLY */
  source?: NoticeSource;
  isPrivate?: boolean;

  status: ContentStatus;
  priority: number;

  publishAt: Date;
  expireAt?: Date | null;

  isPinned: boolean;
  isLocked: boolean;
  isDeleted: boolean;

  addedBy: Types.ObjectId;
  updatedBy?: Types.ObjectId | null;
  approvedBy?: Types.ObjectId | null;
  approvedAt?: Date | null;

  viewsCount: number;
  downloadsCount: number;
}

/* =========================
   SCHEMA
========================= */

const ContentSchema = new Schema<IContent>(
  {
    subType: {
      type: String,
      enum: Object.values(ContentSubType),
      required: true,
      index: true,
    },

    title: { type: String, required: true, trim: true },
    summary: String,
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },

    categories: {
      type: [String],
      required: true,
      index: true,
    },

    branches: {
      type: [String],
      default: ["ALL"],
      index: true,
    },

    audience: {
      type: [String],
      enum: Object.values(AudienceType),
      required: true,
      index: true,
    },

    attachments: {
      type: [
        {
          fileUrl: String,
          fileName: String,
          fileType: String,
          fileSize: Number,
        },
      ],
      default: [],
    },

    meta: {
      event: {
        startDate: Date,
        endDate: Date,
        venue: String,
        isOnline: Boolean,
        registrationLink: String,
      },
    },

    /* NOTICE ONLY */
    source: {
      type: String,
      enum: Object.values(NoticeSource),
      default: null,
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: Object.values(ContentStatus),
      default: ContentStatus.DRAFT,
      index: true,
    },

    priority: {
      type: Number,
      default: 0,
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

    isPinned: { type: Boolean, default: false, index: true },
    isLocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false, index: true },

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
    },

    approvedBy: {
      type: Types.ObjectId,
      ref: "gecl_user",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    viewsCount: { type: Number, default: 0 },
    downloadsCount: { type: Number, default: 0 },
  },
  {
    collection: "gecl_contents",
    timestamps: true,
    versionKey: false,
  },
);

/* =========================
   HARD VALIDATION (SYNC)
========================= */

ContentSchema.pre("validate", function () {
  // Branch rule
  if (this.branches.includes("ALL") && this.branches.length > 1) {
    throw new Error("Branch 'ALL' cannot be combined with other branches");
  }

  // Audience rule
  if (!this.audience || this.audience.length === 0) {
    throw new Error("Audience must be specified");
  }

  // Event rules
  if (this.subType === ContentSubType.EVENT && !this.meta?.event) {
    throw new Error("EVENT must contain event metadata");
  }

  if (this.subType !== ContentSubType.EVENT && this.meta?.event) {
    throw new Error("Only EVENT can contain event metadata");
  }

  // Notice-only rules
  if (this.subType === ContentSubType.NOTICE) {
    if (!this.source) {
      throw new Error("NOTICE must have source");
    }
  } else {
    if (this.source || this.isPrivate) {
      throw new Error("source / isPrivate allowed only for NOTICE");
    }
  }

  // Lock protection
  if (this.isLocked && this.isModified("content")) {
    throw new Error("Published content is locked");
  }
});

/* =========================
   INDEXES
========================= */

ContentSchema.index({ title: "text", content: "text" });
ContentSchema.index({ subType: 1, status: 1, publishAt: -1 });
ContentSchema.index({ priority: -1, isPinned: -1 });
ContentSchema.index({ "meta.event.startDate": 1 });

/* =========================
   MODEL
========================= */

const Content =
  mongoose.models.gecl_content ||
  mongoose.model<IContent>("gecl_content", ContentSchema);

export default Content;
