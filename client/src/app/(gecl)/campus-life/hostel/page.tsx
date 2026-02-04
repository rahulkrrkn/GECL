"use client";

import React from "react";
import Link from "next/link";
import {
  FaBed,
  FaUtensils,
  FaShieldAlt,
  FaBolt,
  FaTint,
  FaWifi,
  FaUsers,
  FaClock,
  FaExclamationCircle,
  FaImages,
  FaCheckCircle,
  FaHouseUser,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FeatureItem,
  StatCard,
  FileCard,
  ImageCard,
} from "@/gecl/components/ui";

const HostelContent = () => {
  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Hostel & Accommodation"
        badge="Campus Residence"
        icon={<FaHouseUser />}
        description="A secure, disciplined, and home-like environment designed to support your academic journey at GECL. Separate hostels for Boys and Girls."
        image="/gecl/images/hostel/gecl-hostel-building.webp"
        className="bg-sky-950" // Custom Theme Color
        themeColor="text-sky-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Hostel", href: "/campus-life/hostel" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Overview & Stats */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gecl-border mb-8"
              >
                <h2 className="text-2xl font-bold text-gecl-primary mb-4">
                  Living at GECL
                </h2>
                <p className="text-gecl-text-muted leading-relaxed mb-6">
                  Government Engineering College, Lakhisarai provides separate,
                  fully furnished hostel accommodation for boys and girls.
                  Located within the safe confines of the campus, the hostels
                  are designed to provide a "Home away from Home" experience
                  with a focus on hygiene, safety, and community living.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatCard number="2" label="Boys Hostels" variant="light" />
                  <StatCard number="1" label="Girls Hostel" variant="light" />
                  <StatCard
                    number="24/7"
                    label="Power Backup"
                    variant="light"
                  />
                  <StatCard number="High" label="Security" variant="light" />
                </div>
              </motion.div>
            </section>

            {/* 2. Facilities Grid */}
            <section id="facilities">
              <SectionHeader title="Core Amenities" icon={FaBed} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Power Backup */}
                <div className="bg-white p-5 rounded-xl border border-gecl-border hover:border-gecl-accent transition shadow-sm group">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600 group-hover:scale-110 transition-transform">
                    <FaBolt className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gecl-primary text-lg mb-2">
                    Electricity & Backup
                  </h3>
                  <p className="text-sm text-gecl-text-muted">
                    Uninterrupted power supply is ensured through a dedicated
                    high-capacity DG Set (Silent Generator) to support studies
                    during power cuts.
                  </p>
                </div>

                {/* Water Supply */}
                <div className="bg-white p-5 rounded-xl border border-gecl-border hover:border-gecl-accent transition shadow-sm group">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                    <FaTint className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gecl-primary text-lg mb-2">
                    RO Water Supply
                  </h3>
                  <p className="text-sm text-gecl-text-muted">
                    Centralized RO (Reverse Osmosis) water purifiers with water
                    coolers are installed on every floor to provide safe and
                    chilled drinking water.
                  </p>
                </div>

                {/* Security */}
                <div className="bg-white p-5 rounded-xl border border-gecl-border hover:border-gecl-accent transition shadow-sm group">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600 group-hover:scale-110 transition-transform">
                    <FaShieldAlt className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gecl-primary text-lg mb-2">
                    24x7 Security
                  </h3>
                  <p className="text-sm text-gecl-text-muted">
                    The campus is under 24-hour CCTV surveillance. Dedicated
                    security guards and a warden are present round-the-clock.
                    <Link
                      href="/campus-life/health-safety"
                      className="text-red-600 hover:underline ml-1 font-semibold"
                    >
                      View Safety Policy
                    </Link>
                  </p>
                </div>

                {/* WiFi */}
                <div className="bg-white p-5 rounded-xl border border-gecl-border hover:border-gecl-accent transition shadow-sm group">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                    <FaWifi className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gecl-primary text-lg mb-2">
                    High-Speed Wi-Fi
                  </h3>
                  <p className="text-sm text-gecl-text-muted">
                    Seamless internet connectivity is provided across hostel
                    corridors and common rooms to assist in online learning and
                    research.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. The Mess Section */}
            <section
              id="mess"
              className="bg-white rounded-xl border border-gecl-border overflow-hidden shadow-sm"
            >
              <div className="relative w-full">
                <ImageCard
                  src="/gecl/images/hostel/mess-hall.webp"
                  alt="GECL Mess Hall"
                  variant="feature"
                  title="Student Mess Hall"
                  aspectRatio="video"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gecl-primary flex items-center gap-3">
                    <FaUtensils className="text-gecl-accent" /> Student Mess
                  </h3>
                  <Link
                    href="/campus-life/food"
                    className="text-sm font-bold text-gecl-accent hover:underline flex items-center gap-1"
                  >
                    Check Menu <FaArrowRight />
                  </Link>
                </div>

                <p className="text-gecl-text-muted mb-6">
                  The mess is managed by a{" "}
                  <strong>Student Mess Committee</strong> to ensure the quality
                  and taste of food meets student expectations. We serve 4 meals
                  a day: Breakfast, Lunch, Evening Snacks, and Dinner.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureItem
                    title="Hygienic Preparation"
                    text="Food is cooked in a modern, clean kitchen with strict hygiene protocols."
                    icon={FaCheckCircle}
                  />
                  <FeatureItem
                    title="Balanced Diet"
                    text="Menu includes seasonal vegetables, milk, eggs/fruit, and specials on Sundays."
                    icon={FaUsers}
                  />
                </div>

                {/* Mess Rule Highlight */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <FaExclamationCircle className="text-blue-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">
                      Mess Rebate Rule
                    </h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Going on leave? If you are absent for more than{" "}
                      <strong>7 days</strong> (with prior permission), mess
                      charges will be deducted, excluding a fixed 30%
                      maintenance/service cost.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Hostel Life Gallery */}
            <section>
              <SectionHeader title="Glimpses of Hostel Life" icon={FaImages} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <ImageCard
                  src="/gecl/images/hostel/room-interior.webp"
                  alt="Hostel Room Interior"
                  variant="gallery"
                  title="Student Room"
                />
                <ImageCard
                  src="/gecl/images/hostel/common-room.webp"
                  alt="Common Room"
                  variant="gallery"
                  title="Common Room"
                />
                <ImageCard
                  src="/gecl/images/hostel/hostel-garden.webp"
                  alt="Hostel Garden"
                  variant="gallery"
                  title="Recreation Area"
                />
              </div>
              <p className="text-center text-xs text-gecl-text-muted mt-2">
                *Representational images. Actual facilities may vary.
              </p>
            </section>

            {/* 5. Admission Link */}
            <div className="bg-gecl-primary text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Want to join the Hostel?
                </h3>
                <p className="text-blue-100 text-sm max-w-lg">
                  Check the detailed fee structure and allotment process. Hostel
                  seats are limited and allotted on a priority basis.
                </p>
              </div>
              <Link
                href="/admissions/hostel-admission"
                className="px-6 py-3 bg-gecl-accent text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition whitespace-nowrap"
              >
                Apply for Hostel
              </Link>
            </div>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Campus Life"
              links={[
                { label: "Hostel & Mess", href: "/campus-life/hostel" },
                {
                  label: "Academics & Labs",
                  href: "/campus-life/academic-facilities",
                },
                { label: "Sports & Fitness", href: "/campus-life/sports" },
                { label: "Canteen", href: "/campus-life/food" },
                {
                  label: "Health & Safety",
                  href: "/campus-life/health-safety",
                },
                { label: "Clubs & Events", href: "/campus-life/clubs-events" },
                { label: "Transport", href: "/campus-life/transport" },
              ]}
            />

            <SidebarWidget title="Quick Info">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaClock className="text-gecl-accent mt-1" />
                  <div>
                    <p className="text-xs font-bold text-gecl-text-muted uppercase">
                      Curfew Time
                    </p>
                    <p className="text-sm font-semibold text-gecl-primary">
                      9:00 PM (Winters)
                    </p>
                    <p className="text-sm font-semibold text-gecl-primary">
                      9:30 PM (Summers)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUsers className="text-gecl-accent mt-1" />
                  <div>
                    <p className="text-xs font-bold text-gecl-text-muted uppercase">
                      Visitors
                    </p>
                    <p className="text-sm font-semibold text-gecl-primary">
                      Allowed only in Visitor Room
                    </p>
                    <p className="text-xs text-gecl-text-muted">
                      (Sat/Sun: 10 AM - 5 PM)
                    </p>
                  </div>
                </div>
              </div>
            </SidebarWidget>

            <SidebarWidget title="Downloads">
              <FileCard
                title="Hostel Rules & Regulations"
                subtitle="PDF Handbook"
                viewLink="#"
              />
              <FileCard
                title="Mess Menu (Weekly)"
                subtitle="Updated Jan 2026"
                viewLink="/campus-life/food"
              />
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HostelContent;
