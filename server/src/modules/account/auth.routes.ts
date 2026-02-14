import { Router } from "express";
import register from "./register/register.route.js";

import login from "./login/login.route.js";
import { geclLogout } from "./logout/logout.controller.js";
import { requireTrustedOrigin } from "../../middlewares/requireTrustedOrigin.middleware.js";

// import notice from "./notices.route.js";
// import new2 from "./new.route.js";

const router = Router();

// router.use("/auth", auth);
// router.use("/notices", notice);
// router.use("/gecl", gecl);

router.use("/register", register);
router.use("/login", login);
router.post("/logout", requireTrustedOrigin, geclLogout);

export default router;
router.use("/logout", geclLogout);
