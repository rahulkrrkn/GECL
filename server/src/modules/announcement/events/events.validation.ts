import { z } from "zod";
import {
  AnnouncementCategory,
  AnnouncementType,
  AudienceGroup,
  EventMode,
} from "../../../models/gecl_announcement.model.js";

/* ================= HELPERS ================= */

/**
 * Robust boolean coercion for form data.
 * Converts "true"/"false" strings to actual booleans.
 */
const looseBoolean = z.preprocess((val) => {
  if (typeof val === "string") {
    if (val.toLowerCase() === "true") return true;
    if (val.toLowerCase() === "false") return false;
  }
  return val;
}, z.boolean());

/**
 * Ensures input is always an array of strings.
 */
const stringArray = z.preprocess((val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
}, z.array(z.string()));

/* ================= EVENT DETAILS SCHEMA ================= */

const EventDetailsSchema = z
  .object({
    mode: z.nativeEnum(EventMode, {
      message: "Please select a valid event mode (Online, Offline, or Hybrid)",
    }),
    startDate: z.coerce.date({
      message: "A valid start date is required",
    }),
    endDate: z.coerce
      .date({
        message: "Invalid end date format",
      })
      .optional(),
    venue: z.string().trim().optional(),
    meetingLink: z
      .string()
      .trim()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // 1. Date Logic
    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be before the start date",
      });
    }

    // 2. Mode Logic: Offline/Hybrid requires Venue
    const isPhysical =
      data.mode === EventMode.OFFLINE || data.mode === EventMode.HYBRID;
    if (isPhysical && (!data.venue || data.venue.trim().length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["venue"],
        message: "Venue is required for Offline or Hybrid events",
      });
    }

    // 3. Mode Logic: Online/Hybrid requires Meeting Link
    const isVirtual =
      data.mode === EventMode.ONLINE || data.mode === EventMode.HYBRID;
    if (
      isVirtual &&
      (!data.meetingLink || data.meetingLink.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["meetingLink"],
        message: "Meeting link is required for Online or Hybrid events",
      });
    }
  });

/* ================= MAIN VALIDATION CLASS ================= */

export class EventValidation {
  /* ================= CREATE EVENT ================= */
  static create = z
    .object({
      type: z.literal(AnnouncementType.EVENT),

      title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .trim(),

      summary: z.string().trim().default(""),
      content: z.string().trim().default(""),

      galleryEnabled: looseBoolean.default(false),

      // regex: allows Alphanumeric, spaces, and specifically - & +
      galleryCategory: z
        .string()
        .trim()
        .regex(
          /^[a-zA-Z0-9-&+ ]*$/,
          "Gallery Category can only contain letters, numbers, spaces, and the characters: -, &, +",
        )
        .optional(),

      categories: z
        .array(z.nativeEnum(AnnouncementCategory))
        .min(1, "At least one category is required")
        .default([AnnouncementCategory.GENERAL]),

      branches: stringArray.default(["ALL"]),

      audience: z
        .array(z.nativeEnum(AudienceGroup))
        .min(1, "At least one audience group is required")
        .default([AudienceGroup.PUBLIC]),

      event: EventDetailsSchema,

      isPinned: looseBoolean.default(false),
      publishAt: z.coerce.date().default(() => new Date()),
      expireAt: z.coerce.date().nullable().optional(),
    })
    .superRefine((data, ctx) => {
      // 1. Gallery Category Required Logic
      if (
        data.galleryEnabled &&
        (!data.galleryCategory || data.galleryCategory.trim().length === 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["galleryCategory"],
          message:
            "Gallery Category name is required when the gallery is enabled",
        });
      }

      // 2. Public Audience Logic
      if (
        data.audience.includes(AudienceGroup.PUBLIC) &&
        data.audience.length > 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["audience"],
          message:
            "Public audience cannot be combined with other specific groups",
        });
      }

      // 3. Expiration Logic
      if (data.expireAt && data.expireAt <= data.publishAt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["expireAt"],
          message: "Expiration must be after the publication date",
        });
      }
    });

  /* ================= FILTERS ================= */
  static getAll = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    filter: z
      .enum(["UPCOMING", "PAST", "ALL"], {
        message: "Filter must be UPCOMING, PAST, or ALL",
      })
      .default("UPCOMING"),
  });

  static getBySlug = z.object({
    slug: z.string().min(1, "Slug is required").trim(),
  });

  static verifyCategory = z.object({
    category: z.string().min(1, "Category is required").trim(),
  });
}
