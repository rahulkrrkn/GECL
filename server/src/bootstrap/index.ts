import { loadEnv } from "./initEnv.js";
// import { initRedis } from "./redis.init.js";
import { initMongoAuth } from "./initMongo.js";

loadEnv();

export async function initServer() {
  // Dependent modules
  // await initRedis();
  await initMongoAuth();
}
