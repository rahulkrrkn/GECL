import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCircleInfo,
  FaFileLines,
  FaGraduationCap,
  FaListCheck,
  FaUserGraduate,
  FaUsers,
  FaCheck,
  FaLaptopCode,
  FaForward,
} from "react-icons/fa6";
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FeatureItem,
  FileCard,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Lateral Entry Admission (B.Tech 2nd Year) | GEC Lakhisarai",
  description:
    "Direct 2nd Year B.Tech Admission (Lateral Entry) at Government Engineering College Lakhisarai via BCECE LE. Check eligibility, seats, and documents.",
  openGraph: {
    title: "Lateral Entry Admission - GECL Lakhisarai",
    description: "Direct entry to 2nd Year B.Tech for Diploma/B.Sc holders.",
    images: ["/gecl/images/campus/gecl-campus-main.webp"],
  },
};

const LateralEntryPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "Lateral Entry", href: "/admissions/lateral-entry" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Lateral Entry Admission"
        badge="Direct 2nd Year"
        icon={<FaForward />} // PageHero usually accepts Elements (<Icon />), keep as is if PageHero definition allows ReactNode
        description="Direct admission into the 3rd Semester (2nd Year) of B.Tech for Diploma holders and B.Sc graduates via BCECE (LE)."
        image="/gecl/images/campus/gecl-campus-main.webp"
        className="bg-blue-950"
        themeColor="text-blue-400"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gecl-border flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div>
                <h2 className="text-xl font-bold text-gecl-primary mb-2">
                  Admission Overview
                </h2>
                <p className="text-gecl-text-muted text-sm max-w-lg">
                  Lateral Entry allows eligible candidates to bypass the first
                  year and join directly from the 3rd semester. It is conducted
                  solely based on the <strong>BCECE (LE)</strong> rank.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-w-[200px] bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 font-medium">Exam Mode:</span>
                  <span className="font-bold text-blue-900">Offline</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 font-medium">Duration:</span>
                  <span className="font-bold text-blue-900">3 Years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 font-medium">Seats:</span>
                  <span className="font-bold text-blue-900">10% of Intake</span>
                </div>
              </div>
            </motion.div>

            {/* 1. ELIGIBILITY SECTION */}
            <section id="eligibility">
              {/* ✅ FIXED: Passing Component (FaGraduationCap) instead of Element (<Fa.../>) */}
              <SectionHeader
                icon={FaGraduationCap}
                title="Eligibility Criteria"
              />
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <FeatureItem
                  title="Diploma Holders"
                  text="Passed 3-year Diploma in Engineering with at least 45% marks (40% for Reserved Categories)."
                  icon={FaUserGraduate}
                  className="bg-white border border-gray-100 shadow-sm h-full"
                />
                <FeatureItem
                  title="B.Sc Graduates"
                  text="Passed B.Sc Degree with Mathematics in Class 12th. Engineering Graphics/Mechanics must be cleared in 2nd year."
                  icon={FaCheck}
                  className="bg-white border border-gray-100 shadow-sm h-full"
                />
              </div>
            </section>

            {/* 2. SEAT MATRIX SECTION */}
            <section id="seat-matrix">
              {/* ✅ FIXED: Passing Component (FaUsers) */}
              <SectionHeader icon={FaUsers} title="Seat Matrix (Tentative)" />
              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gecl-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-blue-900 text-white font-bold uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4 rounded-tl-xl">Branch Name</th>
                        <th className="px-6 py-4 text-center">
                          Regular Intake
                        </th>
                        <th className="px-6 py-4 text-center">
                          Lateral Seats (10%)
                        </th>
                        <th className="px-6 py-4 text-center">
                          Likely Vacancy
                        </th>
                        <th className="px-6 py-4 text-right rounded-tr-xl">
                          Total LE Seats
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gecl-text-primary">
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          Civil Engineering
                        </td>
                        <td className="px-6 py-4 text-center">120</td>
                        <td className="px-6 py-4 text-center font-semibold text-blue-600">
                          12
                        </td>
                        <td className="px-6 py-4 text-center">~ 5-10</td>
                        <td className="px-6 py-4 text-right font-bold text-green-600">
                          ~ 20
                        </td>
                      </tr>
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          Computer Science (CSE)
                        </td>
                        <td className="px-6 py-4 text-center">60</td>
                        <td className="px-6 py-4 text-center font-semibold text-blue-600">
                          06
                        </td>
                        <td className="px-6 py-4 text-center">~ 2-5</td>
                        <td className="px-6 py-4 text-right font-bold text-green-600">
                          ~ 10
                        </td>
                      </tr>
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          Electrical Engineering
                        </td>
                        <td className="px-6 py-4 text-center">60</td>
                        <td className="px-6 py-4 text-center font-semibold text-blue-600">
                          06
                        </td>
                        <td className="px-6 py-4 text-center">~ 5-8</td>
                        <td className="px-6 py-4 text-right font-bold text-green-600">
                          ~ 12
                        </td>
                      </tr>
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          Mechanical Engineering
                        </td>
                        <td className="px-6 py-4 text-center">60</td>
                        <td className="px-6 py-4 text-center font-semibold text-blue-600">
                          06
                        </td>
                        <td className="px-6 py-4 text-center">~ 5-10</td>
                        <td className="px-6 py-4 text-right font-bold text-green-600">
                          ~ 15
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-50 font-bold text-gray-900 border-t border-gray-200">
                      <tr>
                        <td className="px-6 py-4">Total Estimated Seats</td>
                        <td className="px-6 py-4 text-center">300</td>
                        <td className="px-6 py-4 text-center">30</td>
                        <td className="px-6 py-4 text-center">~ 20</td>
                        <td className="px-6 py-4 text-right">~ 50+ Seats</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </section>

            {/* 3. ADMISSION PROCESS (TIMELINE) */}
            <section id="process">
              {/* ✅ FIXED: Passing Component (FaCalendarCheck) */}
              <SectionHeader
                icon={FaCalendarCheck}
                title="Admission Process Step-by-Step"
              />
              <div className="mt-8 relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8">
                <TimelineItem
                  step="01"
                  title="Online Application (BCECE Board)"
                  desc="Register online at bceceboard.bihar.gov.in when the notification is released (usually in April/May)."
                  date="Apr - May"
                />
                <TimelineItem
                  step="02"
                  title="Admit Card & Entrance Exam"
                  desc="Download admit card and appear for the BCECE (LE) offline examination covering Engg Mechanics, Math, and English."
                  date="June - July"
                />
                <TimelineItem
                  step="03"
                  title="Rank Card Declaration"
                  desc="Results are declared in the form of a Rank Card (General & Category Rank)."
                  date="July End"
                />
                <TimelineItem
                  step="04"
                  title="Online Counseling (Choice Filling)"
                  desc="Register for counseling (UGEAC-LE) and fill GEC Lakhisarai as your top preference."
                  date="August"
                />
                <TimelineItem
                  step="05"
                  title="Seat Allotment & Reporting"
                  desc="Download allotment letter and report to the reporting center for document verification and admission."
                  date="Aug - Sept"
                />
              </div>
            </section>

            {/* 4. DOCUMENTS REQUIRED */}
            <section id="documents">
              {/* ✅ FIXED: Passing Component (FaFileLines) */}
              <SectionHeader icon={FaFileLines} title="Documents Checklist" />
              <div className="mt-6 p-6 bg-yellow-50 border border-yellow-100 rounded-xl">
                <p className="mb-4 text-sm text-yellow-800 font-medium">
                  Candidates must carry{" "}
                  <strong>Original + 2 Sets of Photocopies</strong> of the
                  following documents during reporting:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <CheckItem>BCECE (LE) Rank Card & Admit Card</CheckItem>
                  <CheckItem>
                    Class 10th (Matric) Marksheet & Certificate
                  </CheckItem>
                  <CheckItem>Diploma/B.Sc Marksheets (All Semesters)</CheckItem>
                  <CheckItem>Diploma/B.Sc Passing Certificate</CheckItem>
                  <CheckItem>Caste Certificate (if applicable)</CheckItem>
                  <CheckItem>Residential Certificate (Domicile)</CheckItem>
                  <CheckItem>
                    Character Certificate (from last institute)
                  </CheckItem>
                  <CheckItem>Migration / SLC / CLC Certificate</CheckItem>
                  <CheckItem>Aadhar Card (Original)</CheckItem>
                  <CheckItem>6 Passport Size Photographs</CheckItem>
                  <CheckItem>Part A & B of Application Form</CheckItem>
                  <CheckItem>Medical Fitness Certificate</CheckItem>
                </div>
              </div>
            </section>

            {/* 5. CTA SECTION */}
            <section className="bg-blue-900 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
                Ready to Apply?
              </h3>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto relative z-10">
                Visit the official BCECE Board website for the latest
                notifications and application links.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="https://bceceboard.bihar.gov.in"
                  target="_blank"
                  className="px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg"
                >
                  Visit BCECE Board
                </a>
                <Link
                  href="/admissions/contact"
                  className="px-8 py-3 bg-transparent border border-blue-200 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                >
                  Contact Helpdesk
                </Link>
              </div>
            </section>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                { label: "Lateral Entry", href: "/admissions/lateral-entry" },
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                },
              ]}
            />

            <SidebarWidget title="Downloads">
              <div className="space-y-3">
                <FileCard
                  title="LE Prospectus"
                  subtitle="Reference PDF"
                  viewLink="#"
                />
                <FileCard
                  title="Medical Format"
                  subtitle="PDF Template"
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

// ================= HELPER COMPONENTS =================

function TimelineItem({
  step,
  title,
  desc,
  date,
}: {
  step: string;
  title: string;
  desc: string;
  date: string;
}) {
  return (
    <div className="relative pl-8 md:pl-10 group">
      {/* Dot */}
      <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-300 group-hover:bg-blue-600 transition-all ring-4 ring-slate-50"></span>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1 block">
            Step {step}
          </span>
          <h4 className="text-lg font-bold text-slate-800">{title}</h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed max-w-xl">
            {desc}
          </p>
        </div>
        <div className="shrink-0 mt-2 sm:mt-0">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-yellow-100 shadow-sm">
      <FaListCheck className="text-yellow-600 shrink-0" />
      <span className="text-sm text-slate-700 font-medium">{children}</span>
    </div>
  );
}

export default LateralEntryPage;
