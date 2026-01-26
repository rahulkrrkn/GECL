import type { Connection, Model, InferSchemaType } from "mongoose";
import { NotificationSchema } from "../schemas/gecl_notification.schema.js";

// ================================
//  TYPES
// ================================
export type GeclNotificationDoc = InferSchemaType<typeof NotificationSchema>;

// ================================
//  MODEL FACTORY
// ================================
export function gecl_NotificationModel(
  conn: Connection,
): Model<GeclNotificationDoc> {
  return (
    conn.models.GeclNotification ||
    conn.model<GeclNotificationDoc>("gecl_notification", NotificationSchema)
  );
}

// ================================
//  CONNECTION HELPERS
// ================================
import { getDbConn, DB_KEYS } from "../lib/database/index.js";

export async function getGeclNotificationFindConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_NotificationModel(conn);
}

export async function getGeclNotificationFUIConn() {
  const conn = await getDbConn(DB_KEYS.GECL_ALL_FUI);
  return gecl_NotificationModel(conn);
}
