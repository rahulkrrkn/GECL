import { z } from "zod";
import {
  AnnouncementType,
  AudienceGroup,
  EventMode,
} from "../../../models/gecl_announcement.model.js";
import {
  booleanFromForm,
  stringArrayFromForm,
} from "../../../utils/form.utils.js";

/* ================= EVENT SPECIFIC SUB-SCHEMA ================= */
const EventDetailsSchema = z
  .object({
    mode: z.nativeEnum(EventMode),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    venue: z.string().optional(),
    meetingLink: z.string().url().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // 1. Date Logic
    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be before start date",
      });
    }

    // 2. Mode Logic
    if (
      (data.mode === EventMode.OFFLINE || data.mode === EventMode.HYBRID) &&
      (!data.venue || data.venue.length < 3)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["venue"],
        message: "Venue is required for Offline/Hybrid events",
      });
    }

    if (
      (data.mode === EventMode.ONLINE || data.mode === EventMode.HYBRID) &&
      !data.meetingLink
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["meetingLink"],
        message: "Meeting link is required for Online/Hybrid events",
      });
    }
  });

export class EventValidation {
  /* ================= CREATE EVENT ================= */
  static create = z
    .object({
      type: z.literal(AnnouncementType.EVENT),

      title: z.string().min(5).max(200).trim(),
      summary: z.string().min(10).max(500).trim(),
      content: z.string().min(10),

      categories: stringArrayFromForm.default([]),
      branches: stringArrayFromForm.default(["ALL"]),
      audience: z.array(z.nativeEnum(AudienceGroup)),

      // ✅ New Event Object
      event: EventDetailsSchema,

      isPinned: booleanFromForm.optional(),
      publishAt: z.coerce.date().optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
      if (!data.categories.length) {
        ctx.addIssue({
          path: ["categories"],
          message: "At least one category is required",
          code: z.ZodIssueCode.custom,
        });
      }

      // Public/Audience Logic (Same as News)
      if (
        data.audience.includes(AudienceGroup.PUBLIC) &&
        data.audience.length > 1
      ) {
        ctx.addIssue({
          path: ["audience"],
          message: "PUBLIC audience cannot be combined",
          code: z.ZodIssueCode.custom,
        });
      }
    });

  /* ================= FILTERS ================= */
  static getAll = z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(50).default(20),
      filter: z.enum(["UPCOMING", "PAST", "ALL"]).default("UPCOMING"), // ✅ Added filter
    })
    .strict();

  static getBySlug = z.object({
    slug: z.string().min(1).trim(),
  });
}
