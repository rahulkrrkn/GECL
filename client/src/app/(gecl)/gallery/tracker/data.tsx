"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaSearch,
  FaFilter,
  FaExpand,
  FaDownload,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Shared Components
import { PageHero } from "@/gecl/components/ui";

// ✅ Image Data Source (Embedded directly)
export const imageLinks = [
  "/gecl/images/college-building-main.webp",
  "/gecl/images/principal-bimlesh-kumar.webp",
  "/gecl/images/campus/gecl-campus-main.webp",
  "/gecl/images/campus/college-building.webp",
  "/gecl/images/gov/cm-nitish-kumar.webp",
  "/gecl/images/gov/minister-sumit-singh.webp",
  "/gecl/images/admin-block.webp",
  "/gecl/images/gov/minister-dstte.webp",
  "/gecl/images/gov/secretary-dstte.webp",
  "/gecl/images/gov/vc-beu.webp",
  "/gecl/images/principal-event-1.webp",
  "/gecl/images/principal-event-2.webp",
  "/gecl/images/vision-future.webp",
  "/gecl/images/academic-building.webp",
  "/gecl/images/anti-ragging-poster.webp",
  "/gecl/images/calendar-2026-notice.webp",
  "/gecl/images/departments/dept-civil.webp",
  "/gecl/images/departments/dept-cse-ai.webp",
  "/gecl/images/departments/dept-cse-ds.webp",
  "/gecl/images/departments/dept-mech.webp",
  "/gecl/images/departments/dept-ee.webp",
  "/gecl/images/campus/college-building.webp",
  "/gecl/images/students-discipline.webp",
  "/gecl/images/students-harmony.webp",
  "/gecl/images/admissions/ugeac-counselling.webp",
  "/gecl/images/admissions/document-verification.webp",
  "/gecl/images/campus/seminar-hall.webp",
  "/gecl/images/hostel/gecl-hostel.webp",
  "/gecl/images/hostel/gecl-hostel-building.webp",
  "/gecl/images/hostel/mess-hall.webp",
  "/gecl/images/hostel/room-interior.webp",
  "/gecl/images/hostel/common-room.webp",
  "/gecl/images/hostel/hostel-garden.webp",
  "/gecl/images/academic/academic-block-building-exterior.webp",
  "/gecl/images/academic/central-library-reading-room.webp",
  "/gecl/images/academic/central-computer-center-lab.webp",
  "/gecl/images/academic/mechanical-civil-engineering-lab.webp",
  "/gecl/images/academic/smart-classroom-lecture-hall.webp",
  "/gecl/images/academic/seminar-hall-auditorium.webp",
  "/gecl/images/events/aagaz-college-fest.webp",
  "/gecl/images/events/technical-workshop-lab.webp",
  "/gecl/images/events/aagaz-cultural-fest.webp",
  "/gecl/images/academic/mobile-academic-hero.webp",
  "/gecl/images/campus/campus-life-hero-collage.webp",
  "/gecl/images/events/cultural-fest-stage-performance.webp",
  "/gecl/images/sports/cricket-football-ground-panoramic.webp",
  "/gecl/images/food/student-mess-hall-lunch.webp",
  "/gecl/images/library/central-library-interior.webp",
  "/gecl/images/labs/mechanical-workshop-lathe.webp",
  "/gecl/images/campus/college-security-gate.webp",
  "/gecl/images/campus/hostel-building-exterior.webp",
  "/gecl/images/food/college-canteen-cafeteria.webp",
  "/gecl/images/sports/college-gymnasium-interior.webp",
  "/gecl/images/sports/indoor-games-hall-table-tennis.webp",
  "/gecl/images/sports/yoga-wellness-center-interior.webp",
  "/gecl/images/sports/college-gymnasium-cardio-weights.webp",
  "/gecl/images/labs/cse-programming-lab.webp",
  "/gecl/images/labs/cse-database-lab.webp",
  "/gecl/images/labs/cse-hardware-lab.webp",
  "/gecl/images/labs/civil-concrete-lab.webp",
  "/gecl/images/labs/civil-survey-lab.webp",
  "/gecl/images/labs/civil-soil-lab.webp",
  "/gecl/images/labs/mechanical-workshop.webp",
  "/gecl/images/labs/mechanical-fluid-lab.webp",
  "/gecl/images/labs/mechanical-thermo-lab.webp",
  "/gecl/images/labs/eee-basic-lab.webp",
  "/gecl/images/labs/eee-digital-lab.webp",
  "/gecl/images/labs/eee-power-lab.webp",
  "/gecl/images/labs/physics-lab.webp",
  "/gecl/images/labs/chemistry-lab.webp",
  "/gecl/images/campus/basic-medical-room.webp",
  "/gecl/images/campus/anti-ragging-poster.webp",
  "/gecl/images/campus/campus-cctv-security.webp",
  "/gecl/images/college/gecl-government-engineering-college-lakhisarai.webp",
  "/gecl/images/library/circulation-counter.webp",
  "/gecl/images/library/digital-library-computers.webp",
  "/gecl/images/library/reading-room-students.webp",
  "/gecl/images/departments/cse-ai-hod-profile.webp",
  "/gecl/images/departments/cse-data-science-hod-profile.webp",
  "/gecl/images/departments/civil-engineering-hod-profile.webp",
  "/gecl/images/departments/electrical-and-electronics-engineering-hod-profile.webp",
  "/gecl/images/departments/mechanical-engineering-hod-profile.webp",
  "/gecl/images/departments/applied-science-humanities-hod-profile.webp",
  "/gecl/images/classroom-lecture.webp",
];

