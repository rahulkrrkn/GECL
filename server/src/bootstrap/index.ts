// import { loadEnv } from "./initEnv.js";
// await loadEnv();

import { getRedis } from "./../config/redis.config.js";
import connectDB from "../config/database.config.js";

export async function initServer() {
  await getRedis();
  await connectDB();
  // await sendLoginOtpEmail("rahulkrrkn@gmail.com", "123456");
  //   await initMongoAuth();
  // if (process.env.NODE_ENV !== "development") {
  //   startCronJob();
  // }
}
