import { Schema, model, Types, Document } from "mongoose";

export interface IGeclAttRecord extends Document {
  sessionId: Types.ObjectId;
  classId: Types.ObjectId;
  studentId: Types.ObjectId;
  status: "PRESENT" | "ABSENT";
}

const schema = new Schema<IGeclAttRecord>(
  {
    sessionId: {
      type: Types.ObjectId,
      ref: "gecl_att_sessions",
      required: true,
    },

    classId: {
      type: Types.ObjectId,
      ref: "gecl_att_classes",
      required: true,
    },

    studentId: {
      type: Types.ObjectId,
      ref: "gecl_user",
      required: true,
    },

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT"],
      required: true,
    },
  },
  {
    collection: "gecl_att_records",
    timestamps: true,
    versionKey: false,
  },
);

// ❌ no duplicate attendance
schema.index({ sessionId: 1, studentId: 1 }, { unique: true });

// ⚡ fast reports
schema.index({ classId: 1 });
schema.index({ studentId: 1 });
schema.index({ status: 1 });

export const GeclAttRecord = model<IGeclAttRecord>("GeclAttRecord", schema);
