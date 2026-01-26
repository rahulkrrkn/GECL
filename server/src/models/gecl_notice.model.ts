import type { Connection, Model, InferSchemaType } from "mongoose";
import { NoticeSchema } from "../schemas/gecl_notice.schema.js";

// ================================
//  TYPES
// ================================
export type GeclNoticeDoc = InferSchemaType<typeof NoticeSchema>;

// ================================
//  MODEL FACTORY
// ================================
export function gecl_NoticeModel(conn: Connection): Model<GeclNoticeDoc> {
  return (
    conn.models.GeclNotice ||
    conn.model<GeclNoticeDoc>("gecl_notice", NoticeSchema)
  );
}

// ================================
//  CONNECTION HELPERS
// ================================
import { getDbConn, DB_KEYS } from "../lib/database/index.js";

export async function getGeclNoticeFindConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_NoticeModel(conn);
}

export async function getGeclNoticeFUIConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_NoticeModel(conn);
}
