// services/auth/refreshToken.ts
import axios from "axios";
import type { ApiResponse, AuthData } from "@/types/api";
import { tokenService } from "./tokenService";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.geclakhisarai.com";

export async function refreshToken(): Promise<string> {
  const res = await axios.post<ApiResponse<AuthData>>(
    `${BASE_URL}/auth/login/refresh`,
    {},
    { withCredentials: true },
  );

  if (!res.data.success) {
    throw new Error("Refresh failed");
  }

  const tokenData = res.data.GECL_ACCESS_TOKEN;
  if (!tokenData) {
    throw new Error("Refresh failed");
  }

  tokenService.setTokenData(tokenData);

  return tokenData.token;
}
