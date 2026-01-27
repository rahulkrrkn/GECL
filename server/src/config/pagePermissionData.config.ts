export const PERMISSIONS = {
  NOTICE: {
    READ: "notice:read",
    CREATE: "notice:create",
    UPDATE: "notice:update",
    DELETE: "notice:delete",
  },
} as const;

export const ROLE_PERMISSIONS = {
  student: [PERMISSIONS.NOTICE.READ],
  teacher: [PERMISSIONS.NOTICE.READ],
  hod: [
    PERMISSIONS.NOTICE.READ,
    PERMISSIONS.NOTICE.CREATE,
    PERMISSIONS.NOTICE.UPDATE,
    PERMISSIONS.NOTICE.DELETE,
  ],
} as const;
