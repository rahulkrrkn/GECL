import type { Request, Response } from "express";

import { GalleryService } from "./gallery.service.js";
import { sendSuccess } from "../../helpers/response.helper.js";
import { BadRequestError } from "../../errors/httpErrors.err.js";

export class GalleryController {
  /* ================= GET CATEGORY =========== */
  static async getCategory(req: Request, res: Response) {
    const category = await GalleryService.getCategory();

    return sendSuccess(res, "Category fetched successfully", category);
  }

  // console.log("category", category);

  // res.status(200).json(category);

  /* ================= UPLOAD ================= */

  static async uploadGallery(req: Request, res: Response) {
    console.log("req.user", req.user);

    if (!req.user?.role) {
      throw new BadRequestError("Please login first");
    }

    const media = await GalleryService.upload(req);

    return sendSuccess(res, "Media uploaded successfully", media, {
      statusCode: 201,
    });
  }
}
