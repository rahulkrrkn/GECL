import type { Request, Response } from "express";
import { NoticeService } from "./notice.service.js";
import { UnauthorizedError } from "../../errors/httpErrors.err.js";
import { sendSuccess } from "../../helpers/response.helper.js";
import { BadRequestError } from "../../errors/httpErrors.err.js";

/* ==============================
   Upload Types (INLINE)
============================== */
type UploadedFileWithMeta = Express.Multer.File & {
  folder: string;
  field: string;
};

type UploadedFilesMap = Record<string, UploadedFileWithMeta[]>;

/* ==============================
   Auth Request Type
============================== */
type AuthRequest = Request & {
  validatedBody?: unknown;
  files?: UploadedFilesMap;
  user?: {
    _id?: string;
    userId?: string;
  };
};

export class NoticesController {
  /* ================= CREATE NOTICE ================= */
  static async create(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    const userId = authReq.user?._id || authReq.user?.userId;
    if (!userId) {
      throw new UnauthorizedError("User not authenticated");
    }

    const payload = {
      body: authReq.validatedBody || req.body,
      userId,
      req: authReq,
      ...(authReq.files ? { files: authReq.files } : {}), // ✅ exactOptionalPropertyTypes-safe
    };

    const notice = await NoticeService.createNotice(payload);

    return sendSuccess(res, "Notice created successfully", notice);

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: notice,
    });
  }

  /* ================= GET ALL NOTICES ================= */
  static async getAll(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    const query = req.validatedQuery as {
      page: number;
      limit: number;
    };

    if (!query.page || !query.limit) {
      throw new BadRequestError("Page and limit are required", "INVALID_INPUT");
    }

    if (query.page < 1 || query.limit < 1) {
      throw new BadRequestError(
        "Page and limit must be greater than 0",
        "INVALID_INPUT",
      );
    }

    if (query.limit > 100) {
      throw new BadRequestError(
        "Limit must be less than or equal to 100",
        "INVALID_INPUT",
      );
    }

    const result = await NoticeService.getAll({
      page: query.page,
      limit: query.limit,
      user: authReq.user, // may be undefined (guest)
    });

    return sendSuccess(res, "Notices fetched successfully", result);
  }

  /* ================= GET NOTICE BY SLUG ================= */
  static async getBySlug(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const { slug } = req.validatedParams as { slug: string };

    const notice = await NoticeService.getBySlug(slug, authReq.user);

    return sendSuccess(res, "Notice fetched successfully", notice);
  }

  /* ================= UPDATE NOTICE ================= */
  static async update(req: Request, res: Response) {
    return res.status(501).json({
      error: "Update notice controller not implemented yet",
    });
  }

  /* ================= CHANGE STATUS ================= */
  static async changeStatus(req: Request, res: Response) {
    return res.status(501).json({
      error: "Change notice status controller not implemented yet",
    });
  }

  /* ================= SOFT DELETE ================= */
  static async softDelete(req: Request, res: Response) {
    return res.status(501).json({
      error: "Soft delete notice controller not implemented yet",
    });
  }
}
