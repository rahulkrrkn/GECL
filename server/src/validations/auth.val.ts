import { z } from "zod";

/* ================= SEND EMAIL OTP ================= */
export const emailSendOtp = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
  })
  .strict();

/* ================= VERIFY EMAIL OTP ================= */
export const emailVerifyOtp = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    otp: z
      .string()
      .min(1, "OTP is required")
      .regex(/^[0-9]{6}$/, "OTP must be a 6-digit number"),
  })
  .strict();

/* ================= LOGIN WITH PASSWORD ================= */
export const loginWithPassword = z
  .object({
    id: z.string().min(1, "Email or mobile number is required"),
    password: z.string().min(1, "Password is required"),
  })
  .strict()
  .superRefine((data, ctx) => {
    const value = data.id.trim();

    const isEmail = value.includes("@");
    const isMobile = /^\d{10,15}$/.test(value);

    if (!isEmail && !isMobile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["id"],
        message: "Enter a valid email or mobile number",
      });
    }
  });

/* ================= GOOGLE LOGIN ================= */
export const loginWithGoogleAccount = z
  .object({
    token: z.string().min(1, "Google token is required"),
  })
  .strict();

export const studentRegistrationSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),

  email: z.string().email("Invalid email"),

  mobile: z.string().min(10).max(15).optional().nullable(),

  password: z.string().min(8).max(32),

  regNo: z
    .string()
    .regex(/^[0-9]{11}$/, "Registration number must be exactly 11 digits"),

  REGISTRATION_KEY: z.string().min(10),
});

<<<<<<< HEAD
export const employeeRegistrationSchema = z.object({
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
    .array(z.enum(["CSE", "ECE", "EE", "ME", "CE", "CSE-AI", "CSE-DS", "EEE"]))
    .optional()
    .nullable(),

  REGISTRATION_KEY: z.string().min(10),
});

=======
>>>>>>> cfe4065365279e7fe3033906551ec22ec7f79b67
/* ================= EXPORT GROUP ================= */
export const login = {
  emailSendOtp,
  emailVerifyOtp,
  loginWithPassword,
  loginWithGoogleAccount,
  studentRegistrationSchema,
};
