import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
// import { errorHandler } from "./core/middlewares/errorHandler.mid.js";

const app: Application = express();

// =======================
// Middlewares
// =======================
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  }),
);

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

export default app;
