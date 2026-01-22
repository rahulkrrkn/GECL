"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronDown } from "react-icons/lu";
import { MenuItem } from "@/gecl/config/menu.config";
import { cn } from "@/gecl/lib/cn";
import { DropdownMenu } from "./DropdownMenu";
import { MegaMenu } from "./MegaMenu";
import { AnimatePresence } from "framer-motion";

export const DesktopMenu = ({ items }: { items: MenuItem[] }) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (item: MenuItem) => {
    if (pathname === item.href) return true;
    return (
      item.children?.some((child) => pathname.startsWith(child.href)) ?? false
    );
  };

  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isMenuOpen = openMenu === item.label;
        const active = isActive(item);

        // Common styles for both Link and Button types
        const finalClasses = cn(
          "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
          // Default state
          "text-white/90 hover:text-white hover:bg-white/10",
          // Active state (Current Page)
          active &&
            "bg-white/15 text-[var(--color-gecl-accent)] font-semibold shadow-inner",
          // Menu Open State
          isMenuOpen && "bg-white/20 text-white",
        );

        if (!hasChildren) {
          return (
            <Link key={item.label} href={item.href} className={finalClasses}>
              {item.label}
            </Link>
          );
        }

        return (
          <div
            key={item.label}
            className="relative group"
            onMouseEnter={() => setOpenMenu(item.label)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            {/* UPDATED: This is now a Link, not a button */}
            <Link
              href={item.href}
              className={finalClasses}
              // Optional: Close menu when clicked if you want instant navigation
              onClick={() => setOpenMenu(null)}
            >
              <span>{item.label}</span>
              <LuChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200 opacity-70",
                  isMenuOpen && "rotate-180 opacity-100",
                  active && "text-gecl-accent",
                )}
              />
            </Link>

            <AnimatePresence>
              {isMenuOpen &&
                (item.megaMenu ? (
                  <MegaMenu
                    items={item.children!}
                    isOpen={isMenuOpen}
                    onClose={() => setOpenMenu(null)}
                    parentLabel={item.label}
                  />
                ) : (
                  <DropdownMenu
                    items={item.children!}
                    isOpen={isMenuOpen}
                    onClose={() => setOpenMenu(null)}
                  />
                ))}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
};
