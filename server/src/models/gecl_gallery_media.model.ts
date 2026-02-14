import mongoose, { Schema, Types, Document } from "mongoose";

/* ================= ENUMS ================= */

export enum GalleryMediaStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ARCHIVED = "ARCHIVED",
}

export enum GalleryVisibility {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
}

/* ================= INTERFACE ================= */

export interface IGeclGalleryMedia extends Document {
  announcementId: Types.ObjectId;
  category: string; // derived from announcement.galleryCategory

  fileUrl: string;

  capturedAt?: Date;

  status: GalleryMediaStatus;
  visibility: GalleryVisibility;

  rejectionReason?: string;

  uploadedBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  lastModeratedAt?: Date;

  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

/* ================= SCHEMA ================= */

const GalleryMediaSchema = new Schema<IGeclGalleryMedia>(
  {
    announcementId: {
      type: Types.ObjectId,
      ref: "gecl_announcement",
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      immutable: true,
      index: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },

    capturedAt: {
      type: Date,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(GalleryMediaStatus),
      default: GalleryMediaStatus.PENDING,
      index: true,
    },

    visibility: {
      type: String,
      enum: Object.values(GalleryVisibility),
      default: GalleryVisibility.PUBLIC,
      index: true,
    },

    rejectionReason: String,

    uploadedBy: {
      type: Types.ObjectId,
      ref: "gecl_user",
      required: true,
      index: true,
    },

    approvedBy: {
      type: Types.ObjectId,
      ref: "gecl_user",
    },

    approvedAt: Date,
    lastModeratedAt: Date,

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: Date,

    deletedBy: {
      type: Types.ObjectId,
      ref: "gecl_user",
    },
  },
  {
    collection: "gecl_gallery_media",
    timestamps: true,
    versionKey: false,
  },
);

/* ================= INDEXES ================= */

GalleryMediaSchema.index({ announcementId: 1, status: 1 });
GalleryMediaSchema.index({ category: 1, status: 1 });
GalleryMediaSchema.index({ capturedAt: 1 });

/* ================= HOOKS ================= */

GalleryMediaSchema.pre("save", function () {
  if (this.isModified("status")) {
    this.lastModeratedAt = new Date();

    if (this.status === GalleryMediaStatus.APPROVED) {
      this.approvedAt = new Date();
    }
  }
});

/* ================= EXPORT ================= */

export const gecl_gallery_media = mongoose.model<IGeclGalleryMedia>(
  "gecl_gallery_media",
  GalleryMediaSchema,
);
export default gecl_gallery_media;
