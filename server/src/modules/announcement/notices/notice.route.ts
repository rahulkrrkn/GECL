import { Router } from "express";
import { validateRequest } from "../../../middlewares/validateRequest.mid.js";
import {
  checkUser,
  requirePermission,
} from "../../../middlewares/permissionSystem.mdl.js";
import { PERMISSIONS } from "../../../config/pagePermissionData.config.js";
import {
  createUploadMiddleware,
  MIME_GROUPS,
} from "../../../middlewares/upload.mid.js";

import { NoticesController } from "./notice.controller.js";
import { NoticeValidation } from "./notice.validation.js";

const notices = Router();

/* =====================================================
   UPLOAD CONFIG (NOTICE)
===================================================== */

const uploadNoticeMedia = createUploadMiddleware({
  baseFolder: "GECL",
  minTotalFiles: 0,
  maxTotalFiles: 6,
  fields: [
    {
      name: "coverImage",
      max: 1,
      mimeTypes: MIME_GROUPS.images,
      sizeInKb: 5120,
      folder: "notices/cover",
    },
    {
      name: "attachments",
      max: 5,
      mimeTypes: [...MIME_GROUPS.images, ...MIME_GROUPS.documents],
      sizeInKb: 10240,
      folder: "notices/attachments",
    },
  ],
});

/* =====================================================
   READ ROUTES (PUBLIC + AUTH)
===================================================== */

/**
 * @route   GET /api/notices
 * @desc    Get all notices (paginated)
 */
notices.get(
  "/",
  checkUser,
  validateRequest({ query: NoticeValidation.getAllNoticesSchema }),
  NoticesController.getAll,
);

/**
 * @route   GET /api/notices/:slug
 * @desc    Get notice by slug
 */
notices.get(
  "/:slug",
  checkUser,
  validateRequest({ params: NoticeValidation.getBySlug }),
  NoticesController.getBySlug,
);

/* =====================================================
   WRITE ROUTES (PROTECTED)
===================================================== */

/**
 * POST /api/announcements/notices
 */
notices.post(
  "/",
  requirePermission(PERMISSIONS.NOTICE.CREATE),
  uploadNoticeMedia,
  validateRequest({ body: NoticeValidation.create }),
  NoticesController.create,
);

/**
 * PATCH /api/announcements/notices/:slug
 */
// notices.patch(
//   "/:slug",
//   requirePermission(PERMISSIONS.NOTICE.UPDATE),
//   uploadNoticeMedia,
//   validateRequest({
//     params: NoticeValidation.getBySlug,
//     body: NoticeValidation.update,
//   }),
//   NoticesController.update,
// );

/**
 * DELETE /api/announcements/notices/:slug
 * (Soft delete)
 */
// notices.delete(
//   "/:slug",
//   requirePermission(PERMISSIONS.NOTICE.DELETE),
//   validateRequest({ params: NoticeValidation.getBySlug }),
//   NoticesController.softDelete,
// );

export default notices;
