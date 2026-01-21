import type { Connection, Model, InferSchemaType } from "mongoose";
import { GeclUserSchema } from "../schemas/gecl_user.schems.js";

// ================================
//  TYPES
// ================================
export type GeclUserDoc = InferSchemaType<typeof GeclUserSchema>;

// ================================
//  MODEL FACTORY
// ================================
export function gecl_UserModel(conn: Connection): Model<GeclUserDoc> {
  return (
    conn.models.GeclUser || conn.model<GeclUserDoc>("gecl_user", GeclUserSchema)
  );
}

// ================================
//  CONNECTION HELPERS
// ================================
import { getDbConn, DB_KEYS } from "../lib/database/index.js";

export async function getGeclUserFindConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_UserModel(conn);
}

export async function getGeclUserFUIConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_UserModel(conn);
}
