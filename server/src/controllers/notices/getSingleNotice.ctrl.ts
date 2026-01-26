import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { getGeclNoticeFUIConn } from "../../models/gecl_notice.model.js";

/**
 * @desc    Get Single Notice by Slug
 * @route   GET /api/v1/notices/:slug
 * @access  Public / Private (Role Dependent)
 */
export const getNoticeBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return sendError(res, "Notice Slug is required", {
        status: 400,
        code: "BAD_REQUEST",
      });
    }

    // 1. Role Definitions & User Scope
    const userRole = req.user?.role?.toLowerCase() || "guest";
    const SUPER_ROLES = ["admin", "super-admin", "super_admin"];
    const MANAGEMENT_ROLES = ["principal", "vice_principal", "hod"];
    const FACULTY_ROLES = ["teacher", "librarian", "tpo"];

    // 2. Build Security Filters
    const query: any = { slug };

    // A. Status Filter
    if (SUPER_ROLES.includes(userRole)) {
      // Admins see everything (Drafts, Deleted, etc.)
    } else if (MANAGEMENT_ROLES.includes(userRole)) {
      // Management sees everything EXCEPT Deleted
      query.status = { $ne: "DELETED" };
    } else {
      // Everyone else sees ONLY Published
      query.status = "PUBLISHED";
    }

    // B. Audience Filter
    if (
      !SUPER_ROLES.includes(userRole) &&
      !MANAGEMENT_ROLES.includes(userRole)
    ) {
      let allowedAudience = ["PUBLIC"];

      if (userRole === "student") {
        allowedAudience.push("STUDENTS");
      } else if (userRole === "staff") {
        allowedAudience.push("STAFF");
      } else if (FACULTY_ROLES.includes(userRole)) {
        allowedAudience.push("FACULTY");
      }

      // The notice MUST target at least one of the user's allowed audiences
      query.audience = { $in: allowedAudience };
    }

    // 3. Database Connection
    const NoticeModel = await getGeclNoticeFUIConn();

    // 4. Fetch & Increment View Count Atomically
    // findOneAndUpdate is safer than find() -> save() for counters
    const notice = await NoticeModel.findOneAndUpdate(
      query,
      { $inc: { viewsCount: 1 } }, // Increment views
      { new: true }, // Return the updated document
    )
      .select("-__v -updatedBy -addedBy") // Exclude internal fields
      .lean();

    if (!notice) {
      return sendError(
        res,
        "Notice not found or you do not have permission to view it.",
        {
          status: 404,
          code: "NOT_FOUND",
        },
      );
    }

    // 5. Success Response
    return sendSuccess(res, "Notice fetched successfully", notice);
  } catch (error) {
    console.error("[NoticeController] Error fetching single notice:", error);
    return sendError(res, "Internal Server Error", {
      status: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
