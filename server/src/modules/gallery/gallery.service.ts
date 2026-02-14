import type { Request, Response } from "express";
import {
  GalleryMediaStatus,
  GalleryVisibility,
  gecl_gallery_media,
} from "../../models/gecl_gallery_media.model.js";
import AnnouncementModel from "../../models/gecl_announcement.model.js";
import { renameToR2 } from "../../helpers/fileUploadRenameR2.helper.js";
import { slugify } from "../../utils/slugify.utils.js";
import { BadRequestError } from "../../errors/httpErrors.err.js";
export class GalleryService {
  static async getCategory() {
    return await AnnouncementModel.aggregate([
      {
        $match: {
          galleryCategory: { $exists: true, $nin: [null, ""] },
        },
      },
      {
        $sort: { createdAt: -1 }, // latest first
      },
      {
        $group: {
          _id: "$galleryCategory", // group by category
          docId: { $first: "$_id" }, // ✅ collection main _id
          latestCreatedAt: { $first: "$createdAt" },
        },
      },
      {
        $sort: { latestCreatedAt: -1 },
      },
      {
        $project: {
          _id: 0,
          id: "$docId", // collection document id
          category: "$_id", // category name
        },
      },
    ]);
  }

  /* ================= UPLOAD ================= */

  static async upload(req: Request): Promise<void> {
    const user = req.user;
    if (!user) throw new BadRequestError("User not authenticated");

    const announcementId = req.validatedBody?.categoryId;
    if (!announcementId)
      throw new BadRequestError("Announcement ID is required");

    const announcement = await AnnouncementModel.findById(announcementId);
    if (!announcement) throw new BadRequestError("Announcement not found");
    if (!announcement.galleryEnabled)
      throw new BadRequestError("Gallery is not enabled");

    const { galleryCategory, title } = announcement;
    if (!galleryCategory || !title)
      throw new BadRequestError("Gallery not configured");

    const uploaded = await renameToR2({
      req,
      fileNames: {
        images: [`${slugify(title)}-${Date.now()}`],
      },
    });

    if (!uploaded?.images?.length)
      throw new BadRequestError("No images uploaded");

    const autoApprove = user.allow?.includes("gallery:approve") ?? false;

    await gecl_gallery_media.insertMany(
      uploaded.images.map((file: any) => ({
        announcementId,
        category: galleryCategory,
        fileUrl: file.url,
        capturedAt: file.capturedAt,
        status: autoApprove
          ? GalleryMediaStatus.APPROVED
          : GalleryMediaStatus.PENDING,
        visibility: GalleryVisibility.PUBLIC,
        uploadedBy: user.userId,
        ...(autoApprove && {
          approvedBy: user.userId,
          approvedAt: new Date(),
        }),
        isDeleted: false,
      })),
    );
  }

  /* ================= PUBLIC ================= */

  // static async getGallery(query: any, user: any) {
  //   return gecl_gallery_media
  //     .find({
  //       category: query.category,
  //       status: GalleryMediaStatus.APPROVED,
  //       isDeleted: false,
  //     })
  //     .sort({
  //       sortOrder: 1,
  //       manualCapturedAt: 1,
  //       capturedAt: 1,
  //       uploadedAt: 1,
  //     });
  // }

  // static async getCategories() {
  //   return gecl_gallery_media.aggregate([
  //     { $match: { status: "APPROVED", isDeleted: false } },
  //     {
  //       $group: {
  //         _id: "$category",
  //         date: { $min: "$capturedAt" },
  //       },
  //     },
  //     { $sort: { date: -1 } },
  //   ]);
  // }

  /* ================= MODERATION ================= */

  // static async getPending() {
  //   return gecl_gallery_media.find({
  //     status: GalleryMediaStatus.PENDING,
  //     isDeleted: false,
  //   });
  // }

  // static async moderate(body: any, adminId: string) {
  //   return gecl_gallery_media.findByIdAndUpdate(
  //     body.mediaId,
  //     {
  //       status:
  //         body.action === "APPROVE"
  //           ? GalleryMediaStatus.APPROVED
  //           : GalleryMediaStatus.REJECTED,
  //       approvedBy: adminId,
  //       approvedAt: new Date(),
  //       rejectionReason: body.rejectionReason,
  //     },
  //     { new: true },
  //   );
  // }
}
