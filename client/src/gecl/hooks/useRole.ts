import { useMemo, useState } from "react";
import {
  menuConfig,
  type MenuItem,
  type UserRole,
} from "@/gecl/config/menu.config";

interface TokenPayload {
  role: UserRole;
}

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
  if (role === "super_admin") return "super-admin"; // optional support
  return isValidRole(role) ? role : "guest";
};

const getInitialRole = (): UserRole => {
  if (typeof window === "undefined") return "guest";

  try {
    const token = localStorage.getItem("GECL_ACCESS_TOKEN");
    if (!token) return "guest";

    const payload: TokenPayload = JSON.parse(token);
    return normalizeRole(payload?.role);
  } catch {
    return "guest";
  }
};

export const useRole = () => {
  const [role, setRole] = useState<UserRole>(() => getInitialRole());
  const [isLoading] = useState(false); // ✅ kept (for future async auth)

  const filteredMenu = useMemo(() => {
    const filterByRole = (items: MenuItem[]): MenuItem[] => {
      return items
        .filter((item) => !item.roles || item.roles.includes(role))
        .map((item) => ({
          ...item,
          children: item.children ? filterByRole(item.children) : undefined,
        }));
    };

    return filterByRole(menuConfig);
  }, [role]);

  const login = (newRole: UserRole) => {
    if (typeof window === "undefined") return;

    const safeRole = normalizeRole(newRole);

    localStorage.setItem(
      "GECL_ACCESS_TOKEN",
      JSON.stringify({ role: safeRole }),
    );

    setRole(safeRole);
  };

  const logout = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("GECL_ACCESS_TOKEN");
    setRole("guest");
  };

  const isAuthenticated = role !== "guest";

  return {
    role,
    isLoading,
    filteredMenu,
    login,
    logout,
    isAuthenticated,
  };
};
