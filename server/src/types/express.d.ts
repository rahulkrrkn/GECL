import "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
      user?: {
        _id: string;
        userId: string;
        email: string;
        roles: string[];
      };
    }
  }
}

export {};
