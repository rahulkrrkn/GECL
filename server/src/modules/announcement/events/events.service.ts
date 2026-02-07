import mongoose from "mongoose";
import Announcement, {
  AnnouncementType,
  AnnouncementStatus,
} from "../../../models/gecl_announcement.model.js";
import { renameToR2 } from "../../../helpers/fileUploadRenameR2.helper.js";
import { slugify } from "../../../utils/index.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../../errors/httpErrors.err.js";
import { isHighLevelUser } from "../../../utils/security/access.helper.js";
import { resolveAudiences } from "../../../utils/security/audience.resolver.js";

/* ================= TYPES ================= */
type AuthUser = { _id: string; role?: string[] };

interface CreateParams {
  body: any;
  user: AuthUser;
  req: Express.Request;
  files: Record<string, any[]>;
}

export class EventService {
  /* ================= CREATE EVENT ================= */
  static async createEvent(params: CreateParams) {
    const { body, user, req, files } = params;

    const {
      title,
      summary,
      content,
      categories,
      branches = ["ALL"],
      audience,
      // ✅ Event Specific Data
      event,
      isPinned = false,
      publishAt,
    } = body;

    /* ---------- SLUG ---------- */
    let slug = slugify(title);
    let counter = 1;
    while (await Announcement.exists({ slug })) {
      slug = slugify(`${title}-${counter++}`);
    }

    /* ---------- FILES ---------- */
    const fileNames: any = {};
    if (files.coverImage?.length)
      fileNames.coverImage = [`${slug}-event-cover`];
    if (files.attachments?.length)
      fileNames.attachments = files.attachments.map(
        (_, i) => `${slug}-doc-${i + 1}`,
      );

    const uploaded = await renameToR2({ req, fileNames });

    // Construct Objects
    let coverImage = null;
    if (uploaded.coverImage?.length) {
      const f = uploaded.coverImage[0];
      coverImage = {
        name: f.originalName,
        url: f.url,
        mimeType: f.mimeType,
        size: f.size,
      };
    }

    let attachments: any[] = [];
    if (uploaded.attachments) {
      attachments = uploaded.attachments.map((f: any) => ({
        name: f.originalName,
        url: f.url,
        mimeType: f.mimeType,
        size: f.size,
      }));
    }

    /* ---------- DB SAVE ---------- */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const created = await Announcement.create(
        [
          {
            type: AnnouncementType.EVENT, // ✅ Strict Type
            title,
            summary,
            slug,
            content,
            categories,
            branches,
            audience,

            event, // ✅ Save the event sub-document (validated by Zod)

            coverImage,
            attachments,

            isPinned,
            status: AnnouncementStatus.PUBLISHED,
            publishAt: publishAt ?? new Date(),
            isDeleted: false,
            addedBy: user._id,
          },
        ],
        { session },
      );

      const doc = created[0];
      if (!doc) throw new InternalServerError("Failed to create event");

      await session.commitTransaction();
      return doc.toObject();
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerError("Failed to create event", undefined, err);
    } finally {
      session.endSession();
    }
  }

  /* ================= GET ALL EVENTS ================= */
  static async getAll(params: {
    page: number;
    limit: number;
    filter: "UPCOMING" | "PAST" | "ALL";
    user?: AuthUser | undefined;
  }) {
    const { page, limit, filter, user } = params;
    const skip = (page - 1) * limit;

    const roles = user?.role ?? [];
    const isHighLevel = isHighLevelUser(roles);
    const now = new Date();

    const query: any = { type: AnnouncementType.EVENT };

    // 1. Security Filters
    if (!roles.includes("admin") && !roles.includes("super-admin")) {
      query.isDeleted = false;
    }
    query.status = AnnouncementStatus.PUBLISHED;

    if (!isHighLevel) {
      query.publishAt = { $lte: now };
      query.audience = { $in: resolveAudiences(roles) };
    }

    // 2. Date Filtering (Upcoming vs Past)
    if (filter === "UPCOMING") {
      query["event.startDate"] = { $gte: now }; // Future events
    } else if (filter === "PAST") {
      query["event.startDate"] = { $lt: now }; // Past events
    }

    const [data, total] = await Promise.all([
      Announcement.find(query)
        .sort({ "event.startDate": filter === "UPCOMING" ? 1 : -1 }) // Sort by event date
        .skip(skip)
        .limit(limit)
        .select(
          "title slug summary coverImage categories event publishAt isPinned audience",
        )
        .lean(),
      Announcement.countDocuments(query),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /* ================= GET BY SLUG ================= */
  static async getBySlug(slug: string, user?: AuthUser | undefined) {
    if (!slug) throw new BadRequestError("Slug is required");

    const roles = user?.role ?? [];
    const isHighLevel = isHighLevelUser(roles);

    const query: any = { slug, type: AnnouncementType.EVENT };

    if (!roles.includes("admin")) query.isDeleted = false;
    query.status = AnnouncementStatus.PUBLISHED;
    if (!isHighLevel) {
      query.publishAt = { $lte: new Date() };
      query.audience = { $in: resolveAudiences(roles) };
    }

    const event = await Announcement.findOne(query)
      .select("-isDeleted -createdAt -updatedAt -addedBy")
      .lean();

    if (!event) throw new NotFoundError("Event not found");

    return event;
  }
}
