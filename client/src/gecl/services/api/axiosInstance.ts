import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
const TOKEN_KEY = "GECL_ACCESS_TOKEN";

const tokenService = {
  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeAccessToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};

type GeclResponse = {
  GECL_ACCESS_TOKEN?: string;
  GECL_ACCESS_TOKEN_EXPIRE?: boolean;
  message?: string;
  status?: string;
};

type RetryAxiosRequestConfig = AxiosRequestConfig & { _retry?: boolean };

const BASE_URL = "http://localhost:3001/";

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
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
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
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      // IMPORTANT: plain axios (not api instance)
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

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

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
