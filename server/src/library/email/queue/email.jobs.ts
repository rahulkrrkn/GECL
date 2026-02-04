// email.jobs.ts

export const EMAIL_JOBS = {
  LOGIN_OTP: "EMAIL:LOGIN_OTP",
  REGISTER_OTP: "EMAIL:REGISTER_OTP",
  RESEND_OTP: "EMAIL:RESEND_OTP",
  WELCOME: "EMAIL:WELCOME",
} as const;

export type EmailJobName = (typeof EMAIL_JOBS)[keyof typeof EMAIL_JOBS];
