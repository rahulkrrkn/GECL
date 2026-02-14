import mongoose, { Schema, Types, Document } from "mongoose";

/* =====================================================
   ENUMS
===================================================== */

export enum NotificationChannel {
  EMAIL = "EMAIL",
  WHATSAPP = "WHATSAPP",
  WEB_PUSH = "WEB_PUSH",
  APP_PUSH = "APP_PUSH",
  VOICE_CALL = "VOICE_CALL",
  SMS = "SMS",
}

export enum ChannelStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export enum NotificationStatus {
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
}

/* =====================================================
   INTERFACE
===================================================== */

export interface INotification extends Document {
  /* LINK TO CONTENT */
  announcementId: Types.ObjectId;

  /* TARGETING */
  branches: string[];
  audience: ("PUBLIC" | "STUDENTS" | "FACULTY" | "STAFF")[];

  /* CHANNEL DELIVERY */
  channels: {
    name: NotificationChannel;
    status: ChannelStatus;
    sentAt: Date | null;
    attempts: number;
    error: string | null;
  }[];

  /* WORKFLOW */
  status: NotificationStatus;
  scheduledAt?: Date | null;

  /* AUDIT */
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

/* =====================================================
   SCHEMA
===================================================== */

const NotificationSchema = new Schema<INotification>(
  {
    announcementId: {
      type: Types.ObjectId,
      ref: "gecl_announcement",
      required: true,
      index: true,
    },

    /* TARGETING */
    branches: {
      type: [String],
      default: ["ALL"],
      index: true,
    },

    audience: {
      type: [String],
      enum: ["PUBLIC", "STUDENTS", "FACULTY", "STAFF"],
      required: true,
      index: true,
    },

    /* CHANNEL STATUS */
    channels: {
      type: [
        {
          name: {
            type: String,
            enum: Object.values(NotificationChannel),
            required: true,
          },
          status: {
            type: String,
            enum: Object.values(ChannelStatus),
            default: ChannelStatus.PENDING,
            index: true,
          },
          sentAt: { type: Date, default: null },
          attempts: { type: Number, default: 0 },
          error: { type: String, default: null },
        },
      ],
      default: [],
    },

    /* WORKFLOW */
    status: {
      type: String,
      enum: Object.values(NotificationStatus),
      default: NotificationStatus.QUEUED,
      index: true,
    },

    scheduledAt: {
      type: Date,
      default: null,
      index: true,
    },

    /* AUDIT */
    createdBy: {
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
  },
  {
    collection: "gecl_notification",
    timestamps: true,
    versionKey: false,
  },
);

/* =====================================================
   HARD VALIDATION
===================================================== */

NotificationSchema.pre("validate", function () {
  if (this.branches.includes("ALL") && this.branches.length > 1) {
    throw new Error("ALL cannot be combined with other branches");
  }

  if (!this.audience || this.audience.length === 0) {
    throw new Error("Audience must be specified");
  }

  if (!this.channels || this.channels.length === 0) {
    throw new Error("At least one channel is required");
  }
});

/* =====================================================
   INDEXES
===================================================== */

NotificationSchema.index({ announcementId: 1, status: 1 });
NotificationSchema.index({ "channels.name": 1, "channels.status": 1 });

/* =====================================================
   MODEL EXPORT
===================================================== */

const Notification =
  mongoose.models.gecl_notification ||
  mongoose.model<INotification>("gecl_notification", NotificationSchema);

export default Notification;
