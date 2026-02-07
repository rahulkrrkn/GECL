// email.worker.ts
import "dotenv/config";
import { Worker } from "bullmq";
import { getRedis } from "../../../config/redis.config.js";
import { EMAIL_JOBS } from "./email.jobs.js";

import {
  handleLoginOtpEmail,
  handleLoginSuccessEmail,
  handleRegisterOtpEmail,
  handleResendOtpEmail,
  handleWelcomeEmail,
} from "../handlers/auth.handlers.js";

/* -------------------------------------------------------------------------- */
/*                               WORKER INSTANCE                               */
/* -------------------------------------------------------------------------- */

const worker = new Worker(
  "email-queue",
  async (job) => {
    switch (job.name) {
      case EMAIL_JOBS.LOGIN_OTP:
        console.log("job.Data", job.data);

        return handleLoginOtpEmail(job.data);

      case EMAIL_JOBS.REGISTER_OTP:
        console.log("job.Data", job.data);
        return handleRegisterOtpEmail(job.data);

      case EMAIL_JOBS.RESEND_OTP:
        console.log("job.Data", job.data);
        return handleResendOtpEmail(job.data);

      case EMAIL_JOBS.WELCOME:
        console.log("job.Data", job.data);
        return handleWelcomeEmail(job.data);

      case EMAIL_JOBS.LOGIN_SUCCESS:
        console.log("job.Data", job.data);
        return handleLoginSuccessEmail(job.data);

      default:
        throw new Error(`Unhandled email job: ${job.name}`);
    }
  },
  {
    connection: getRedis(),
    concurrency: 5, // 🔥 recommended
  },
);

/* -------------------------------------------------------------------------- */
/*                                 EVENTS                                      */
/* -------------------------------------------------------------------------- */

worker.on("ready", () => {
  console.log("📧 Email worker is ready");
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed`, err);
});

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});
