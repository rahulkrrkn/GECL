// email.queue.ts

import { Queue } from "bullmq";
import { getRedis } from "../../../config/redis.config.js";

export const emailQueue = new Queue("email-queue", {
  connection: getRedis(),
});
