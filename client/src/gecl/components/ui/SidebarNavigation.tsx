"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBookOpen, LuArrowRight } from "react-icons/lu";
import { cn } from "@/gecl/lib/cn";

// ✅ Fix: Added 'active' (optional) to solve the build error
export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarNavigationProps {
  title?: string;
  links: NavLink[];
  className?: string;
}

export default function SidebarNavigation({
  title = "Quick Navigation",
  links,
  className,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden", // ❌ Removed 'sticky top-24'
        className,
      )}
    >
      <div className="bg-gecl-primary p-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <LuBookOpen className="text-gecl-secondary" />
          {title}
        </h3>
      </div>
      <nav className="p-2 flex flex-col gap-1">
        {links.map((link) => {
          // Logic: Use manual 'active' prop if provided, else check pathname
          const isActive =
            link.active !== undefined
              ? link.active
              : pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                isActive
                  ? "bg-gecl-primary text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-50 hover:text-gecl-primary hover:pl-5",
              )}
            >
              {link.label}
              {isActive && <LuArrowRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
