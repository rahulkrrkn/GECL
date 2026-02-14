import z from "zod";

export class GalleryValidation {
  static upload = z.object({
    categoryId: z.string().min(1, "Category is required"),
  });
}
