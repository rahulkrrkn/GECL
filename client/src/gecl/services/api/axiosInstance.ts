import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const TOKEN_KEY = "GECL_ACCESS_TOKEN";

// ADDED: Exported so you can use it in your UI (e.g., Logout button)
export const tokenService = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  removeAccessToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
};

type GeclResponse = {
  GECL_ACCESS_TOKEN?: string;
  GECL_ACCESS_TOKEN_EXPIRE?: boolean;
  message?: string;
  status?: string;
};

type RetryAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// FIXED: Removed trailing slash
const BASE_URL = "http://localhost:3001";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ---------------------------
// Attach token automatically
// ---------------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccessToken();

    if (token) {
      // Safe header setting using AxiosHeaders class
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ---------------------------
// Refresh Queue System
// ---------------------------
type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });
  failedQueue = [];
};

// ---------------------------
// Response: store token + refresh if expired
// ---------------------------
api.interceptors.response.use(
  (response: AxiosResponse<GeclResponse>) => {
    const newToken = response.data?.GECL_ACCESS_TOKEN;
    if (newToken) tokenService.setAccessToken(newToken);

    return response;
  },

  async (error: AxiosError<GeclResponse>) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

    if (!originalRequest) return Promise.reject(error);

    const isTokenExpired =
      error.response?.data?.GECL_ACCESS_TOKEN_EXPIRE === true ||
      error.response?.data?.message === "GECL_ACCESS_TOKEN_EXPIRE";

    if (!isTokenExpired) return Promise.reject(error);

    if (originalRequest._retry) {
      tokenService.removeAccessToken();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If refresh already running -> queue request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        } else if (!(originalRequest.headers instanceof AxiosHeaders)) {
          // Convert plain object to AxiosHeaders if necessary
          originalRequest.headers = new AxiosHeaders(originalRequest.headers);
        }

        originalRequest.headers.set("Authorization", `Bearer ${token}`);
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const refreshRes = await axios.post<GeclResponse>(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      );

      const newToken = refreshRes.data?.GECL_ACCESS_TOKEN;

      if (!newToken)
        throw new Error("Refresh API did not return GECL_ACCESS_TOKEN");

      tokenService.setAccessToken(newToken);
      processQueue(null, newToken);

      if (!originalRequest.headers) {
        originalRequest.headers = new AxiosHeaders();
      } else if (!(originalRequest.headers instanceof AxiosHeaders)) {
        originalRequest.headers = new AxiosHeaders(originalRequest.headers);
      }

      originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

      return api(originalRequest);
    } catch (refreshError: unknown) {
      processQueue(refreshError, null);
      tokenService.removeAccessToken();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
