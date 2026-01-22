import { AxiosError, type Method, type RawAxiosRequestHeaders } from "axios";
import { api } from "../services/api/axiosInstance";

// --------------------
// Backend response type
// --------------------
export type BackendResponse<T> = {
  success: boolean;
  statusCode: number;
  status: string;
  code: string;
  message: string;
  data: T;
  error: unknown | null;
};

// --------------------
// Success / Failure union
// --------------------
export type ApiSuccess<T> = BackendResponse<T> & { success: true };

export type ApiFailure = BackendResponse<null> & { success: false };

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

// --------------------
// Error payload type (axios error response)
// --------------------
interface BackendErrorResponse {
  message?: string;
  errors?: Record<string, unknown> | Array<unknown>;
  [key: string]: unknown;
}

// --------------------
// Request options
// --------------------
export type ApiRequestOptions<TBody = unknown> = {
  method?: Method;
  url: string;
  data?: TBody | FormData | null;
  params?: Record<string, unknown>;
  headers?: RawAxiosRequestHeaders;
};

// --------------------
// API Request function
// --------------------
export async function apiRequest<TResponse, TBody = unknown>({
  method = "GET",
  url,
  data = null,
  params = {},
  headers = {},
}: ApiRequestOptions<TBody>): Promise<ApiResult<TResponse>> {
  try {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    const response = await api.request<BackendResponse<TResponse>>({
      method,
      url,
      data,
      params,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
    });

    // ✅ backend already sends { success, statusCode, data, ... }
    // We just ensure success is boolean
    return {
      ...response.data,
      success: response.data.status === "success" ? true : false,
    } as ApiResult<TResponse>;
  } catch (err: unknown) {
    const error = err as AxiosError<BackendErrorResponse>;

    return {
      success: false,
      statusCode: error.response?.status ?? 0,
      status: "error",
      code: "",
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      data: null,
      error: error.response?.data?.errors || null,
    };
  }
}
