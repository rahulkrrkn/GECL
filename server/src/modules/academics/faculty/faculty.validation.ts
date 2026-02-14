import { z } from "zod";

/* ===========================================
   COMMON SCHEMAS
=========================================== */

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Mongo ID");

/* ===========================================
   FACULTY VALIDATION
=========================================== */

export class FacultyValidation {
  /* ---------- PARAMS ---------- */

  static getById = z.object({
    id: mongoId,
  });

  static getByDepartment = z.object({
    deptCode: z.string().min(1, "Department code is required"),
  });

  /* ---------- QUERY ---------- */

  static getAll = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    branch: z.string().optional(),
    designation: z.string().optional(),
    isActive: z.enum(["true", "false"]).optional(),
    search: z.string().optional(),
  });

  static search = z.object({
    q: z.string().min(1, "Search query is required"),
  });

  /* ---------- CREATE ---------- */

  static create = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    department: mongoId,
    designation: z.string(),
    qualification: z.string(),
    experience: z.number().min(0),
    bio: z.string().optional(),
  });

  /* ---------- UPDATE ---------- */

  static update = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(10).max(15).optional(),
    designation: z.string().optional(),
    qualification: z.string().optional(),
    experience: z.number().min(0).optional(),
    bio: z.string().optional(),
  });

  /* ---------- SELF UPDATE ---------- */

  static updateSelf = z.object({
    phone: z.string().min(10).max(15).optional(),
    bio: z.string().optional(),
  });

  /* ---------- STATUS ---------- */

  static updateStatus = z.object({
    isActive: z.boolean(),
  });

  /* ---------- ACADEMIC ---------- */

  static assignSubjects = z.object({
    subjects: z.array(mongoId).min(1),
  });

  static changeDepartment = z.object({
    department: mongoId,
  });

  static changeDesignation = z.object({
    designation: z.string(),
  });
}
