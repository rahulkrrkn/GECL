// src/server.ts
// =======================
// Imports
// =======================

import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import { initServer } from "./bootstrap/index.js";
import server from "./app.js";
// =======================
// App Init
// =======================

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;
// Send all request to main app
app.use(server);
const startServer = async (): Promise<void> => {
  await initServer();
  app.listen(PORT, () => {
    console.log("✅ Server started at port no :", PORT);
  });
};

startServer();
