import { type Method, type RawAxiosRequestHeaders } from "axios";

// =======================
// Token
// =======================

export type AccessTokenData = {
  token: string;
  expiresAt?: string;
  allow?: string[];
  deny?: string[];
  allowExtra?: string[];
  role?: string[];
  personType?: string;
};

// =======================
// API Core Types
// =======================

export type ApiSuccess<T> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  code?: string;
  resultCode?: string;
  status?: string;
  GECL_ACCESS_TOKEN?: AccessTokenData;
};

export type ApiFailure = {
  success: false;
  statusCode: number;
  message: string;
  data: null;
  code?: string;
  resultCode?: string;
  status?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

// =======================
// Auth-specific success
// =======================

export type AuthData<T = unknown> = T & {
  GECL_ACCESS_TOKEN: AccessTokenData;
};

// =======================
// Request Options
// =======================

export type ApiRequestOptions<TBody = unknown> = {
  method?: Method;
  url: string;
  data?: TBody | FormData | null;
  params?: Record<string, unknown>;
  headers?: RawAxiosRequestHeaders;
};
