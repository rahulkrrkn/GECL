import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.mid.js";
import {
  createUploadMiddleware,
  MIME_GROUPS,
} from "../../middlewares/upload.mid.js";

// -- Validations --
import { NoticesValidation } from "./notice.validation.js";

// -- Permissions --
import {
  checkUser,
  requirePermission,
} from "../../middlewares/permissionSystem.mdl.js";
import { PERMISSIONS } from "../../config/pagePermissionData.config.js";

// -- Controllers --
import { NoticesController } from "./notice.controller.js";

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
      name: "attachments",
      min: 1,
      max: 5,
      mimeTypes: [...MIME_GROUPS.images, ...MIME_GROUPS.documents],
      sizeInKb: 10240, // 10MB
      folder: "notices",
    },
  ],
});

/* ===========================================
   PUBLIC ROUTES (READ)
=========================================== */

/**
 * @route   GET /api/notices
 * @desc    Get all notices (paginated)
 */
notices.get(
  "/",
  checkUser,
  validateRequest({ query: NoticesValidation.getAllNoticesSchema }),
  NoticesController.getAll,
);

/**
 * @route   GET /api/notices/:slug
 * @desc    Get notice by slug
 */
notices.get(
  "/:slug",
  checkUser,
  validateRequest({ params: NoticesValidation.getBySlug }),
  NoticesController.getBySlug,
);

/* ===========================================
   PROTECTED ROUTES (WRITE)
=========================================== */

/**
 * @route   POST /api/notices
 * @desc    Create notice
 */
notices.post(
  "/",
  requirePermission(PERMISSIONS.NOTICE.CREATE),
  uploadAttachments,
  validateRequest({ body: NoticesValidation.create }),
  NoticesController.create,
);

/**
 * @route   PATCH /api/notices/:slug
 * @desc    Update notice
 */
notices.patch(
  "/:slug",
  requirePermission(PERMISSIONS.NOTICE.UPDATE),
  validateRequest({
    params: NoticesValidation.getBySlug,
    body: NoticesValidation.update,
  }),
  NoticesController.update,
);

/**
 * @route   PATCH /api/notices/:slug/status
 * @desc    Change notice status (publish / archive)
 */
notices.patch(
  "/:slug/status",
  requirePermission(PERMISSIONS.NOTICE.UPDATE_STATUS),
  validateRequest({ params: NoticesValidation.getBySlug }),
  NoticesController.changeStatus,
);

/**
 * @route   DELETE /api/notices/:slug
 * @desc    Soft delete notice
 */
notices.delete(
  "/:slug",
  requirePermission(PERMISSIONS.NOTICE.DELETE),
  validateRequest({ params: NoticesValidation.getBySlug }),
  NoticesController.softDelete,
);

export default notices;
