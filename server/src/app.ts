import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./modules/app.route.js";
import { errorHandler } from "./middlewares/errorHandler.mdl.js";
import { normalizeUrl } from "./middlewares/normalizeUrl.middleware.js";
import { attachClientInfo } from "./middlewares/attachClientInfo.middleware.js";

const app: Application = express();

// =======================
// Middlewares
// =======================
// for ip
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  }),
);

app.set("trust proxy", true);
app.use(normalizeUrl);
app.use(attachClientInfo);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    strict: true,
    verify: (req: Request, res: Response, buf: Buffer) => {
      try {
        JSON.parse(buf.toString());
      } catch {
        throw new Error("Invalid JSON payload");
      }
    },
  }),
);
// import { sendTestEmail } from "./utils/testMail.js";
app.get("/test", async (req: Request, res: Response) => {
  console.log("req.context", req.context);
  const data = req.context;

  res.send(
    "TEST ip is :- " + data.ip + "<br> TEST userAgent is :- " + data.userAgent,
  );
});
// app.get("/test", async (req: Request, res: Response) => {
//   await sendTestEmail();
//   res.send("Email sent");
// });

// =======================
// Routes
// =======================
app.use(router);

// =======================
// Health Route
// =======================
app.get("/", (req: Request, res: Response) => {
  res.send("✅ API is running");
});

// =======================
// 404
// =======================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =======================
// Error Handler
// =======================
// app.use(errorHandler);
app.use(errorHandler);

export default app;
