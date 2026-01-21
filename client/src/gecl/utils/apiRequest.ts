import type { AxiosError, Method, RawAxiosRequestHeaders } from "axios";
import { api } from "../services/api/axiosInstance";

export type ApiRequestOptions<TData = unknown> = {
  method?: Method;
  url: string;
  data?: TData | FormData | null;
  params?: Record<string, unknown>;
  headers?: RawAxiosRequestHeaders;
};

export const apiRequest = async <TResponse = any, TData = unknown>({
  method = "GET",
  url,
  data = null,
  params = {},
  headers = {},
}: ApiRequestOptions<TData>): Promise<
  { success: true; statusCode: number } & TResponse
> => {
  try {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    const response = await api.request<TResponse>({
      method,
      url,
      data,
      params,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
    });

    // ✅ SUCCESS: return response.data directly
    return {
      success: true,
      statusCode: response.status,
      ...(response.data as TResponse),
    };
  } catch (err: unknown) {
    const error = err as AxiosError<any>;

    const statusCode = error.response?.status ?? 0;
    const errorData = error.response?.data;

    // ✅ ERROR: return errorData directly
    if (typeof errorData === "object" && errorData !== null) {
      return {
        success: false as const,
        statusCode,
        ...(errorData as object),
      } as any;
    }

    // fallback if errorData is not object
    return {
      success: false as const,
      statusCode,
      message: error.message || "Something went wrong",
    } as any;
  }
};
