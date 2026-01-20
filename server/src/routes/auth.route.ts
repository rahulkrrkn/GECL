import { Router } from "express";

import { validateBody } from "../middlewares/validateBody.mid.js";
import { login } from "../validations/index.js";

import {
  geclEmailSendOtp,
  geclEmailVerifyOtp,
  geclIdPasswordLogin,
} from "../controllers/auth/login.crtl.js";

import {
  studentRegSendOtp,
  studentRegEmailVerifyOtp,
} from "../controllers/auth/registrationOtpSendVerify.ctrl.js";

import { studentRegistrationMainCtrl } from "../controllers/auth/studentRegistration.ctrl.js";
import { refreshAccessToken } from "../controllers/auth/refreshToken.ctrl.js";

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
  validateBody(login.studentRegistrationSchema),
  studentRegistrationMainCtrl,
);

export default auth;
