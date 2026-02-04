"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/gecl/lib/cn";
import { Breadcrumb } from "@/gecl/components/ui";

interface PageHeroProps {
  title: string;
  highlightWord?: string; // ✨ NEW: Manually choose which word to highlight
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  image?: string;
  mobileImage?: string;
  breadcrumbItems: { label: string; href?: string }[];
  className?: string; // Background color override (e.g. "bg-teal-950")
  themeColor?: string; // Text highlight color (e.g. "text-teal-400")
}

export default function PageHero({
  title,
  highlightWord,
  description,
  badge,
  icon,
  image,
  mobileImage,
  breadcrumbItems,
  className,
  themeColor = "text-gecl-accent",
}: PageHeroProps) {
  // === 🧠 SMART HIGHLIGHT LOGIC ===
  let mainPart = title;
  let highlightPart = "";

  if (highlightWord && title.includes(highlightWord)) {
    // Case 1: Manual Highlight (highlights specific word anywhere)
    const parts = title.split(highlightWord);
    mainPart = parts[0];
    highlightPart = highlightWord + (parts[1] || "");
    // Note: This simplistic split works for "End" highlights.
    // For middle highlights, we render {parts[0]} <span>{highlight}</span> {parts[1]}
  } else {
    // Case 2: Default (Auto-highlight last word)
    const titleParts = title.split(" ");
    highlightPart = titleParts.pop() || "";
    mainPart = titleParts.join(" ");
  }

  // === ANIMATION VARIANTS ===
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const popVars: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, type: "spring", bounce: 0.5 },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="sticky top-12 z-40"
      >
        <Breadcrumb items={breadcrumbItems} />
      </motion.div>
      <section
        className={cn(
          "relative text-white py-20 lg:py-28 overflow-hidden",
          !className && "bg-gecl-primary",
          className,
        )}
      >
        {/* ================= BACKGROUND LAYERS ================= */}

        {/* 1. Base Dark Gradient (Allows custom bg color to shine) */}
        <div className="absolute inset-0 bg-linear-to-br from-black/60 to-black/20 z-0 pointer-events-none"></div>

        {/* 2. Desktop Image */}
        {image && (
          <div
            className={cn(
              "absolute inset-0 z-0",
              mobileImage ? "hidden md:block" : "block",
            )}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay transition-opacity duration-700"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        )}

        {/* 3. Mobile Image */}
        {mobileImage && (
          <div className="absolute inset-0 z-0 md:hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay transition-opacity duration-700"
              style={{ backgroundImage: `url(${mobileImage})` }}
            ></div>
          </div>
        )}

        {/* 4. Gradient Overlay (Generic Dark Fade) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-0 pointer-events-none"></div>

        {/* 5. Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] z-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        {/* ================= CONTENT ================= */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVars}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          {/* --- TOP ICON (Big Circle) --- */}
          {icon && (
            <motion.div variants={popVars} className="flex justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl ring-1 ring-white/10">
                <span
                  className={cn(
                    "text-3xl md:text-4xl drop-shadow-md",
                    themeColor,
                  )}
                >
                  {icon}
                </span>
              </div>
            </motion.div>
          )}

          {/* --- BADGE (Pill) --- */}
          {badge && (
            <motion.div
              variants={itemVars}
              className="flex justify-center mb-4"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/10 border border-white/20 font-bold text-xs uppercase tracking-widest backdrop-blur-sm shadow-sm",
                  themeColor,
                )}
              >
                {badge}
              </span>
            </motion.div>
          )}

          {/* --- TITLE WITH HIGHLIGHT --- */}
          <motion.h1
            variants={itemVars}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display mb-6 tracking-tight drop-shadow-xl"
          >
            {highlightWord && title.includes(highlightWord) ? (
              // Logic for Manual Middle Highlight
              <>
                {title.split(highlightWord)[0]}
                <span className={cn(themeColor, "drop-shadow-sm")}>
                  {highlightWord}
                </span>
                {title.split(highlightWord)[1]}
              </>
            ) : (
              // Logic for Auto Last Word Highlight
              <>
                {mainPart}{" "}
                <span className={cn(themeColor, "drop-shadow-sm")}>
                  {highlightPart}
                </span>
              </>
            )}
          </motion.h1>

          {/* --- DESCRIPTION --- */}
          {description && (
            <motion.p
              variants={itemVars}
              className="text-lg md:text-2xl text-slate-100 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Breadcrumb */}
    </>
  );
}
