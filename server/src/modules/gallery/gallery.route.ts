import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.mid.js";
import {
  checkUser,
  requirePermission,
  verifyUser,
} from "../../middlewares/permissionSystem.mdl.js";
import { PERMISSIONS } from "../../config/pagePermissionData.config.js";
import {
  createUploadMiddleware,
  MIME_GROUPS,
} from "../../middlewares/upload.mid.js";

import { GalleryController } from "./gallery.controller.js";
import { GalleryValidation } from "./gallery.validation.js";

const gallery = Router();

const uploadGalleryMedia = createUploadMiddleware({
  minTotalFiles: 1,
  maxTotalFiles: 10,
  baseFolder: "GECL",
  fields: [
    {
      name: "images",
      min: 1,
      max: 10,
      mimeTypes: [...MIME_GROUPS.images],
      sizeInKb: 10240,
      folder: "gallery",
    },
  ],
});

/* =====================================================
   Get Gallery category
===================================================== */

gallery.get(
  "/categories",
  checkUser,
  verifyUser,
  GalleryController.getCategory,
);

/* =====================================================
   PUBLIC / READ
===================================================== */

// gallery.get(
//   "/",
//   checkUser,
//   validateRequest({ query: GalleryValidation.getGallery }),
//   GalleryController.getGallery,
// );

// gallery.get(
//   "/categories",
//   checkUser,
//   GalleryController.getCategories,
// );

/* =====================================================
   UPLOAD
===================================================== */

gallery.post(
  "/",
  checkUser,
  verifyUser,
  uploadGalleryMedia,
  validateRequest({ body: GalleryValidation.upload }),
  GalleryController.uploadGallery,
);

// /* =====================================================
//    MODERATION
// ===================================================== */

// gallery.get(
//   "/pending",
//   checkUser,
//   requirePermission(PERMISSIONS.GALLERY.APPROVE),
//   GalleryController.getPending,
// );

// gallery.post(
//   "/moderate",
//   checkUser,
//   requirePermission(PERMISSIONS.GALLERY.UPDATE_STATUS),
//   validateRequest({ body: GalleryValidation.moderate }),
//   GalleryController.approveReject,
// );

export default gallery;
