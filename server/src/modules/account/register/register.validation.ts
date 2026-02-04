import { z } from "zod";

export class RegisterValidation {
  // =========================
  // SEND OTP
  // =========================
  static sendOtp = z
    .object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    })
    .strict();

  // =========================
  // VERIFY OTP
  // =========================
  static verifyOtp = z
    .object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

      otp: z
        .string()
        .min(1, "OTP is required")
        .min(4, "OTP must be at least 4 digits")
        .max(8, "OTP must not exceed 8 digits"),
    })
    .strict();

  // =========================
  // REGISTER STUDENT
  // =========================
  static registerStudent = z
    .object({
      fullName: z
        .string()
        .min(1, "Full name is required")
        .min(3, "Full name must be at least 3 characters long"),

      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

      mobile: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .optional()
        .nullable(),

      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must not exceed 32 characters"),

      regNo: z
        .string()
        .min(1, "Registration number is required")
        .regex(/^\d{11}$/, "Registration number must be exactly 11 digits"),

      REGISTRATION_KEY: z
        .string()
        .min(1, "Registration key is required")
        .min(10, "Invalid registration key"),
    })
    .strict();

  static registerTeacher = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),

    email: z.string().email("Invalid email"), // personal email (login)

    mobile: z.string().min(10).max(15).optional().nullable(),

    password: z.string().min(8).max(32),

    role: z.enum(["teacher", "staff"]),

    officialEmail: z
      .string()
      .email("Invalid official email")
      .optional()
      .nullable(),

    joiningDate: z.string().optional().nullable(), // "YYYY-MM-DD"

    // ✅ designation like Assistant Professor / Lecturer etc.
    designation: z.enum(["Professor", "Assistant Professor", "Guest"]),

    specialization: z.string().optional().nullable(),

    // ✅ accepts "4" also (string -> number)
    experienceYears: z.coerce.number().min(0).optional().nullable(),

    branches: z
      .array(
        z.enum([
          "CSE",
          "ECE",
          "EE",
          "ME",
          "CE",
          "CSE-AI",
          "CSE-DS",
          "EEE",
          "ASH",
        ]),
      )
      .optional()
      .nullable(),

    REGISTRATION_KEY: z.string().min(10),
  });
}
