import "express";

declare global {
  namespace Express {
    interface Request {
      // ========================
      // VALIDATED INPUT
      // ========================
      validatedQuery?: any;
      validatedBody?: any;
      validatedParams?: any;
      validatedHeaders?: any;
      // ========================
      // AUTH USER (IDENTITY)
      // ========================
      user?: {
        _id: string;
        userId: string;
        email: string;
        role: string[];
        branch: string[];
        personType?: "student" | "employee";

        allow: string[];
        deny: string[];
        allowExtra: string[];
      };

      // ========================
      // REQUEST CONTEXT
      // ========================
      context: {
        ip: string;

        userAgent: string;
        requestId: string; // Unique ID for this specific request
        deviceHash: string; // Unique fingerprint for this device/IP combo
        country: string; // Optional: For Cloudflare/AWS users
      };
    }
  }
}

export {};
