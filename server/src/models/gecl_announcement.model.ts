import mongoose, { Schema, Types, Document } from "mongoose";
import { softDeletePlugin } from "./core/softDelete.plugin.js";

/* ================= ENUMS ================= */

export enum AnnouncementType {
  NOTICE = "NOTICE",
  NEWS = "NEWS",
  EVENT = "EVENT",
}

export enum AnnouncementStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum AudienceGroup {
  PUBLIC = "PUBLIC",
  STUDENTS = "STUDENTS",
  FACULTY = "FACULTY",
  STAFF = "STAFF",
  ALUMNI = "ALUMNI",
}

export enum NoticeSource {
  GECL = "GECL",
  BEU = "BEU",
}

export enum EventMode {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  HYBRID = "HYBRID",
}

/* ================= INTERFACES ================= */

export interface IAttachment {
  name: string;
  url: string;
  mimeType?: string;
  size?: number;
}

export interface ISeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface ICoverImage {
  url: string;
  name: string;
  mimeType?: string;
  size?: number;
}

export interface IAnnouncement extends Document {
  type: AnnouncementType;
  title: string;
  slug: string;
  summary?: string;
  content: string;

  categories: string[];
  branches: string[];

  audience: AudienceGroup[];

  event?: {
    mode: EventMode;
    startDate: Date;
    endDate?: Date;
    venue?: string;
    meetingLink?: string;
  };

  source?: NoticeSource;

  coverImage?: ICoverImage | null;

  attachments?: {
    name?: string;
    url?: string;
    mimeType?: string;
    size?: number;
  }[];

  seo?: ISeo;

  status: AnnouncementStatus;
  publishAt: Date;
  expireAt?: Date | null;

  isPinned: boolean;
  isDeleted: boolean;
  deletedAt?: Date | null;
  deletedBy?: Types.ObjectId;

  addedBy: Types.ObjectId;

  createdAt: Date;
}

/* ================= SCHEMA ================= */

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    type: {
      type: String,
      enum: Object.values(AnnouncementType),
      required: true,
      index: true,
    },

    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: String,
    content: { type: String, required: true },

    categories: { type: [String], required: true, index: true },
    branches: { type: [String], default: ["ALL"], index: true },

    audience: {
      type: [String],
      enum: Object.values(AudienceGroup),
      required: true,
      index: true,
    },

    event: {
      mode: { type: String, enum: Object.values(EventMode) },
      startDate: Date,
      endDate: Date,
      venue: String,
      meetingLink: String,
    },

    source: {
      type: String,
      enum: Object.values(NoticeSource),
      default: NoticeSource.GECL,
    },

    coverImage: {
      type: {
        url: { type: String, required: true },
        name: { type: String, required: true },
        mimeType: { type: String },
        size: { type: Number },
      },
      default: null,
    },

    attachments: {
      type: [
        {
          url: { type: String },
          name: { type: String },
          mimeType: { type: String },
          size: { type: Number },
        },
      ],
      default: [],
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    status: {
      type: String,
      enum: Object.values(AnnouncementStatus),
      default: AnnouncementStatus.DRAFT,
      index: true,
    },

    publishAt: { type: Date, default: Date.now, index: true },
    expireAt: { type: Date, default: null },

    isPinned: { type: Boolean, default: false, index: true },

    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: Types.ObjectId, ref: "gecl_user", default: null },

    addedBy: { type: Types.ObjectId, ref: "gecl_user", required: true },
  },
  {
    collection: "gecl_announcements",
    timestamps: true,
    versionKey: false,
  },
);

AnnouncementSchema.plugin(softDeletePlugin);

/* ================= HARD SECURITY ================= */

AnnouncementSchema.pre("validate", function () {
  if (!this.audience || this.audience.length === 0) {
    throw new Error("Audience is mandatory");
  }

  // PUBLIC must be exclusive
  if (
    this.audience.includes(AudienceGroup.PUBLIC) &&
    this.audience.length > 1
  ) {
    throw new Error("PUBLIC audience cannot be combined with other groups");
  }

  if (this.branches.includes("ALL") && this.branches.length > 1) {
    throw new Error("ALL branch cannot be combined");
  }
});

/* ================= INDEXES ================= */

AnnouncementSchema.index({ status: 1, publishAt: -1 });
AnnouncementSchema.index({ audience: 1, status: 1 });
AnnouncementSchema.index({ isPinned: -1, publishAt: -1 });

export default mongoose.model<IAnnouncement>(
  "gecl_announcement",
  AnnouncementSchema,
);
