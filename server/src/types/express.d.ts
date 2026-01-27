import "express";

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: any;
      validatedBody?: any;
      validatedParams?: any;
      validatedHeaders?: any;
      user?: {
        _id: string;
        userId: string;
        email: string;
        roles?: string[];
      };
    }
  }
}

export {};
