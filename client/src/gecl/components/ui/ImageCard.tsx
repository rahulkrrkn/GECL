"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaMagnifyingGlassPlus, FaXmark, FaDownload } from "react-icons/fa6";
import { cn } from "@/gecl/lib/cn";

// Define Styles
type CardVariant = "feature" | "gallery" | "offset" | "stack";

interface ImageCardProps {
  src: string;
  alt: string;
  variant?: CardVariant; // 'feature' (Academic), 'gallery' (Dark), 'offset' (Border), 'stack' (New)
  badge?: string; // Small tag (e.g., "Facility")
  title?: string; // Main title
  subTitle?: string; // Extra info (used in stack view)
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
  priority?: boolean; // Use true for top-fold images
  allowDownload?: boolean; // Default: false
}

export default function ImageCard({
  src,
  alt,
  variant = "feature",
  badge,
  title,
  subTitle,
  className,
  aspectRatio = "video",
  priority = false,
  allowDownload = false,
}: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Aspect Ratio Utility
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  return (
    <>
      {/* ================= THUMBNAIL CARD ================= */}
      <div
        className={cn(
          "cursor-zoom-in relative group w-full select-none",
          className,
        )}
        onClick={() => setIsOpen(true)}
      >
        {/* --- VARIANT 1: FEATURE (Academic Style - Your Favorite) --- */}
        {variant === "feature" && (
          <div
            className={cn(
              "relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100",
              aspectClasses[aspectRatio],
            )}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
            )}
            <Image
              src={src}
              alt={alt}
              fill
              onLoad={() => setIsLoading(false)}
              priority={priority}
              className={cn(
                "object-cover transition-all duration-700 group-hover:scale-105",
                isLoading ? "opacity-0" : "opacity-100",
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10" />
            {(badge || title) && (
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 bg-white/95 backdrop-blur px-4 py-2 md:px-5 md:py-3 rounded-xl shadow-lg border-l-4 border-yellow-500 transform transition-transform duration-300 group-hover:-translate-y-1">
                {badge && (
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {badge}
                  </p>
                )}
                {title && (
                  <p className="text-xs md:text-sm font-bold text-slate-900">
                    {title}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* --- VARIANT 2: GALLERY (Sleek Overlay) --- */}
        {variant === "gallery" && (
          <div
            className={cn(
              "relative w-full rounded-xl overflow-hidden shadow-lg bg-slate-900",
              aspectClasses[aspectRatio],
            )}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
            )}
            <Image
              src={src}
              alt={alt}
              fill
              onLoad={() => setIsLoading(false)}
              className={cn(
                "object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-60",
                isLoading ? "opacity-0" : "opacity-90",
              )}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {badge && (
                  <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1 block">
                    {badge}
                  </span>
                )}
                {title && (
                  <h3 className="text-white text-lg md:text-xl font-bold">
                    {title}
                  </h3>
                )}
                <span className="inline-flex items-center gap-2 text-white/70 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                  <FaMagnifyingGlassPlus className="text-yellow-400" /> View
                </span>
              </div>
            </div>
          </div>
        )}

        {/* --- VARIANT 3: OFFSET (Modern Border) --- */}
        {variant === "offset" && (
          <div className="relative isolate">
            <div
              className={cn(
                "absolute top-3 left-3 w-full h-full rounded-xl bg-gecl-primary/10 -z-10 transition-transform duration-300 group-hover:top-4 group-hover:left-4",
                aspectClasses[aspectRatio],
              )}
            ></div>
            <div
              className={cn(
                "relative w-full rounded-xl overflow-hidden shadow-md bg-white border border-slate-200",
                aspectClasses[aspectRatio],
              )}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-slate-100 animate-pulse z-0" />
              )}
              <Image
                src={src}
                alt={alt}
                fill
                onLoad={() => setIsLoading(false)}
                className={cn(
                  "object-cover transition-transform duration-500 group-hover:scale-105",
                  isLoading ? "opacity-0" : "opacity-100",
                )}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gecl-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                <div className="bg-white text-gecl-primary p-3 rounded-full shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <FaMagnifyingGlassPlus size={18} />
                </div>
              </div>
            </div>
            {title && (
              <p className="mt-4 font-bold text-slate-800 text-lg group-hover:text-gecl-primary transition-colors">
                {title}
              </p>
            )}
          </div>
        )}

        {/* --- VARIANT 4: STACK (Image Top, Title Bottom) --- */}
        {variant === "stack" && (
          <div className="flex flex-col gap-3 group">
            <div
              className={cn(
                "relative w-full rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50",
                aspectClasses[aspectRatio],
              )}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
              )}
              <Image
                src={src}
                alt={alt}
                fill
                onLoad={() => setIsLoading(false)}
                className={cn(
                  "object-cover transition-transform duration-700 group-hover:scale-110",
                  isLoading ? "opacity-0" : "opacity-100",
                )}
              />
              {/* Overlay Icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <FaMagnifyingGlassPlus
                  className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 drop-shadow-md"
                  size={24}
                />
              </div>
              {badge && (
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                  {badge}
                </span>
              )}
            </div>
            <div>
              {title && (
                <h3 className="font-bold text-slate-900 group-hover:text-gecl-primary transition-colors">
                  {title}
                </h3>
              )}
              {subTitle && <p className="text-sm text-slate-500">{subTitle}</p>}
            </div>
          </div>
        )}
      </div>

      {/* ================= FULLSCREEN LIGHTBOX (Common) ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setIsOpen(false)}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 group"
              title="Close"
            >
              <FaXmark
                size={24}
                className="group-hover:scale-110 transition-transform"
              />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  quality={95}
                  priority
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between w-full max-w-3xl text-white gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{title || alt}</h3>
                  {badge && (
                    <p className="text-sm text-yellow-400 font-medium">
                      {badge}
                    </p>
                  )}
                </div>

                {/* Conditional Download Button */}
                {allowDownload && (
                  <a
                    href={src}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-sm font-semibold transition-all border border-white/10 hover:border-white/30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaDownload /> Download
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
