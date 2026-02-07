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

import { NewsController } from "./news.controller.js";
import { NewsValidation } from "./news.validation.js";

const newsRouter = Router();

/* =====================================================
   UPLOAD CONFIG (NEWS SPECIFIC)
===================================================== */

const uploadNewsMedia = createUploadMiddleware({
  baseFolder: "GECL",
  minTotalFiles: 1,
  maxTotalFiles: 6,
  fields: [
    {
      name: "coverImage",
      min: 1,
      max: 1, // Only 1 cover image allowed
      mimeTypes: MIME_GROUPS.images,
      sizeInKb: 5120, // 5MB Limit
      folder: "news/covers",
    },
    {
      name: "attachments",
      max: 2,
      mimeTypes: [...MIME_GROUPS.images, ...MIME_GROUPS.documents],
      sizeInKb: 10240, // 10MB Limit
      folder: "news/attachments",
    },
  ],
});

/* =====================================================
   PUBLIC / READ ROUTES
===================================================== */
// Note: We use checkUser here to determine if the viewer
// is a student/staff so we can show them internal news.

/**
 * @route   GET /api/news
 * @desc    Get all news (paginated, filtered by audience)
 */
newsRouter.get(
  "/",
  checkUser,
  validateRequest({ query: NewsValidation.getAll }),
  NewsController.getAll,
);

/**
 * @route   GET /api/news/:slug
 * @desc    Get single news details
 */
newsRouter.get(
  "/:slug",
  checkUser,
  validateRequest({ params: NewsValidation.getBySlug }),
  NewsController.getBySlug,
);

/* =====================================================
   PROTECTED / WRITE ROUTES
===================================================== */

/**
 * @route   POST /api/news
 * @desc    Create a news article with cover image and attachments
 */
newsRouter.post(
  "/",
  requirePermission(PERMISSIONS.NEWS.CREATE), // High-level permission check
  uploadNewsMedia,
  validateRequest({ body: NewsValidation.create }),
  NewsController.create,
);

export default newsRouter;
