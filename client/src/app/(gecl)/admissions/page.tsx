import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaUniversity,
  FaHandHoldingUsd,
  FaBullhorn,
  FaCheckCircle,
} from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  StatCard,
  FileCard,
  ImageCard,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Admissions 2025 | Government Engineering College Lakhisarai",
  description:
    "Official Admission Portal for GECL Lakhisarai. Apply for B.Tech via JEE Main & UGEAC. Check eligibility, fees, seat matrix, and cutoff ranks.",
  openGraph: {
    title: "GECL Admissions 2025",
    description:
      "Gateway to Engineering Excellence in Bihar. Your future starts here.",
    images: ["/gecl/images/campus/gecl-campus-main.webp"],
  },
};

const AdmissionsPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Admissions 2025"
        badge="Join GECL"
        icon={<FaUniversity />}
        description="Join one of Bihar's premier engineering institutes. Your journey to innovation and excellence begins with GECL."
        image="/gecl/images/campus/gecl-campus-main.webp"
        className="bg-indigo-950" // Formal Academic Theme
        themeColor="text-indigo-400"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-16">
            {/* 1. Admission Dashboard (Grid of ImageCards) */}
            <section>
              <SectionHeader title="Admission Dashboard" icon={FaBullhorn} />
              <p className="text-gecl-text-muted mb-6 -mt-4 ml-1">
                Everything you need to secure your seat.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* How to Apply */}
                <Link href="/admissions/how-to-apply" className="group">
                  <ImageCard
                    src="/gecl/images/admissions/ugeac-counselling.webp"
                    alt="Counseling Process"
                    variant="stack"
                    title="How to Apply"
                    subTitle="Step-by-step UGEAC guide"
                    aspectRatio="video"
                  />
                </Link>

                {/* Fee Structure */}
                <Link href="/admissions/fee-structure" className="group">
                  <ImageCard
                    src="/gecl/images/admissions/document-verification.webp"
                    alt="Fee Payment"
                    variant="stack"
                    title="Fee Structure"
                    subTitle="Academic & Hostel Fees"
                    aspectRatio="video"
                  />
                </Link>

                {/* Seat Matrix */}
                <Link href="/admissions/seat-intake" className="group">
                  <ImageCard
                    src="/gecl/images/campus/seminar-hall.webp"
                    alt="Seat Capacity"
                    variant="stack"
                    title="Seat Intake"
                    subTitle="Branch-wise Capacity"
                    aspectRatio="video"
                  />
                </Link>

                {/* Eligibility */}
                <Link href="/admissions/eligibility" className="group">
                  <ImageCard
                    src="/gecl/images/campus/gecl-campus-main.webp"
                    alt="Eligibility Rules"
                    variant="stack"
                    title="Eligibility Criteria"
                    subTitle="JEE Main & Domicile Rules"
                    aspectRatio="video"
                  />
                </Link>
              </div>
            </section>

            {/* 2. Why Choose GECL? */}
            <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gecl-primary mb-6 text-center">
                Why Choose GECL Lakhisarai?
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard number="360" label="Annual Intake" variant="light" />
                <StatCard number="₹3K" label="Annual Fee" variant="light" />
                <StatCard number="100%" label="Govt. Funded" variant="light" />
                <StatCard
                  number="AI & DS"
                  label="New Branches"
                  variant="light"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-indigo-600 mt-1 shrink-0" />
                  <p className="text-sm text-gecl-text-muted">
                    <strong>Affordable Education:</strong> High-quality
                    technical education at a nominal government fee structure.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-indigo-600 mt-1 shrink-0" />
                  <p className="text-sm text-gecl-text-muted">
                    <strong>Modern Infrastructure:</strong> State-of-the-art
                    labs for CSE (AI/Data Science), Civil, and Mechanical
                    engineering.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-indigo-600 mt-1 shrink-0" />
                  <p className="text-sm text-gecl-text-muted">
                    <strong>Placement Cell:</strong> Dedicated cell working to
                    bridge the gap between industry and academia.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Financial Aid Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm shrink-0">
                  <FaHandHoldingUsd className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">
                    Financial Aid Available
                  </h3>
                  <p className="text-blue-50 text-sm max-w-md opacity-90">
                    Don't let finances hold you back. We support MNSSBY Student
                    Credit Card, Post Matric Scholarship, and AICTE Pragati
                    schemes.
                  </p>
                </div>
              </div>
              <Link
                href="/admissions/scholarships"
                className="px-6 py-3 bg-white text-emerald-700 text-sm font-bold rounded-lg shadow-md hover:bg-emerald-50 transition whitespace-nowrap"
              >
                View Scholarships
              </Link>
            </div>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                { label: "Admission Home", href: "/admissions", active: true },
                { label: "How to Apply", href: "/admissions/how-to-apply" },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
                { label: "Lateral Entry", href: "/admissions/lateral-entry" },
                { label: "FAQ", href: "/admissions/faq" },
              ]}
            />

            <SidebarWidget title="Admission Helpdesk">
              <div className="bg-white p-5 rounded-lg border border-gecl-border text-center">
                <p className="text-sm text-gecl-text-muted mb-3">
                  For queries related to UGEAC counseling and reporting:
                </p>
                <p className="font-bold text-gecl-primary text-xl mb-1">
                  06346-29xxxx
                </p>
                <p className="text-xs text-gecl-accent font-medium mb-4 break-words">
                  admission@geclakhisarai.ac.in
                </p>
                <Link
                  href="/admissions/contact"
                  className="block w-full py-2 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gecl-text-muted hover:bg-gray-100 transition"
                >
                  View Contact Details
                </Link>
              </div>
            </SidebarWidget>

            <SidebarWidget title="Prospectus">
              <FileCard
                title="UGEAC 2025 Brochure"
                subtitle="Official BCECEB PDF"
                viewLink="#"
                downloadLink="#"
              />
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdmissionsPage;