// Helper to extract category from path
const getCategory = (path: string) => {
  if (path.includes("/hostel/")) return "Hostel";
  if (path.includes("/labs/")) return "Labs";
  if (path.includes("/events/")) return "Events";
  if (path.includes("/sports/")) return "Sports";
  if (path.includes("/food/")) return "Canteen";
  if (path.includes("/academic") || path.includes("/library/"))
    return "Academic";
  if (path.includes("/gov/") || path.includes("principal")) return "Admin";
  return "Campus";
};

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev(e as any);
      if (e.key === "ArrowRight") handleNext(e as any);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const categories = [
    "All",
    "Campus",
    "Academic",
    "Labs",
    "Hostel",
    "Events",
    "Sports",
    "Admin",
  ];

  const filteredImages =
    selectedCategory === "All"
      ? imageLinks
      : imageLinks.filter((img) => getCategory(img) === selectedCategory);

  const handleNext = (e: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (prev) => (prev! - 1 + filteredImages.length) % filteredImages.length,
      );
    }
  };

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      <PageHero
        title="Campus Gallery"
        description="A visual journey through GECL Lakhisarai - Campus, Labs, Events, and Student Life."
        image="/gecl/images/campus/gecl-campus-main.webp"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-gecl-primary text-white shadow-md transform scale-105"
                  : "bg-white text-gecl-text-muted border border-gecl-border hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((src, index) => {
              // Extract filename for Alt Text
              const altText =
                src
                  .split("/")
                  .pop()
                  ?.replace(/-/g, " ")
                  .replace(".webp", "")
                  .replace(".jpg", "") || "GECL Image";

              return (
                <motion.div
                  key={src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg border border-gecl-border"
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={src}
                    alt={altText}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <span className="text-white bg-white/20 p-3 rounded-full backdrop-blur-sm">
                      <FaExpand />
                    </span>
                  </div>

                  {/* Category Badge */}
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase bg-black/60 text-white px-2 py-1 rounded backdrop-blur-sm shadow-sm">
                    {getCategory(src)}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <FaImages className="text-4xl text-gray-300 mx-auto mb-4" />
            <p className="text-gecl-text-muted">
              No images found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-50 p-2"
              onClick={() => setLightboxIndex(null)}
            >
              <FaTimes />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl p-4 hidden md:block z-50 hover:scale-110 transition"
              onClick={handlePrev}
            >
              <FaChevronLeft />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl p-4 hidden md:block z-50 hover:scale-110 transition"
              onClick={handleNext}
            >
              <FaChevronRight />
            </button>

            {/* Main Image */}
            <div
              className="relative w-full max-w-6xl h-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={filteredImages[lightboxIndex]}
                  alt="Gallery Preview"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption Bar */}
              <div className="absolute -bottom-12 left-0 right-0 p-4 text-white flex justify-between items-center bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                <div>
                  <p className="text-xs font-bold text-gecl-accent uppercase tracking-wider mb-0.5">
                    {getCategory(filteredImages[lightboxIndex])}
                  </p>
                  <h3 className="text-sm md:text-lg font-medium capitalize truncate max-w-[200px] md:max-w-md">
                    {filteredImages[lightboxIndex]
                      .split("/")
                      .pop()
                      ?.replace(/-/g, " ")
                      .replace(".webp", "")
                      .replace(".jpg", "")}
                  </h3>
                </div>
                <a
                  href={filteredImages[lightboxIndex]}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition border border-white/10"
                >
                  <FaDownload />{" "}
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default GalleryPage;
