"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUserNurse,
  FaShieldHalved,
  FaPhoneVolume,
  FaLock,
  FaUserShield,
  FaArrowRight,
  FaHouseLock,
} from "react-icons/fa6";
import { PageHero, ImageCard } from "@/gecl/components/ui/";

interface SafetyData {
  medical: {
    title: string;
    description: string;
    features: string[];
    imageSrc: string;
  };
  ragging: {
    title: string;
    description: string;
    helpline: string;
    email: string;
    imageSrc: string;
  };
  security: {
    title: string;
    description: string;
    features: string[];
    imageSrc: string;
  };
}

export default function HealthSafetyContent({ data }: { data: SafetyData }) {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* ================= HERO SECTION ================= */}
      {/* Uses the new PageHero capable of handling icons */}
      <PageHero
        title="Health & Safety"
        badge="Campus Wellbeing"
        icon={<FaShieldHalved />}
        description="Ensuring a secure, disciplined, and healthy environment for every student with 24/7 surveillance and Zero-Tolerance for ragging."
        image="/gecl/images/campus/college-security-gate.webp"
        className="bg-teal-950"
        themeColor="text-teal-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Health & Safety" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {/* ================= 1. ANTI-RAGGING (High Priority) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-50 border border-red-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center shadow-sm"
        >
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <span className="p-3 bg-red-600 text-white rounded-xl shadow-lg shadow-red-500/30">
                <FaPhoneVolume size={24} />
              </span>
              <h2 className="text-3xl font-bold text-red-700">
                {data.ragging.title}
              </h2>
            </div>

            <p className="text-slate-700 leading-relaxed text-lg text-justify">
              {data.ragging.description}
            </p>

            {/* Helpline Box */}
            <div className="bg-white p-6 rounded-2xl border-l-4 border-red-500 shadow-sm space-y-2">
              <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                National Anti-Ragging Helpline
              </p>
              <p className="text-3xl font-extrabold text-red-600 tracking-tight">
                {data.ragging.helpline}
              </p>
              <p className="text-sm text-slate-500 font-medium">
                Email:{" "}
                <span className="text-slate-700">{data.ragging.email}</span>
              </p>
            </div>

            {/* Internal Links */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/academics/anti-ragging"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition shadow-md hover:-translate-y-1"
              >
                View Full Policy <FaArrowRight />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-700 border border-red-200 rounded-lg font-semibold hover:bg-red-50 transition shadow-sm"
              >
                Report Incident
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full">
            <ImageCard
              src={data.ragging.imageSrc}
              alt="Anti Ragging Poster"
              variant="feature"
              badge="Zero Tolerance"
              title="Say No To Ragging"
              aspectRatio="square"
            />
          </div>
        </motion.div>

        {/* ================= 2. SECURITY & DISCIPLINE ================= */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="w-full order-last md:order-first">
            <ImageCard
              src={data.security.imageSrc}
              alt="Campus Security"
              variant="offset"
              title="24/7 Campus Surveillance"
              aspectRatio="portrait"
            />
          </div>

          {/* Text Side */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs uppercase tracking-widest mb-4">
                <FaLock /> Campus Security
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {data.security.title}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed text-justify">
                {data.security.description}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4">
              {data.security.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-lg border border-slate-100 shadow-sm"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <FaUserShield size={14} />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-2 font-medium">
                Staying in the Hostel?
              </p>
              <Link
                href="/campus-life/hostel"
                className="inline-flex items-center gap-2 text-blue-700 font-bold hover:gap-3 transition-all"
              >
                <FaHouseLock /> Check Hostel Rules <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 3. MEDICAL FACILITY ================= */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-teal-100 text-teal-700 rounded-xl">
                <FaUserNurse size={24} />
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                {data.medical.title}
              </h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed text-justify">
              {data.medical.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {data.medical.features.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-slate-50 text-slate-700 font-semibold text-sm rounded-lg border border-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-900 flex items-start gap-3">
              <span className="text-xl">🚑</span>
              <p>
                <strong>Emergency Protocol:</strong> For serious medical
                emergencies, students are immediately provided transport to the
                District Sadar Hospital nearby.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <ImageCard
              src={data.medical.imageSrc}
              alt="Basic Medical Facility"
              variant="gallery"
              title="First Aid Center"
              badge="Health"
              aspectRatio="video"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
