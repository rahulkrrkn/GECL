"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaShapes } from "react-icons/fa6";
import { PageHero, ImageCard } from "@/gecl/components/ui";

interface SectionItem {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  badge: string;
}

export default function CampusLifeHub({ data }: { data: SectionItem[] }) {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Life at GECL"
        badge="Campus Ecosystem"
        icon={<FaShapes />}
        description="A vibrant ecosystem of learning, culture, innovation, and fun. Explore what makes our campus unique."
        image="/gecl/images/campus/campus-life-hero-collage.webp"
        className="bg-slate-900"
        themeColor="text-yellow-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life" },
        ]}
      />

      {/* ================= BENTO GRID SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* Main Feature Card (Clubs) - Spans 2 Columns on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 row-span-2"
          >
            <Link
              href={data[0].link}
              className="group relative block h-full w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white"
            >
              {/* Custom Overlay Logic since we aren't using ImageCard here for the jumbo item */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${data[0].image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                <span className="inline-block bg-yellow-500 text-slate-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4">
                  {data[0].badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
                  {data[0].title}
                </h2>
                <p className="text-slate-200 text-lg mb-6 max-w-lg line-clamp-2 md:line-clamp-none">
                  {data[0].description}
                </p>
                <span className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all border-b-2 border-yellow-500 pb-1">
                  Explore Now <FaArrowRight />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Standard Cards */}
          {data.slice(1).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={
                index === 1 || index === 4 ? "md:col-span-1 lg:col-span-1" : ""
              }
            >
              <Link href={item.link} className="block h-full group">
                <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
                  <ImageCard
                    src={item.image}
                    alt={item.title}
                    variant="gallery" // Sleek overlay style
                    badge={item.badge}
                    title={item.title}
                    aspectRatio="video" // Consistent aspect ratio
                    className="h-full"
                  />
                  {/* Hover Description (Only visible on large screens for UX) */}
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 mb-4">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase">
                        View Details <FaArrowRight />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= QUICK STATS STRIP ================= */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          <StatItem value="15+" label="Student Clubs" />
          <StatItem value="10 Acres" label="Sports Complex" />
          <StatItem value="24/7" label="WiFi Campus" />
          <StatItem value="100%" label="Ragging Free" />
        </div>
      </section>
    </main>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4">
      <h4 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
        {value}
      </h4>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
        {label}
      </p>
    </div>
  );
}
