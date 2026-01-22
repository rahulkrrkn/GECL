"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation"; // Use 'next/router' if using Pages router
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const request = useCallback(
    async <TResponse, TData = unknown>(
      args: ApiArgs<TData>,
      options: ApiOptions = {},
    ): Promise<ApiResult<TResponse>> => {
      // 1. Handle Loading
      if (options.showFullLoading) {
        console.log("Loading started...", options.loadingMsg);
        // You can trigger a global loading state here if you have a Context
      }
      setIsLoading(true);

      const res = await apiRequest<TResponse, TData>({
        method: args.method ?? "GET",
        url: args.url,
        data: args.data ?? null,
        params: args.params ?? {},
        headers: args.headers ?? {},
      });
      console.log("Response :", res);

      setIsLoading(false);

      // 2. Handle Success
      if (res.success) {
        if (options.showSuccessMsg || options.showMsg) {
          console.log("Success:", options.successMsg || "Operation Successful");
          // Replace console.log with toast.success(...)
        }

        if (options.redirectOnSuccess) {
          router.push(options.redirectOnSuccess);
        }
      }
      // 3. Handle Error
      else {
        if (options.showErrorMsg || options.showMsg) {
          console.error("Error:", options.errorMsg || res.message);
          // Replace console.error with toast.error(...)
        }
      }

      return res;
    },
    [router],
  );

  return { request, isLoading };
};
