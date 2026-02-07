import type { Request, Response } from "express";
import { EventService } from "./events.service.js";
import { UnauthorizedError } from "../../../errors/httpErrors.err.js";
import { sendSuccess } from "../../../helpers/response.helper.js";

/* ================= TYPES ================= */
// (Same Auth types as NewsController)
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
  static async create(req: Request, res: Response) {
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

  static async getBySlug(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const { slug } = req.validatedParams as { slug: string };

    const event = await EventService.getBySlug(slug, authReq.user);

    return sendSuccess(res, "Event details fetched successfully", event);
  }
}
