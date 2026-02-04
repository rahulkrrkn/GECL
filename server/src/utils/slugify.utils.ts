/**
 * Converts a string into a URL-friendly slug.
 * Example: "Hello World! @2024" -> "hello-world-2024"
 */
export const slugify = (text: string): string => {
  if (!text) return "";

  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // 1. Normalize accents (e.g., "café" -> "cafe")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // 2. Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // 3. Remove all non-word chars (except hyphens)
      .replace(/[^\w\-]+/g, "")
      // 4. Replace multiple hyphens with single hyphen ("a---b" -> "a-b")
      .replace(/\-\-+/g, "-")
      // 5. Remove trailing/leading hyphens
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
};
