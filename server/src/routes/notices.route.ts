import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.mid.js";
import {
  createUploadMiddleware,
  MIME_GROUPS,
} from "../middlewares/upload.mid.js";

// -- Controllers --
import {
  createNotice,
  //   getAllNotices,
  //   getLatestNotices,
  //   getNoticeBySlug,
  //   updateNotice,
  //   deleteNotice,
  //   getNoticeStats,
  //   getMyNotices,
} from "../controllers/notices/notice.ctrl.js";

// -- Validations --
import { noticeSchemas } from "../validations/notice.val.js";
import {
  checkUser,
  requirePermission,
} from "../middlewares/permissionSystem.mdl.js";
import { PERMISSIONS } from "../config/pagePermissionData.config.js";
import { getAllNotices } from "../controllers/notices/getNotice.ctrl.js";
import { getNoticeBySlug } from "../controllers/notices/getSingleNotice.ctrl.js";
import { validateRequest } from "../middlewares/validateRequest.mid.js";

const notices = Router();

/* ===========================================
   UPLOAD CONFIGURATION
=========================================== */
const uploadAttachments = createUploadMiddleware({
  minTotalFiles: 1,
  maxTotalFiles: 5,
  baseFolder: "GECL",
  fields: [
    {
      name: "attachments", // Must match Frontend FormData key
      min: 1,
      max: 5,
      mimeTypes: [...MIME_GROUPS.images, ...MIME_GROUPS.documents],
      sizeInKb: 10240, // 10MB limit
      folder: "notices",
    },
  ],
});

/* ===========================================
   PUBLIC ROUTES (View Access)
=========================================== */

/**
 * @route   GET /api/notices
 * @desc    Get all notices (Paginated + Search + Filter)
 */
notices.get(
  "/",
  checkUser,
  validateRequest({ query: noticeSchemas.getAllNoticesSchema }),
  getAllNotices,
);
notices.get(
  "/:slug",
  checkUser, // Optional auth (sets req.user if token exists, passes if not)
  // validateBody(noticeSchemas.getNoticeBySlugSchema), // Validates req.params.slug exists
  getNoticeBySlug,
);

/* ===========================================
   PROTECTED ROUTES (Staff / Admin Only)
=========================================== */
notices.post(
  "/create",
  requirePermission(PERMISSIONS.NOTICE.CREATE),
  uploadAttachments,
  validateBody(noticeSchemas.create),
  createNotice,
);

export default notices;
