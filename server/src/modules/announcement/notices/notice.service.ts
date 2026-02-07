import mongoose from "mongoose";
import Announcement, {
  AnnouncementType,
  AnnouncementStatus,
  AudienceGroup,
  NoticeSource,
} from "../../../models/gecl_announcement.model.js";
import Notification from "../../../models/gecl_notification.model.js";
import { renameToR2 } from "../../../helpers/fileUploadRenameR2.helper.js";
import { slugify } from "../../../utils/index.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../../errors/httpErrors.err.js";
import { isHighLevelUser } from "../../../utils/security/access.helper.js";
import { resolveAudiences } from "../../../utils/security/audience.resolver.js";

/* =====================================================
   TYPES
===================================================== */

type UploadedFileWithMeta = Express.Multer.File & {
  folder: string;
  field: string;
};

type UploadedFilesMap = Record<string, UploadedFileWithMeta[]>;

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
  files: UploadedFilesMap;
}

/* =====================================================
   SERVICE
===================================================== */

export class AnnouncementService {
  /* =====================================================
     CREATE NOTICE
  ===================================================== */
  static async createNotice(params: CreateParams) {
    const { body, user, req, files } = params;

    const {
      title,
      content,
      categories,
      branches = ["ALL"],
      audience,
      isPinned = false,
      publishAt,
      notification, // { channels: [...] }
    } = body;

    /* ---------- BASIC VALIDATION ---------- */
    if (!title || !content || !categories || !audience) {
      throw new BadRequestError("Missing required fields");
    }

    /* ---------- SLUG GENERATION ---------- */
    let slug = slugify(title);
    let counter = 1;

    while (await Announcement.exists({ slug })) {
      slug = slugify(`${title}-${counter++}`);
    }

    /* ---------- ATTACHMENT UPLOAD ---------- */
    let attachments: {
      name: string;
      url: string;
      mimeType?: string;
      size?: number;
    }[] = [];

    if (files.attachments && files.attachments.length > 0) {
      const uploaded = await renameToR2({
        req,
        fileNames: {
          attachments: files.attachments.map(
            (_, i) => `${slug}-attachment-${i + 1}`,
          ),
        },
      });

      const uploadedAttachments = uploaded.attachments ?? [];

      attachments = uploadedAttachments.map((file: any) => ({
        name: file.originalName,
        url: file.url,
        mimeType: file.mimeType,
        size: file.size,
      }));
    }

    /* ---------- AUTO SEO (INTERNAL) ---------- */
    const seo = {
      metaTitle: title,
      metaDescription: content.slice(0, 160),
      keywords: categories,
    };

    /* ---------- TRANSACTION ---------- */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      /* ---------- CREATE ANNOUNCEMENT ---------- */
      const createdAnnouncement = await Announcement.create(
        [
          {
            type: AnnouncementType.NOTICE,
            title,
            slug,
            content,
            categories,
            branches,
            audience,
            source: NoticeSource.GECL,

            attachments,
            seo,

            isPinned,
            status: AnnouncementStatus.PUBLISHED,
            publishAt: publishAt ?? new Date(),

            isDeleted: false,
            addedBy: user._id,
          },
        ],
        { session },
      );

      const announcementDoc = createdAnnouncement[0];
      if (!announcementDoc) {
        throw new InternalServerError("Failed to create announcement");
      }

      /* ---------- CREATE NOTIFICATION (OPTIONAL) ---------- */
      if (notification?.channels?.length > 0) {
        await Notification.create(
          [
            {
              announcementId: announcementDoc._id,
              branches,
              audience,
              channels: notification.channels.map((name: string) => ({
                name,
                status: "PENDING",
                sentAt: null,
                attempts: 0,
                error: null,
              })),
              status: "QUEUED",
              createdBy: user._id,
            },
          ],
          { session },
        );
      }

      await session.commitTransaction();
      session.endSession();

      return announcementDoc.toObject();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerError("Failed to create notice", undefined, err);
    }
  }

  /* ================= GET ALL NOTICES ================= */
  static async getAll(params: {
    page: number;
    limit: number;
    user?: { role?: string[] } | undefined;
  }) {
    const { page, limit, user } = params;
    const skip = (page - 1) * limit;

    const roles = user?.role ?? [];
    const isHighLevel = isHighLevelUser(roles);
    const now = new Date();

    const query: any = {
      type: AnnouncementType.NOTICE,
    };

    /* ---------- DELETED FILTER ---------- */
    if (!roles.includes("admin") && !roles.includes("super-admin")) {
      query.isDeleted = false;
    }

    /* ---------- STATUS FILTER ---------- */
    query.status = AnnouncementStatus.PUBLISHED;

    /* ---------- TIME FILTER ---------- */
    if (!isHighLevel) {
      query.publishAt = { $lte: now };
    }

    /* ---------- AUDIENCE FILTER ---------- */
    if (!isHighLevel) {
      query.audience = { $in: resolveAudiences(roles) };
    }

    /* ---------- DB ---------- */
    const [data, total] = await Promise.all([
      Announcement.find(query)
        .sort({ isPinned: -1, publishAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-coverImage -isDeleted -createdAt -updatedAt -addedBy")
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
  /* ================= GET NOTICE BY SLUG ================= */
  static async getBySlug(slug: string, user?: { role?: string[] }) {
    if (!slug) {
      throw new BadRequestError("Slug is required");
    }

    const roles = user?.role ?? [];
    const isHighLevel = isHighLevelUser(roles);
    const now = new Date();

    const query: any = {
      slug,
      type: AnnouncementType.NOTICE,
    };

    /* ---------- DELETED FILTER ---------- */
    if (!roles.includes("admin") && !roles.includes("super-admin")) {
      query.isDeleted = false;
    }

    /* ---------- STATUS ---------- */
    query.status = AnnouncementStatus.PUBLISHED;

    /* ---------- TIME ---------- */
    if (!isHighLevel) {
      query.publishAt = { $lte: now };
    }

    /* ---------- AUDIENCE ---------- */
    if (!isHighLevel) {
      query.audience = { $in: resolveAudiences(roles) };
    }

    const notice = await Announcement.findOne(query)
      .select("-coverImage -isDeleted -createdAt -updatedAt, -addedBy")
      .lean();

    if (!notice) {
      throw new NotFoundError("Notice not found or access denied");
    }

    return notice;
  }
}
