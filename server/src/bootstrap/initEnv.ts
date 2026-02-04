// src/bootstrap/loadEnv.ts
import dotenv from "dotenv";
import path from "path";

export function loadEnv() {
  // const root = process.cwd(); // project root
  // dotenv.config({ path: path.join(root, "env/.env") });
  // dotenv.config({ path: path.join(root, "env/.env.auth") });
  // dotenv.config({ path: path.join(root, "env/.env.db") });

  const result = dotenv.config();

  if (result.error) {
    throw new Error("Environment variables not loaded correctly");
  }
}
