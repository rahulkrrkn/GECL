import type { Request, Response, NextFunction } from "express";
import { LoginService } from "./login.service.js";
import { sendSuccess } from "../../../helpers/response.helper.js";
import { BadRequestError } from "../../../errors/httpErrors.err.js";

export class LoginController {
  static async loginUsingPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id, password } = req.validatedBody;
      const result = await LoginService.loginUsingPassword({
        id,
        password,
        req,
        res,
      });
      return sendSuccess(res, "Logged in successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async loginSendEmailOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.validatedBody;
      const result = await LoginService.sendEmailOtp(email);
      return sendSuccess(res, "OTP sent successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async loginVerifyEmailOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, otp } = req.validatedBody;
      const result = await LoginService.verifyEmailOtp({
        email,
        otp,
        req,
        res,
      });
      return sendSuccess(res, "Logged in successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async loginUsingGoogle(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { token } = req.validatedBody;
      const result = await LoginService.loginUsingGoogle({ token, req, res });
      return sendSuccess(res, "Logged in successfully via Google", result);
    } catch (error) {
      next(error);
    }
  }

  static async refreshSession(req: Request, res: Response, next: NextFunction) {
    try {
      const cookieRaw = req.cookies?.GECL_REFRESH_TOKEN;
      if (!cookieRaw)
        throw new BadRequestError("No refresh token", "NO_REFRESH");

      const clientIp = req.ip || null;
      const userAgent = req.headers["user-agent"] || null;

      const accessTokenData = await LoginService.refreshAccessToken({
        cookieRaw,
        clientIp,
        userAgent,
        res,
      });

      res.locals.publicData = res.locals.publicData || {};
      res.locals.publicData.GECL_ACCESS_TOKEN = accessTokenData;

      return sendSuccess(res, "Access token refreshed", {});
    } catch (error) {
      next(error);
    }
  }
}
