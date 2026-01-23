import { Router } from "express";

import auth from "./auth.route.js";

import track from "./track.route.js";
// import new2 from "./new.route.js";

const router = Router();

router.use("/auth", auth);
router.use("/track", track);
// router.use("/track", new2);
// router.use("/gecl", gecl);

export default router;
