import { Router } from "express";

import notice from "./notices/notice.route.js";
import news from "./news/news.route.js";
import events from "./events/events.route.js";
// import new2 from "./new.route.js";

const router = Router();

// router.use("/auth", auth);
router.use("/notices", notice);
router.use("/news", news);
router.use("/events", events);
// router.use("/gecl", gecl);

export default router;
