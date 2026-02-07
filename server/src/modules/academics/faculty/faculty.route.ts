import { Router } from "express";
import { validateRequest } from "../../../middlewares/validateRequest.mid.js";
import {
  createUploadMiddleware,
  MIME_GROUPS,
} from "../../../middlewares/upload.mid.js";

// -- Validations --
import { FacultyValidation } from "./faculty.validation.js";
import { FacultyController } from "./faculty.controller.js";

// -- Permissions --
import {
  checkUser,
  requirePermission,
} from "../../../middlewares/permissionSystem.mdl.js";
import { PERMISSIONS } from "../../../config/pagePermissionData.config.js";

const faculty = Router();

/* ===========================================
   1️⃣ PUBLIC ROUTES (COLLEGE WEBSITE)
=========================================== */

// Get all faculty
faculty.get(
  "/",
  validateRequest({ query: FacultyValidation.getAll }),
  FacultyController.getAllFaculty,
);

// Get faculty by ID
faculty.get(
  "/:id",
  validateRequest({ params: FacultyValidation.getById }),
  FacultyController.getFacultyById,
);

// Get faculty by department
faculty.get(
  "/department/:deptCode",
  validateRequest({ params: FacultyValidation.getByDepartment }),
  FacultyController.getFacultyByDepartment,
);

// Search faculty
faculty.get(
  "/search",
  validateRequest({ query: FacultyValidation.search }),
  FacultyController.searchFaculty,
);

/* ===========================================
   2️⃣ FACULTY SELF ROUTES (PORTAL)
=========================================== */

// faculty.get(
//   "/me",
//   checkUser,
//   requirePermission(PERMISSIONS.FACULTY.READ_SELF),
//   FacultyController.getMyProfile,
// );

// faculty.patch(
//   "/me",
//   checkUser,
//   requirePermission(PERMISSIONS.FACULTY.UPDATE_SELF),
//   validateRequest({ body: FacultyValidation.updateSelf }),
//   FacultyController.updateMyProfile,
// );

/* ===========================================
   3️⃣ ADMIN MANAGEMENT ROUTES
=========================================== */

// // Create faculty
// faculty.post(
//   "/",
//   checkUser,
//   requirePermission(PERMISSIONS.FACULTY.CREATE),
//   createUploadMiddleware({
//     fieldName: "profileImage",
//     mimeGroups: [MIME_GROUPS.IMAGE],
//     maxSizeMB: 2,
//   }),
//   validateRequest({ body: FacultyValidation.create }),
//   FacultyController.createFaculty,
// );

// Update faculty
faculty.patch(
  "/:id",
  checkUser,
  requirePermission(PERMISSIONS.FACULTY.UPDATE),
  validateRequest({
    params: FacultyValidation.getById,
    body: FacultyValidation.update,
  }),
  FacultyController.updateFaculty,
);

// // Update faculty status (Active / Inactive)
// faculty.patch(
//   "/:id/status",
//   checkUser,
//   requirePermission(PERMISSIONS.NOTICE.UPDATE_STATUS),
//   validateRequest({
//     params: FacultyValidation.getById,
//     body: FacultyValidation.updateStatus,
//   }),
//   FacultyController.updateFacultyStatus,
// );

// Soft delete faculty
faculty.delete(
  "/:id",
  checkUser,
  requirePermission(PERMISSIONS.FACULTY.DELETE),
  validateRequest({ params: FacultyValidation.getById }),
  FacultyController.deleteFaculty,
);

/* ===========================================
   4️⃣ ACADEMIC / ROLE ASSIGNMENT ROUTES
=========================================== */

// // Assign subjects to faculty
// faculty.patch(
//   "/:id/subjects",
//   checkUser,
//   requirePermission(PERMISSIONS.FACULTY.ASSIGN_SUBJECT),
//   validateRequest({
//     params: FacultyValidation.getById,
//     body: FacultyValidation.assignSubjects,
//   }),
//   FacultyController.assignSubjects,
// );

// Change department
// faculty.patch(
//   "/:id/department",
//   checkUser,
//   requirePermission(PERMISSIONS.FACULTY.UPDATE),
//   validateRequest({
//     params: FacultyValidation.getById,
//     body: FacultyValidation.changeDepartment,
//   }),
//   FacultyController.changeDepartment,
// );

// // Change designation
// faculty.patch(
//   "/:id/designation",
//   checkUser,
//   requirePermission(PERMISSIONS.FACULTY.UPDATE),
//   validateRequest({
//     params: FacultyValidation.getById,
//     body: FacultyValidation.changeDesignation,
//   }),
//   FacultyController.changeDesignation,
// );

export default faculty;
