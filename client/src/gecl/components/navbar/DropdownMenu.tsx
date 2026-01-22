"use client";

import Link from "next/link";
import { MenuItem } from "@/gecl/config/menu.config";
import { cn } from "@/gecl/lib/cn";
import { motion } from "framer-motion";

interface DropdownMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const DropdownMenu = ({ items, isOpen, onClose }: DropdownMenuProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "absolute top-full left-0 mt-3 min-w-65",
        // THEME: Navy Background with slight transparency (Glass effect)
        "bg-gecl-nav-bg/95 backdrop-blur-md",
        "rounded-xl shadow-2xl shadow-black/20",
        // BORDERS: Subtle white border for definition + Saffron Top
        "border border-white/10",
        "border-t-[3px] border-t-gecl-accent",
        "py-2 z-50 overflow-hidden",
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg group",
              "text-white/90 text-sm font-medium",
              "transition-all duration-200 ease-in-out",
              // HOVER: Lighten background slightly + Saffron Text
              "hover:bg-white/10 hover:text-gecl-secondary", // Cream/White text on hover
              "hover:pl-5", // Subtle slide right animation
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors duration-200",
                  "text-white/50",
                  // Icon glows Saffron on hover
                  "group-hover:text-gecl-accent",
                )}
              />
            )}
            <span className="flex-1 group-hover:text-white transition-colors">
              {item.label}
            </span>
          </Link>
        );
      })}
    </motion.div>
  );
};
