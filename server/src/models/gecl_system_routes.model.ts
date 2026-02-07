import { Schema, model, Document } from "mongoose";

/* -------------------------------------------------------------------------- */
/*                               SUB TYPES                                     */
/* -------------------------------------------------------------------------- */

export interface BackendRoute {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
}

export interface SeoImage {
  url: string;
  alt: string;
}

export interface FrontendPage {
  url: string; // frontend route
  coverImage?: string; // og / share image
  images?: SeoImage[]; // seo images with alt
}

/* -------------------------------------------------------------------------- */
/*                              MAIN INTERFACE                                 */
/* -------------------------------------------------------------------------- */

export interface IGeclSystemRoute extends Document {
  permission: string; // IMMUTABLE business permission

  backend?: BackendRoute[]; // multiple backend APIs
  frontend?: FrontendPage[]; // multiple frontend pages

  name: string; // admin label
  description?: string;

  defaultRoles: string[]; // auto-assign permissions
  status: "active" | "disabled";

  createdAt: Date;
  updatedAt: Date;
}

/* -------------------------------------------------------------------------- */
/*                                 SCHEMA                                     */
/* -------------------------------------------------------------------------- */

const GeclSystemRouteSchema = new Schema<IGeclSystemRoute>(
  {
    /* ---------------- Permission ---------------- */
    permission: {
      type: String,
      required: true,
      unique: true,
      immutable: true, // 🔐 NEVER CHANGE
      index: true,
    },

    /* ---------------- Backend APIs ---------------- */
    backend: [
      {
        method: {
          type: String,
          enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    /* ---------------- Frontend Pages ---------------- */
    frontend: [
      {
        url: {
          type: String,
          required: true,
          index: true,
        },

        coverImage: {
          type: String,
        },

        images: [
          {
            url: {
              type: String,
              required: true,
            },
            alt: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],

    /* ---------------- Admin Meta ---------------- */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    /* ---------------- Defaults ---------------- */
    defaultRoles: {
      type: [String],
      default: [],
      index: true,
    },

    /* ---------------- System ---------------- */
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/* -------------------------------------------------------------------------- */
/*                                  MODEL                                     */
/* -------------------------------------------------------------------------- */

export const GeclSystemRoute = model<IGeclSystemRoute>(
  "gecl_system_routes",
  GeclSystemRouteSchema,
);
