import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaUniversity,
  FaUserGraduate,
  FaCheckCircle,
  FaInfoCircle,
  FaFileAlt,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FeatureItem,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Eligibility Criteria | Admission 2025 | GECL Lakhisarai",
  description:
    "Check eligibility criteria for B.Tech admission at Government Engineering College Lakhisarai. Details on JEE Main, UGEAC, BCECE Lateral Entry, and domicile requirements.",
  openGraph: {
    title: "Eligibility Criteria - GECL Lakhisarai",
    description:
      "Official eligibility guidelines for B.Tech and Lateral Entry admissions at GEC Lakhisarai.",
    images: ["/gecl/images/campus/gecl-campus-main.webp"],
  },
};

const EligibilityPage = () => {
  // ✅ Fixed: Using 'href' to match PageHeroProps
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "Eligibility Criteria", href: "/admissions/eligibility" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ✅ Fixed: Using 'image' and 'breadcrumbItems' props exactly as per interface */}
      <PageHero
        title="Eligibility Criteria"
        description="Detailed academic prerequisites, entrance exam requirements, and domicile rules for B.Tech Admission at GECL."
        image="/gecl/images/admissions/ugeac-counselling.webp"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Left Content Area ==================== */}
          <div className="lg:col-span-2 space-y-10">
            {/* 1. Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gecl-surface p-6 sm:p-8 rounded-xl shadow-sm border border-gecl-border"
            >
              <h2 className="text-2xl font-bold text-gecl-primary flex items-center gap-3 mb-4">
                <FaUniversity className="text-gecl-accent" />
                Admission Overview
              </h2>
              <p className="text-gecl-text-muted leading-relaxed mb-4">
                Admission to{" "}
                <strong>Government Engineering College, Lakhisarai</strong> is
                governed by the rules of the
                <span className="font-semibold text-gecl-primary">
                  {" "}
                  Bihar Combined Entrance Competitive Examination Board (BCECEB)
                </span>
                . Candidates must satisfy academic, residential, and medical
                standards to secure a seat.
              </p>

              <div className="flex items-start gap-3 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg mt-4">
                <FaInfoCircle className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> Admission to 1st Year B.Tech is
                  strictly based on
                  <span className="font-semibold"> JEE (Main) Score</span>{" "}
                  followed by UGEAC Counselling. GECL does not conduct its own
                  entrance exam.
                </p>
              </div>
            </motion.div>

            {/* 2. B.Tech (4 Years) Eligibility */}
            <section id="btech-regular">
              {/* ✅ Fixed: Removed 'subtitle' (not in interface). Added it as <p> below. */}
              <SectionHeader
                title="B.Tech (1st Year) Eligibility"
                icon={FaUserGraduate}
              />
              <p className="text-gecl-text-muted mb-6 -mt-4 ml-1">
                For candidates entering after 10+2 (Intermediate)
              </p>

              <div className="bg-gecl-surface rounded-xl shadow-sm border border-gecl-border overflow-hidden p-6 space-y-6">
                {/* ✅ Fixed: Changed 'description' -> 'text' to match FeatureItemProps */}
                <FeatureItem
                  title="Entrance Examination"
                  text="Must have a valid score in Joint Entrance Examination (JEE) Main conducted by NTA."
                  icon={FaUserGraduate}
                />

                <FeatureItem
                  title="Academic Qualification (10+2)"
                  text="Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with Chemistry/Biotechnology/Biology. Min 45% (Gen) / 40% (Reserved)."
                  icon={FaFileAlt}
                />

                <FeatureItem
                  title="Counseling Registration"
                  text="Must apply for Under Graduate Engineering Admission Counselling (UGEAC) on the BCECEB portal."
                  icon={FaCheckCircle}
                />

                <div className="pl-14">
                  <Link
                    href="/admissions/how-to-apply"
                    className="text-gecl-accent hover:underline font-medium text-sm"
                  >
                    View Application Process →
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. Lateral Entry (3 Years) Eligibility */}
            <section id="lateral-entry">
              <SectionHeader title="B.Tech (Lateral Entry)" icon={FaIdCard} />
              <p className="text-gecl-text-muted mb-6 -mt-4 ml-1">
                Direct admission to 2nd Year for Diploma/B.Sc holders
              </p>

              <div className="bg-gecl-surface rounded-xl shadow-sm border border-gecl-border p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg h-fit shrink-0">
                      <FaUserGraduate className="w-5 h-5 text-orange-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gecl-primary mb-2">
                        Diploma Qualification
                      </h4>
                      <p className="text-gecl-text-muted mb-2">
                        Passed Minimum{" "}
                        <strong>3-year Diploma examination</strong> with at
                        least <strong>45% marks</strong>
                        (40% for reserved category) in any branch of Engineering
                        and Technology.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gecl-border my-2"></div>

                  <div className="flex gap-4">
                    <div className="bg-green-100 p-3 rounded-lg h-fit shrink-0">
                      <FaCheckCircle className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gecl-primary mb-2">
                        Entrance Exam (BCECE-LE)
                      </h4>
                      <p className="text-gecl-text-muted">
                        Admission is based on the merit list of{" "}
                        <strong>
                          Bihar Combined Entrance Competitive Examination
                          (Lateral Entry)
                        </strong>
                        .
                      </p>
                      <Link
                        href="/admissions/seat-intake"
                        className="text-sm text-gecl-accent font-medium hover:underline mt-2 block"
                      >
                        Check Lateral Entry Seat Matrix →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Domicile & Medical */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gecl-surface p-6 rounded-xl shadow-sm border border-gecl-border">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="w-5 h-5 text-gecl-accent" />
                  <h3 className="text-lg font-bold text-gecl-primary">
                    Domicile Rules
                  </h3>
                </div>
                <p className="text-gecl-text-muted text-sm leading-relaxed">
                  To claim state quota seats, candidates must be a{" "}
                  <strong>permanent resident of Bihar</strong> or their parents
                  must be employed by the Bihar Govt. (as per detailed UGEAC
                  prospectus).
                </p>
              </div>

              <div className="bg-gecl-surface p-6 rounded-xl shadow-sm border border-gecl-border">
                <div className="flex items-center gap-3 mb-4">
                  <FaCheckCircle className="w-5 h-5 text-gecl-success" />
                  <h3 className="text-lg font-bold text-gecl-primary">
                    Medical Fitness
                  </h3>
                </div>
                <p className="text-gecl-text-muted text-sm leading-relaxed">
                  All selected candidates must undergo a medical checkup.
                  Admission is provisional subject to medical fitness.
                </p>
                <div className="mt-3">
                  <Link
                    href="/admissions/required-documents"
                    className="text-sm text-gecl-accent font-medium hover:underline"
                  >
                    Download Medical Format →
                  </Link>
                </div>
              </div>
            </section>

            {/* 5. Disclaimer */}
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <FaExclamationTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-1" />
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Rules are subject to change by the
                Department of Science & Technology, Bihar. Please refer to the{" "}
                <a
                  href="https://bceceboard.bihar.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold hover:text-yellow-900"
                >
                  Official BCECEB Website
                </a>{" "}
                for the latest prospectus.
              </p>
            </div>
          </div>

          {/* ==================== Sidebar Area ==================== */}
          <div className="lg:col-span-1 space-y-8">
            {/* ✅ Fixed: Changed 'path' -> 'href' to fix the unique key error */}
            {/* Removed 'active' prop as it's not in your Interface */}
            <SidebarNavigation
              title="Admissions"
              links={[
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
                { label: "How to Apply", href: "/admissions/how-to-apply" },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                },
                { label: "Scholarships", href: "/admissions/scholarships" },
              ]}
            />

            <SidebarWidget title="Need Help?">
              <div className="space-y-4">
                <p className="text-sm text-gecl-text-muted">
                  Confused about the counseling process? Contact our admission
                  cell.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center bg-gecl-accent text-white py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Contact Helpdesk
                </Link>
              </div>
            </SidebarWidget>

            <SidebarWidget title="Downloads">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-gecl-primary hover:text-gecl-accent transition"
                  >
                    <FaFileAlt className="text-red-500" /> UGEAC Prospectus 2025
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-gecl-primary hover:text-gecl-accent transition"
                  >
                    <FaFileAlt className="text-red-500" /> Medical Certificate
                    Format
                  </a>
                </li>
              </ul>
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EligibilityPage;
