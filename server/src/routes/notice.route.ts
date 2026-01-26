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
} from "../controllers/notice/notice.ctrl.js";

// -- Validations --
import { noticeSchemas } from "../validations/notice.validation.js";
import { requirePermission } from "../middlewares/permissionSystem.mdl.js";
import { PERMISSIONS } from "../config/pagePermissionData.config.js";

const notices = Router();

/* ===========================================
   UPLOAD CONFIGURATION
=========================================== */
const uploadAttachments = createUploadMiddleware({
  minTotalFiles: 0,
  maxTotalFiles: 5,
  baseFolder: "GECL",
  fields: [
    {
      name: "attachments", // Must match Frontend FormData key
      min: 0,
      max: 5,
      mimeTypes: [...MIME_GROUPS.images, "application/pdf"],
      sizeInKb: 10240, // 10MB limit
      folder: "notices",
    },
  ],
});

/* ===========================================
   PUBLIC ROUTES (View Access)
=========================================== */

/* ===========================================
   PROTECTED ROUTES (Staff / Admin Only)
=========================================== */
notices.post(
  "/",
  requirePermission(PERMISSIONS.NOTICE.CREATE),
  uploadAttachments,
  // validateBody(noticeSchemas.create),
  createNotice,
);

export default notices;
