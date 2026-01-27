import { z } from "zod";

/* ================= ENUMS (Match Mongoose Schema) ================= */
const CATEGORY_ENUM = [
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

const DEPARTMENT_ENUM = [
  "ALL",
  "CSE_AI",
  "CSE_DS",
  "CIVIL",
  "EE",
  "ME",
  "SCIENCE_HUMANITIES",
] as const;

const AUDIENCE_ENUM = ["PUBLIC", "STUDENTS", "FACULTY", "STAFF"] as const;

export const STATUS_ENUM = [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
  "DELETED",
  "PENDING",
] as const;

export const SOURCE_ENUM = ["GECL", "BEU"] as const;

/* ================= PAGINATION ================= */
export const getAllNoticesSchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  })
  .strict();
export type GetNoticesQuery = z.infer<typeof getAllNoticesSchema>;
/* ================= CREATE NOTICE ================= */
export const createNoticeSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(200, "Title is too long")
      .trim(),

    content: z.string().min(0, "Content must be at least 10 characters").trim(),

    category: z
      .enum(CATEGORY_ENUM, {
        message: "Invalid category",
      })
      .default("GENERAL"),

    department: z.enum(DEPARTMENT_ENUM).default("ALL"),

    // Accepts ["PUBLIC"] OR "PUBLIC,STUDENTS"
    audience: z
      .union([
        z.array(z.enum(AUDIENCE_ENUM)),
        z
          .string()
          .transform(
            (str) =>
              str
                .split(",")
                .map((s) => s.trim()) as (typeof AUDIENCE_ENUM)[number][],
          ),
      ])
      .default(["PUBLIC"]),

    isPinned: z
      .union([z.boolean(), z.string().transform((val) => val === "true")])
      .default(false),

    status: z.enum(STATUS_ENUM).default("DRAFT"),

    publishAt: z.coerce.date().optional(),
    expireAt: z.coerce.date().nullable().optional(),
  })
  .strict();
/* ================= UPDATE NOTICE ================= */
export const updateNoticeSchema = z
  .object({
    title: z.string().min(3).max(200).trim().optional(),
    content: z.string().min(0).trim().optional(),
    category: z.enum(CATEGORY_ENUM).optional(),
    department: z.enum(DEPARTMENT_ENUM).optional(),

    audience: z
      .union([
        z.array(z.enum(AUDIENCE_ENUM)),
        z
          .string()
          .transform(
            (str) =>
              str
                .split(",")
                .map((s) =>
                  s.trim(),
                ) as unknown as (typeof AUDIENCE_ENUM)[number][],
          ),
      ])
      .optional(),

    isPinned: z
      .union([z.boolean(), z.string().transform((val) => val === "true")])
      .optional(),

    status: z.enum(STATUS_ENUM).optional(),

    publishAt: z.coerce.date().optional(),
    expireAt: z.coerce.date().nullable().optional(),
  })
  .strict();

/* ================= VIEW NOTICE ================= */
export const getNoticeBySlugSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

/* ================= EXPORT GROUP ================= */
export const noticeSchemas = {
  create: createNoticeSchema,
  update: updateNoticeSchema,
  getAllNoticesSchema,
  getNoticeBySlugSchema,
};
