// utils/apiRequest.ts
import { AxiosError } from "axios";
import { api } from "@/gecl/services/api/api";
import { tokenService } from "@/gecl/services/api/tokenService";
import { refreshToken } from "@/gecl/services/api/refreshToken";
import type { ApiRequestOptions, ApiResponse } from "@/types/api";

export async function apiRequest<TResponse, TBody = unknown>(
  options: ApiRequestOptions<TBody>,
): Promise<ApiResponse<TResponse>> {
  const makeRequest = async () => {
    const token = tokenService.getAccessToken();

    return api.request<ApiResponse<TResponse>>({
      ...options,
      headers: {
        ...(options.data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  };

  try {
    const res = await makeRequest();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<TResponse>>;

    const status = error.response?.status;
    const code = error.response?.data?.code ?? error.response?.data?.resultCode;

    const isExpired = status === 401 || code === "ACCESS_EXPIRED";

    // ⛔ Not an auth issue → return error
    if (!isExpired) {
      return (
        error.response?.data ?? {
          success: false,
          statusCode: 0,
          message: error.message || "Network error",
          data: null,
        }
      );
    }

    // 🔁 Try refresh ONCE
    try {
      const newToken = await refreshToken();
      console.log("newToken", newToken);

      const retryRes = await api.request<ApiResponse<TResponse>>({
        ...options,
        headers: {
          ...(options.data instanceof FormData
            ? {}
            : { "Content-Type": "application/json" }),
          Authorization: `Bearer ${newToken}`,
          ...options.headers,
        },
      });

      return retryRes.data;
    } catch (refreshErr) {
      tokenService.removeTokenData();

      return {
        success: false,
        statusCode: 401,
        message: "Session expired. Please login again.",
        data: null,
      };
    }
  }
}
