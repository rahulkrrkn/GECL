import { z } from "zod";

/* =====================================================
   FORM-DATA SAFE HELPERS (FIXED)
===================================================== */

export const booleanFromForm = z.union([
  z.boolean(),
  z.string().transform((v) => v === "true"),
]);

export const stringArrayFromForm = z
  .union([
    z.array(z.string()),
    z.string().transform((v) =>
      v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ])
  .transform((v) => (Array.isArray(v) ? v : []));
