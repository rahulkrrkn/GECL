import type { Request, Response } from "express";
import { NewsService } from "./news.service.js";
import {
  BadRequestError,
  UnauthorizedError,
} from "../../../errors/httpErrors.err.js";
import { sendSuccess } from "../../../helpers/response.helper.js";

/* ================= TYPES ================= */

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

/* ================= CONTROLLER ================= */

export class NewsController {
  /* ================= CREATE NEWS ================= */
  static async create(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    /* ---------- AUTH CHECK ---------- */
    // Security: Double check authentication before service call
    if (!authReq.user || !authReq.user._id) {
      throw new UnauthorizedError("User not authenticated");
    }

    /* ---------- SERVICE CALL ---------- */
    const news = await NewsService.createNews({
      body: authReq.validatedBody ?? req.body,
      user: authReq.user,
      req: authReq,
      files: authReq.files ?? {},
    });

    return sendSuccess(res, "News created successfully", news, {
      statusCode: 201,
    });
  }

  /* ================= GET ALL NEWS ================= */
  static async getAll(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    const query = req.validatedQuery as {
      page: number;
      limit: number;
    };

    const result = await NewsService.getAll({
      page: query.page,
      limit: query.limit,
      user: authReq.user,
    });

    return sendSuccess(res, "News fetched successfully", result);
  }

  /* ================= GET NEWS BY SLUG ================= */
  static async getBySlug(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const { slug } = req.validatedParams as { slug: string };

    const news = await NewsService.getBySlug(slug, authReq.user);

    return sendSuccess(res, "News details fetched successfully", news);
  }
}
