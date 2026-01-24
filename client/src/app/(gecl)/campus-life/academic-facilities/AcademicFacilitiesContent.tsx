"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheck, FaBuildingColumns, FaArrowRight } from "react-icons/fa6";
import PageHero from "@/gecl/components/ui/PageHero";
import ImageCard from "@/gecl/components/ui/ImageCard";

// Define Types
interface FacilityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
  link?: string; // Added optional link for internal navigation
}

interface ContentProps {
  data: FacilityItem[];
}

export default function AcademicFacilitiesContent({ data }: ContentProps) {
  return (
    <main className="bg-white min-h-screen font-sans">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Academic Facilities"
        badge="Campus Infrastructure"
        icon={<FaBuildingColumns />}
        description="Fostering innovation through world-class labs, digital libraries, and smart learning environments designed for the future."
        image="/gecl/images/academic/academic-block-building-exterior.webp"
        mobileImage="/gecl/images/academic/mobile-academic-hero.webp"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Academic Facilities" },
        ]}
      />

      {/* ================= CONTENT LIST (Z-PATTERN) ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24 md:space-y-32">
        {data.map((item, index) => (
          <FacilitySection
            key={item.id}
            item={item}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Want to see it in person?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Prospective students and parents are welcome to visit our campus to
            experience our academic environment firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-gecl-primary text-white rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Schedule a Visit
            </Link>
            <Link
              href="/admissions"
              className="px-8 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg font-semibold hover:bg-slate-100 transition shadow-sm transform hover:-translate-y-1"
            >
              Admission Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ================= SUB-COMPONENT FOR SECTIONS =================
function FacilitySection({
  item,
  isReversed,
}: {
  item: FacilityItem;
  isReversed: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col gap-10 lg:gap-16 items-center ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* 1. IMAGE SIDE (Using ImageCard) */}
      <div className="flex-1 w-full">
        <ImageCard
          src={item.imageSrc}
          alt={item.imageAlt}
          variant="feature"
          badge="Facility"
          title={item.title}
          aspectRatio="video"
        />
      </div>

      {/* 2. TEXT SIDE */}
      <div className="flex-1 space-y-6">
        <div>
          <span className="text-yellow-600 font-bold text-sm uppercase tracking-widest mb-2 block">
            {item.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 relative inline-block">
            {item.title}
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-yellow-500 rounded-full"></span>
          </h2>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed text-justify">
          {item.description}
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 pt-4">
          {item.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs">
                <FaCheck />
              </span>
              <span className="text-slate-700 font-medium text-sm">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Optional Internal Link Button */}
        {item.link && (
          <div className="pt-4">
            <Link
              href={item.link}
              className="inline-flex items-center gap-2 text-gecl-primary font-bold hover:gap-3 transition-all group"
            >
              Explore {item.title}{" "}
              <FaArrowRight className="text-sm group-hover:text-yellow-500 transition-colors" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
