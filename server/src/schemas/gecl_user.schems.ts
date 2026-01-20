import { Schema, Types } from "mongoose";

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

    mobile: { type: String, default: null, trim: true },

    pageAccess: {
      allow: { type: [String], default: [] },
      deny: { type: [String], default: [] },
      allowExtra: { type: [String], default: [] },
    },

    passwordHash: { type: String, required: true },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
      index: true,
    },

    dob: { type: Date, default: null },

    profilePhoto: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },

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

    role: {
      type: String,
      enum: [
        "student",
        "teacher",
        "hod",
        "vice_principal",
        "principal",
        "librarian",
        "accountant",
        "exam_controller",
        "staff",
        "admin",
      ],
      required: true,
      index: true,
    },

    personType: {
      type: String,
      enum: ["student", "employee"],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "active", "rejected", "blocked", "unverified"],
      default: "pending",
      index: true,
    },

    approvedBy: { type: Types.ObjectId, ref: "AuthUser", default: null },
    approvedAt: { type: Date, default: null },

    rejectedBy: { type: Types.ObjectId, ref: "AuthUser", default: null },
    rejectedAt: { type: Date, default: null },
    rejectReason: { type: String, default: null },

    // ===========================
    // MAIN UNIQUE ID
    // student => uniqueId = student.regNo
    // employee => uniqueId = employee.employeeId
    // ===========================
    uniqueId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    // ===========================
    // STUDENT ONLY
    // ===========================
    student: {
      regNo: { type: String, default: null, trim: true },
      rollNo: { type: String, default: null, trim: true },

      branch: {
        type: String,
        enum: ["CSE", "ECE", "EE", "ME", "CE", "CSE-AI", "CSE-DS", "EEE"],
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
    // EMPLOYEE ONLY
    // ===========================
    employee: {
      employeeId: { type: String, default: null, trim: true },
      department: { type: String, default: null, trim: true },
      designation: { type: String, default: null, trim: true },
      joiningDate: { type: Date, default: null },
      qualification: { type: String, default: null, trim: true },
      salary: { type: Number, default: null, min: 0 },
    },
  },
  {
    collection: "gecl_user",
    timestamps: true,
    versionKey: false,
  },
);

// ===========================
// AUTO SYNC uniqueId
// Also clears unused object
// ===========================
GeclUserSchema.pre("validate", function () {
  if (this.personType === "student") {
    const regNo = String(this.student?.regNo ?? "").trim();

    if (!regNo) {
      throw new Error("student.regNo is required for students");
    }

    this.uniqueId = regNo;

    // ✅ clear employee safely
    this.employee = null;
  }

  if (this.personType === "employee") {
    const employeeId = String(this.employee?.employeeId ?? "").trim();

    if (!employeeId) {
      throw new Error("employee.employeeId is required for employees");
    }

    this.uniqueId = employeeId;

    // ✅ clear student safely
    this.student = null;
  }
});

// ===========================
// UNIQUE INDEXES
// ===========================
GeclUserSchema.index({ email: 1 }, { unique: true });

// ✅ Best fix: partial indexes (ignore nulls)
// student.regNo unique only when it exists as a string
GeclUserSchema.index(
  { "student.regNo": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "student.regNo": { $type: "string", $ne: "" },
    },
  },
);

// employee.employeeId unique only when it exists as a string
GeclUserSchema.index(
  { "employee.employeeId": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "employee.employeeId": { $type: "string", $ne: "" },
    },
  },
);

// ===========================
// USEFUL INDEXES
// ===========================
GeclUserSchema.index({ role: 1, status: 1 });
GeclUserSchema.index({ personType: 1, status: 1 });
GeclUserSchema.index({ "student.branch": 1, "student.semester": 1 });
