import { Router } from "express";
// import { renameToR2 } from "../services/fileUploadRenameR2.service.js";

// import { validateBody } from "../middlewares/validateBody.mid.js";l
import { validateRequest } from "../../../middlewares/validateRequest.mid.js";
// import { login } from "../validations/index.js";
import {
  createUploadMiddleware,
  MIME_GROUPS,
} from "../../../middlewares/upload.mid.js";

// import {
//   employeeRegistrationMainCtrl,
//   studentRegistrationMainCtrl,
// } from "../controllers/auth.ctrl.js";
import { RegisterController } from "./register.controller.js";
import { RegisterValidation } from "./register.validation.js";
const auth = Router();

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
      sizeInKb: 5024,
      folder: "profilePic",
    },
  ],
});
auth.post(
  "/otp/send",
  validateRequest({ body: RegisterValidation.sendOtp }),
  RegisterController.sendOtp,
);

auth.post(
  "/otp/verify",
  validateRequest({ body: RegisterValidation.verifyOtp }),
  RegisterController.verifyOtp,
);

auth.post(
  "/student",
  uploadProfilePic,
  validateRequest({ body: RegisterValidation.registerStudent }),
  RegisterController.registerStudent,
);

auth.post(
  "/teacher",
  uploadProfilePic,
  validateRequest({ body: RegisterValidation.registerTeacher }),
  RegisterController.registerTeacher,
);

export default auth;
