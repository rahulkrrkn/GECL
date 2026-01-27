import { loadEnv } from "./initEnv.js";
// import { initRedis } from "./redis.init.js";
import { initMongoAuth } from "./initMongo.js";
loadEnv();
import startCronJob from "./cronJob.js";

export async function initServer() {
  // Dependent modules
  // await initRedis();
  await initMongoAuth();
  if (process.env.NODE_ENV !== "development") {
    startCronJob();
  }
}
