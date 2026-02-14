import { Router } from "express";
import { LoginValidation } from "./login.validation.js";
import { validateRequest } from "../../../middlewares/validateRequest.mid.js";
import { LoginController } from "./login.controller.js";
import { requireTrustedOrigin } from "../../../middlewares/requireTrustedOrigin.middleware.js";

const auth = Router();

/* =======================
   Login Routes
======================= */

// 1. Email OTP Flow
auth.post(
  "/email/otp/send",
  validateRequest({ body: LoginValidation.loginSendEmailOtp }),
  LoginController.loginSendEmailOtp,
);
auth.post(
  "/email/otp/resend",
  validateRequest({ body: LoginValidation.loginSendEmailOtp }),
  LoginController.loginResendEmailOtp,
);

auth.post(
  "/email/otp/verify",
  validateRequest({ body: LoginValidation.loginVerifyEmailOtp }),
  LoginController.loginVerifyEmailOtp,
);

// 2. Password Flow
auth.post(
  "/password",
  validateRequest({ body: LoginValidation.loginUsingPassword }),
  LoginController.loginUsingPassword,
);

// 3. Google Flow
auth.post(
  "/google",
  validateRequest({ body: LoginValidation.loginUsingGoogle }),
  LoginController.loginUsingGoogle,
);

// 4. Refresh Token Flow
auth.post("/refresh", requireTrustedOrigin, LoginController.refreshSession);

export default auth;
