import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { sendError, sendSuccess } from "../../helpers/response.helper.js";
import { emailNormalization } from "../../utils/index.js";
import { getGeclUserFUIConn } from "../../models/gecl_user.model.js";
import { makeGeclUserLogin } from "../../services/auth/makeGeclUserLogin.service.js";

// Ensure Client ID is defined or crash early/handle gracefully
const GECL_GOOGLE_CLIENT_ID = process.env.GECL_GOOGLE_CLIENT_ID || "";
const client = new OAuth2Client(GECL_GOOGLE_CLIENT_ID);

export const geclGoogleAccountLogin = async (req: Request, res: Response) => {
  try {
    // 1. Check Server Configuration
    if (!GECL_GOOGLE_CLIENT_ID) {
      console.error("Missing GECL_GOOGLE_CLIENT_ID in .env");
      return sendError(res, "Server configuration error", {
        status: 500,
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    const token = req?.validatedBody?.token?.trim();

    if (!token) {
      return sendError(res, "Google Token is required", {
        status: 400,
        code: "INVALID_INPUT",
      });
    }

    // 2. Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GECL_GOOGLE_CLIENT_ID, // ✅ Fixed: Now strictly a string
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      return sendError(res, "Invalid Google Token payload", {
        status: 400,
        code: "INVALID_TOKEN_PAYLOAD",
      });
    }

    const googleSub = payload.sub;
    const rawEmail = payload.email;
    const email = emailNormalization(rawEmail);

    if (!email) {
      return sendError(res, "Invalid email format from Google", {
        status: 400,
        code: "INVALID_EMAIL",
      });
    }

    const AuthUser = await getGeclUserFUIConn();

    let user = null;
    let methodForLogin = "google";

    // 3. PRIORITY 1: Check if user exists via Google Sub ID
    const userBySub = await AuthUser.findOne({ googleSub })
      .select("_id email role status")
      .lean();

    if (userBySub) {
      user = userBySub;
      methodForLogin = "google-sub"; // ✅ Case 1: Existing Google Link
    } else {
      // 4. PRIORITY 2: Check via Email (Binding Logic)
      const userByEmail = await AuthUser.findOne({ email })
        .select("_id email role status googleSub")
        .lean();

      if (userByEmail) {
        // Bind the account
        await AuthUser.updateOne(
          { _id: userByEmail._id },
          { $set: { googleSub: googleSub } },
        );
        user = userByEmail;
        methodForLogin = "google-email"; // ✅ Case 2: New Link via Email
      }
    }

    // 5. If still no user, FAIL
    if (!user) {
      return sendError(res, "Account not found. Please register first.", {
        status: 404,
        code: "ACCOUNT_NOT_FOUND",
      });
    }

    // 6. Security Status Checks
    if (user.status === "unverified") {
      return sendError(res, "Account is not verified", {
        status: 403,
        code: "ACCOUNT_NOT_VERIFIED",
      });
    }

    if (user.status !== "active") {
      return sendError(res, "Account is blocked", {
        status: 403,
        code: "ACCOUNT_BLOCKED",
      });
    }

    // 7. Perform Login
    const loginResult = await makeGeclUserLogin({
      loginMethod: methodForLogin as any,
      userId: user._id.toString(),
      req,
      res,
    });

    if (!loginResult.ok) {
      return sendError(res, "Login failed", {
        status: 401,
        code: loginResult.code,
      });
    }

    return sendSuccess(res, "Logged in successfully via Google", {
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error.message && error.message.includes("Invalid token signature")) {
      return sendError(res, "Invalid Google Token", {
        status: 401,
        code: "INVALID_TOKEN",
      });
    }

    console.error("Google Login Error:", error);
    return sendError(res, "Internal server error", {
      status: 500,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
