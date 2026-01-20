import { Router } from "express";

import auth from "./auth.route.js";
// import gecl from "../gecl/app.js";

const router = Router();

router.use("/auth", auth);
// router.use("/gecl", gecl);

export default router;
