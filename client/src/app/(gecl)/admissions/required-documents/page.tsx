import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaFileAlt,
  FaIdCard,
  FaUserGraduate,
  FaFileMedical,
  FaCopy,
  FaCamera,
  FaFolderOpen,
  FaDownload,
  FaCheckDouble,
} from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  Breadcrumb,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FileCard,
  FeatureItem,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Required Documents for Admission | GECL Lakhisarai",
  description:
    "Complete checklist of documents required for B.Tech reporting at GECL Lakhisarai. Includes UGEAC Part A/B, Biometric Form, and Check Slip.",
  openGraph: {
    title: "Document Checklist - GECL Lakhisarai",
    description: "Don't miss a paper! Detailed list for Document Verification.",
    images: ["/gecl/images/admissions/document-verification.webp"],
  },
};

const RequiredDocumentsPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "Required Documents", href: "/admissions/required-documents" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      <PageHero
        title="Required Documents"
        description="The ultimate checklist for your physical reporting. Ensure you have all originals and photocopies ready."
        image="/gecl/images/admissions/document-verification.webp"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-12">
            {/* Intro Alert */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg shadow-sm"
            >
              <div className="flex items-start gap-4">
                <FaFolderOpen className="text-2xl text-blue-700 mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-blue-900">
                    Reporting Instruction
                  </h3>
                  <p className="text-blue-800 text-sm mt-1 leading-relaxed">
                    Candidates must bring <strong>Original Documents</strong>{" "}
                    for verification (which will be returned) and{" "}
                    <strong>3 Sets of Self-Attested Photocopies</strong> (which
                    will be submitted). Please arrange your documents in the
                    exact order listed below.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 1. UGEAC & Exam Documents */}
            <section>
              <SectionHeader
                title="1. Counseling & Application Documents"
                icon={FaFileAlt}
              />
              <div className="bg-gecl-surface rounded-xl shadow-sm border border-gecl-border p-2 sm:p-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem
                  title="Part A & Part B"
                  text="Hard copy of online filled Application Form (UGEAC)."
                  icon={FaDownload}
                  className="bg-gray-50 rounded-lg p-3"
                />
                <FeatureItem
                  title="Rank Card"
                  text="UGEAC Rank Card showing your Category/UR Rank."
                  icon={FaIdCard}
                  className="bg-gray-50 rounded-lg p-3"
                />
                <FeatureItem
                  title="Seat Allotment Letter"
                  text="Provisional Seat Allotment Letter (3 Copies)."
                  icon={FaCheckDouble}
                  className="bg-gray-50 rounded-lg p-3"
                />
                <FeatureItem
                  title="Choice Slip"
                  text="Printout of filled choices (Choice Slip)."
                  icon={FaFileAlt}
                  className="bg-gray-50 rounded-lg p-3"
                />
                <FeatureItem
                  title="Verification Slip"
                  text="Biometric Form & Check Slip (Jaanch Parchi) - 2 Copies."
                  icon={FaFileAlt}
                  variant="warning"
                  className="bg-yellow-50 rounded-lg p-3 md:col-span-2"
                />
              </div>
            </section>

            {/* 2. Academic Documents */}
            <section>
              <SectionHeader
                title="2. Academic Certificates"
                icon={FaUserGraduate}
              />
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gecl-border shadow-sm">
                  <div className="bg-gecl-primary/10 p-2 rounded-full shrink-0">
                    <FaUserGraduate className="text-gecl-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gecl-primary">
                      10th (Matriculation)
                    </h4>
                    <p className="text-sm text-gecl-text-muted">
                      Admit Card, Marksheet, and Passing Certificate (Original).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gecl-border shadow-sm">
                  <div className="bg-gecl-primary/10 p-2 rounded-full shrink-0">
                    <FaUserGraduate className="text-gecl-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gecl-primary">
                      12th (Intermediate) / Diploma
                    </h4>
                    <p className="text-sm text-gecl-text-muted">
                      Admit Card, Marksheet, and Passing Certificate (Original).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gecl-border shadow-sm">
                  <div className="bg-gecl-accent/10 p-2 rounded-full shrink-0">
                    <FaFileAlt className="text-gecl-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gecl-primary">
                      CLC / SLC / TC
                    </h4>
                    <p className="text-sm text-gecl-text-muted">
                      College/School Leaving Certificate (Original is Mandatory,
                      will be submitted).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gecl-border shadow-sm">
                  <div className="bg-gecl-accent/10 p-2 rounded-full shrink-0">
                    <FaFileAlt className="text-gecl-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gecl-primary">
                      Migration Certificate
                    </h4>
                    <p className="text-sm text-gecl-text-muted">
                      Required for University Registration (Original).
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            {/* 3. Identity & Personal */}
            <section>
              <SectionHeader
                title="3. Identity & Certificates"
                icon={FaIdCard}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-gecl-surface p-4 rounded-lg border border-gecl-border">
                  <h5 className="font-bold text-gecl-primary flex items-center gap-2 mb-2">
                    <FaIdCard className="text-gray-500" /> ID Proof
                  </h5>
                  <p className="text-sm text-gecl-text-muted">
                    Aadhar Card (Original + Copy).
                  </p>
                </div>
                <div className="bg-gecl-surface p-4 rounded-lg border border-gecl-border">
                  <h5 className="font-bold text-gecl-primary flex items-center gap-2 mb-2">
                    <FaCamera className="text-gray-500" /> Photographs
                  </h5>
                  <p className="text-sm text-gecl-text-muted">
                    6 Passport size photos (Same as on JEE Main Admit Card).
                  </p>
                </div>
                <div className="bg-gecl-surface p-4 rounded-lg border border-gecl-border">
                  <h5 className="font-bold text-gecl-primary flex items-center gap-2 mb-2">
                    <FaFileAlt className="text-gray-500" /> Caste Certificate
                  </h5>
                  <p className="text-sm text-gecl-text-muted">
                    Issued by CO/SDO/DM (For Reserved Categories).
                  </p>
                </div>
                <div className="bg-gecl-surface p-4 rounded-lg border border-gecl-border">
                  <h5 className="font-bold text-gecl-primary flex items-center gap-2 mb-2">
                    <FaFileAlt className="text-gray-500" /> Residential
                    (Domicile)
                  </h5>
                  <p className="text-sm text-gecl-text-muted">
                    Issued by CO/SDO/DM (Mandatory for Bihar Quota).
                  </p>
                </div>
                <div className="bg-gecl-surface p-4 rounded-lg border border-gecl-border">
                  <h5 className="font-bold text-gecl-primary flex items-center gap-2 mb-2">
                    <FaFileAlt className="text-gray-500" /> Income Certificate
                  </h5>
                  <p className="text-sm text-gecl-text-muted">
                    Current Financial Year (For EWS/TFW candidates).
                  </p>
                </div>
                <div className="bg-gecl-surface p-4 rounded-lg border border-gecl-border">
                  <h5 className="font-bold text-gecl-primary flex items-center gap-2 mb-2">
                    <FaFileMedical className="text-gray-500" /> Medical
                    Certificate
                  </h5>
                  <p className="text-sm text-gecl-text-muted">
                    From Registered Medical Practitioner (Format in Sidebar).
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Affidavits (Gap/Ragging) */}
            <section className="bg-gray-50 border border-gecl-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-gecl-primary mb-3">
                4. Affidavits (Notary)
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gecl-text-muted">
                <li>
                  <strong>Gap Certificate:</strong> If there is a gap between
                  12th/Diploma and Admission year (Affidavit by student).
                </li>
                <li>
                  <strong>Anti-Ragging Affidavit:</strong> By Student and Parent
                  (Format available on UGC website or College).
                </li>
              </ul>
            </section>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                  active: true,
                },
                {
                  label: "Admission Process",
                  href: "/admissions/admission-process",
                },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
              ]}
            />

            <SidebarWidget title="Format Downloads">
              <div className="space-y-3">
                <FileCard
                  title="Biometric Form (Jaanch Parchi)"
                  subtitle="Official BCECE Format"
                  viewLink="#"
                  downloadLink="#"
                />
                <FileCard
                  title="Medical Certificate Format"
                  subtitle="Required for Fitness"
                  viewLink="#"
                  downloadLink="#"
                />
                <FileCard
                  title="Anti-Ragging Affidavit"
                  subtitle="Student & Parent Format"
                  viewLink="#"
                  downloadLink="#"
                />
              </div>
            </SidebarWidget>

            <SidebarWidget title="Photo Spec">
              <div className="bg-white p-4 rounded-lg border border-gecl-border text-center">
                <FaCamera className="w-8 h-8 text-gecl-accent mx-auto mb-2" />
                <p className="text-xs text-gecl-text-muted">
                  Ensure photographs are identical to the one uploaded in your{" "}
                  <strong>JEE Main / UGEAC</strong> application. Do not bring
                  new/different photos.
                </p>
              </div>
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequiredDocumentsPage;
