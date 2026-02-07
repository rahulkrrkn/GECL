// src/security/access.helper.ts

import { HIGH_LEVEL_ROLES } from "./role.constants.js";

export function isHighLevelUser(roles: string[] = []) {
  return roles.some((r) => HIGH_LEVEL_ROLES.includes(r.toLowerCase() as any));
}
