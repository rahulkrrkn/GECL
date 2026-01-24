"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLaptopCode,
  FaBuilding,
  FaGears,
  FaBolt,
  FaFlask,
  FaMicroscope,
  FaScrewdriverWrench,
  FaCircleCheck,
} from "react-icons/fa6";
import { PageHero, ImageCard } from "@/gecl/components/ui/";

// Types
interface LabItem {
  name: string;
  equipment: string[];
  image: string;
}

interface DeptData {
  name: string;
  description: string;
  labs: LabItem[];
}

interface LabsData {
  [key: string]: DeptData;
}

export default function LabsContent({ data }: { data: LabsData }) {
  const [activeDept, setActiveDept] = useState<string>("cse");

  // Icon Mapping
  const getIcon = (key: string) => {
    switch (key) {
      case "cse":
        return <FaLaptopCode />;
      case "civil":
        return <FaBuilding />;
      case "mech":
        return <FaGears />;
      case "eee":
        return <FaBolt />;
      case "science":
        return <FaFlask />;
      default:
        return <FaMicroscope />;
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Laboratories & Workshops"
        badge="Academic Infrastructure"
        icon={<FaMicroscope />}
        description="Bridging the gap between theory and practice with industry-standard equipment and hands-on learning."
        image="/gecl/images/labs/mechanical-workshop-lathe.webp"
        className="bg-blue-950"
        themeColor="text-blue-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Laboratories" },
        ]}
      />

      {/* ================= DEPARTMENT FILTER (Sticky) ================= */}
      <div className="sticky top-[4rem] z-30 bg-white/80 backdrop-blur-lg border-y border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center gap-3 py-4 min-w-max">
            {Object.keys(data).map((key) => (
              <button
                key={key}
                onClick={() => setActiveDept(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${
                  activeDept === key
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 border-blue-600"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {getIcon(key)} {data[key].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= LABS GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 min-h-[600px]">
        {/* Department Header */}
        <motion.div
          key={activeDept + "-header"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            {data[activeDept].name}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {data[activeDept].description}
          </p>
        </motion.div>

        {/* Labs Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {data[activeDept].labs.map((lab, index) => (
              <LabCard key={lab.name} lab={lab} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= SAFETY BANNER ================= */}
      <section className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block p-4 rounded-full bg-yellow-500/10 mb-6">
            <FaScrewdriverWrench className="text-yellow-500 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Safety First, Always.
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            All students are required to wear lab coats, safety shoes (for
            workshops), and follow the standard operating procedures (SOPs)
            strictly inside the laboratories.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-300">
            <span className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50">
              🥼 Lab Coat Mandatory
            </span>
            <span className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50">
              🥾 Safety Shoes Required
            </span>
            <span className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50">
              ⚡ Handle with Care
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

// ================= HELPER COMPONENTS =================

function LabCard({ lab, index }: { lab: LabItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col h-full"
    >
      {/* 1. Image Section using ImageCard */}
      <div className="mb-4">
        <ImageCard
          src={lab.image}
          alt={lab.name}
          variant="gallery" // Sleek dark overlay style
          title={lab.name} // Title appears on the image
          aspectRatio="video"
        />
      </div>

      {/* 2. Equipment List */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex-grow">
        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
          Key Equipment
        </h4>
        <ul className="space-y-3">
          {lab.equipment.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-700 text-sm"
            >
              <FaCircleCheck className="text-blue-400 mt-0.5 shrink-0 text-xs" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
