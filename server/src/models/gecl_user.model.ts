import mongoose, { Schema, model, Types, Document } from "mongoose";

// ===========================
// 1. Define TypeScript Interfaces
// ===========================

// Sub-Interface for WebPush
interface IWebPush {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// Main User Interface
export interface IGeclUser extends Document {
  fullName: string;
  email: string;
  googleSub?: string | null;
  mobile?: string | null;

  // Access Control (Top level in your schema)
  allow: string[];
  deny: string[];
  allowExtra: string[];

  passwordHash: string;
  profilePicUrl?: string | null;

  role: (
    | "student"
    | "hod"
    | "teacher"
    | "vice_principal"
    | "principal"
    | "librarian"
    | "tpo"
    | "alumni"
    | "staff"
    | "admin"
  )[];

  status: "pending" | "active" | "rejected" | "blocked" | "deleted";
  userName?: string | null;
  personType: "student" | "employee";

  notification: {
    settings: {
      email: boolean;
      whatsapp: boolean;
      webPush: boolean;
      appPush: boolean;
      voiceCall: boolean;
    };
    tokens: {
      fcm: string[];
      webPush: IWebPush[];
    };
  };

  branch: (
    | "CSE"
    | "ECE"
    | "EE"
    | "ME"
    | "CE"
    | "CSE-AI"
    | "CSE-DS"
    | "EEE"
    | "ASH"
  )[];

  // Nested Objects
  student?: {
    regNo?: string | null;
    rollNo?: string | null;
    semester?: number | null;
    admissionYear?: number | null;
    passingYear?: number | null;
  } | null;

  teacher?: {
    isHod: boolean;
    joiningDate?: Date | null;
    officialEmail?: string | null;
    designation?:
      | "Professor"
      | "Assistant Professor"
      | "Guest"
      | "Lab Assistant"
      | "Staff"
      | null;
    experienceYears: number;
    specialization?: string | null;
  } | null;

  gender?: "male" | "female" | "other" | null;

  // Approval / Rejection
  approvedBy?: Types.ObjectId | null;
  approvedAt?: Date | null;
  rejectedBy?: Types.ObjectId | null;
  rejectedAt?: Date | null;
  rejectReason?: string | null;

  // Timestamps (Auto-added by mongoose)
  createdAt: Date;
  updatedAt: Date;
}

// ===========================
// 2. Schema Definitions
// ===========================

const WebPushSchema = new Schema(
  {
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
  { _id: false },
);

const GeclUserSchema = new Schema<IGeclUser>(
  {
    // ===========================
    // COMMON PROFILE
    // ===========================
    fullName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    googleSub: { type: String, default: null, trim: true },

    mobile: { type: String, default: null, trim: true },

    allow: { type: [String], default: [] },
    deny: { type: [String], default: [] },
    allowExtra: { type: [String], default: [] },

    passwordHash: { type: String, required: true, select: false },

    profilePicUrl: { type: String, default: null },

    role: [
      {
        type: String,
        enum: [
          "student",
          "hod",
          "teacher",
          "vice_principal",
          "principal",
          "librarian",
          "tpo",
          "alumni",
          "staff",
          "admin",
        ],
        required: true,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "active", "rejected", "blocked", "deleted"],
      default: "pending",
      index: true,
    },

    userName: {
      type: String,
      trim: true,
      default: null,
      unique: true,
      sparse: true,
    },

    personType: {
      type: String,
      enum: ["student", "employee"],
      required: true,
      index: true,
    },

    notification: {
      settings: {
        email: { type: Boolean, default: true },
        whatsapp: { type: Boolean, default: false },
        webPush: { type: Boolean, default: true },
        appPush: { type: Boolean, default: false },
        voiceCall: { type: Boolean, default: false },
      },
      tokens: {
        fcm: { type: [String], default: [] },
        webPush: { type: [WebPushSchema], default: [] },
      },
    },

    branch: {
      type: [String],
      enum: ["CSE", "ECE", "EE", "ME", "CE", "CSE-AI", "CSE-DS", "EEE", "ASH"],
      default: [],
      index: true,
    },

    // ===========================
    // STUDENT
    // ===========================
    student: {
      regNo: { type: String, default: null, trim: true, index: true },
      rollNo: { type: String, default: null, trim: true },
      semester: { type: Number, min: 1, max: 8, default: null },
      admissionYear: { type: Number, default: null },
      passingYear: { type: Number, default: null },
    },

    // ===========================
    // TEACHER
    // ===========================
    teacher: {
      isHod: { type: Boolean, default: false, index: true },
      joiningDate: { type: Date, default: null },
      officialEmail: {
        type: String,
        default: null,
        lowercase: true,
        trim: true,
      },
      designation: {
        type: String,
        enum: [
          "Professor",
          "Assistant Professor",
          "Guest",
          "Lab Assistant",
          "Staff",
        ],
        default: null,
        index: true,
      },
      experienceYears: { type: Number, default: 0, min: 0 },
      specialization: { type: String, default: null, trim: true },
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
      index: true,
    },

    approvedBy: { type: Types.ObjectId, ref: "gecl_user", default: null },
    approvedAt: { type: Date, default: null },

    rejectedBy: { type: Types.ObjectId, ref: "gecl_user", default: null },
    rejectedAt: { type: Date, default: null },
    rejectReason: { type: String, default: null },
  },
  {
    collection: "gecl_user",
    timestamps: true,
    versionKey: false,
  },
);

// ===========================
// 3. Model Export with Interface
// ===========================

// ✅ Pass IGeclUser to the model generic
const GeclUser =
  mongoose.models.gecl_user || model<IGeclUser>("gecl_user", GeclUserSchema);

export default GeclUser;
