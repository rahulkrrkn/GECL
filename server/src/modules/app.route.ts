import { Router } from "express";

import auth from "./account/auth.routes.js";

import notice from "./notices/notice.route.js";
import faculty from "./academics/faculty/faculty.route.js";

const router = Router();

router.use("/auth", auth);
router.use("/notices", notice);
router.use("/academics/faculty", faculty);

export default router;
