import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaClipboardCheck,
  FaUserEdit,
  FaLaptopCode,
  FaFileContract,
  FaUniversity,
  FaIdCard,
  FaMapMarkerAlt,
  FaBus,
  FaBed,
  FaRoad,
} from "react-icons/fa";
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
  title: "Admission Process Flow  | GECL Lakhisarai",
  description:
    "Step-by-step admission journey for B.Tech at GECL Lakhisarai. From JEE Main/UGEAC counseling to document verification and hostel allotment.",
  openGraph: {
    title: "Admission Process - GECL Lakhisarai",
    description:
      "Complete roadmap: Exam -> Counseling -> Reporting -> Induction.",
    images: ["/gecl/images/campus/seminar-hall.webp"],
  },
};

const AdmissionProcessPage = () => {
  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Admission Process"
        badge="B.Tech Admissions"
        icon={<FaRoad />}
        description="A comprehensive roadmap of your journey from entrance exam to your first day at Government Engineering College, Lakhisarai."
        image="/gecl/images/campus/seminar-hall.webp"
        className="bg-indigo-950" // Custom Theme
        themeColor="text-indigo-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Admission Process", href: "/admissions/admission-process" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-12">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gecl-border"
            >
              <h2 className="text-xl font-bold text-gecl-primary mb-3">
                Your Journey Starts Here
              </h2>
              <p className="text-gecl-text-muted leading-relaxed">
                The admission process for GECL is fully transparent and
                merit-based, conducted centrally by the
                <span className="font-semibold text-gecl-primary">
                  {" "}
                  Bihar Combined Entrance Competitive Examination Board (BCECEB)
                </span>
                . Whether you are a 1st-year aspirant (via JEE Main) or a
                Lateral Entry candidate, the roadmap remains similar.
              </p>
            </motion.div>

            {/* Timeline Section */}
            <section id="timeline">
              <SectionHeader
                title="The 6-Step Admission Roadmap"
                icon={FaLaptopCode}
              />
              <p className="text-gecl-text-muted mb-8 -mt-4 ml-1">
                From examination to joining the campus.
              </p>

              <div className="relative pl-4 sm:pl-8 border-l-2 border-gecl-border space-y-10">
                {/* Step 1 */}
                <div className="relative group">
                  <span className="absolute -left-[41px] sm:-left-[49px] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 border-4 border-white shadow-sm text-blue-700 group-hover:scale-110 transition-transform">
                    <FaUserEdit />
                  </span>
                  <div className="bg-white p-5 rounded-lg border border-gecl-border shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-bold text-gecl-primary">
                      Step 1: Entrance Exam
                    </h3>
                    <p className="text-sm text-gecl-text-muted mt-2">
                      <strong>For 1st Year:</strong> Appear for{" "}
                      <strong>JEE (Main)</strong> conducted by NTA.
                      <br />
                      <strong>For Lateral Entry:</strong> Appear for{" "}
                      <strong>BCECE (LE)</strong>.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/admissions/eligibility"
                        className="text-sm font-bold text-gecl-accent hover:underline flex items-center gap-1"
                      >
                        Check Eligibility Criteria →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <span className="absolute -left-[41px] sm:-left-[49px] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 border-4 border-white shadow-sm text-indigo-700 group-hover:scale-110 transition-transform">
                    <FaLaptopCode />
                  </span>
                  <div className="bg-white p-5 rounded-lg border border-gecl-border shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-bold text-gecl-primary">
                      Step 2: UGEAC Counseling Registration
                    </h3>
                    <p className="text-sm text-gecl-text-muted mt-2">
                      Register online on the BCECEB portal. Pay the counseling
                      fee and download your <strong>Rank Card</strong> and{" "}
                      <strong>Application Form (Part A & B)</strong>.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/admissions/how-to-apply"
                        className="text-sm font-bold text-gecl-accent hover:underline flex items-center gap-1"
                      >
                        See How to Apply Guide →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <span className="absolute -left-[41px] sm:-left-[49px] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 border-4 border-white shadow-sm text-purple-700 group-hover:scale-110 transition-transform">
                    <FaFileContract />
                  </span>
                  <div className="bg-white p-5 rounded-lg border border-gecl-border shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-bold text-gecl-primary">
                      Step 3: Choice Filling & Locking
                    </h3>
                    <p className="text-sm text-gecl-text-muted mt-2">
                      Log in to the portal and select{" "}
                      <strong>
                        Government Engineering College, Lakhisarai
                      </strong>{" "}
                      as your preferred institute. Lock your choices before the
                      deadline.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative group">
                  <span className="absolute -left-[41px] sm:-left-[49px] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 border-4 border-white shadow-sm text-green-700 group-hover:scale-110 transition-transform">
                    <FaClipboardCheck />
                  </span>
                  <div className="bg-white p-5 rounded-lg border border-gecl-border shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-bold text-gecl-primary">
                      Step 4: Seat Allotment
                    </h3>
                    <p className="text-sm text-gecl-text-muted mt-2">
                      BCECEB releases the allotment result. Download your{" "}
                      <strong>Provisional Seat Allotment Letter</strong>. It
                      will mention your "Reporting Center" (usually GECL
                      Campus).
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative group">
                  <span className="absolute -left-[41px] sm:-left-[49px] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 border-4 border-white shadow-sm text-orange-700 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt />
                  </span>
                  <div className="bg-white p-5 rounded-lg border border-gecl-border shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-bold text-gecl-primary">
                      Step 5: Physical Reporting
                    </h3>
                    <p className="text-sm text-gecl-text-muted mt-2">
                      Visit the college for Document Verification.
                    </p>
                    <ul className="mt-2 text-sm text-gecl-text-muted space-y-1 list-disc pl-5">
                      <li>Submit Original Certificates.</li>
                      <li>Biometric Verification (Fingerprint/Iris).</li>
                      <li>Pay Admission Fee (₹3,130).</li>
                    </ul>
                    <div className="mt-3 flex gap-4 text-sm font-medium">
                      <Link
                        href="/admissions/required-documents"
                        className="text-gecl-accent hover:underline"
                      >
                        Document Checklist
                      </Link>
                      <Link
                        href="/admissions/fee-structure"
                        className="text-gecl-accent hover:underline"
                      >
                        Fee Details
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="relative group">
                  <span className="absolute -left-[41px] sm:-left-[49px] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-gecl-primary border-4 border-white shadow-sm text-white group-hover:scale-110 transition-transform">
                    <FaUniversity />
                  </span>
                  <div className="bg-white p-5 rounded-lg border border-gecl-border shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-bold text-gecl-primary">
                      Step 6: Induction & Hostel
                    </h3>
                    <p className="text-sm text-gecl-text-muted mt-2">
                      After admission confirmation, you will receive your Roll
                      Number. You can now apply for the Hostel and Library card.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Link
                        href="/campus-life/hostel"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 transition"
                      >
                        <FaBed className="text-gecl-text-muted" /> Hostel Info
                      </Link>
                      <Link
                        href="/campus-life/library"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 transition"
                      >
                        <FaIdCard className="text-gecl-text-muted" /> Library
                      </Link>
                      <Link
                        href="/campus-life/transport"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 transition"
                      >
                        <FaBus className="text-gecl-text-muted" /> Transport
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reporting Day Checklist */}
            <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gecl-primary mb-4 flex items-center gap-2">
                <FaIdCard className="text-gecl-accent" /> On the Day of
                Reporting
              </h3>
              <p className="text-sm text-gecl-text-muted mb-4">
                Reporting day can be busy. Here is what typically happens at the{" "}
                <strong>Admission Cell (Admin Block)</strong>:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem
                  title="1. Biometric Check"
                  text="Your thumb impression must match your JEE Main/Exam data."
                  icon={FaUserEdit}
                />
                <FeatureItem
                  title="2. Document Submission"
                  text="Originals + 3 sets of photocopies. Originals are returned after verification (except CLC/Migration)."
                  icon={FaFileContract}
                />
                <FeatureItem
                  title="3. Admission Slip"
                  text="Collect your provisional admission slip generated from the BCECEB portal."
                  icon={FaClipboardCheck}
                />
                <FeatureItem
                  title="4. Fee Payment"
                  text="Submit the fee receipt (Online/DD) at the Accounts counter."
                  icon={FaLaptopCode}
                />
              </div>
            </section>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                {
                  label: "Admission Process",
                  href: "/admissions/admission-process",
                },
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
                {
                  label: "Important Dates",
                  href: "/admissions/important-dates",
                },
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
              ]}
            />

            <SidebarWidget title="Downloads">
              <div className="space-y-3">
                <FileCard
                  title="Biometric Form"
                  subtitle="Mandatory for Reporting"
                  viewLink="#"
                  className="hover:border-gecl-accent"
                />
                <FileCard
                  title="Check Slip (Jaanch Parchi)"
                  subtitle="BCECEB Format (2 Pages)"
                  viewLink="#"
                  className="hover:border-gecl-accent"
                />
              </div>
            </SidebarWidget>

            <SidebarWidget title="Explore Campus">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/campus-life/hostel"
                  className="block p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition"
                >
                  <FaBed className="mx-auto text-gecl-accent mb-1" />
                  <span className="text-xs font-semibold text-gecl-text-primary">
                    Hostels
                  </span>
                </Link>
                <Link
                  href="/campus-life/academic-facilities"
                  className="block p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition"
                >
                  <FaUniversity className="mx-auto text-gecl-primary mb-1" />
                  <span className="text-xs font-semibold text-gecl-text-primary">
                    Academic Facilities
                  </span>
                </Link>
              </div>
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdmissionProcessPage;
