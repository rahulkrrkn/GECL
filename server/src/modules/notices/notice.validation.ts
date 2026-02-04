import { z } from "zod";

export class NoticesValidation {
  /* ================= ENUMS ================= */

  static CATEGORY_ENUM = [
    "ACADEMIC",
    "EXAM",
    "ADMISSION",
    "SCHOLARSHIP",
    "PLACEMENT",
    "HOLIDAY",
    "TENDER",
    "EVENT",
    "GENERAL",
    "URGENT",
  ] as const;

  static DEPARTMENT_ENUM = [
    "ALL",
    "CSE_AI",
    "CSE_DS",
    "CIVIL",
    "EE",
    "ME",
    "SCIENCE_HUMANITIES",
  ] as const;

  static AUDIENCE_ENUM = ["PUBLIC", "STUDENTS", "FACULTY", "STAFF"] as const;

  static STATUS_ENUM = [
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
    "DELETED",
    "PENDING",
  ] as const;

  static SOURCE_ENUM = ["GECL", "BEU"] as const;

  /* ================= PAGINATION ================= */

  static getAllNoticesSchema = z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(50).default(20),
    })
    .strict();

  /* ================= CREATE NOTICE ================= */

  static create = z
    .object({
      title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(200, "Title is too long")
        .trim(),

      content: z
        .string()
        .min(0, "Content must be at least 10 characters")
        .trim(),

      category: z.enum(this.CATEGORY_ENUM).default("GENERAL"),

      department: z.enum(this.DEPARTMENT_ENUM).default("ALL"),

      audience: z
        .union([
          z.array(z.enum(this.AUDIENCE_ENUM)),
          z
            .string()
            .transform(
              (str) =>
                str
                  .split(",")
                  .map((s) =>
                    s.trim(),
                  ) as (typeof this.AUDIENCE_ENUM)[number][],
            ),
        ])
        .default(["PUBLIC"]),

      isPinned: z
        .union([z.boolean(), z.string().transform((val) => val === "true")])
        .default(false),

      status: z.enum(this.STATUS_ENUM).default("DRAFT"),

      publishAt: z.coerce.date().optional(),
      expireAt: z.coerce.date().nullable().optional(),
    })
    .strict();

  /* ================= UPDATE NOTICE ================= */

  static update = z
    .object({
      title: z.string().min(3).max(200).trim().optional(),
      content: z.string().min(0).trim().optional(),
      category: z.enum(this.CATEGORY_ENUM).optional(),
      department: z.enum(this.DEPARTMENT_ENUM).optional(),

      audience: z
        .union([
          z.array(z.enum(this.AUDIENCE_ENUM)),
          z
            .string()
            .transform(
              (str) =>
                str
                  .split(",")
                  .map((s) =>
                    s.trim(),
                  ) as (typeof this.AUDIENCE_ENUM)[number][],
            ),
        ])
        .optional(),

      isPinned: z
        .union([z.boolean(), z.string().transform((val) => val === "true")])
        .optional(),

      status: z.enum(this.STATUS_ENUM).optional(),

      publishAt: z.coerce.date().optional(),
      expireAt: z.coerce.date().nullable().optional(),
    })
    .strict();

  /* ================= VIEW NOTICE ================= */

  static getBySlug = z.object({
    slug: z.string().min(1, "Slug is required"),
  });
}
