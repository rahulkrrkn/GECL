import type { Request, Response } from "express";
import GeclUser from "../../../models/gecl_user.model.js";
import { FacultyService } from "./faculty.service.js";
import { NotFoundError } from "../../../errors/httpErrors.err.js";
import { sendSuccess } from "../../../helpers/response.helper.js";
export class FacultyController {
  /* ===========================================
     1️⃣ PUBLIC ROUTES
  =========================================== */

  static async getAllFaculty(req: Request, res: Response) {
    const query = req.validatedQuery as {
      branch?: string;
      designation?: string;
      search?: string;
    };

    const filters: { branch?: string; designation?: string; search?: string } =
      {};
    if (query.branch) filters.branch = query.branch;
    if (query.designation) filters.designation = query.designation;
    if (query.search) filters.search = query.search;

    const faculty = await FacultyService.getAllFaculty(filters);

    return sendSuccess(res, "Faculty fetched successfully", faculty);
  }

  static async getFacultyById(req: Request, res: Response) {
    const faculty = await FacultyService.getFacultyById(req.validatedParams.id);

    if (!faculty) {
      throw new NotFoundError();
    }

    return sendSuccess(res, "Faculty fetched successfully", faculty);
  }

  static async getFacultyByDepartment(req: Request, res: Response) {
    const faculty = await FacultyService.getFacultyByDepartment(
      req.validatedParams.deptCode.toUpperCase(),
    );

    return sendSuccess(res, "Faculty fetched successfully", faculty);
  }

  static async searchFaculty(req: Request, res: Response) {
    const { q } = req.validatedQuery as { q: string };

    if (!q) {
      throw new NotFoundError();
    }

    const faculty = await FacultyService.searchFaculty(q as string);

    return sendSuccess(res, "Faculty fetched successfully", faculty);
  }

  /* ===========================================
     2️⃣ FACULTY SELF ROUTES
  =========================================== */

  static async getMyProfile(req: Request, res: Response) {
    return res.json({ message: "getMyProfile" });
  }

  static async updateMyProfile(req: Request, res: Response) {
    return res.json({ message: "updateMyProfile" });
  }

  /* ===========================================
     3️⃣ ADMIN MANAGEMENT
  =========================================== */

  static async createFaculty(req: Request, res: Response) {
    return res.json({ message: "createFaculty" });
  }

  static async updateFaculty(req: Request, res: Response) {
    return res.json({ message: "updateFaculty" });
  }

  static async updateFacultyStatus(req: Request, res: Response) {
    return res.json({ message: "updateFacultyStatus" });
  }

  static async deleteFaculty(req: Request, res: Response) {
    return res.json({ message: "deleteFaculty" });
  }

  /* ===========================================
     4️⃣ ACADEMIC / ROLE ASSIGNMENT
  =========================================== */

  static async assignSubjects(req: Request, res: Response) {
    return res.json({ message: "assignSubjects" });
  }

  static async changeDepartment(req: Request, res: Response) {
    return res.json({ message: "changeDepartment" });
  }

  static async changeDesignation(req: Request, res: Response) {
    return res.json({ message: "changeDesignation" });
  }
}
