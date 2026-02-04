import Notice from "../../models/gecl_notice.model.js";
import { slugify } from "../../utils/index.js";
import { renameToR2 } from "../../helpers/fileUploadRenameR2.helper.js";
import type { Express } from "express";

import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../errors/httpErrors.err.js";
/* ==============================
   Upload Types (INLINE)
============================== */
type UploadedFileWithMeta = Express.Multer.File & {
  folder: string;
  field: string;
};

type UploadedFilesMap = Record<string, UploadedFileWithMeta[]>;

/* ==============================
   Types
============================== */

interface NoticeBody {
  title: string;
  content: string;
  category: string;
  department: string;
  audience: string[];
  isPinned: boolean;
  status: string;
  publishAt?: string;
  expireAt?: string;
}

export class NoticeService {
  /* ================= CREATE NOTICE ================= */
  static async createNotice(params: {
    body: NoticeBody;
    userId: string;
    req: Express.Request;
    files?: UploadedFilesMap;
  }) {
    const { body, files, userId, req } = params;

    const {
      title,
      content,
      category,
      department,
      audience,
      isPinned,
      status,
      publishAt,
      expireAt,
    } = body;

    /* ---------- Business validation ---------- */
    if (
      !title ||
      !content ||
      !category ||
      !department ||
      !audience ||
      isPinned === undefined ||
      !status
    ) {
      throw new BadRequestError("Missing required fields");
    }

    /* ---------- Slug generation ---------- */
    let slug = slugify(title);
    let exists = await Notice.findOne({ slug });
    let counter = 1;

    while (exists) {
      const nextSlug = slugify(`${title}-${counter}`);
      exists = await Notice.findOne({ slug: nextSlug });
      if (!exists) slug = nextSlug;
      counter++;
    }

    /* ---------- Attachment handling ---------- */
    const attachments: {
      fileUrl: string;
      fileName: string;
      fileType: string;
      fileSize: number;
    }[] = [];

    if (files && files.attachments && files.attachments.length > 0) {
      const uploaded = await renameToR2({
        req,
        fileNames: {
          attachments: files.attachments.map((_, i) => `${slug}-${i + 1}`),
        },
      });

      const uploadedFiles = uploaded.attachments;
      const originalFiles = files.attachments;

      if (!uploadedFiles || uploadedFiles.length === 0) {
        throw new InternalServerError("Attachment upload failed");
      }

      /* ✅ SAFE indexed loop (TS + runtime safe) */
      for (let i = 0; i < uploadedFiles.length; i++) {
        const uploadedFile = uploadedFiles[i];
        const originalFile = originalFiles[i];

        if (!uploadedFile || !originalFile) continue;

        attachments.push({
          fileUrl: uploadedFile.url,
          fileName: originalFile.originalname,
          fileType: originalFile.mimetype,
          fileSize: originalFile.size,
        });
      }
    }

    /* ---------- Create notice ---------- */
    try {
      return await Notice.create({
        source: "GECL",
        title,
        slug,
        content,
        category,
        department,
        audience,
        attachments,
        isPinned,
        status,
        publishAt: publishAt || new Date(),
        expireAt: expireAt || null,
        addedBy: userId,
        updatedBy: null,
      });
    } catch (err) {
      throw new InternalServerError("Failed to create notice", undefined, err);
    }
  }
  static async create(payload: any, files?: any) {
    throw new Error("NoticeService.create not implemented yet");
  }
  /* ================= GET ALL NOTICES ================= */
  static async getAll(params: {
    page: number;
    limit: number;
    user: { role?: string[] } | undefined;
  }) {
    const { page, limit, user } = params;

    const skip = (page - 1) * limit;

    /* ---------- Roles ---------- */
    const SUPER_ROLES = ["admin", "super-admin", "super_admin"];
    const MANAGEMENT_ROLES = [
      "principal",
      "vice_principal",
      "vice-principal",
      "hod",
    ];
    const FACULTY_ROLES = ["teacher", "librarian", "tpo"];

    const userRole = user?.role?.[0]?.toLowerCase();

    const query: any = {};

    /* ---------- STATUS FILTER ---------- */
    if (!userRole) {
      // Guest user
      query.status = "PUBLISHED";
    } else if (SUPER_ROLES.includes(userRole)) {
      // see all
    } else if (MANAGEMENT_ROLES.includes(userRole)) {
      query.status = { $ne: "DELETED" };
    } else {
      query.status = "PUBLISHED";
    }

    /* ---------- AUDIENCE FILTER ---------- */
    if (!userRole) {
      query.audience = { $in: ["PUBLIC"] };
    } else if (
      !SUPER_ROLES.includes(userRole) &&
      !MANAGEMENT_ROLES.includes(userRole)
    ) {
      const allowedAudience = ["PUBLIC"];

      if (userRole === "student") allowedAudience.push("STUDENTS");
      else if (userRole === "staff") allowedAudience.push("STAFF");
      else if (FACULTY_ROLES.includes(userRole))
        allowedAudience.push("FACULTY");

      query.audience = { $in: allowedAudience };
    }

    /* ---------- DB ---------- */
    const [data, total] = await Promise.all([
      Notice.find(query)
        .sort({ isPinned: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "-addedBy -updatedBy -createdAt -updatedAt -viewsCount -downloadsCount",
        )
        .lean(),

      Notice.countDocuments(query),
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
  static async getBySlug(
    slug: string,
    user?: {
      role?: string[];
    },
  ) {
    if (!slug) {
      throw new BadRequestError("Slug is required");
    }

    /* ---------- Roles ---------- */
    const SUPER_ROLES = ["admin", "super-admin", "super_admin"];
    const MANAGEMENT_ROLES = ["principal", "vice_principal", "hod"];
    const FACULTY_ROLES = ["teacher", "librarian", "tpo"];

    const userRole = user?.role?.[0]?.toLowerCase() || "guest";

    const query: any = { slug };

    /* ---------- STATUS FILTER ---------- */
    if (SUPER_ROLES.includes(userRole)) {
      // see all
    } else if (MANAGEMENT_ROLES.includes(userRole)) {
      query.status = { $ne: "DELETED" };
    } else {
      query.status = "PUBLISHED";
    }

    /* ---------- AUDIENCE FILTER ---------- */
    if (
      !SUPER_ROLES.includes(userRole) &&
      !MANAGEMENT_ROLES.includes(userRole)
    ) {
      const allowedAudience = ["PUBLIC"];

      if (userRole === "student") allowedAudience.push("STUDENTS");
      else if (userRole === "staff") allowedAudience.push("STAFF");
      else if (FACULTY_ROLES.includes(userRole))
        allowedAudience.push("FACULTY");

      query.audience = { $in: allowedAudience };
    }

    /* ---------- FETCH + VIEW COUNT ---------- */
    const notice = await Notice.findOneAndUpdate(
      query,
      { $inc: { viewsCount: 1 } },
      { new: true },
    )
      .select("-__v -updatedBy -addedBy")
      .lean();

    if (!notice) {
      throw new NotFoundError("Notice not found or you do not have permission");
    }

    return notice;
  }

  /* ================= UPDATE NOTICE ================= */
  static async update(slug: string, payload: any) {
    throw new Error("NoticeService.update not implemented yet");
  }

  /* ================= CHANGE STATUS ================= */
  static async changeStatus(slug: string, status: string) {
    throw new Error("NoticeService.changeStatus not implemented yet");
  }

  /* ================= SOFT DELETE ================= */
  static async softDelete(slug: string) {
    throw new Error("NoticeService.softDelete not implemented yet");
  }

  /* ================= HARD DELETE ================= */
  static async hardDelete(slug: string) {
    throw new Error("NoticeService.hardDelete not implemented yet");
  }

  /* ================= STATS (OPTIONAL / FUTURE) ================= */
  static async getStats() {
    throw new Error("NoticeService.getStats not implemented yet");
  }

  /* ================= USER-SPECIFIC NOTICES (OPTIONAL) ================= */
  static async getMyNotices(userId: string) {
    throw new Error("NoticeService.getMyNotices not implemented yet");
  }
}
