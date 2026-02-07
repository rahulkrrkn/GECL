import { Schema, model } from "mongoose";

/* -------------------------------------------------------------------------- */
/*                              ROLE INTERFACE                                 */
/* -------------------------------------------------------------------------- */
/**
 * NOTE:
 * - We DO NOT extend `Document`
 * - This avoids ObjectId vs string `_id` conflicts
 * - This is the correct modern Mongoose + TS pattern
 */
export interface IGeclRole {
  _id: string; // role key: admin | student | principal
  name: string; // human readable name
  permissions: string[]; // permission codes

  description?: string;

  isSystem: boolean; // system role (cannot delete)
  status: "active" | "disabled";

  createdAt?: Date;
  updatedAt?: Date;
}

/* -------------------------------------------------------------------------- */
/*                               ROLE SCHEMA                                   */
/* -------------------------------------------------------------------------- */

const GeclRoleSchema = new Schema<IGeclRole>(
  {
    /* ---------------- Role Key ---------------- */
    _id: {
      type: String,
      required: true,
      immutable: true, // 🔐 NEVER CHANGE
      lowercase: true,
      trim: true,
    },

    /* ---------------- Role Name ---------------- */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /* ---------------- Permissions ---------------- */
    permissions: {
      type: [String],
      default: [],
      index: true,
    },

    /* ---------------- Description ---------------- */
    description: {
      type: String,
      trim: true,
    },

    /* ---------------- System Flags ---------------- */
    isSystem: {
      type: Boolean,
      default: false,
    },

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

export const GeclRole = model<IGeclRole>("gecl_roles", GeclRoleSchema);
