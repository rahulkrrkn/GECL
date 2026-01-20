// initMongo.ts;

import { buildMongoUrl } from "../lib/database/mongoUrlBuilder.lib.js";
import { initDbConn } from "../lib/database/initDbConn.lib.js";
import { DB_CONN_KEYS } from "../lib/database/dbConnectionKeys.js";

export async function initMongoAuth() {
  const authFReadUri = buildMongoUrl({
    user: process.env.MONGO_AUTH_ALL_F!,
    pass: process.env.MONGO_AUTH_ALL_F_PASS!,
    db: "gecl_db",
    appName: "auth-read-service",
  });

  const authFuiWriteUri = buildMongoUrl({
    user: process.env.MONGO_ADMIN!,
    pass: process.env.MONGO_ADMIN_PASS!,
    db: "gecl_db",
    appName: "auth-write-service",
  });

  await Promise.all([
    // initDbConn(DB_CONN_KEYS.AUTH_ALL_F, authFReadUri),
    initDbConn(DB_CONN_KEYS.GECL_ALL_FUI, authFuiWriteUri),
  ]);
}
