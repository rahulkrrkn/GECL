import { z } from "zod";
import {
  AnnouncementType,
  AudienceGroup,
} from "../../../models/gecl_announcement.model.js";
import { NotificationChannel } from "../../../models/gecl_notification.model.js";
import {
  booleanFromForm,
  stringArrayFromForm,
} from "../../../utils/form.utils.js";

export class NoticeValidation {
  /* =====================================================
     NOTIFICATION
  ===================================================== */

  static notification = z.object({
    channels: z.array(z.nativeEnum(NotificationChannel)).min(1),
    scheduledAt: z.coerce.date().optional(),
  });

  /* =====================================================
     CREATE NOTICE
  ===================================================== */

  static create = z
    .object({
      type: z.literal(AnnouncementType.NOTICE),

      title: z.string().min(5).max(200).trim(),
      content: z.string().min(10),

      categories: stringArrayFromForm.default([]),
      branches: stringArrayFromForm.default(["ALL"]),

      audience: z.array(z.nativeEnum(AudienceGroup)),

      isPinned: booleanFromForm.optional(),
      publishAt: z.coerce.date().optional(),

      notification: NoticeValidation.notification.optional(),
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

      /* ---------- PUBLIC RULE ---------- */
      if (
        data.audience.includes(AudienceGroup.PUBLIC) &&
        data.audience.length > 1
      ) {
        ctx.addIssue({
          path: ["audience"],
          message: "PUBLIC audience cannot be combined with other groups",
          code: z.ZodIssueCode.custom,
        });
      }

      /* ---------- BRANCH RULE ---------- */
      if (data.branches.includes("ALL") && data.branches.length > 1) {
        ctx.addIssue({
          path: ["branches"],
          message: "ALL branch cannot be combined with other branches",
          code: z.ZodIssueCode.custom,
        });
      }
    });

  /* ================= PAGINATION ================= */

  static getAllNoticesSchema = z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(50).default(20),
    })
    .strict();

  /* ================= VIEW NOTICE ================= */

  static getBySlug = z.object({
    slug: z.string().min(1, "Slug is required"),
  });
}
