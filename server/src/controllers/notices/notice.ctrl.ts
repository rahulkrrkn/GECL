import type { Request, Response } from "express";
import slugify from "slugify";

import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { getGeclNoticeFUIConn } from "../../models/gecl_notice.model.js";
import { renameToR2 } from "../../services/fileUploadRenameR2.service.js";

// Interface for Body
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

// Interface for Attachment Object (Matches Schema)
interface AttachmentData {
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

// ==============================
// ✅ CREATE NOTICE CONTROLLER
// ==============================
export const createNotice = async (req: Request, res: Response) => {
  try {
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
    } = req.validatedBody as NoticeBody;

    const { userId } = req.user;

    // 1. Validation
    if (
      !title ||
      !content ||
      !category ||
      !department ||
      !audience ||
      isPinned === undefined ||
      !status
    ) {
      return sendError(res, "Missing required fields", {
        status: 400,
        code: "BAD_REQUEST",
      });
    }

    const NoticeModel = await getGeclNoticeFUIConn();

    // 2. Slug Logic
    let slug = slugify(title, { lower: true, strict: true });
    let slugExists = await NoticeModel.findOne({ slug });
    let counter = 1;
    while (slugExists) {
      const newSlug = slugify(`${title}-${counter}`, {
        lower: true,
        strict: true,
      });
      slugExists = await NoticeModel.findOne({ slug: newSlug });
      if (!slugExists) slug = newSlug;
      counter++;
    }

    // 3. File Upload & Object Construction
    const finalAttachments: AttachmentData[] = [];
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const attachmentFiles = files?.attachments || [];

    if (attachmentFiles.length > 0) {
      const random = Math.floor(Math.random() * 100000);
      const date = new Date().getTime();

      const newFileNames = attachmentFiles.map(
        (_, index) => `${slug}-${random}-${date}-${index}`,
      );

      const uploaded = await renameToR2({
        req,
        fileNames: { attachments: newFileNames },
      });

      if (!uploaded) {
        return sendError(res, "File upload failed", {
          status: 500,
          code: "UPLOAD_FAILED",
        });
      }

      // ✅ FIX: Combine R2 URL with Multer Metadata
      if (uploaded.attachments && uploaded.attachments.length > 0) {
        uploaded.attachments.forEach((uploadResult: any, index: number) => {
          const originalFile = attachmentFiles[index];

          if (originalFile && uploadResult.url) {
            // Create the exact object structure your Schema expects
            finalAttachments.push({
              fileUrl: uploadResult.url, // From R2
              fileName: originalFile.originalname, // From User's PC
              fileType: originalFile.mimetype, // e.g. 'application/pdf'
              fileSize: originalFile.size, // e.g. 102400 (bytes)
            });
          }
        });
      }
    }

    // 4. Create Document
    const newNotice = new NoticeModel({
      source: "GECL", // Force Source
      title,
      slug,
      content,
      category,
      department,
      audience,
      attachments: finalAttachments, // ✅ Passing Array of Objects
      isPinned,
      status,
      publishAt: publishAt || new Date(),
      expireAt: expireAt || null,
      addedBy: userId,
      updatedBy: null,
    });

    await newNotice.save();

    return sendSuccess(res, "Notice created successfully", {
      data: newNotice,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    return sendError(res, "Internal Server Error", {
      status: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
