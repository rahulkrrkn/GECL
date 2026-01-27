export function buildPublicUrl(key: string) {
  const base = (process.env.GECL_R2_PUBLIC_URL || "").replace(/\/$/, "");
  return `${base}/${key}`;
}
