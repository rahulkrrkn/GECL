// "use client";

// import { useCallback, useState } from "react";
// import { useRouter } from "next/navigation";
// import type { RawAxiosRequestHeaders } from "axios";

// import { apiRequest, type ApiResult } from "../utils/apiRequest";
// // import AlertMessage from "@/components/ui/AlertMessage";
// // import { useToast } from "@/hooks/useToast.hook";

// type ApiArgs<TData = unknown> = {
//   method?: "GET" | "POST" | "PUT" | "DELETE";
//   url: string;
//   data?: TData | FormData | null;
//   params?: Record<string, unknown>;
//   headers?: RawAxiosRequestHeaders;
// };

// type ApiOptions = {
//   showFullLoading?: boolean;
//   loadingMsg?: string;

//   showSuccessMsg?: boolean;
//   successMsg?: string | null;

//   showErrorMsg?: boolean;
//   errorMsg?: string | null;

//   showMsg?: boolean;
//   redirectOnSuccess?: string | null;
// };

// export const useApi = () => {
//   const { success, error, showLoading, hideLoading, confirmDialog } = useToast();
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(false);
//   const [AlertUI, setAlertUI] = useState<JSX.Element | null>(null);

//   const setMessage = (msg: string, type: "success" | "error" = "success") => {
//     setAlertUI(<AlertMessage msg={msg} type={type} />);
//   };

//   const request = useCallback(
//     async <TResponse, TData = unknown>(
//       args: ApiArgs<TData>,
//       options: ApiOptions = {}
//     ): Promise<ApiResult<TResponse>> => {
//       const {
//         showFullLoading = false,
//         loadingMsg = "Loading...",

//         showSuccessMsg = true,
//         successMsg = null,

//         showErrorMsg = true,
//         errorMsg = null,

//         showMsg = true,
//         redirectOnSuccess = null,
//       } = options;

//       if (showFullLoading) showLoading(loadingMsg);
//       setIsLoading(true);

//       try {
//         const res = await apiRequest<TResponse, TData>({
//           method: args.method ?? "GET",
//           url: args.url,
//           data: args.data ?? null,
//           params: args.params ?? {},
//           headers: args.headers ?? {},
//         });

//         if (res.success) {
//           const msg = successMsg ?? res.message;

//           if (showMsg) setMessage(msg, "success");
//           if (showSuccessMsg) success(msg, "Success");

//           if (redirectOnSuccess) router.push(redirectOnSuccess);
//         } else {
//           const msg = errorMsg ?? res.message;

//           if (showMsg) setMessage(msg, "error");

//           if (showErrorMsg) {
//             if (res.statusCode === 500) {
//               confirmDialog({
//                 title: "Error",
//                 message: msg,
//                 confirmText: "Yes, redirect to home",
//                 oneButton: true,
//                 onConfirm: () => router.push("/"),
//               });
//             } else {
//               error(msg, "Error");
//             }
//           }
//         }

//         return res;
//       } finally {
//         if (showFullLoading) hideLoading();
//         setIsLoading(false);
//       }
//     },
//     [router, success, error, showLoading, hideLoading, confirmDialog]
//   );

//   return { request, isLoading, AlertUI, setMessage };
// };
