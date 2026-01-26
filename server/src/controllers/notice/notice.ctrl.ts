import type { Request, Response } from "express";
import slugify from "slugify";
import mongoose from "mongoose";

import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { getGeclNoticeFUIConn } from "../../models/gecl_notice.model.js";

// ✅ FIXED: Use Intersection Type (&) to avoid conflict with global Express User type
// type AuthRequest = Request & {
//   user?: {
//     _id: string;
//     role: string;
//   };
//   validatedBody?: any;
// };

// ==============================
// ✅ CREATE NOTICE CONTROLLER
// ==============================
export const createNotice = async (req: Request, res: Response) => {};
