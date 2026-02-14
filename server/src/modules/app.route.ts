import { Router } from "express";

import auth from "./account/auth.routes.js";

import gallery from "./gallery/gallery.route.js";
import announcement from "./announcement/announcement.route.js";

import faculty from "./academics/faculty/faculty.route.js";

const router = Router();

router.use("/auth", auth);
router.use("/gallery", gallery);
router.use("/announcements", announcement);
router.use("/academics/faculty", faculty);

export default router;
