import type { Request, Response } from "express";
import { AnnouncementService } from "./notice.service.js";
import {
  BadRequestError,
  UnauthorizedError,
} from "../../../errors/httpErrors.err.js";
import { sendSuccess } from "../../../helpers/response.helper.js";

/* ==============================
   TYPES
============================== */

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

type AuthRequest = Request & {
  validatedBody?: any;
  files?: UploadedFilesMap;
  user?: AuthUser;
};

/* ==============================
   CONTROLLER
============================== */

export class NoticesController {
  /* =====================================================
     CREATE NOTICE
  ===================================================== */
  static async create(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    /* ---------- HARD AUTH CHECK ---------- */
    if (!authReq.user || !authReq.user._id) {
      throw new UnauthorizedError("User not authenticated");
    }

    /* ---------- FILE SAFETY ---------- */
    const files: UploadedFilesMap = authReq.files ?? {};

    /* ---------- SERVICE CALL ---------- */
    const notice = await AnnouncementService.createNotice({
      body: authReq.validatedBody ?? req.body,
      user: authReq.user, // ✅ now guaranteed
      req: authReq,
      files, // ✅ never undefined
    });

    return sendSuccess(res, "Notice created successfully", notice, {
      statusCode: 201,
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

    const result = await AnnouncementService.getAll({
      page: query.page,
      limit: query.limit,
      user: authReq.user,
    });

    return sendSuccess(res, "Notices fetched successfully", result);
  }

  /* ================= GET NOTICE BY SLUG ================= */
  static async getBySlug(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const { slug } = req.validatedParams as { slug: string };

    const notice = await AnnouncementService.getBySlug(slug, authReq.user);

    return sendSuccess(res, "Notice fetched successfully", notice);
  }

  /* ================= UPDATE NOTICE ================= */
  static async update(req: Request, res: Response) {
    return res.status(501).json({
      error: "Update notice controller not implemented yet",
    });
  }
}
