import { Router } from "express";

import auth from "./auth.route.js";

import notice from "./notices.route.js";
// import new2 from "./new.route.js";

const router = Router();

router.use("/auth", auth);
router.use("/notices", notice);
// router.use("/gecl", gecl);

export default router;
