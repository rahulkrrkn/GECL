import { z } from "zod";

export class LoginValidation {
  /* ===========================
     LOGIN USING PASSWORD
  =========================== */
  static loginUsingPassword = z
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
          message: "Please enter a valid email address or mobile number",
        });
      }
    });

  /* ===========================
     SEND EMAIL OTP
  =========================== */
  static loginSendEmailOtp = z
    .object({
      email: z
        .string()
        .min(1, "Email address is required")
        .email("Please enter a valid email address"),
    })
    .strict();

  /* ===========================
     VERIFY EMAIL OTP
  =========================== */
  static loginVerifyEmailOtp = z
    .object({
      email: z
        .string()
        .min(1, "Email address is required")
        .email("Please enter a valid email address"),

      otp: z
        .string()
        .min(1, "OTP is required")
        .regex(/^[0-9]{6}$/, "OTP must be a 6-digit number"),
    })
    .strict();

  /* ===========================
     GOOGLE LOGIN
  =========================== */
  static loginUsingGoogle = z
    .object({
      token: z.string().min(1, "Google login token is required"),
    })
    .strict();
}
