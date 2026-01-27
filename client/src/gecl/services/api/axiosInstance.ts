import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const TOKEN_KEY = "GECL_ACCESS_TOKEN";

type StoredTokenData = {
  token: string;
  expiresAt?: string;
  allow?: string[];
  deny?: string[];
  allowExtra?: string[];
  role?: string[];
  personType?: string;
};

export const tokenService = {
  getTokenData(): StoredTokenData | null {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as StoredTokenData;
    } catch {
      return null;
    }
  },

  getAccessToken(): string | null {
    return this.getTokenData()?.token ?? null;
  },

  setTokenData(data: StoredTokenData): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
  },

  removeTokenData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
};

type GeclResponse = {
  GECL_ACCESS_TOKEN?: StoredTokenData;
  GECL_IS_ACCESS_TOKEN_EXPIRED?: boolean;
  message?: string;
  status?: string;
};

type RetryAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.geclakhisarai.com";

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
      if (!config.headers) config.headers = new AxiosHeaders();
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
    const newTokenData = response.data?.GECL_ACCESS_TOKEN;

    if (newTokenData) {
      tokenService.setTokenData(newTokenData);
    }

    return response;
  },

  async (error: AxiosError<GeclResponse>) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;
    if (!originalRequest) return Promise.reject(error);

    const isTokenExpired =
      error.response?.data?.GECL_IS_ACCESS_TOKEN_EXPIRED === true ||
      error.response?.data?.message === "GECL_IS_ACCESS_TOKEN_EXPIRED";

    if (!isTokenExpired) return Promise.reject(error);

    // If already retried and still failing → logout
    if (originalRequest._retry) {
      tokenService.removeTokenData();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If refresh already running → queue request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        } else if (!(originalRequest.headers instanceof AxiosHeaders)) {
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

      const newTokenData = refreshRes.data?.GECL_ACCESS_TOKEN;

      if (!newTokenData?.token) {
        throw new Error("Refresh API did not return a valid token");
      }

      // Store full object
      tokenService.setTokenData(newTokenData);

      // Resolve all queued requests with ONLY token string
      processQueue(null, newTokenData.token);

      // Retry original request with new token
      if (!originalRequest.headers) {
        originalRequest.headers = new AxiosHeaders();
      } else if (!(originalRequest.headers instanceof AxiosHeaders)) {
        originalRequest.headers = new AxiosHeaders(originalRequest.headers);
      }

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${newTokenData.token}`,
      );

      return api(originalRequest);
    } catch (refreshError: unknown) {
      processQueue(refreshError, null);
      tokenService.removeTokenData();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
