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
  static async verifyCategory(category: string) {
    if (!category) throw new BadRequestError("Category name is required");

    // 1. Normalize the incoming string (This will be the standard format for NEW entries)
    const normalizedCategory = category
      .trim()
      .toLowerCase()
      .replace(/[^\w\s\-\&\+]+$/, "") // Remove trailing special chars
      .replace(/\s+/g, "-") // Spaces to hyphens
      .replace(/-+/g, "-"); // Collapse multiple hyphens

    /**
     * 2. Prepare the Database Search Pattern
     * We replace hyphens in our normalized string with a regex group [\s\-]+
     * This means: "Look for a space OR a hyphen in this position".
     */
    const fuzzySearchPattern = normalizedCategory.replace(/-/g, "[\\s\\-]+");

    // 3. Perform the Case-Insensitive Regex Check
    const categoryExists = await Announcement.exists({
      galleryCategory: {
        $regex: new RegExp(`^${fuzzySearchPattern}$`, "i"),
      },
    });

    if (categoryExists) {
      throw new BadRequestError(
        `A category similar to "${category}" already exists (Normalized as: ${normalizedCategory})`,
      );
    }

    // Return the cleaned string to be saved
    return normalizedCategory;
  }

  /* ================= CREATE EVENT ================= */
  static async createEvent(params: CreateParams) {
    const { body, user, req, files } = params;

    // 1. Destructure all fields (Added Gallery fields)
    const {
      title,
      summary,
      content,
      categories,
      branches, // Defaults handled in Schema/Zod, but good to have here
      audience,

      // ✅ Event Specific Data
      event,

      // ✅ Gallery Specific Data (Missing in your snippet)
      galleryEnabled,
      galleryCategory,

      isPinned,
      publishAt,
    } = body;

    /* ---------- SLUG GENERATION ---------- */
    // Ensure unique slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    // Efficiently check for existence
    while (await Announcement.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    /* ---------- FILE RENAMING PREP ---------- */
    // Prepare naming convention for R2/S3
    const fileNames: any = {};

    if (files?.coverImage?.length) {
      fileNames.coverImage = [`${slug}-event-cover`];
    }

    if (files?.attachments?.length) {
      fileNames.attachments = files.attachments.map(
        (_, i) => `${slug}-doc-${i + 1}`,
      );
    }

    // Upload/Rename files
    const uploaded = await renameToR2({ req, fileNames });

    /* ---------- CONSTRUCT MEDIA OBJECTS ---------- */
    // Match Schema Interface: { url, name, mimeType, size }

    let coverImage = null;
    if (uploaded.coverImage && uploaded.coverImage.length > 0) {
      const f = uploaded.coverImage[0];
      coverImage = {
        name: f.originalName,
        url: f.url,
        mimeType: f.mimeType,
        size: f.size,
      };
    }

    let attachments: any[] = [];
    if (uploaded.attachments && uploaded.attachments.length > 0) {
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
            type: AnnouncementType.EVENT,
            title,
            slug,
            summary, // Allowed to be empty string
            content,

            categories,
            branches: branches || ["ALL"], // Fallback if Zod didn't catch it
            audience,

            // ✅ Event Sub-document
            event,

            // ✅ Gallery Fields (Now included)
            galleryEnabled: galleryEnabled || false,
            galleryCategory: galleryEnabled ? galleryCategory : undefined,

            // ✅ Media
            coverImage,
            attachments,

            // ✅ Meta
            isPinned: isPinned || false,
            status: AnnouncementStatus.PUBLISHED, // or DRAFT based on your flow
            publishAt: publishAt || new Date(),

            // ✅ System fields
            isDeleted: false,
            addedBy: user._id,
          },
        ],
        { session },
      );

      const doc = created[0];
      if (!doc) {
        throw new InternalServerError("Failed to create event document");
      }

      await session.commitTransaction();
      return doc.toObject();
    } catch (err) {
      await session.abortTransaction();
      // Pass the error up for global error handling
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
