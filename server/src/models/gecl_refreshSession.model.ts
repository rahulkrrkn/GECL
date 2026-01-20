import type { Connection, Model, InferSchemaType } from "mongoose";
import { GeclRefreshSessionSchema } from "../schemas/gecl_refreshSession.schema.js";

// ================================
//  TYPES
// ================================
export type GeclRefreshSessionDoc = InferSchemaType<
  typeof GeclRefreshSessionSchema
>;

// ================================
//  MODEL FACTORY
// ================================
export function gecl_RefreshSessionMode(
  conn: Connection,
): Model<GeclRefreshSessionDoc> {
  return (
    conn.models.AuthRefreshSession ||
    conn.model<GeclRefreshSessionDoc>(
      "gecl_refresh_session",
      GeclRefreshSessionSchema,
    )
  );
}

// ================================
//  CONNECTION HELPERS
// ================================
import { getDbConn, DB_KEYS } from "../lib/database/index.js";

export async function getGeclRefreshSessionFindConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_RefreshSessionMode(conn);
}

export async function getGeclRefreshSessionFUIConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_RefreshSessionMode(conn);
}
