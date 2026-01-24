import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaFileInvoiceDollar,
  FaBed,
  FaCalendar,
  FaCreditCard,
  FaUtensils,
  FaIndianRupeeSign,
} from "react-icons/fa6"; // Updated icons import
import { FaUniversity, FaCheckCircle } from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FileCard,
  FeatureItem,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Fee Structure 2025-26 | GECL Lakhisarai",
  description:
    "Official B.Tech fee structure for Session 2025-26. Includes Academic fees (₹3130), Hostel fees (₹37,100), and University registration charges.",
  openGraph: {
    title: "Fee Structure 2025 - GECL Lakhisarai",
    description: "Detailed breakdown of College, University, and Hostel fees.",
    images: ["/gecl/images/campus/gecl-campus-main.webp"],
  },
};

const FeeStructurePage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "Fee Structure", href: "/admissions/fee-structure" },
  ];

  // ✅ Based on your uploaded receipts
  const lastUpdatedDate = "August 01, 2025";

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Fee Structure"
        badge="Session 2025-26"
        icon={<FaIndianRupeeSign />}
        description="Official breakdown of Academic, University, and Hostel fees. Transparency in every transaction."
        image="/gecl/images/campus/gecl-campus-main.webp"
        className="bg-teal-950" // Finance Theme
        themeColor="text-teal-400"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-10">
            {/* Last Updated Badge */}
            <div className="flex items-center gap-2 text-sm font-semibold text-gecl-text-muted bg-white px-4 py-2 rounded-full w-fit shadow-sm border border-gecl-border">
              <FaCalendar className="text-teal-500" />
              <span>Last Updated: {lastUpdatedDate}</span>
            </div>

            {/* 1. Academic Fee (College) */}
            <section>
              <SectionHeader
                title="1. College Admission Fee"
                icon={FaUniversity}
              />
              <p className="text-gecl-text-muted mb-4 -mt-4 ml-1">
                Payable once at the time of 1st-year admission.
              </p>

              <div className="bg-white rounded-xl shadow-sm border border-gecl-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-teal-900 text-white text-sm uppercase">
                        <th className="p-4 font-semibold rounded-tl-xl">
                          Particulars
                        </th>
                        <th className="p-4 font-semibold">Frequency</th>
                        <th className="p-4 font-semibold text-right rounded-tr-xl">
                          Amount (₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gecl-text-primary">
                      <tr className="hover:bg-teal-50/50 transition-colors">
                        <td className="p-4">Admission Fee</td>
                        <td className="p-4 text-gecl-text-muted">One Time</td>
                        <td className="p-4 text-right font-medium">10.00</td>
                      </tr>
                      <tr className="hover:bg-teal-50/50 transition-colors">
                        <td className="p-4">Tuition Fee</td>
                        <td className="p-4 text-gecl-text-muted">
                          Annual (₹10/mo)
                        </td>
                        <td className="p-4 text-right font-medium">120.00</td>
                      </tr>
                      <tr className="hover:bg-teal-50/50 transition-colors">
                        <td className="p-4">Development Fee</td>
                        <td className="p-4 text-gecl-text-muted">One Time</td>
                        <td className="p-4 text-right font-medium">2,500.00</td>
                      </tr>
                      <tr className="hover:bg-teal-50/50 transition-colors">
                        <td className="p-4">Insurance / Misc Fee</td>
                        <td className="p-4 text-gecl-text-muted">One Time</td>
                        <td className="p-4 text-right font-medium">500.00</td>
                      </tr>
                      <tr className="bg-teal-50 font-bold text-teal-900 border-t-2 border-teal-100">
                        <td className="p-4">Total Academic Fee</td>
                        <td className="p-4">At Admission</td>
                        <td className="p-4 text-right text-lg">₹ 3,130.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 2. University Registration Fee */}
            <section>
              <SectionHeader
                title="2. University Registration Fee"
                icon={FaFileInvoiceDollar}
              />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gecl-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gecl-primary">
                    Bihar Engineering University (BEU) Registration
                  </h4>
                  <p className="text-sm text-gecl-text-muted mt-1">
                    Payable in 1st Semester for University Enrollment number.
                  </p>
                </div>
                <div className="text-right bg-blue-50 px-6 py-3 rounded-lg border border-blue-100 min-w-[140px]">
                  <span className="block text-2xl font-extrabold text-blue-700">
                    ₹ 2,100
                  </span>
                  <span className="text-xs text-blue-500 font-semibold uppercase tracking-wider">
                    One Time
                  </span>
                </div>
              </div>
            </section>

            {/* 3. Hostel Fee Structure */}
            <section id="hostel-fee">
              <SectionHeader title="3. Hostel & Mess Charges" icon={FaBed} />
              <p className="text-gecl-text-muted mb-4 -mt-4 ml-1">
                Applicable for students allotted hostel.{" "}
                <strong>
                  All fees must be paid to the College Account only.
                </strong>
              </p>

              <div className="bg-white rounded-xl shadow-sm border border-gecl-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-orange-900 text-white text-sm uppercase">
                        <th className="p-4 font-semibold rounded-tl-xl">
                          Purpose
                        </th>
                        <th className="p-4 font-semibold">Details</th>
                        <th className="p-4 font-semibold text-right rounded-tr-xl">
                          Amount (₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gecl-text-primary">
                      <tr className="hover:bg-orange-50/50 transition-colors">
                        <td className="p-4">Hostel Registration</td>
                        <td className="p-4 text-gecl-text-muted">One Time</td>
                        <td className="p-4 text-right font-medium">500.00</td>
                      </tr>
                      <tr className="hover:bg-orange-50/50 transition-colors">
                        <td className="p-4">Caution Money</td>
                        <td className="p-4 text-gecl-text-muted">
                          One Time (Refundable)
                        </td>
                        <td className="p-4 text-right font-medium">1,500.00</td>
                      </tr>
                      <tr className="hover:bg-orange-50/50 transition-colors">
                        <td className="p-4">Maintenance Charge</td>
                        <td className="p-4 text-gecl-text-muted">
                          1 Year (@ ₹1200/mo)
                        </td>
                        <td className="p-4 text-right font-medium">
                          14,400.00
                        </td>
                      </tr>
                      <tr className="hover:bg-orange-50/50 transition-colors">
                        <td className="p-4">Mess Charge</td>
                        <td className="p-4 text-gecl-text-muted">
                          6 Months Advance (@ ₹3450/mo)
                        </td>
                        <td className="p-4 text-right font-medium">
                          20,700.00
                        </td>
                      </tr>
                      <tr className="bg-orange-50 font-bold text-orange-900 border-t-2 border-orange-100">
                        <td className="p-4">Total Hostel Fee</td>
                        <td className="p-4">At Allotment</td>
                        <td className="p-4 text-right text-lg">₹ 37,100.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mess Rule Alert */}
              <div className="mt-6 bg-blue-50 p-5 rounded-xl border border-blue-100 flex gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-fit shrink-0 text-blue-600">
                  <FaUtensils />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">
                    Mess Rebate Policy (Absence Rule)
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    If a student is absent from the hostel for{" "}
                    <strong>more than 7 consecutive days</strong> (with prior
                    approved leave), mess charges will be deducted. However,{" "}
                    <strong>30% of the labor/service cost</strong> will still be
                    charged during the absence period to maintain mess
                    operations.
                  </p>
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gecl-border">
              <h3 className="text-lg font-bold text-gecl-primary mb-4 flex items-center gap-2">
                <FaCreditCard className="text-teal-600" /> Important Payment
                Instructions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem
                  title="No Cash in Hostel"
                  text="Hostel fees are NOT collected by the Warden or Hostel Office in cash. All payments must be made directly to the College Account."
                  icon={FaCheckCircle}
                />
                <FeatureItem
                  title="Payment Modes"
                  text="Fees accepted via Demand Draft (DD) in favor of 'Principal GECL' or Online (SBI Collect / UPI). Keep receipts safe."
                  icon={FaUniversity}
                />
              </div>
            </section>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "Seat Intake", href: "/admissions/seat-intake" },
                { label: "How to Apply", href: "/admissions/how-to-apply" },
                { label: "Scholarships", href: "/admissions/scholarships" },
              ]}
            />

            <SidebarWidget title="Downloads">
              <div className="space-y-3">
                <FileCard
                  title="Fee Structure Circular"
                  subtitle="Session 2025-26"
                  viewLink="#"
                  downloadLink="#"
                />
                <FileCard
                  title="Hostel Allotment Rule"
                  subtitle="Office Order 1591"
                  viewLink="#"
                />
              </div>
            </SidebarWidget>

            <SidebarWidget title="Need Help?">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gecl-text-muted mb-3">
                  Issues with online payment or receipts?
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2 bg-white border border-gecl-border text-gecl-primary text-sm font-bold rounded-md hover:bg-gray-50 transition shadow-sm"
                >
                  Contact Accounts Section
                </Link>
              </div>
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeeStructurePage;
