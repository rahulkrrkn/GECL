import { useMemo, useState } from "react";
import {
  menuConfig,
  type MenuItem,
  type UserRole,
} from "@/gecl/config/menu.config";
import { useApi } from "@/gecl/hooks/useApi";
const TOKEN_KEY = "GECL_ACCESS_TOKEN";

type StoredTokenData = {
  token: string;
  expiresAt?: string;
  allow?: string[];
  deny?: string[];
  allowExtra?: string[];
  role?: UserRole[] | string[];
  personType?: string;
};

const ALL_ROLES: UserRole[] = [
  "guest",
  "student",
  "hod",
  "teacher",
  "vice_principal",
  "principal",
  "librarian",
  "tpo",
  "alumni",
  "staff",
  "admin",
  "super-admin",
];

const isValidRole = (role: unknown): role is UserRole =>
  typeof role === "string" && ALL_ROLES.includes(role as UserRole);

const normalizeRole = (role: unknown): UserRole => {
  if (role === "super_admin") return "super-admin";
  return isValidRole(role) ? role : "guest";
};

const normalizeRoles = (roles: unknown): UserRole[] => {
  if (!roles) return ["guest"];

  if (typeof roles === "string") {
    const r = normalizeRole(roles);
    return r === "guest" ? ["guest"] : [r];
  }

  // If backend sends role: ["teacher","principal"]
  if (Array.isArray(roles)) {
    const cleaned = roles.map(normalizeRole).filter((r) => r !== "guest");

    return cleaned.length ? cleaned : ["guest"];
  }

  return ["guest"];
};

const getInitialRoles = (): UserRole[] => {
  if (typeof window === "undefined") return ["guest"];

  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return ["guest"];

    const tokenData: StoredTokenData = JSON.parse(raw);
    return normalizeRoles(tokenData?.role);
  } catch {
    return ["guest"];
  }
};

export const useRole = () => {
  const { request } = useApi();
  // ✅ now role is array internally
  const [roles, setRoles] = useState<UserRole[]>(() => getInitialRoles());
  const [isLoading] = useState(false);

  // ✅ menu shows items for ANY role (teacher + principal both)
  const filteredMenu = useMemo(() => {
    const filterByRoles = (items: MenuItem[]): MenuItem[] => {
      return items
        .filter((item) => {
          // public item
          if (!item.roles || item.roles.length === 0) return true;

          // show if user has at least one role that matches
          return item.roles.some((r) => roles.includes(r));
        })
        .map((item) => ({
          ...item,
          children: item.children ? filterByRoles(item.children) : undefined,
        }));
    };

    return filterByRoles(menuConfig);
  }, [roles]);

  // ✅ keep same API for Navbar

  const logout = async () => {
    // request;
    const res = await request(
      {
        method: "GET",
        url: "/auth/logout",
      },
      { showMsg: false, showErrorMsg: false, showSuccessMsg: true },
    );
    if (res.success) {
      localStorage.removeItem(TOKEN_KEY);
      document.cookie =
        "GECL_ACCESS_TOKEN=; path=/; max-age=0; SameSite=Strict; Secure";
      localStorage.removeItem(TOKEN_KEY);
      setRoles(["guest"]);
    } else {
      alert("Failed to logout");
    }
  };

  // Optional: if you still use login() anywhere for testing
  const login = (newRole: UserRole) => {
    if (typeof window === "undefined") return;

    const safeRole = normalizeRole(newRole);

    // ⚠️ Don't destroy your token object, update safely
    const raw = localStorage.getItem(TOKEN_KEY);
    const existing = raw ? (JSON.parse(raw) as StoredTokenData) : null;

    const updated: StoredTokenData = {
      ...(existing ?? ({} as StoredTokenData)),
      token: existing?.token ?? "",
      role: [safeRole],
    };

    localStorage.setItem(TOKEN_KEY, JSON.stringify(updated));
    setRoles([safeRole]);
  };

  const isAuthenticated = !roles.includes("guest");

  return {
    filteredMenu,
    isAuthenticated,
    logout,
    isLoading,
    login, // kept so your current code doesn't break anywhere
  };
};
