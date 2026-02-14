import type { Request, Response } from "express";
import { EventService } from "./events.service.js";
import {
  BadRequestError,
  UnauthorizedError,
} from "../../../errors/httpErrors.err.js";
import { sendSuccess } from "../../../helpers/response.helper.js";

/* ================= TYPES ================= */
type AuthUser = {
  _id: string;
  userId: string;
  email: string;
  role?: string[];
};

type AuthRequest = Request & {
  validatedBody?: any;
  files?: Record<string, any>;
  user?: AuthUser;
};

/* ================= CONTROLLER ================= */

export class EventController {
  static async verifyCategory(req: Request, res: Response) {
    const { category } = req.validatedBody as { category: string };

    if (!category) {
      throw new BadRequestError("Category is required");
    }

    const result = await EventService.verifyCategory(category);

    return sendSuccess(res, "Category verified successfully", result);
  }

  /* ================= CREATE EVENT ================= */
  static async create(req: Request, res: Response) {
    const galleryCategory = req.validatedBody?.galleryCategory;
    await EventService.verifyCategory(galleryCategory);

    const authReq = req as AuthRequest;

    if (!authReq.user || !authReq.user._id) {
      throw new UnauthorizedError("User not authenticated");
    }

    const event = await EventService.createEvent({
      body: authReq.validatedBody ?? req.body,
      user: authReq.user,
      req: authReq,
      files: authReq.files ?? {},
    });

    return sendSuccess(res, "Event created successfully", event, {
      statusCode: 201,
    });
  }

  /* ================= GET ALL EVENTS ================= */
  static async getAll(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const query = req.validatedQuery as {
      page: number;
      limit: number;
      filter: "UPCOMING" | "PAST" | "ALL";
    };

    const result = await EventService.getAll({
      page: query.page,
      limit: query.limit,
      filter: query.filter,
      user: authReq.user,
    });

    return sendSuccess(res, "Events fetched successfully", result);
  }

  /* ================= GET EVENT BY SLUG ================= */

  static async getBySlug(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const { slug } = req.validatedParams as { slug: string };

    const event = await EventService.getBySlug(slug, authReq.user);

    return sendSuccess(res, "Event details fetched successfully", event);
  }
}
