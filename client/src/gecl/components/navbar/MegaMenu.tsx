"use client";

import Link from "next/link";
import { MenuItem } from "@/gecl/config/menu.config";
import { cn } from "@/gecl/lib/cn";
import { motion } from "framer-motion";

interface MegaMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  parentLabel: string;
}

export const MegaMenu = ({
  items,
  isOpen,
  onClose,
  parentLabel,
}: MegaMenuProps) => {
  if (!isOpen) return null;

  // Calculate columns layout
  const columns: MenuItem[][] = [];
  const itemsPerColumn = Math.ceil(
    items.length / Math.min(Math.ceil(items.length / 4), 4),
  );

  for (let i = 0; i < items.length; i += itemsPerColumn) {
    columns.push(items.slice(i, i + itemsPerColumn));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-4",
        "w-[90vw] max-w-5xl",
        // THEME: Navy Glass
        "bg-gecl-nav-bg/95 backdrop-blur-md",
        "rounded-2xl shadow-2xl shadow-black/30",
        // BORDERS
        "border border-white/10",
        "border-t-[3px] border-t-gecl-accent",
        "z-50 overflow-hidden",
      )}
    >
      <div className="p-8">
        {/* Header Section */}
        <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white font-display tracking-tight">
            {parentLabel}
          </h3>
          <span className="text-xs font-bold text-gecl-accent uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
            Explore
          </span>
        </div>

        {/* Grid Section */}
        <div
          className={cn(
            "grid gap-x-10 gap-y-8",
            columns.length === 1 && "grid-cols-1",
            columns.length === 2 && "grid-cols-2",
            columns.length === 3 && "grid-cols-3",
            columns.length >= 4 && "grid-cols-4",
          )}
        >
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-3">
              {column.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl group",
                      "transition-all duration-200",
                      "hover:bg-white/5 border border-transparent hover:border-white/5",
                    )}
                  >
                    {Icon && (
                      <div
                        className={cn(
                          "shrink-0 w-10 h-10 rounded-lg mt-0.5",
                          "flex items-center justify-center shadow-inner",
                          // Icon Box Colors
                          "bg-black/20 text-white/70",
                          "group-hover:bg-gecl-accent group-hover:text-white",
                          "transition-colors duration-200",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white/90 group-hover:text-white transition-colors">
                        {item.label}
                      </div>
                      {item.description && (
                        <p className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed group-hover:text-white/70">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
