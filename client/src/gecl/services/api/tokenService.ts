const TOKEN_KEY = "GECL_ACCESS_TOKEN";

export type StoredTokenData = {
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

    try {
      const raw = localStorage.getItem(TOKEN_KEY);
      return raw ? (JSON.parse(raw) as StoredTokenData) : null;
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
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};
