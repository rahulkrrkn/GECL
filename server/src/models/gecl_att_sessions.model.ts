import { Schema, model, Types, Document } from "mongoose";

interface ILog {
  action: string;
  by?: Types.ObjectId;
  reason?: string;
  ip?: string;
  at: Date;
}

export interface IGeclAttSession extends Document {
  classId: Types.ObjectId;
  date: Date;
  period: number;
  topicStudied?: string;
  attendance: {
    state: "OPEN" | "LOCKED" | "ARCHIVED";
    takenBy?: Types.ObjectId;
    takenAt?: Date;
    logs: ILog[];
  };
  createdBy: Types.ObjectId;
}

const LogSchema = new Schema<ILog>(
  {
    action: { type: String, required: true },
    by: { type: Types.ObjectId, ref: "gecl_user" },
    reason: String,
    ip: String,
    at: { type: Date, default: Date.now },
  },
  { _id: false },
);

const schema = new Schema<IGeclAttSession>(
  {
    classId: {
      type: Types.ObjectId,
      ref: "gecl_att_classes",
      required: true,
    },

    date: { type: Date, required: true },
    period: { type: Number, required: true },
    topicStudied: String,

    attendance: {
      state: {
        type: String,
        enum: ["OPEN", "LOCKED", "ARCHIVED"],
        default: "OPEN",
      },
      takenBy: { type: Types.ObjectId, ref: "gecl_user" },
      takenAt: Date,
      logs: [LogSchema],
    },

    createdBy: { type: Types.ObjectId, ref: "gecl_user" },
  },
  {
    collection: "gecl_att_sessions",
    timestamps: true,
    versionKey: false,
  },
);

// 🔒 normalize date (NO TS bug)
schema.pre("save", function () {
  this.date.setUTCHours(0, 0, 0, 0);
});

// 🔐 one lecture rule
schema.index({ classId: 1, date: 1, period: 1 }, { unique: true });

export const GeclAttSession = model<IGeclAttSession>("GeclAttSession", schema);
