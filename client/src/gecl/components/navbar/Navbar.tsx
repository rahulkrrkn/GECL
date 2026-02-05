"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LuMenu, LuSearch, LuBell } from "react-icons/lu";
import { useRole } from "@/gecl/hooks/useRole";
import { useScrolled } from "@/gecl/hooks/useScrolled";
import { DesktopMenu } from "./DesktopMenu";
import { cn } from "@/gecl/lib/cn";
import Image from "next/image";

const MainDrawer = dynamic(
  () =>
    import("@/gecl/components/navbar/MainDrawer").then((mod) => mod.MainDrawer),
  { ssr: false },
);

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { filteredMenu, isAuthenticated, logout, isLoading } = useRole();
  const isScrolled = useScrolled(10);

  // UPDATED: Show top 5 items on desktop now
  const topMenuItems = useMemo(() => filteredMenu.slice(0, 5), [filteredMenu]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-99",
          "transition-all duration-300 ease-in-out",
          // Always Navy Background
          "bg-gecl-nav-bg",
          isScrolled ? "shadow-md py-1" : "py-3 sm:py-2",
        )}
      >
        <div className="container mx-auto pl-4 pr-0 lg:pl-6 lg:pr-2">
          <div className="flex items-center justify-between gap-4">
            {/* --- LEFT: Logo --- */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div
                className={cn(
                  "w-10 h-10 lg:w-11 lg:h-11 rounded-lg",
                  // "bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center",
                  // "transition-all duration-300 group-hover:bg-white/20",
                )}
              >
                <span className="text-white font-display font-bold text-xl">
                  <Image
                    className="rounded"
                    src="/gecl/images/college/gec-lakhisarai-logo-circular.webp"
                    alt="GEC Lakhisarai official rectangle logo"
                    width={220}
                    height={60}
                    priority
                  />
                  {/* GECL */}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight tracking-tight">
                  GEC Lakhisarai
                </span>
                <span className="text-gecl-nav-hover text-[10px] uppercase tracking-wider font-medium opacity-80">
                  Estd. 2019
                </span>
              </div>
            </Link>

            {/* --- CENTER: Desktop Menu (5 Items) --- */}
            <div className="hidden lg:block">
              {!isLoading && <DesktopMenu items={topMenuItems} />}
            </div>

            {/* --- RIGHT: Icons & Menu Toggle --- */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              <button
                className="p-2.5 rounded-full text-gecl-nav-text hover:bg-white/10 transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <LuSearch className="w-5 h-5" />
              </button>

              <button
                className="hidden sm:flex p-2.5 rounded-full text-gecl-nav-text hover:bg-white/10 transition-colors relative"
                aria-label="Notifications"
              >
                <LuBell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gecl-accent rounded-full border border-gecl-nav-bg shadow-sm" />
              </button>

              <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block" />

              <button
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                  "text-gecl-nav-text hover:bg-white/10",
                  "border border-transparent hover:border-white/10",
                )}
                onClick={() => setIsDrawerOpen(true)}
              >
                <LuMenu className="w-6 h-6" />
                <span className="hidden lg:inline text-sm font-medium">
                  Menu
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Floating Search Bar --- */}
        <div
          className={cn(
            "absolute top-full left-0 w-full bg-gecl-surface shadow-lg overflow-hidden transition-all duration-300 ease-in-out border-b border-gecl-border",
            searchOpen
              ? "h-16 opacity-100 translate-y-0"
              : "h-0 opacity-0 -translate-y-2 pointer-events-none",
          )}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <LuSearch className="w-5 h-5 text-gecl-text-muted mr-3" />
            <input
              autoFocus={searchOpen}
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-gecl-text-primary placeholder:text-gecl-text-muted h-full text-lg"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 text-sm font-bold text-gecl-text-muted"
            >
              ESC
            </button>
          </div>
        </div>
      </header>

      <MainDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={filteredMenu}
        isAuthenticated={isAuthenticated}
        onLogout={logout}
      />

      <div className="h-14.75 lg:h-15.25" />
    </>
  );
};
