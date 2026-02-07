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

type AuthUser = {
  _id: string;
  userId: string;
  email: string;
  role?: string[];
};

interface CreateParams {
  body: any;
  user: AuthUser;
  req: Express.Request;
  files: Record<string, any[]>;
}

/* ================= SERVICE ================= */

export class NewsService {
  /* =====================================================
     CREATE NEWS
  ===================================================== */
  static async createNews(params: CreateParams) {
    const { body, user, req, files } = params;

    const {
      title,
      summary,
      content,
      categories,
      branches = ["ALL"],
      audience,
      isPinned = false,
      publishAt,
    } = body;

    /* ---------- SLUG GENERATION ---------- */
    let slug = slugify(title);
    let counter = 1;

    // Security: Ensure uniqueness so we don't overwrite
    while (await Announcement.exists({ slug })) {
      slug = slugify(`${title}-${counter++}`);
    }

    /* ---------- FILE UPLOAD HANDLING ---------- */
    // 1. Prepare File Names
    const fileNames: any = {};

    if (files.coverImage && files.coverImage.length > 0) {
      fileNames.coverImage = [`${slug}-cover`];
    }

    if (files.attachments && files.attachments.length > 0) {
      fileNames.attachments = files.attachments.map(
        (_, i) => `${slug}-att-${i + 1}`,
      );
    }

    // 2. Upload to R2
    const uploaded = await renameToR2({ req, fileNames });

    /* ---------- CONSTRUCT FILE OBJECTS ---------- */

    // FIX 1: Initialize as null (matches Schema)
    let coverImage = null;
    let attachments: any[] = [];

    // FIX 2: Create full object structure for Cover Image
    if (uploaded.coverImage?.length) {
      const file = uploaded.coverImage[0];
      coverImage = {
        name: file.originalName,
        url: file.url,
        mimeType: file.mimeType,
        size: file.size,
      };
    }

    // Attachments
    if (uploaded.attachments) {
      attachments = uploaded.attachments.map((file: any) => ({
        name: file.originalName,
        url: file.url,
        mimeType: file.mimeType,
        size: file.size,
      }));
    }

    /* ---------- DB TRANSACTION ---------- */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const createdNews = await Announcement.create(
        [
          {
            type: AnnouncementType.NEWS,
            title,
            summary,
            slug,
            content,
            categories,
            branches,
            audience,

            coverImage, // ✅ Now passing Object or null
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

      const newsDoc = createdNews[0];

      // FIX 3: Guard clause for TypeScript safety
      if (!newsDoc) {
        throw new InternalServerError("Failed to create news document");
      }

      await session.commitTransaction();
      return newsDoc.toObject();
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerError("Failed to create news", undefined, err);
    } finally {
      session.endSession();
    }
  }

  /* ================= GET ALL NEWS ================= */
  static async getAll(params: {
    page: number;
    limit: number;
    user?: AuthUser | undefined; // ✅ FIX: Explicitly allow undefined
  }) {
    const { page, limit, user } = params;
    const skip = (page - 1) * limit;

    /* ---------- SECURITY FILTERING ---------- */
    const roles = user?.role ?? [];
    const isHighLevel = isHighLevelUser(roles);
    const now = new Date();

    const query: any = {
      type: AnnouncementType.NEWS,
    };

    // 1. Deleted Check
    if (!roles.includes("admin") && !roles.includes("super-admin")) {
      query.isDeleted = false;
    }

    // 2. Status Check
    query.status = AnnouncementStatus.PUBLISHED;

    // 3. Time Check
    if (!isHighLevel) {
      query.publishAt = { $lte: now };
    }

    // 4. Audience Check
    if (!isHighLevel) {
      query.audience = { $in: resolveAudiences(roles) };
    }
    query.type = AnnouncementType.NEWS;

    /* ---------- DB QUERY ---------- */
    const [data, total] = await Promise.all([
      Announcement.find(query)
        .sort({ isPinned: -1, publishAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "title slug summary coverImage categories publishAt isPinned audience",
        )
        .lean(),

      Announcement.countDocuments(query),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /* ================= GET NEWS BY SLUG ================= */
  static async getBySlug(slug: string, user?: AuthUser | undefined) {
    // ✅ FIX: Explicitly allow undefined
    if (!slug) {
      throw new BadRequestError("Slug is required");
    }

    /* ---------- SECURITY FILTERING ---------- */
    const roles = user?.role ?? [];
    const isHighLevel = isHighLevelUser(roles);
    const now = new Date();

    const query: any = {
      slug,
      type: AnnouncementType.NEWS,
    };

    if (!roles.includes("admin") && !roles.includes("super-admin")) {
      query.isDeleted = false;
    }

    query.status = AnnouncementStatus.PUBLISHED;

    if (!isHighLevel) {
      query.publishAt = { $lte: now };
    }

    if (!isHighLevel) {
      query.audience = { $in: resolveAudiences(roles) };
    }

    query.type = AnnouncementType.NEWS;
    const news = await Announcement.findOne(query)
      .select("-isDeleted -createdAt -updatedAt -addedBy")
      .lean();

    if (!news) {
      throw new NotFoundError("News article not found or access denied");
    }

    return news;
  }
}
