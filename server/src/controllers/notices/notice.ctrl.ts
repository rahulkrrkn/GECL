import type { Request, Response } from "express";
import { slugify } from "../../utils/slugify.js"; // ✅ Custom utility import
import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { getGeclNoticeFUIConn } from "../../models/gecl_notice.model.js";
import { renameToR2 } from "../../services/fileUploadRenameR2.service.js";

// ✅ 1. Define Auth Request Type locally to fix TS errors
type AuthRequest = Request & {
  validatedBody?: NoticeBody;
  files?:
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File[];
};

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
    // ✅ 2. Cast Request to AuthRequest
    const authReq = req as AuthRequest;

    // ✅ 3. Robust User ID Check
    const userId = authReq.user?._id || authReq.user?.userId;

    if (!userId) {
      return sendError(res, "Unauthorized: User not found", {
        status: 401,
        code: "UNAUTHORIZED",
      });
    }

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
    } = authReq.validatedBody || req.body; // Fallback to req.body if validation middleware skipped

    // 4. Validation
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

    // 5. Slug Logic (Fixed for Custom Utility)
    //
    // Note: custom slugify() takes 1 arg, not 2 options
    let slug = slugify(title);

    let slugExists = await NoticeModel.findOne({ slug });
    let counter = 1;

    while (slugExists) {
      const newSlug = slugify(`${title}-${counter}`);
      slugExists = await NoticeModel.findOne({ slug: newSlug });
      if (!slugExists) slug = newSlug;
      counter++;
    }

    // 6. File Upload & Object Construction
    const finalAttachments: AttachmentData[] = [];

    // Handle Multer files safely
    const files = authReq.files as
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
        req: authReq, // Pass the casted request
        fileNames: { attachments: newFileNames },
      });

      if (!uploaded) {
        return sendError(res, "File upload failed", {
          status: 500,
          code: "UPLOAD_FAILED",
        });
      }

      // Combine R2 URL with Multer Metadata
      if (uploaded.attachments && uploaded.attachments.length > 0) {
        uploaded.attachments.forEach((uploadResult: any, index: number) => {
          const originalFile = attachmentFiles[index];

          if (originalFile && uploadResult.url) {
            finalAttachments.push({
              fileUrl: uploadResult.url,
              fileName: originalFile.originalname,
              fileType: originalFile.mimetype,
              fileSize: originalFile.size,
            });
          }
        });
      }
    }

    // 7. Create Document
    const newNotice = new NoticeModel({
      source: "GECL",
      title,
      slug,
      content,
      category,
      department,
      audience,
      attachments: finalAttachments,
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
