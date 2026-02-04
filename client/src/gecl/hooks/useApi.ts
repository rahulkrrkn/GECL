"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/gecl/utils/apiRequest";
import type { ApiRequestOptions, ApiResponse } from "@/types/api";

type ApiOptions = {
  showFullLoading?: boolean; // Useful for triggering global spinners
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
    async <TResponse, TBody = unknown>(
      args: ApiRequestOptions<TBody>,
      options: ApiOptions = {},
    ): Promise<ApiResponse<TResponse>> => {
      setIsLoading(true);
      const res = await apiRequest<TResponse, TBody>(args);
      setIsLoading(false);

      if (!res.success && res.statusCode === 401) {
        router.push("/login");
      }

      return res;
    },
    [router],
  );

  return { request, isLoading };
};
