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

  /* ---------------------------- NEW ---------------------------- */
  NEWS: {
    READ: "new:read",
    CREATE: "new:create",
    UPDATE: "new:update",
    DELETE: "new:delete",
    UPDATE_STATUS: "new:update_status",
  },

  /* ---------------------------- EVENT ---------------------------- */
  EVENT: {
    READ: "event:read",
    CREATE: "event:create",
    UPDATE: "event:update",
    DELETE: "event:delete",
    UPDATE_STATUS: "event:update_status",
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
  GALLERY: {
    READ: "gallery:read",
    CREATE: "gallery:create",
    UPDATE: "gallery:update",
    DELETE: "gallery:delete",
    UPDATE_STATUS: "gallery:update_status",
    APPROVE: "gallery:approve",
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

    /* New */
    PERMISSIONS.NEWS.READ,
    PERMISSIONS.NEWS.CREATE,
    PERMISSIONS.NEWS.UPDATE,
    PERMISSIONS.NEWS.DELETE,

    /* Event */
    PERMISSIONS.EVENT.READ,
    PERMISSIONS.EVENT.CREATE,
    PERMISSIONS.EVENT.UPDATE,
    PERMISSIONS.EVENT.DELETE,

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

    /* New */
    PERMISSIONS.NEWS.READ,
    PERMISSIONS.NEWS.CREATE,
    PERMISSIONS.NEWS.UPDATE,
    PERMISSIONS.NEWS.DELETE,

    /* Event */
    PERMISSIONS.EVENT.READ,
    PERMISSIONS.EVENT.CREATE,
    PERMISSIONS.EVENT.UPDATE,
    PERMISSIONS.EVENT.DELETE,
    PERMISSIONS.EVENT.UPDATE_STATUS,

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
