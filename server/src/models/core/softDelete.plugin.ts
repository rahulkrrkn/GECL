import { Schema, Query } from "mongoose";

interface SoftDeleteOptions {
  includeDeleted?: boolean;
}

export function softDeletePlugin(schema: Schema) {
  schema.add({
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: Date,
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  });

  // ---------- FIND / FINDONE / FINDBYID / UPDATE ----------
  schema.pre<Query<any, any>>(/^find/, function (this: Query<any, any>) {
    const options = this.getOptions() as SoftDeleteOptions;

    if (!options?.includeDeleted) {
      this.where({ isDeleted: false });
    }
  });

  // ---------- COUNT ----------
  schema.pre<Query<any, any>>(/^count/, function (this: Query<any, any>) {
    const options = this.getOptions() as SoftDeleteOptions;

    if (!options?.includeDeleted) {
      this.where({ isDeleted: false });
    }
  });

  // ---------- AGGREGATE ----------
  schema.pre("aggregate", function (this: any) {
    if (!this.options?.includeDeleted) {
      this.pipeline().unshift({
        $match: { isDeleted: false },
      });
    }
  });
}
