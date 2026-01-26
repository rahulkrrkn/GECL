"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBookOpen, LuBuilding } from "react-icons/lu";

const HERO_IMAGES = [
  "/gecl/images/college-building-main.webp",
  "/gecl/images/admin-block.webp",
  "/gecl/images/principal-event-1.webp",
  "/gecl/images/academic-building.webp",
  "/gecl/images/classroom-lecture.webp",
  "/gecl/images/vision-future.webp",
  "/gecl/images/classroom-lecture.webp",
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-slate-900">
      {/* Background Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={HERO_IMAGES[index]}
            alt="GEC Lakhisarai Campus"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-200 text-xs font-bold mb-6 backdrop-blur-md uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Estd. 2019 • DST Bihar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg"
          >
            Government Engineering College, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
              Lakhisarai
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl border-l-4 border-blue-500 pl-6"
          >
            A premier institute under the Department of Science, Technology &
            Technical Education, Government of Bihar. Affiliated with{" "}
            <strong>Bihar Engineering University (BEU), Patna</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/academics/programs"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <LuBookOpen className="w-5 h-5" /> Academic Programs
            </Link>
            <Link
              href="/about/college"
              className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white hover:text-slate-900 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2"
            >
              <LuBuilding className="w-5 h-5" /> Institute Profile
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
