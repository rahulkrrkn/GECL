// email.dispatcher.ts

import type { JobsOptions } from "bullmq";
import { emailQueue } from "./queue/email.queue.js";
import { EMAIL_JOBS } from "./queue/email.jobs.js";

/* -------------------------------------------------------------------------- */
/*                           DEFAULT JOB OPTIONS                                */
/* -------------------------------------------------------------------------- */

const emailJobOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 5000,
  },
  removeOnComplete: true,
  removeOnFail: false,
};

/* -------------------------------------------------------------------------- */
/*                                DISPATCHER                                    */
/* -------------------------------------------------------------------------- */

export const Email = {
  sendLoginOtp(to: string, otp: string) {
    return emailQueue.add(EMAIL_JOBS.LOGIN_OTP, { to, otp }, emailJobOptions);
  },

  sendRegisterOtp(to: string, otp: string) {
    return emailQueue.add(
      EMAIL_JOBS.REGISTER_OTP,
      { to, otp },
      emailJobOptions,
    );
  },

  resendOtp(
    to: string,
    otp: string,
    reason: "Login" | "Registration" | "Password Reset",
  ) {
    return emailQueue.add(
      EMAIL_JOBS.RESEND_OTP,
      { to, otp, reason },
      emailJobOptions,
    );
  },

  sendWelcome(to: string, fullName?: string) {
    return emailQueue.add(
      EMAIL_JOBS.WELCOME,
      { to, ...(fullName ? { fullName } : {}) },
      emailJobOptions,
    );
  },
};
