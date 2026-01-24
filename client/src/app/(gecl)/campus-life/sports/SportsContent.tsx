"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaDumbbell,
  FaMedal,
  FaHeartPulse,
  FaTablets,
  FaPersonRunning,
} from "react-icons/fa6";
import { PageHero, ImageCard } from "@/gecl/components/ui/";

// Define Types
interface SportItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
}

interface ContentProps {
  data: SportItem[];
}

export default function SportsContent({ data }: ContentProps) {
  return (
    <main className="bg-white min-h-screen font-sans">
      {/* ================= HERO SECTION ================= */}
      <div className="relative">
        <PageHero
          title="Sports & Fitness"
          badge="Campus Activities"
          icon={<FaTrophy />}
          description="A dedicated campus ecosystem nurturing champions through resilience, teamwork, and holistic physical well-being."
          image="/gecl/images/sports/cricket-football-ground-panoramic.webp"
          className="bg-emerald-950"
          themeColor="text-yellow-400"
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Campus Life", href: "/campus-life" },
            { label: "Sports" },
          ]}
        />

        {/* Floating Stats Bar (Desktop Only) */}
        <div className="absolute bottom-0 w-full  bg-black/20 backdrop-blur-md border-t border-white/10 hidden md:block z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-4 py-4 text-white divide-x divide-white/20">
            <StatItem
              icon={<FaPersonRunning />}
              label="Acres of Ground"
              value="5+"
            />
            <StatItem
              icon={<FaDumbbell />}
              label="Gym Equipment"
              value="Modern"
            />
            <StatItem
              icon={<FaTablets />}
              label="Indoor Games"
              value="Dedicated Hall"
            />
            <StatItem
              icon={<FaHeartPulse />}
              label="Wellness"
              value="Yoga Center"
            />
          </div>
        </div>
      </div>

      {/* ================= CONTENT LIST (Z-PATTERN) ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {data.map((item, index) => (
          <SportsSection
            key={item.id}
            item={item}
            isReversed={index % 2 !== 0} // Alternates layout (Left/Right)
          />
        ))}
      </div>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-emerald-50 py-24 border-t border-emerald-100 relative overflow-hidden">
        {/* Decorative Background Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-100 opacity-50 pointer-events-none">
          <FaMedal size={400} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">
            Unleash Your Potential
          </h2>
          <p className="text-emerald-800 mb-10 max-w-xl mx-auto text-lg">
            Whether you are a professional athlete or a fitness enthusiast, GEC
            Lakhisarai provides the perfect platform to excel.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/campus-life/clubs-events"
              className="px-10 py-4 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <FaTrophy /> Join Sports Club
            </Link>
            <Link
              href="/gallery"
              className="px-10 py-4 bg-white text-emerald-900 border border-emerald-300 rounded-xl font-bold hover:bg-emerald-50 transition shadow-md transform hover:-translate-y-1"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ================= HELPER: STAT ITEM =================
function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className="text-yellow-400 text-xl mb-1">{icon}</div>
      <span className="text-lg font-bold">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-slate-300">
        {label}
      </span>
    </div>
  );
}

// ================= SUB-COMPONENT FOR SECTIONS =================
function SportsSection({
  item,
  isReversed,
}: {
  item: SportItem;
  isReversed: boolean;
}) {
  // Dynamic Icon Selection based on ID
  let Icon = FaTrophy;
  if (item.id === "gymnasium") Icon = FaDumbbell;
  if (item.id === "indoor-games") Icon = FaTablets;
  if (item.id === "wellness") Icon = FaHeartPulse;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col gap-10 lg:gap-20 items-center ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* 1. IMAGE SIDE */}
      <div className="flex-1 w-full">
        <ImageCard
          src={item.imageSrc}
          alt={item.imageAlt}
          variant="feature" // Using feature style for sporty look
          badge="Facility"
          title={item.title}
          aspectRatio="video"
        />
      </div>

      {/* 2. TEXT SIDE */}
      <div className="flex-1 space-y-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-4">
            <Icon className="text-sm" /> {item.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {item.title}
          </h2>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed text-justify">
          {item.description}
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-2">
          {item.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">
                <Icon />
              </span>
              <span className="text-slate-800 font-semibold text-sm">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
