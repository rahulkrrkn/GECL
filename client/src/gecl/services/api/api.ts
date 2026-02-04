// services/api/api.ts
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.geclakhisarai.com";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
