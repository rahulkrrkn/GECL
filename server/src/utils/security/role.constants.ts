// src/security/role.constants.ts

export const HIGH_LEVEL_ROLES = [
  "admin",
  "super-admin",
  "super_admin",
  "principal",
  "vice_principal",
  "vice-principal",
  "hod",
] as const;

export type HighLevelRole = (typeof HIGH_LEVEL_ROLES)[number];
