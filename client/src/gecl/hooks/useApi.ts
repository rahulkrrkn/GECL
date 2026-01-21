"use client";

import { useCallback } from "react";
import type { RawAxiosRequestHeaders } from "axios";

import { apiRequest, type ApiResult } from "../utils/apiRequest";

type ApiArgs<TData = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: TData | FormData | null;
  params?: Record<string, unknown>;
  headers?: RawAxiosRequestHeaders;
};

type ApiOptions = {
  showFullLoading?: boolean;
  loadingMsg?: string;

  showSuccessMsg?: boolean;
  successMsg?: string | null;

  showErrorMsg?: boolean;
  errorMsg?: string | null;

  showMsg?: boolean;
  redirectOnSuccess?: string | null;
};

export const useApi = () => {
  const request = useCallback(
    async <TResponse, TData = unknown>(
      args: ApiArgs<TData>,
      options: ApiOptions = {},
    ): Promise<ApiResult<TResponse>> => {
      if (options) {
        console.log("Options Received in api");
      }
      try {
        const res = await apiRequest<TResponse, TData>({
          method: args.method ?? "GET",
          url: args.url,
          data: args.data ?? null,
          params: args.params ?? {},
          headers: args.headers ?? {},
        });
        console.log("Response :", res);

        return res;
      } finally {
      }
    },
    [],
  );

  return { request };
};
