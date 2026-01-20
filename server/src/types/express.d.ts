import "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export {};
