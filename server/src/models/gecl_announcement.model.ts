import mongoose, { Schema, Types, Document } from "mongoose";
import { softDeletePlugin } from "./core/softDelete.plugin.js";

/* ================= ENUMS ================= */

export enum AnnouncementType {
  NOTICE = "NOTICE",
  NEWS = "NEWS",
  EVENT = "EVENT",
  GALLERY = "GALLERY",
}

export enum AnnouncementCategory {
  /* COMMON */
  ACADEMIC = "ACADEMIC",
  GENERAL = "GENERAL",

  /* EVENT */
  CULTURAL = "CULTURAL",
  SPORTS = "SPORTS",
  TECHNICAL = "TECHNICAL",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  WORKSHOP = "WORKSHOP",
  SEMINAR = "SEMINAR",

  /* NOTICE */
  EXAM = "EXAM",
  ADMIN = "ADMIN",
  HOLIDAY = "HOLIDAY",
  SCHOLARSHIP = "SCHOLARSHIP",
  ADMISSION = "ADMISSION",
  PLACEMENT = "PLACEMENT",

  /* NEWS */
  EVENT = "EVENT",
  STUDENT = "STUDENT",
  FACULTY = "FACULTY",
  COLLEGE = "COLLEGE",
  ACHIEVEMENT = "ACHIEVEMENT",
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

  galleryEnabled?: boolean;
  galleryCategory?: string; // required when galleryEnabled is true

  categories: AnnouncementCategory[];
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
  attachments?: IAttachment[];

  status: AnnouncementStatus;
  publishAt: Date;
  expireAt?: Date | null;

  isPinned: boolean;

  isDeleted: boolean;
  deletedAt?: Date | null;
  deletedBy?: Types.ObjectId;

  addedBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
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

    /* ---------- Gallery ---------- */

    galleryEnabled: { type: Boolean, default: false, index: true },

    galleryCategory: {
      type: String,
      index: true,
    },

    /* ---------- Category ---------- */

    categories: {
      type: [String],
      enum: Object.values(AnnouncementCategory),
      default: [AnnouncementCategory.GENERAL],
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
      enum: Object.values(AudienceGroup),
      default: [AudienceGroup.PUBLIC],
      index: true,
    },

    /* ---------- Event ---------- */

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

    /* ---------- Media ---------- */

    coverImage: {
      type: {
        url: { type: String, required: true },
        name: { type: String, required: true },
        mimeType: String,
        size: Number,
      },
      default: null,
    },

    attachments: {
      type: [
        {
          url: String,
          name: String,
          mimeType: String,
          size: Number,
        },
      ],
      default: [],
    },

    /* ---------- Publish ---------- */

    status: {
      type: String,
      enum: Object.values(AnnouncementStatus),
      default: AnnouncementStatus.DRAFT,
      index: true,
    },

    publishAt: { type: Date, default: Date.now, index: true },
    expireAt: { type: Date, default: null },

    isPinned: { type: Boolean, default: false, index: true },

    /* ---------- Soft Delete ---------- */

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

/* ================= PLUGINS ================= */

AnnouncementSchema.plugin(softDeletePlugin);

/* ================= VALIDATIONS ================= */

AnnouncementSchema.pre("validate", function () {
  /* EVENT VALIDATION */
  if (this.type === AnnouncementType.EVENT) {
    if (!this.event?.mode || !this.event?.startDate) {
      throw new Error("Event must have mode and startDate");
    }

    if (this.event.mode === EventMode.ONLINE && !this.event.meetingLink) {
      throw new Error("Online event requires meetingLink");
    }

    if (this.event.mode === EventMode.OFFLINE && !this.event.venue) {
      throw new Error("Offline event requires venue");
    }
  }

  /* GALLERY VALIDATION (STRICT TS SAFE) */
  if (this.galleryEnabled && !this.galleryCategory) {
    throw new Error("galleryCategory is required when galleryEnabled is true");
  }
});

/* ================= INDEXES ================= */

AnnouncementSchema.index({ status: 1, publishAt: -1 });
AnnouncementSchema.index({ audience: 1, status: 1 });
AnnouncementSchema.index({ isPinned: -1, publishAt: -1 });

AnnouncementSchema.index(
  { galleryCategory: 1 },
  { unique: true, partialFilterExpression: { galleryEnabled: true } },
);

/* ================= EXPORT ================= */

export default mongoose.model<IAnnouncement>(
  "gecl_announcement",
  AnnouncementSchema,
);
