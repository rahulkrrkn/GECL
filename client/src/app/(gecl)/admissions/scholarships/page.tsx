import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaGraduationCap,
  FaHandHoldingUsd,
  FaLaptopCode,
  FaFileInvoice,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaUniversity,
  FaGlobe,
} from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Shared Components
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
  title: "Scholarships & Financial Aid | GECL Lakhisarai",
  description:
    "Financial support for GECL students: Bihar Student Credit Card (BSCCS), Post Matric Scholarship (PMS), and National Scholarship Portal (NSP) schemes.",
  openGraph: {
    title: "Scholarships - GECL Lakhisarai",
    description:
      "Guide to MNSSBY Loans, PMS Scholarship, and Central Government Schemes.",
    images: ["/gecl/images/campus/seminar-hall.webp"],
  },
};

const ScholarshipsPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "Scholarships", href: "/admissions/scholarships" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      <PageHero
        title="Scholarships & Financial Aid"
        description="Ensuring education is affordable. Explore government schemes for tuition fee waivers and education loans."
        image="/gecl/images/campus/seminar-hall.webp"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-12">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gecl-surface p-6 sm:p-8 rounded-xl shadow-sm border border-gecl-border"
            >
              <h2 className="text-xl font-bold text-gecl-primary mb-3">
                Financial Support Overview
              </h2>
              <p className="text-gecl-text-muted leading-relaxed">
                Students at Government Engineering College, Lakhisarai are
                eligible for various State and Central government scholarship
                schemes. The college has a dedicated **Scholarship Cell** to
                assist with document verification (Bonafide/Fee Structure)
                required for these applications.
              </p>
            </motion.div>

            {/* 1. Bihar Student Credit Card (BSCCS) */}
            <section id="bsccs">
              <SectionHeader
                title="Bihar Student Credit Card (BSCCS)"
                icon={FaHandHoldingUsd}
              />
              <div className="bg-white border border-blue-200 rounded-xl overflow-hidden mt-4 shadow-sm">
                <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center justify-between">
                  <h3 className="font-bold text-blue-900 flex items-center gap-2">
                    <FaUniversity /> MNSSBY Scheme
                  </h3>
                  <span className="text-xs font-semibold bg-blue-200 text-blue-800 px-2 py-1 rounded">
                    Loan up to ₹4 Lakhs
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gecl-text-muted">
                    Under the "Aarthik Hal, Yuvaon Ko Bal" initiative, Bihar
                    Government provides education loans at nominal interest
                    rates for B.Tech students. This covers college fees, hostel
                    charges, and book expenses.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureItem
                      title="Eligibility"
                      text="Permanent resident of Bihar, 12th Pass, admitted to GECL."
                      icon={FaCheckCircle}
                    />
                    <FeatureItem
                      title="Application Mode"
                      text="Apply online at MNSSBY portal, then verify at DRCC (District Registration Center)."
                      icon={FaLaptopCode}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <a
                      href="https://www.7nishchay-yuvaupmission.bihar.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-gecl-accent hover:underline"
                    >
                      Visit MNSSBY Portal{" "}
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Post Matric Scholarship (PMS) */}
            <section id="pms">
              <SectionHeader
                title="Post Matric Scholarship (PMS)"
                icon={FaGraduationCap}
              />
              <div className="bg-gecl-surface rounded-xl shadow-sm border border-gecl-border p-6 mt-4">
                <p className="text-gecl-text-muted mb-4">
                  Run by the Dept. of BC & EBC Welfare and SC & ST Welfare,
                  Govt. of Bihar. It reimburses admission and tuition fees.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded shrink-0">
                      <FaCheckCircle className="text-green-700 w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gecl-primary">
                        Who can apply?
                      </h4>
                      <p className="text-sm text-gecl-text-muted">
                        BC, EBC, SC, and ST students with valid Domicile and
                        Income Certificate (Limit as per govt rules).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded shrink-0">
                      <FaCheckCircle className="text-green-700 w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gecl-primary">
                        Required Documents
                      </h4>
                      <p className="text-sm text-gecl-text-muted">
                        Bonafide Certificate from College, Fee Receipt,
                        Caste/Income/Residence Certificates.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href="https://pmsonline.bih.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
                  >
                    Apply on PMS Portal{" "}
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </div>
            </section>

            {/* 3. National Scholarship Portal (NSP) - UPDATED */}
            <section id="nsp">
              <SectionHeader
                title="National Scholarship Portal (NSP)"
                icon={FaGlobe}
              />
              <div className="bg-gecl-surface rounded-xl shadow-sm border border-gecl-border p-6 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gecl-primary">
                    Central Govt. Schemes
                  </h3>
                  <a
                    href="https://scholarships.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-gecl-accent hover:underline flex items-center gap-1"
                  >
                    Visit Portal <FaExternalLinkAlt />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* AICTE Pragati */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h4 className="font-bold text-purple-900 text-sm mb-1">
                      AICTE Pragati (Girls)
                    </h4>
                    <p className="text-xs text-purple-800">
                      ₹50,000/year for girl students (Max 2 per family). Apply
                      in 1st Year.
                    </p>
                  </div>

                  {/* Merit Cum Means */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-bold text-green-900 text-sm mb-1">
                      Merit-cum-Means (MOMA)
                    </h4>
                    <p className="text-xs text-green-800">
                      For Minority communities (Muslim, Christian, Sikh, etc.).
                      Income &lt; ₹2.5L.
                    </p>
                  </div>

                  {/* Central Sector */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h4 className="font-bold text-orange-900 text-sm mb-1">
                      Central Sector Scheme
                    </h4>
                    <p className="text-xs text-orange-800">
                      For students above 80th percentile in 12th Board. Income
                      &lt; ₹8L.
                    </p>
                  </div>

                  {/* Divyangjan */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-blue-900 text-sm mb-1">
                      Saksham (Disabled)
                    </h4>
                    <p className="text-xs text-blue-800">
                      For differently-abled students ({">"}40% disability). Full
                      tuition + incidental.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. How to Get Documents */}
            <section className="bg-gray-50 border border-gecl-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-gecl-primary mb-4 flex items-center gap-2">
                <FaFileInvoice className="text-gecl-accent" /> How to get
                Bonafide & Fee Structure?
              </h3>
              <p className="text-sm text-gecl-text-muted mb-4">
                To apply for any scholarship, you need official documents signed
                by the Principal/Registrar.
              </p>
              <ol className="list-decimal pl-5 space-y-3 text-sm text-gecl-text-primary">
                <li>
                  <strong>Download Format:</strong> Get the prescribed format
                  from the respective scholarship portal (PMS/MNSSBY).
                </li>
                <li>
                  <strong>Fill Details:</strong> Fill in your Name, Reg No, Roll
                  No, and Session carefully.
                </li>
                <li>
                  <strong>Scholarship Cell:</strong> Visit the
                  Academic/Scholarship section in the Admin Block.
                </li>
                <li>
                  <strong>Submit & Collect:</strong> Submit your application.
                  The signed certificate is usually issued within 24-48 hours.
                </li>
              </ol>
            </section>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                {
                  label: "Scholarships",
                  href: "/admissions/scholarships",
                  active: true,
                },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
                { label: "How to Apply", href: "/admissions/how-to-apply" },
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                },
              ]}
            />

            <SidebarWidget title="Quick Links">
              <div className="space-y-3">
                <a
                  href="https://www.7nishchay-yuvaupmission.bihar.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white border border-gecl-border rounded-lg hover:border-blue-500 transition group"
                >
                  <span className="text-sm font-bold text-gecl-primary group-hover:text-blue-600 block">
                    MNSSBY Portal
                  </span>
                  <span className="text-xs text-gecl-text-muted">
                    For Student Credit Card
                  </span>
                </a>
                <a
                  href="https://pmsonline.bih.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white border border-gecl-border rounded-lg hover:border-green-500 transition group"
                >
                  <span className="text-sm font-bold text-gecl-primary group-hover:text-green-600 block">
                    PMS Online
                  </span>
                  <span className="text-xs text-gecl-text-muted">
                    Post Matric Scholarship
                  </span>
                </a>
                <a
                  href="https://scholarships.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white border border-gecl-border rounded-lg hover:border-purple-500 transition group"
                >
                  <span className="text-sm font-bold text-gecl-primary group-hover:text-purple-600 block">
                    National Scholarship Portal
                  </span>
                  <span className="text-xs text-gecl-text-muted">
                    Central Schemes
                  </span>
                </a>
              </div>
            </SidebarWidget>

            <SidebarWidget title="Downloads">
              <div className="space-y-3">
                <FileCard
                  title="Bonafide Application"
                  subtitle="College Format"
                  viewLink="#"
                  downloadLink="#"
                />
                <FileCard
                  title="Fee Structure for Loan"
                  subtitle="Bank/DRCC Format"
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

export default ScholarshipsPage;
