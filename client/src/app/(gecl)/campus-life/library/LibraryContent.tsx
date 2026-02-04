"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaClock,
  FaBookBookmark,
  FaArrowRight,
} from "react-icons/fa6";
import { PageHero, ImageCard } from "@/gecl/components/ui";
import { FaCheckCircle } from "react-icons/fa";

// Types
interface LibrarySection {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  link?: string;
  linkText?: string;
}

interface LibraryData {
  stats: { label: string; value: string }[];
  sections: LibrarySection[];
  timings: { weekdays: string; saturday: string; closed: string };
}

export default function LibraryContent({ data }: { data: LibraryData }) {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Central Library"
        badge="Knowledge Center"
        icon={<FaBookBookmark />}
        description="The intellectual heart of the campus, fostering research and innovation with a vast collection of resources and digital archives."
        image="/gecl/images/library/central-library-interior.webp"
        className="bg-amber-950" // Custom Theme
        themeColor="text-amber-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Library" },
        ]}
      />
      <br />
      <br /> <br />
      {/* ================= STATS BAR ================= */}
      <div className="bg-white border-b border-slate-200 relative z-20 -mt-10 mx-6 md:mx-auto max-w-6xl rounded-2xl shadow-xl flex flex-wrap justify-around py-8 px-4 gap-6">
        {data.stats.map((stat, index) => (
          <div key={index} className="text-center group">
            <p className="text-3xl font-bold text-slate-800 mb-1 group-hover:text-amber-600 transition-colors">
              {stat.value}
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      {/* ================= SECTIONS LIST ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
        {data.sections.map((item, index) => (
          <LibrarySectionRow
            key={item.id}
            item={item}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
      {/* ================= TIMING & RULES ================= */}
      <section className="bg-slate-900 py-16 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Timings */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaClock className="text-amber-500" /> Library Hours
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Monday - Friday</span>
                <span className="font-bold">{data.timings.weekdays}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Saturday</span>
                <span className="font-bold">{data.timings.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sunday</span>
                <span className="font-bold text-red-400">
                  {data.timings.closed}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Rules */}
          <div>
            <h3 className="text-2xl font-bold mb-6">General Rules</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3 items-start">
                <FaCheckCircle className="text-amber-500 mt-1 shrink-0" />
                Library ID card is mandatory for entry and issuing books.
              </li>
              <li className="flex gap-3 items-start">
                <FaCheckCircle className="text-amber-500 mt-1 shrink-0" />
                Silence must be maintained in the Reading Room at all times.
              </li>
              <li className="flex gap-3 items-start">
                <FaCheckCircle className="text-amber-500 mt-1 shrink-0" />
                Use of mobile phones is strictly prohibited inside the library.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

// ================= SUB-COMPONENT =================
function LibrarySectionRow({
  item,
  isReversed,
}: {
  item: LibrarySection;
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
      {/* 1. IMAGE SIDE */}
      <div className="flex-1 w-full">
        <ImageCard
          src={item.image}
          alt={item.title}
          variant="feature"
          title={item.title}
          aspectRatio="video"
        />
      </div>

      {/* 2. TEXT SIDE */}
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {item.title}
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed text-justify">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {item.features.map((feature, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-900 rounded-lg text-sm font-semibold border border-amber-100"
            >
              <FaBookOpen className="text-xs" /> {feature}
            </span>
          ))}
        </div>

        {/* Optional Link */}
        {item.link && (
          <div className="pt-4">
            <Link
              href={item.link}
              className="inline-flex items-center gap-2 text-amber-700 font-bold hover:gap-3 transition-all group"
            >
              {item.linkText}{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
