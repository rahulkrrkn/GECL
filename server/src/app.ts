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

app.disable("x-powered-by");

function getAllowedOrigins(): Set<string> {
  const originCandidates = [
    process.env.GECL_CLIENT_URL ?? "",
    process.env.CORS_ALLOWED_ORIGINS ?? "",
  ];

  const origins = new Set<string>();

  for (const candidate of originCandidates) {
    if (!candidate) continue;
    for (const raw of candidate.split(",")) {
      const origin = raw.trim();
      if (origin) origins.add(origin);
    }
  }

  return origins;
}

function isDevLocalOrigin(origin: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

// =======================
// Middlewares
// =======================
const allowedOrigins = getAllowedOrigins();
const isDev = process.env.NODE_ENV !== "production";

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (curl/server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) return callback(null, true);
      if (isDev && isDevLocalOrigin(origin)) return callback(null, true);

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.set("trust proxy", true);

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  if (process.env.NODE_ENV === "production") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }

  next();
});

// for ip
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
    message: `Route not found for ${req.method} ${req.url}`,
  });
});

// =======================
// Error Handler
// =======================
// app.use(errorHandler);
app.use(errorHandler);

export default app;
