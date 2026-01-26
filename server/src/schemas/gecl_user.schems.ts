import { Schema, Types } from "mongoose";
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
export const GeclUserSchema = new Schema(
  {
    // ===========================
    // COMMON PROFILE
    // ===========================
    fullName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    googleSub: { type: String, default: null, trim: true },

    mobile: { type: String, default: null, trim: true },

    pageAccess: {
      allow: { type: [String], default: [] },
      deny: { type: [String], default: [] },
      allowExtra: { type: [String], default: [] },
    },

    passwordHash: { type: String, required: true },

    profilePicUrl: {
      type: String,
      default: null,
    },

    // update
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
        index: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "active", "rejected", "blocked", "unverified"],
      default: "pending",
      index: true,
    },
    userName: {
      type: String,
      trim: true,
      default: null,
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
    // ===========================
    // STUDENT ONLY
    // ===========================
    student: {
      regNo: { type: String, default: null, trim: true },
      rollNo: { type: String, default: null, trim: true },

      branch: {
        type: String,
        enum: ["CSE", "ECE", "EE", "ME", "CE", "CSE-AI", "CSE-DS", "EEE", "AS"],
        default: null,
        index: true,
      },

      semester: { type: Number, min: 1, max: 8, default: null },
      admissionYear: { type: Number, default: null },
      passingYear: { type: Number, default: null },

      guardian: {
        fatherName: { type: String, default: null, trim: true },
        motherName: { type: String, default: null, trim: true },
        guardianMobile: { type: String, default: null, trim: true },
      },

      category: {
        type: String,
        enum: ["GEN", "OBC", "SC", "ST", "EWS"],
        default: null,
      },

      hostel: {
        isHosteller: { type: Boolean, default: false },
        hostelName: { type: String, default: null, trim: true },
        roomNo: { type: String, default: null, trim: true },
      },
    },

    // ===========================
    // TEACHER ONLY (simple profile view)
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
        enum: ["Professor", "Assistant Professor", "Guest"],
        default: null,
        index: true,
      },

      departments: {
        type: [String],
        enum: ["CSE", "ECE", "EE", "ME", "CE", "CSE-AI", "CSE-DS", "EEE", "AS"],
        default: [],
        index: true,
      },

      experienceYears: { type: Number, default: 0, min: 0 },

      specialization: { type: String, default: null, trim: true },

      skills: { type: [String], default: [] },

      officeAddress: {
        line1: { type: String, default: null, trim: true },
        line2: { type: String, default: null, trim: true },
        city: { type: String, default: null, trim: true },
        state: { type: String, default: null, trim: true },
        pincode: { type: String, default: null, trim: true },
        country: { type: String, default: "India", trim: true },
      },

      notes: { type: String, default: null, trim: true },

      education: [
        {
          degree: { type: String, default: null, trim: true },
          field: { type: String, default: null, trim: true },
          institute: { type: String, default: null, trim: true },
          yearOfPassing: { type: Number, default: null, min: 1900 },
        },
      ],
    },
    // =====================
    // ✅ optional
    // =====================

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
      index: true,
    },

    dob: { type: Date, default: null },

    address: {
      line1: { type: String, default: null, trim: true },
      line2: { type: String, default: null, trim: true },
      city: { type: String, default: null, trim: true },
      state: { type: String, default: null, trim: true },
      pincode: { type: String, default: null, trim: true },
      country: { type: String, default: "India", trim: true },
    },

    emergencyContact: {
      name: { type: String, default: null, trim: true },
      relation: { type: String, default: null, trim: true },
      mobile: { type: String, default: null, trim: true },
    },

    socialLinks: {
      linkedin: { type: String, default: null, trim: true },
      github: { type: String, default: null, trim: true },
      portfolio: { type: String, default: null, trim: true },
    },

    approvedBy: { type: Types.ObjectId, ref: "AuthUser", default: null },
    approvedAt: { type: Date, default: null },

    rejectedBy: { type: Types.ObjectId, ref: "AuthUser", default: null },
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
// UNIQUE INDEXES
// ===========================

// unique email
GeclUserSchema.index({ email: 1 }, { unique: true });

// student.regNo unique only when it exists
GeclUserSchema.index(
  { "student.regNo": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "student.regNo": { $type: "string", $ne: "" },
    },
  },
);

// teacher officialEmail unique only when it exists
GeclUserSchema.index(
  { "teacher.officialEmail": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "teacher.officialEmail": { $type: "string", $ne: "" },
    },
  },
);

// ===========================
// USEFUL INDEXES
// ===========================

GeclUserSchema.index({ role: 1, status: 1 });
GeclUserSchema.index({ status: 1 });

// student filters
GeclUserSchema.index({ "student.branch": 1, "student.semester": 1 });

// teacher filters
GeclUserSchema.index({ "teacher.departments": 1 });
GeclUserSchema.index({ "teacher.isHod": 1 });
GeclUserSchema.index({ "teacher.designation": 1 });
