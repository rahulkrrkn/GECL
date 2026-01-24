import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaChartPie,
  FaUsers,
  FaLaptopCode,
  FaBolt,
  FaBuilding,
  FaDatabase,
} from "react-icons/fa6"; // Updated imports
import {
  FaUniversity,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCogs,
} from "react-icons/fa"; // Updated imports
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  Breadcrumb,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FileCard,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Seat Intake & Matrix 2025 | GECL Lakhisarai",
  description:
    "Branch-wise seat availability for B.Tech Admission 2025. Official intake for CSE(AI), Data Science, Civil, Mechanical, and Electrical Engineering.",
  openGraph: {
    title: "Seat Intake 2025 - GECL Lakhisarai",
    description:
      "Official Seat Matrix: Civil (120), CSE-AI (60), CSE-DS (60), Mech (60), EE (60).",
    images: ["/gecl/images/campus/gecl-campus-main.webp"],
  },
};

const SeatIntakePage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "Seat Intake", href: "/admissions/seat-intake" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Seat Intake Capacity"
        badge="AICTE Approved"
        icon={<FaChartPie />}
        description="Department-wise breakdown of approved seats for the Academic Session 2025-2026. Includes regular and lateral entry quotas."
        image="/gecl/images/campus/gecl-campus-main.webp"
        className="bg-blue-950" // Custom Theme
        themeColor="text-blue-400"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-10">
            {/* Intro Alert */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gecl-border"
            >
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-gecl-primary mt-1 shrink-0 text-xl" />
                <div>
                  <h3 className="text-lg font-bold text-gecl-primary mb-1">
                    AICTE Approved Intake
                  </h3>
                  <p className="text-gecl-text-muted text-sm leading-relaxed">
                    The seat intake mentioned below is based on the approval by
                    the{" "}
                    <strong>
                      All India Council for Technical Education (AICTE)
                    </strong>{" "}
                    and affiliation with{" "}
                    <strong>Bihar Engineering University (BEU), Patna</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 1. Branch-wise Matrix */}
            <section>
              <SectionHeader
                title="B.Tech Seat Matrix (1st Year)"
                icon={FaUsers}
              />
              <div className="bg-white rounded-xl shadow-sm border border-gecl-border overflow-hidden mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-blue-900 text-white text-sm uppercase">
                        <th className="p-4 font-semibold rounded-tl-xl">
                          Branch Name
                        </th>
                        <th className="p-4 font-semibold text-center">
                          Approved Intake
                        </th>
                        <th className="p-4 font-semibold text-center rounded-tr-xl">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gecl-text-primary">
                      {/* Civil - Usually highest intake in older GECs */}
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 flex items-center gap-3 font-medium">
                          <div className="bg-orange-100 text-orange-700 p-2 rounded-lg">
                            <FaBuilding />
                          </div>
                          <span>Civil Engineering</span>
                        </td>
                        <td className="p-4 text-center font-bold text-lg">
                          120
                        </td>
                        <td className="p-4 text-center text-gecl-text-muted">
                          4 Years
                        </td>
                      </tr>

                      {/* CSE (AI) */}
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 flex items-center gap-3 font-medium">
                          <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                            <FaLaptopCode />
                          </div>
                          <span>Computer Science & Engg. (AI)</span>
                        </td>
                        <td className="p-4 text-center font-bold text-lg">
                          60
                        </td>
                        <td className="p-4 text-center text-gecl-text-muted">
                          4 Years
                        </td>
                      </tr>

                      {/* CSE (Data Science) */}
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 flex items-center gap-3 font-medium">
                          <div className="bg-purple-100 text-purple-700 p-2 rounded-lg">
                            <FaDatabase />
                          </div>
                          <span>Computer Science & Engg. (Data Science)</span>
                        </td>
                        <td className="p-4 text-center font-bold text-lg">
                          60
                        </td>
                        <td className="p-4 text-center text-gecl-text-muted">
                          4 Years
                        </td>
                      </tr>

                      {/* Mechanical */}
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 flex items-center gap-3 font-medium">
                          <div className="bg-gray-100 text-gray-700 p-2 rounded-lg">
                            <FaCogs />
                          </div>
                          <span>Mechanical Engineering</span>
                        </td>
                        <td className="p-4 text-center font-bold text-lg">
                          60
                        </td>
                        <td className="p-4 text-center text-gecl-text-muted">
                          4 Years
                        </td>
                      </tr>

                      {/* Electrical */}
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 flex items-center gap-3 font-medium">
                          <div className="bg-yellow-100 text-yellow-700 p-2 rounded-lg">
                            <FaBolt />
                          </div>
                          <span>Electrical Engineering</span>
                        </td>
                        <td className="p-4 text-center font-bold text-lg">
                          60
                        </td>
                        <td className="p-4 text-center text-gecl-text-muted">
                          4 Years
                        </td>
                      </tr>

                      {/* Total */}
                      <tr className="bg-blue-50 font-bold text-blue-900 border-t-2 border-blue-100">
                        <td className="p-4">Total Capacity</td>
                        <td className="p-4 text-center text-lg">360</td>
                        <td className="p-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 2. Lateral Entry Info */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm shrink-0">
                  <FaChartPie className="text-gecl-accent text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gecl-primary mb-2">
                    Lateral Entry Seats (2nd Year)
                  </h3>
                  <p className="text-sm text-gecl-text-muted leading-relaxed mb-3">
                    As per AICTE norms, Lateral Entry intake is fixed at{" "}
                    <strong>10% of the Approved Intake</strong> (Supernumerary
                    Quota).
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white px-4 py-2 rounded-md border border-gray-200 text-sm font-semibold">
                      Civil: <span className="text-gecl-accent">~12 Seats</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-md border border-gray-200 text-sm font-semibold">
                      CSE (AI/DS):{" "}
                      <span className="text-gecl-accent">~6 Seats</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-md border border-gray-200 text-sm font-semibold">
                      Others:{" "}
                      <span className="text-gecl-accent">~6 Seats Each</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Reservation Policy */}
            <section>
              <SectionHeader title="Reservation Policy" icon={FaUniversity} />
              <p className="text-gecl-text-muted mb-4 -mt-4 ml-1">
                Seats are reserved as per the Bihar Reservation of Vacancies in
                Posts and Services Act.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gecl-border shadow-sm">
                  <h4 className="font-bold text-gecl-primary mb-2">
                    Vertical Reservation
                  </h4>
                  <ul className="text-sm text-gecl-text-muted space-y-1 list-disc pl-4">
                    <li>Scheduled Caste (SC)</li>
                    <li>Scheduled Tribe (ST)</li>
                    <li>Extremely Backward Class (EBC)</li>
                    <li>Backward Class (BC)</li>
                    <li>Economically Weaker Section (EWS)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gecl-border shadow-sm">
                  <h4 className="font-bold text-gecl-primary mb-2">
                    Horizontal Reservation
                  </h4>
                  <ul className="text-sm text-gecl-text-muted space-y-1 list-disc pl-4">
                    <li>
                      <strong>33% Reserved for Women</strong> (in each category)
                    </li>
                    <li>Disabled Quota (DQ)</li>
                    <li>Serviceman Quota (SMQ)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <FaExclamationTriangle className="text-yellow-600 mt-1 shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> The seat matrix is subject to
                change based on the annual approval process by AICTE and DST,
                Bihar. Always refer to the official UGEAC Seat Matrix PDF
                released before counseling.
              </p>
            </div>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                {
                  label: "Seat Intake",
                  href: "/admissions/seat-intake",
                  active: true,
                },
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "How to Apply", href: "/admissions/how-to-apply" },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                },
              ]}
            />

            <SidebarWidget title="Downloads">
              <FileCard
                title="Official Seat Matrix"
                subtitle="PDF Reference (BCECEB)"
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

export default SeatIntakePage;
