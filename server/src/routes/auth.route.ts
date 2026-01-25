import { Router } from "express";
import { renameToR2 } from "../services/fileRenameR2.service.js";

import { validateBody } from "../middlewares/validateBody.mid.js";
import { login } from "../validations/index.js";
import { createUploadMiddleware, MIME_GROUPS } from "../middlewares/upload.js";

import {
  geclEmailSendOtp,
  geclEmailVerifyOtp,
  geclIdPasswordLogin,
} from "../controllers/auth/login.crtl.js";

import {
  studentRegSendOtp,
  studentRegEmailVerifyOtp,
} from "../controllers/auth/registrationOtpSendVerify.ctrl.js";

import {
  employeeRegistrationMainCtrl,
  studentRegistrationMainCtrl,
} from "../controllers/auth/studentRegistration.ctrl.js";
import { refreshAccessToken } from "../controllers/auth/refreshToken.ctrl.js";
import { geclLogout } from "../controllers/auth/logout.ctrl.js";

const auth = Router();

/* =======================
   Login Routes
======================= */

auth.post("/login/email", validateBody(login.emailSendOtp), geclEmailSendOtp);

auth.post(
  "/login/email/verify",
  validateBody(login.emailVerifyOtp),
  geclEmailVerifyOtp,
);

auth.post(
  "/login/password",
  validateBody(login.loginWithPassword),
  geclIdPasswordLogin,
);

auth.post("/refresh", refreshAccessToken);

/* =======================
   Student Registration Routes
======================= */
const uploadProfilePic = createUploadMiddleware({
  minTotalFiles: 1,
  maxTotalFiles: 1,
  baseFolder: "GECL",
  fields: [
    {
      name: "profilePhoto",
      min: 1,
      max: 1,
      mimeTypes: [...MIME_GROUPS.images],
      sizeInKb: 51024,
      folder: "profilePic",
    },
  ],
});
auth.post(
  "/registration/otp/send",
  validateBody(login.emailSendOtp),
  studentRegSendOtp,
);

auth.post(
  "/registration/otp/verify",
  validateBody(login.emailVerifyOtp),
  studentRegEmailVerifyOtp,
);

auth.post(
  "/registration/student",
  uploadProfilePic,
  validateBody(login.studentRegistrationSchema),
  studentRegistrationMainCtrl,
);
auth.post(
  "/registration/employee",
  uploadProfilePic,
  validateBody(login.employeeRegistrationSchema),
  employeeRegistrationMainCtrl,
);

// auth.post("/registration/teacher", validateBody(login.teacherRegistrationSchema), teacherRegistrationMainCtrl);

// =======================
// Logout Routes
// =======================

auth.post("/logout", geclLogout);
auth.get("/logout", geclLogout);
export default auth;
