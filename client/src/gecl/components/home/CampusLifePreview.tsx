import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuTrophy, LuUsers, LuZap } from "react-icons/lu";

export const CampusLifePreview = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2 block">
              Vibrant Campus
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Life at GEC Lakhisarai
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-slate-900 transition-all font-semibold text-sm backdrop-blur-md"
          >
            View Full Gallery{" "}
            <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {/* 1. Main Feature (Large Square) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
            <Image
              src="/gecl/images/college-building-main.webp" // Ensure this image exists
              alt="Tech Fest 2025"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <span className="bg-blue-600 w-fit text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                Signature Event
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Annual Tech Fest: Aavishkar
              </h3>
              <p className="text-slate-300 text-sm line-clamp-2">
                A 3-day extravaganza of coding marathons, robotics wars, and
                cultural nights celebrating innovation.
              </p>
            </div>
          </div>

          {/* 2. Vertical Feature (Tall on Desktop) */}
          <Link
            href="/campus-life/sports"
            className="relative rounded-3xl overflow-hidden group md:col-span-1 lg:row-span-2"
          >
            <Image
              src="/gecl/images/college-building-main.webp"
              alt="Sports Complex"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold mb-1">Sports Arena</h3>
              <p className="text-xs text-slate-300">
                Cricket, Volleyball & Indoor Games
              </p>
            </div>
          </Link>

          {/* 3. Stat Card 1 (Colorful) */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 flex flex-col justify-between group hover:shadow-lg hover:shadow-blue-600/20 transition-all">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white mb-4">
              <LuTrophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-4xl font-bold block mb-1">25+</span>
              <span className="text-sm text-blue-100 font-medium">
                National Awards Won
              </span>
            </div>
          </div>

          {/* 4. Stat Card 2 (Dark) */}
          <div className="bg-slate-800 rounded-3xl p-6 flex flex-col justify-between border border-white/5 group hover:border-white/20 transition-all">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
              <LuUsers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-4xl font-bold block mb-1">15+</span>
              <span className="text-sm text-slate-400 font-medium">
                Student Clubs & Societies
              </span>
            </div>
          </div>

          {/* 5. Wide Feature (Horizontal) */}
          <Link
            href="/campus-life/labs"
            className="md:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden group"
          >
            <Image
              src="/gecl/images/college-building-main.webp"
              alt="Advanced Labs"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">Advanced Robotics Lab</h3>
              <p className="text-slate-300 text-sm max-w-xs">
                State-of-the-art facilities designed for AI and Machine Learning
                research.
              </p>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore Facilities <LuArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
