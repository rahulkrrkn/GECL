import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaLaptopCode,
  FaFileSignature,
  FaListOl,
  FaUniversity,
  FaCheckDouble,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Updated Import Path
import {
  PageHero,
  Breadcrumb,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FeatureItem,
  FileCard,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "How to Apply | B.Tech Admissions 2025 | GECL Lakhisarai",
  description:
    "Step-by-step guide to apply for B.Tech admission at GECL Lakhisarai via UGEAC counseling. Details on JEE Main requirements, registration, and choice filling.",
  openGraph: {
    title: "How to Apply - GECL Lakhisarai",
    description:
      "Official application process for B.Tech Admission via UGEAC and BCECEB.",
    images: ["/gecl/images/admissions/ugeac-counselling.webp"],
  },
};

const HowToApplyPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "How to Apply", href: "/admissions/how-to-apply" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ✅ Page Hero */}
      <PageHero
        title="How to Apply"
        description="A complete guide to the UGEAC counseling process for securing a seat at Government Engineering College, Lakhisarai."
        image="/gecl/images/admissions/ugeac-counselling.webp"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-10">
            {/* Intro Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gecl-surface p-6 sm:p-8 rounded-xl shadow-sm border border-gecl-border"
            >
              <h2 className="text-xl font-bold text-gecl-primary mb-3">
                Admission Process Overview
              </h2>
              <p className="text-gecl-text-muted leading-relaxed">
                GECL Lakhisarai does not accept direct applications. Admission
                is strictly conducted through the
                <span className="font-semibold text-gecl-primary">
                  {" "}
                  Under Graduate Engineering Admission Counselling (UGEAC)
                </span>{" "}
                managed by the BCECE Board, Bihar, based on your{" "}
                <span className="font-semibold text-gecl-primary">
                  JEE (Main) All India Rank
                </span>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                  <FaCheckDouble /> JEE Main Required
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                  <FaLaptopCode /> Online Counseling (UGEAC)
                </span>
              </div>
            </motion.div>

            {/* Step-by-Step Process */}
            <section id="application-steps">
              <SectionHeader
                title="Step-by-Step Application Guide"
                icon={FaListOl}
              />
              <p className="text-gecl-text-muted mb-6 -mt-4 ml-1">
                Follow these 5 steps to secure your admission.
              </p>

              <div className="space-y-6">
                <div className="bg-gecl-surface p-1 rounded-xl shadow-sm border border-gecl-border">
                  {/* Step 1 */}
                  <FeatureItem
                    title="Step 1: Appear for JEE (Main)"
                    text="Ensure you have appeared for the JEE (Main) exam conducted by NTA. Your All India Rank (AIR) is the sole criteria for the merit list."
                    icon={FaFileSignature}
                    className="border-b border-gecl-border last:border-0"
                  />

                  {/* Step 2 */}
                  <FeatureItem
                    title="Step 2: Register for UGEAC"
                    text="When BCECEB releases the notification (usually June/July), register online on bceceboard.bihar.gov.in. Upload your photo, signature, and pay the counseling fee."
                    icon={FaLaptopCode}
                    className="border-b border-gecl-border last:border-0"
                  />

                  {/* Step 3 */}
                  <FeatureItem
                    title="Step 3: Download Part A & Part B"
                    text="After successful registration, download the hard copy of your application (Part A & Part B). Keep this safe—it is mandatory for document verification."
                    icon={FaIdCard}
                    variant="warning"
                    className="border-b border-gecl-border last:border-0"
                  />

                  {/* Step 4 */}
                  <FeatureItem
                    title="Step 4: Choice Filling"
                    text="Log in to the counseling portal and select 'Government Engineering College, Lakhisarai' as your preferred choice. Lock your choices before the deadline."
                    icon={FaListOl}
                    className="border-b border-gecl-border last:border-0"
                  />

                  {/* Step 5 */}
                  <FeatureItem
                    title="Step 5: Seat Allotment & Reporting"
                    text="Check your seat allotment status. If allotted GECL, download the allotment letter and report to the Reporting Center for document verification."
                    icon={FaUniversity}
                  />
                </div>
              </div>
            </section>

            {/* Required Documents Preview */}
            <section>
              <SectionHeader
                title="Documents Needed for Application"
                icon={FaFileSignature}
              />
              <div className="bg-gecl-surface p-6 rounded-xl shadow-sm border border-gecl-border">
                <p className="text-gecl-text-muted mb-4">
                  Keep scanned copies of these documents ready before starting
                  your online UGEAC registration:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gecl-text-primary">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gecl-accent shrink-0" />{" "}
                    Aadhar Card
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gecl-accent shrink-0" />{" "}
                    JEE Main Admit Card & Score Card
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gecl-accent shrink-0" />{" "}
                    10th & 12th Marksheets
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gecl-accent shrink-0" />{" "}
                    Passport Size Photo (Same as JEE Main)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gecl-accent shrink-0" />{" "}
                    Cast/Income Certificate (if applicable)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gecl-accent shrink-0" />{" "}
                    Mobile No. & Email ID (Active)
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-gecl-border">
                  <Link
                    href="/admissions/required-documents"
                    className="text-gecl-accent hover:text-gecl-primary font-medium flex items-center gap-2 transition-colors"
                  >
                    View Full Document Checklist for Reporting →
                  </Link>
                </div>
              </div>
            </section>

            {/* Lateral Entry Section */}
            <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm shrink-0">
                  <FaExternalLinkAlt className="text-gecl-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gecl-primary mb-2">
                    Lateral Entry Applicants?
                  </h3>
                  <p className="text-gecl-text-muted text-sm mb-4">
                    Diploma students seeking direct 2nd-year admission must
                    apply for <strong>BCECE (LE)</strong>. The application
                    window is different (usually April-May).
                  </p>
                  <Link
                    href="/admissions/lateral-entry"
                    className="text-sm font-bold text-blue-700 hover:underline"
                  >
                    Check LE Eligibility & Process →
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
                { label: "How to Apply", href: "/admissions/how-to-apply" },
                {
                  label: "Important Dates",
                  href: "/admissions/important-dates",
                },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                },
              ]}
            />

            <SidebarWidget title="Quick Links">
              <div className="space-y-3">
                <a
                  href="https://bceceboard.bihar.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white border border-gecl-border rounded-lg hover:border-gecl-accent hover:shadow-md transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gecl-primary group-hover:text-gecl-accent">
                      BCECEB Official Website
                    </span>
                    <FaExternalLinkAlt className="text-xs text-gecl-text-muted" />
                  </div>
                </a>
                <a
                  href="https://jeemain.nta.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white border border-gecl-border rounded-lg hover:border-gecl-accent hover:shadow-md transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gecl-primary group-hover:text-gecl-accent">
                      JEE Main Portal
                    </span>
                    <FaExternalLinkAlt className="text-xs text-gecl-text-muted" />
                  </div>
                </a>
              </div>
            </SidebarWidget>

            <SidebarWidget title="Downloads">
              <div className="space-y-3">
                <FileCard
                  title="UGEAC Prospectus 2024"
                  subtitle="Reference PDF"
                  viewLink="#"
                />
                <FileCard
                  title="Step-by-Step Filling Guide"
                  subtitle="User Manual"
                  viewLink="#"
                />
              </div>
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HowToApplyPage;
