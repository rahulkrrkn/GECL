import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaUniversity,
  FaUserGraduate,
  FaChartLine,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaHandHoldingUsd,
  FaDownload,
  FaArrowRight,
  FaBullhorn,
} from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  Breadcrumb,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  StatCard,
  FeatureItem,
  FileCard,
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
      {/* ✅ Hero Section */}
      <PageHero
        title="Admissions 2025"
        description="Join one of Bihar's premier engineering institutes. Your journey to innovation and excellence begins with GECL."
        image="/gecl/images/campus/gecl-campus-main.webp"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Quick Access Cards (The "Dashboard") */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/admissions/how-to-apply" className="group">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gecl-primary text-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <FaUserGraduate className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">How to Apply</h3>
                    <p className="text-blue-100 text-sm">
                      Step-by-step guide to UGEAC registration, choice filling,
                      and reporting.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                    Start Process <FaArrowRight />
                  </div>
                </motion.div>
              </Link>

              <Link href="/admissions/fee-structure" className="group">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gecl-border p-6 rounded-xl shadow-sm h-full flex flex-col justify-between hover:border-gecl-accent hover:shadow-md transition"
                >
                  <div>
                    <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                      <FaFileInvoiceDollar className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gecl-primary mb-2">
                      Fee Structure
                    </h3>
                    <p className="text-gecl-text-muted text-sm">
                      Transparent breakdown of academic and hostel fees for
                      2025-26.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gecl-accent group-hover:gap-3 transition-all">
                    Check Fees <FaArrowRight />
                  </div>
                </motion.div>
              </Link>

              <Link href="/admissions/seat-intake" className="group">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gecl-border p-6 rounded-xl shadow-sm h-full flex flex-col justify-between hover:border-gecl-accent hover:shadow-md transition"
                >
                  <div>
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                      <FaChartLine className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gecl-primary mb-2">
                      Seat Matrix
                    </h3>
                    <p className="text-gecl-text-muted text-sm">
                      View approved intake for Civil, CSE(AI), and other
                      branches.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gecl-accent group-hover:gap-3 transition-all">
                    View Seats <FaArrowRight />
                  </div>
                </motion.div>
              </Link>

              <Link href="/admissions/eligibility" className="group">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gecl-border p-6 rounded-xl shadow-sm h-full flex flex-col justify-between hover:border-gecl-accent hover:shadow-md transition"
                >
                  <div>
                    <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-green-600">
                      <FaUniversity className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gecl-primary mb-2">
                      Eligibility
                    </h3>
                    <p className="text-gecl-text-muted text-sm">
                      JEE Main criteria, age limit, and domicile requirements.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gecl-accent group-hover:gap-3 transition-all">
                    Check Rules <FaArrowRight />
                  </div>
                </motion.div>
              </Link>
            </section>

            {/* 2. About GECL */}
            <section>
              <SectionHeader title="About GECL" icon={FaUniversity} />
              <p className="mt-4 text-sm text-gecl-text-muted leading-relaxed">
                Established by the Government of Bihar, GECL offers high-quality
                technical education at an affordable cost. With new
                infrastructure, modern labs for AI/Data Science, and a dedicated
                placement cell, we are shaping the future of engineering in the
                region.
              </p>
            </section>

            {/* 3. Why Join GECL? */}
            <section>
              <SectionHeader title="Why Choose GECL?" icon={FaUniversity} />
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard number="360" label="Annual Intake" variant="light" />
                <StatCard number="₹3K" label="Annual Fee" variant="light" />
                <StatCard number="100%" label="Govt. Funded" variant="light" />
                <StatCard number="AI/ML" label="New Branches" variant="light" />
              </div>
              <p className="mt-4 text-sm text-gecl-text-muted leading-relaxed">
                Established by the Government of Bihar, GECL offers high-quality
                technical education at an affordable cost. With new
                infrastructure, modern labs for AI/Data Science, and a dedicated
                placement cell, we are shaping the future of engineering in the
                region.
              </p>
            </section>

            {/* 4. Scholarship Promo */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-blue-600 shrink-0">
                  <FaHandHoldingUsd className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-lg">
                    Financial Aid Available
                  </h3>
                  <p className="text-sm text-blue-800 mt-1 max-w-md">
                    Don't let finances hold you back. We support MNSSBY Student
                    Credit Card, Post Matric Scholarship, and AICTE Pragati
                    schemes.
                  </p>
                </div>
              </div>
              <Link
                href="/admissions/scholarships"
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition whitespace-nowrap"
              >
                Explore Scholarships
              </Link>
            </div>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarWidget title="Admission Helpdesk">
              <div className="bg-white p-4 rounded-lg border border-gecl-border text-center">
                <p className="text-sm text-gecl-text-muted mb-3">
                  For queries related to UGEAC counseling and reporting:
                </p>
                <p className="font-bold text-gecl-primary text-lg">
                  06346-29xxxx
                </p>
                <p className="text-sm text-gecl-accent font-medium mb-4">
                  admission@geclakhisarai.ac.in
                </p>
                <Link
                  href="/admissions/contact"
                  className="text-xs underline text-gecl-text-muted hover:text-gecl-primary"
                >
                  View All Contacts
                </Link>
              </div>
            </SidebarWidget>

            <SidebarWidget title="Important Links">
              <div className="space-y-3">
                <Link
                  href="/admissions/required-documents"
                  className="flex items-center gap-3 p-3 bg-white border border-gecl-border rounded-lg hover:border-gecl-accent group transition"
                >
                  <FaDownload className="text-gecl-text-muted group-hover:text-gecl-accent" />
                  <span className="text-sm font-medium text-gecl-primary">
                    Document Checklist
                  </span>
                </Link>
                <Link
                  href="/admissions/faq"
                  className="flex items-center gap-3 p-3 bg-white border border-gecl-border rounded-lg hover:border-gecl-accent group transition"
                >
                  <div className="text-gecl-text-muted group-hover:text-gecl-accent font-bold">
                    ?
                  </div>
                  <span className="text-sm font-medium text-gecl-primary">
                    FAQs
                  </span>
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
