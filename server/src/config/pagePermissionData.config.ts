/* -------------------------------------------------------------------------- */
/*                                PERMISSIONS                                  */
/* -------------------------------------------------------------------------- */

export const PERMISSIONS = {
  /* ---------------------------- NOTICE ---------------------------- */
  NOTICE: {
    READ: "notice:read",
    CREATE: "notice:create",
    UPDATE: "notice:update",
    DELETE: "notice:delete",
    UPDATE_STATUS: "notice:update_status",
  },

  /* ---------------------------- FACULTY --------------------------- */
  FACULTY: {
    READ: "faculty:read",
    READ_SELF: "faculty:read_self",

    CREATE: "faculty:create",
    UPDATE: "faculty:update",
    UPDATE_SELF: "faculty:update_self",
    DELETE: "faculty:delete",

    UPDATE_STATUS: "faculty:update_status",

    ASSIGN_SUBJECT: "faculty:assign_subject",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                      */
/* -------------------------------------------------------------------------- */

export type PermissionKey =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS][keyof (typeof PERMISSIONS)[keyof typeof PERMISSIONS]];

/* -------------------------------------------------------------------------- */
/*                                 ROLES                                       */
/* -------------------------------------------------------------------------- */

export const ROLE_PERMISSIONS: Record<string, readonly PermissionKey[]> = {
  /* ---------------------------- STUDENT --------------------------- */
  student: [PERMISSIONS.NOTICE.READ],

  /* ---------------------------- TEACHER --------------------------- */
  teacher: [PERMISSIONS.NOTICE.READ],

  /* ------------------------------ HOD ----------------------------- */
  hod: [
    /* Notice */
    PERMISSIONS.NOTICE.READ,
    PERMISSIONS.NOTICE.CREATE,
    PERMISSIONS.NOTICE.UPDATE,
    PERMISSIONS.NOTICE.DELETE,

    /* Faculty */
    PERMISSIONS.FACULTY.READ,
    PERMISSIONS.FACULTY.UPDATE,
    PERMISSIONS.FACULTY.UPDATE_STATUS,
  ],

  /* ----------------------------- ADMIN ---------------------------- */
  admin: [
    /* Notice */
    PERMISSIONS.NOTICE.READ,
    PERMISSIONS.NOTICE.CREATE,
    PERMISSIONS.NOTICE.UPDATE,
    PERMISSIONS.NOTICE.DELETE,
    PERMISSIONS.NOTICE.UPDATE_STATUS,

    /* Faculty */
    PERMISSIONS.FACULTY.READ,
    PERMISSIONS.FACULTY.CREATE,
    PERMISSIONS.FACULTY.UPDATE,
    PERMISSIONS.FACULTY.DELETE,
    PERMISSIONS.FACULTY.UPDATE_STATUS,
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*                                  ROLE TYPE                                  */
/* -------------------------------------------------------------------------- */

export type Role = keyof typeof ROLE_PERMISSIONS;
