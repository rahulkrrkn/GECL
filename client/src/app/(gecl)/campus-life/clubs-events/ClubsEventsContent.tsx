"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaTrophy,
  FaBriefcase,
  FaHandHoldingHeart,
  FaCode,
  FaMicrochip,
  FaPalette,
  FaCalendarCheck,
  FaArrowRight,
  FaLightbulb,
} from "react-icons/fa6";
import { PageHero, ImageCard } from "@/gecl/components/ui";

// Types
interface Club {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface EventItem {
  title: string;
  date: string;
  desc: string;
}

interface EventSection {
  title: string;
  description: string;
  events: EventItem[];
  imageSrc: string;
}

interface DataProps {
  clubs: Club[];
  technicalEvents: EventSection;
  culturalEvents: EventSection;
}

export default function ClubsEventsContent({ data }: { data: DataProps }) {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* 👆 ADDED: overflow-x-hidden to body to prevent animation scrollbars */}

      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Clubs & Events"
        badge="Student Life"
        icon={<FaLightbulb />}
        description="From the Startup Cell to Aagaz Fest, explore the vibrant energy of GEC Lakhisarai."
        image="/gecl/images/events/aagaz-college-fest.webp"
        className="bg-violet-950"
        themeColor="text-pink-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Clubs & Events" },
        ]}
      />

      {/* ================= 1. CLUBS GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 drop-shadow-sm">
            Active Student Bodies
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join a community that shares your passion. Whether it's
            entrepreneurship, sports, or social service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.clubs.map((club, index) => (
            <ClubCard key={club.id} club={club} index={index} />
          ))}

          {/* Join CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-pink-600 to-violet-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-center items-center text-center shadow-xl transform hover:-translate-y-2 transition duration-300"
          >
            <h3 className="text-2xl font-bold mb-2">Have an Idea?</h3>
            <p className="text-sm mb-6 opacity-90">
              The <strong>Startup Cell</strong> is looking for the next big
              innovation. Pitch your idea today!
            </p>
            <a
              href="/contact"
              className="px-6 py-2 bg-white text-violet-700 font-bold rounded-full text-sm hover:bg-violet-50 transition"
            >
              Contact Startup Cell
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. TECHNICAL WORKSHOPS ================= */}
      <section className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EventSectionLayout
            data={data.technicalEvents}
            type="tech"
            isReversed={false}
          />
        </div>
      </section>

      {/* ================= 3. CULTURAL FESTS ================= */}
      <section className="py-16 sm:py-20 bg-pink-50/50 border-t border-pink-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EventSectionLayout
            data={data.culturalEvents}
            type="cultural"
            isReversed={true}
          />
        </div>
      </section>

      {/* ================= GALLERY CTA ================= */}
      <section className="py-20 sm:py-24 bg-violet-900 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Relive the "Aagaz" Moments
          </h2>
          <p className="text-violet-200 text-lg mb-8">
            Check out the photo gallery to see the energy, colors, and smiles
            from our past events and workshops.
          </p>
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1"
          >
            View Event Gallery <FaArrowRight />
          </a>
        </div>
      </section>
    </main>
  );
}

// ================= HELPER COMPONENTS =================

function ClubCard({ club, index }: { club: Club; index: number }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "rocket":
        return <FaRocket />;
      case "trophy":
        return <FaTrophy />;
      case "briefcase":
        return <FaBriefcase />;
      case "hand-heart":
        return <FaHandHoldingHeart />;
      case "code":
        return <FaCode />;
      default:
        return <FaMicrochip />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition text-6xl text-violet-500">
        {getIcon(club.icon)}
      </div>

      <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300 shadow-sm">
        {getIcon(club.icon)}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-violet-700 transition-colors">
        {club.name}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {club.description}
      </p>
    </motion.div>
  );
}

function EventSectionLayout({
  data,
  type,
  isReversed,
}: {
  data: EventSection;
  type: "tech" | "cultural";
  isReversed: boolean;
}) {
  const isTech = type === "tech";
  const themeColor = isTech ? "text-blue-600" : "text-pink-600";
  const bgColor = isTech ? "bg-blue-50" : "bg-pink-50";
  const borderColor = isTech ? "border-blue-100" : "border-pink-100";
  const icon = isTech ? <FaMicrochip /> : <FaPalette />;

  return (
    <div
      className={`flex flex-col gap-10 lg:gap-20 items-center ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 w-full"
      >
        <ImageCard
          src={data.imageSrc}
          alt={data.title}
          variant="feature"
          badge={isTech ? "Skill Development" : "Student Activities"}
          title={data.title}
          aspectRatio="video"
        />
      </motion.div>

      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 space-y-6 sm:space-y-8 w-full"
      >
        <div>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bgColor} ${themeColor} font-bold text-xs uppercase tracking-widest mb-4`}
          >
            {icon} {isTech ? "Innovation" : "Celebration"}
          </span>
          {/* 👇 FIXED: Scaled font down for mobile */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {data.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify">
            {data.description}
          </p>
        </div>

        <div className="space-y-4">
          {data.events.map((event, idx) => (
            <div
              key={idx}
              className={`flex gap-4 p-4 rounded-xl border ${borderColor} hover:border-slate-300 hover:bg-white hover:shadow-md transition-all group`}
            >
              <div
                className={`shrink-0 w-16 h-16 rounded-lg ${bgColor} ${themeColor} flex flex-col items-center justify-center text-center p-2 group-hover:scale-105 transition`}
              >
                <FaCalendarCheck className="text-lg mb-1" />
                <span className="text-[10px] font-bold leading-tight uppercase">
                  {event.date}
                </span>
              </div>

              {/* 👇 FIXED: Added min-w-0 and flex-1 for text truncation to work in flexbox */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-lg group-hover:text-slate-900 truncate">
                  {event.title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
