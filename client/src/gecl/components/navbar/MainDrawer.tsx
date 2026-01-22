"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuX,
  LuChevronDown,
  LuLogIn,
  LuLogOut,
  LuPhone,
  LuCircleHelp,
} from "react-icons/lu";
import { MenuItem } from "@/gecl/config/menu.config";
import { cn } from "@/gecl/lib/cn";
import { AnimatePresence, motion } from "framer-motion";

interface MainDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
}

const DrawerItem = ({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const isActive =
    pathname === item.href ||
    item.children?.some((child) => pathname.startsWith(child.href));

  // ✅ Auto-open active section on first render (NO useEffect needed)
  const [isExpanded, setIsExpanded] = useState(() => isActive && hasChildren);

  // Common styles
  const iconClass = "w-5 h-5 transition-colors duration-200";

  // --- CASE 1: No Children (Simple Link) ---
  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 px-4 py-3.5 rounded-xl mx-3 mb-1",
          "text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gecl-accent text-white shadow-lg shadow-orange-900/20"
            : "text-white/80 hover:bg-white/10 hover:text-white",
        )}
      >
        {Icon && (
          <Icon
            className={cn(iconClass, isActive ? "text-white" : "text-white/60")}
          />
        )}
        <span>{item.label}</span>
      </Link>
    );
  }

  // --- CASE 2: Has Children (Complex Interaction) ---
  // "Link only on name, Else work for open/close"
  return (
    <div className="mx-3 mb-1">
      <div
        // 1. CLICKING THE ROW (Background/Icon/Arrow) -> TOGGLES MENU
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between rounded-xl transition-all duration-200 cursor-pointer group",
          isActive ? "bg-white/10" : "hover:bg-white/5",
        )}
      >
        <div className="flex-1 flex items-center gap-0">
          {/* ICON AREA (Triggers Open/Close) */}
          <div className="p-3.5 pl-4">
            {Icon && (
              <Icon
                className={cn(
                  iconClass,
                  "text-white/60 group-hover:text-white",
                )}
              />
            )}
          </div>

          {/* 2. CLICKING THE NAME -> NAVIGATES (Stops Toggle) */}
          <Link
            href={item.href}
            onClick={(e) => {
              e.stopPropagation(); // Stop the row from toggling
              onClose(); // Close the drawer and navigate
            }}
            className={cn(
              "py-3.5 pr-4 text-sm font-medium transition-colors",
              // Make the text look like a distinct link
              isActive ? "text-white" : "text-white/80 hover:text-gecl-accent",
            )}
          >
            {item.label}
          </Link>
        </div>

        {/* ARROW AREA (Triggers Open/Close) */}
        <div className="p-3.5 pr-4 border-l border-white/5 group-hover:border-white/10 text-white/40 group-hover:text-white transition-colors">
          <LuChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              isExpanded && "rotate-180 text-white",
            )}
          />
        </div>
      </div>

      {/* Submenu Animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-5 pl-4 border-l border-white/10 my-1 space-y-1">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className={cn(
                    "block px-3 py-2.5 rounded-lg text-sm transition-colors duration-200",
                    pathname === child.href
                      ? "text-gecl-accent font-semibold bg-white/5"
                      : "text-white/60 hover:text-white hover:bg-white/5",
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MainDrawer = ({
  isOpen,
  onClose,
  items,
  isAuthenticated,
  onLogout,
}: MainDrawerProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Content - DARK NAVY THEME */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1],
            }}
            className={cn(
              "relative w-[85vw] max-w-sm h-full flex flex-col shadow-2xl",
              "bg-gecl-primary",
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gecl-primary">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Menu
                </h2>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-0.5">
                  Navigation
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors group"
              >
                <LuX className="w-6 h-6 text-white/70 group-hover:text-white" />
              </button>
            </div>

            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
              {items.map((item) => (
                <DrawerItem key={item.label} item={item} onClose={onClose} />
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/10 bg-gecl-primary">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 hover:border-white font-medium transition-all"
                >
                  <LuLogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl",
                    "bg-gecl-accent text-white",
                    "font-bold shadow-lg shadow-orange-900/20",
                    "hover:bg-[#a3360a] active:scale-[0.98]",
                    "transition-all duration-200",
                  )}
                >
                  <LuLogIn className="w-5 h-5" />
                  Student Login
                </Link>
              )}

              <div className="mt-6 flex items-center justify-center gap-4 text-xs font-medium text-white/40">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <LuPhone className="w-3.5 h-3.5" /> Contact
                </Link>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <Link
                  href="/support"
                  onClick={onClose}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <LuCircleHelp className="w-3.5 h-3.5" /> Help
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
