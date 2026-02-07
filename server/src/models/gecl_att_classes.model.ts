import { Schema, model, Types, Document } from "mongoose";

export interface IGeclAttClass extends Document {
  branch: string;
  batch: string;
  semester: number;
  section: string;
  subject: { code: string; name: string };
  teachers: Types.ObjectId[];
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  createdBy: Types.ObjectId;
  endedAt?: Date | null;
  endedBy?: Types.ObjectId | null;
}

const schema = new Schema<IGeclAttClass>(
  {
    branch: String,
    batch: String,
    semester: Number,
    section: String,

    subject: {
      code: { type: String, required: true },
      name: { type: String, required: true },
    },

    teachers: [{ type: Types.ObjectId, ref: "gecl_user" }],

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ARCHIVED"],
      default: "ACTIVE",
      index: true,
    },

    createdBy: { type: Types.ObjectId, ref: "gecl_user" },
    endedAt: { type: Date, default: null },
    endedBy: { type: Types.ObjectId, ref: "gecl_user", default: null },
  },
  {
    collection: "gecl_att_classes",
    timestamps: true,
    versionKey: false,
  },
);

schema.index(
  { "subject.code": 1, branch: 1, semester: 1, section: 1 },
  { unique: true },
);
schema.index({ teachers: 1 });

export const GeclAttClass = model<IGeclAttClass>("GeclAttClass", schema);
