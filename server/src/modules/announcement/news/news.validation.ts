import { z } from "zod";
import {
  AnnouncementType,
  AudienceGroup,
} from "../../../models/gecl_announcement.model.js";
import {
  booleanFromForm,
  stringArrayFromForm,
} from "../../../utils/form.utils.js";

export class NewsValidation {
  /* =====================================================
     CREATE NEWS
  ===================================================== */
  static create = z
    .object({
      type: z.literal(AnnouncementType.NEWS),

      title: z.string().min(5).max(200).trim(),
      summary: z.string().min(10).max(500).trim(), // Required for News cards
      content: z.string().min(10), // HTML Content

      categories: stringArrayFromForm.default([]),
      branches: stringArrayFromForm.default(["ALL"]),

      audience: z.array(z.nativeEnum(AudienceGroup)),

      isPinned: booleanFromForm.optional(),
      publishAt: z.coerce.date().optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
      /* ---------- REQUIRED ARRAYS ---------- */
      if (!data.categories.length) {
        ctx.addIssue({
          path: ["categories"],
          message: "At least one category is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.audience.length) {
        ctx.addIssue({
          path: ["audience"],
          message: "Audience is required",
          code: z.ZodIssueCode.custom,
        });
      }

      /* ---------- LOGIC RULES ---------- */
      // Security: Prevent conflicting audience scopes
      if (
        data.audience.includes(AudienceGroup.PUBLIC) &&
        data.audience.length > 1
      ) {
        ctx.addIssue({
          path: ["audience"],
          message: "PUBLIC audience cannot be combined with internal groups",
          code: z.ZodIssueCode.custom,
        });
      }

      if (data.branches.includes("ALL") && data.branches.length > 1) {
        ctx.addIssue({
          path: ["branches"],
          message: "ALL branch cannot be combined with specific branches",
          code: z.ZodIssueCode.custom,
        });
      }
    });

  /* ================= PAGINATION ================= */
  static getAll = z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(50).default(20),
    })
    .strict();

  /* ================= SLUG VALIDATION ================= */
  static getBySlug = z.object({
    slug: z.string().min(1, "Slug is required").trim(),
  });
}
