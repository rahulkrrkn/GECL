import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { getGeclNoticeFUIConn } from "../../models/gecl_notice.model.js";
import type { GetNoticesQuery } from "../../validations/notice.val.js";

// ✅ Define AuthRequest locally to fix TS errors
type AuthRequest = Request & {
  query: {
    page?: string;
    limit?: string;
  };
};

/**
 * @desc    Get All Notices with Role-Based Filtering
 * @route   GET /api/v1/notices
 * @access  Public / Private (Role Dependent)
 */
export const getAllNotices = async (req: Request, res: Response) => {
  try {
    const validatedQuery = req.validatedQuery as GetNoticesQuery;
    const user = req.user;

    // 1. Pagination & Sorting (Using req.query for GET requests)
    const page = Math.max(1, Number(validatedQuery.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(validatedQuery.limit) || 20));
    const skip = (page - 1) * limit;

    // 2. Role Definitions
    const SUPER_ROLES = ["admin", "super-admin", "super_admin"];
    const MANAGEMENT_ROLES = [
      "principal",
      "vice_principal",
      "vice-principal",
      "hod",
    ];
    const FACULTY_ROLES = ["teacher", "librarian", "tpo"];

    // 3. Determine User Scope
    // ✅ FIX: Safely access first role from array
    const userRole = user?.roles?.[0]?.toLowerCase() || "guest";

    let query: any = {};

    // --- LOGIC A: STATUS FILTER ---
    if (SUPER_ROLES.includes(userRole)) {
      // Admin sees EVERYTHING (Draft, Published, Archived, Deleted)
    } else if (MANAGEMENT_ROLES.includes(userRole)) {
      // Management sees everything EXCEPT Deleted
      query.status = { $ne: "DELETED" };
    } else {
      // Everyone else (Student, Staff, Faculty, Public) sees ONLY Published
      query.status = "PUBLISHED";
    }

    // --- LOGIC B: AUDIENCE FILTER ---
    if (SUPER_ROLES.includes(userRole) || MANAGEMENT_ROLES.includes(userRole)) {
      // Admins & Management see notices for ALL audiences
    } else {
      // Restricted Access
      let allowedAudience = ["PUBLIC"];

      if (userRole === "student") {
        allowedAudience.push("STUDENTS");
      } else if (userRole === "staff") {
        allowedAudience.push("STAFF");
      } else if (FACULTY_ROLES.includes(userRole)) {
        allowedAudience.push("FACULTY");
      }

      // Filter: Audience array must contain at least one allowed tag
      query.audience = { $in: allowedAudience };
    }

    // 4. DB Connection & Execution
    const NoticeModel = await getGeclNoticeFUIConn();

    const [notices, totalDocs] = await Promise.all([
      NoticeModel.find(query)
        .sort({ isPinned: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "-expireAt -viewsCount -downloadsCount -createdAt -updatedAt -__v -addedBy -updatedBy",
        )
        .lean(), // High-performance read

      NoticeModel.countDocuments(query),
    ]);

    // 5. Response
    return sendSuccess(res, "Notices fetched successfully", {
      data: notices,
      meta: {
        total: totalDocs,
        page,
        limit,
        totalPages: Math.ceil(totalDocs / limit),
      },
    });
  } catch (error) {
    console.error("[NoticeController] Error fetching notices:", error);
    return sendError(res, "Internal Server Error", {
      status: 500,
      code: "INTERNAL_SERVER_ERROR",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
