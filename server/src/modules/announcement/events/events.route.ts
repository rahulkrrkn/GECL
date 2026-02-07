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

import { EventController } from "./events.controller.js";
import { EventValidation } from "./events.validation.js";

const eventsRouter = Router();

/* ================= UPLOAD CONFIG ================= */
const uploadEventMedia = createUploadMiddleware({
  baseFolder: "GECL",
  minTotalFiles: 1, // Cover image mandatory? Usually yes for events
  maxTotalFiles: 6,
  fields: [
    {
      name: "coverImage",
      min: 1,
      max: 1,
      mimeTypes: MIME_GROUPS.images,
      sizeInKb: 5120, // 5MB
      folder: "events/covers",
    },
    {
      name: "attachments",
      max: 5,
      mimeTypes: [...MIME_GROUPS.images, ...MIME_GROUPS.documents],
      sizeInKb: 10240, // 10MB
      folder: "events/attachments",
    },
  ],
});

/* ================= READ ROUTES ================= */
eventsRouter.get(
  "/",
  checkUser,
  validateRequest({ query: EventValidation.getAll }),
  EventController.getAll,
);

eventsRouter.get(
  "/:slug",
  checkUser,
  validateRequest({ params: EventValidation.getBySlug }),
  EventController.getBySlug,
);

/* ================= WRITE ROUTES ================= */
eventsRouter.post(
  "/",
  requirePermission(PERMISSIONS.EVENT.CREATE), // Ensure you have this permission constant
  uploadEventMedia,
  validateRequest({ body: EventValidation.create }),
  EventController.create,
);

export default eventsRouter;
