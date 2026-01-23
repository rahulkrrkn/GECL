import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaBed,
  FaUtensils,
  FaWifi,
  FaShower,
  FaShieldAlt,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserClock,
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
  title: "Hostel Admission & Facilities | GECL Lakhisarai",
  description:
    "Apply for hostel accommodation at Government Engineering College Lakhisarai. Check hostel fees (₹37,100), mess rules, and allotment process.",
  openGraph: {
    title: "Hostel Admission - GECL Lakhisarai",
    description:
      "Secure, affordable on-campus housing. Fee: ₹37,100/sem (approx).",
    images: ["/gecl/images/hostel/gecl-hostel.webp"],
  },
};

const HostelAdmissionPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "Hostel Admission", href: "/admissions/hostel-admission" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      <PageHero
        title="Hostel Admission"
        description="Your home away from home. Secure, comfortable, and conducive environment for academic growth."
        image="/gecl/images/hostel/gecl-hostel.webp"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-12">
            {/* Intro Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gecl-surface p-6 sm:p-8 rounded-xl shadow-sm border border-gecl-border"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-700 shrink-0">
                  <FaBed className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gecl-primary mb-2">
                    Accommodation Overview
                  </h2>
                  <p className="text-gecl-text-muted leading-relaxed">
                    GECL Lakhisarai provides separate hostel facilities for boys
                    and girls within the campus. Allotment is based on a{" "}
                    <strong>"First-Come-First-Serve + Distance"</strong> basis,
                    with priority given to students from distant districts.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 1. Allotment Process */}
            <section id="process">
              <SectionHeader
                title="Hostel Allotment Process"
                icon={FaUserClock}
              />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem
                  title="Step 1: Submit Request"
                  text="Fill the 'Hostel Requirement' option in your College Admission Form during physical reporting."
                  icon={FaCheckCircle}
                  className="bg-white border border-gray-100 shadow-sm"
                />
                <FeatureItem
                  title="Step 2: Check List"
                  text="The administration publishes a 'Provisional Allotment List' on the Notice Board/Website."
                  icon={FaFileInvoiceDollar}
                  className="bg-white border border-gray-100 shadow-sm"
                />
                <FeatureItem
                  title="Step 3: Pay Fees"
                  text="Pay the total hostel fee (₹37,100) via SBI Collect/DD. (No Cash accepted by Warden)."
                  icon={FaFileInvoiceDollar}
                  className="bg-white border border-gray-100 shadow-sm"
                />
                <FeatureItem
                  title="Step 4: Room Allocation"
                  text="Submit receipt to the Hostel Superintendent/Warden to get your Room Number."
                  icon={FaBed}
                  className="bg-white border border-gray-100 shadow-sm"
                />
              </div>
            </section>

            {/* 2. Fee Structure (Reiterated) */}
            <section id="fees">
              <SectionHeader
                title="Hostel Fee Breakdown"
                icon={FaFileInvoiceDollar}
              />
              <p className="text-gecl-text-muted mb-4 -mt-4 ml-1">
                Total payable at the time of allotment: <strong>₹37,100</strong>
                .
              </p>

              <div className="bg-gecl-surface rounded-xl shadow-sm border border-gecl-border overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-gecl-accent text-white">
                    <tr>
                      <th className="p-3 font-semibold">Component</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gecl-border text-gecl-text-primary">
                    <tr>
                      <td className="p-3">Registration Fee</td>
                      <td className="p-3 text-gecl-text-muted">One Time</td>
                      <td className="p-3 text-right">₹ 500</td>
                    </tr>
                    <tr>
                      <td className="p-3">Caution Money</td>
                      <td className="p-3 text-gecl-text-muted">Refundable</td>
                      <td className="p-3 text-right">₹ 1,500</td>
                    </tr>
                    <tr>
                      <td className="p-3">Maintenance</td>
                      <td className="p-3 text-gecl-text-muted">1 Year</td>
                      <td className="p-3 text-right">₹ 14,400</td>
                    </tr>
                    <tr>
                      <td className="p-3">Mess Advance</td>
                      <td className="p-3 text-gecl-text-muted">6 Months</td>
                      <td className="p-3 text-right">₹ 20,700</td>
                    </tr>
                    <tr className="bg-gray-50 font-bold text-gecl-primary">
                      <td className="p-3" colSpan={2}>
                        Total Amount
                      </td>
                      <td className="p-3 text-right">₹ 37,100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Mess Rules & Rebates */}
            <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <FaUtensils /> Mess Rules & Rebate Policy
              </h3>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Menu:</strong> A standard healthy menu (Breakfast,
                    Lunch, Snacks, Dinner) is decided by the Student Mess
                    Committee.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Absence Rebate:</strong> If a student is absent for
                    more than <strong>7 consecutive days</strong> (with prior
                    approved leave), mess charges will be deducted.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Labor Cost Rule:</strong> Even during the approved
                    absence, <strong>30% of the daily mess cost</strong>{" "}
                    (Labor/Service charge) will still be deducted from the
                    student's account.
                  </span>
                </li>
              </ul>
            </section>

            {/* 4. Facilities */}
            <section>
              <SectionHeader title="Facilities Provided" icon={FaWifi} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-white border border-gecl-border rounded-lg shadow-sm hover:border-gecl-accent transition">
                  <FaBed className="mx-auto text-2xl text-gecl-primary mb-2" />
                  <p className="text-sm font-semibold">Furnished Rooms</p>
                </div>
                <div className="text-center p-4 bg-white border border-gecl-border rounded-lg shadow-sm hover:border-gecl-accent transition">
                  <FaWifi className="mx-auto text-2xl text-gecl-primary mb-2" />
                  <p className="text-sm font-semibold">High-Speed WiFi</p>
                </div>
                <div className="text-center p-4 bg-white border border-gecl-border rounded-lg shadow-sm hover:border-gecl-accent transition">
                  <FaShower className="mx-auto text-2xl text-gecl-primary mb-2" />
                  <p className="text-sm font-semibold">RO Water & Cooler</p>
                </div>
                <div className="text-center p-4 bg-white border border-gecl-border rounded-lg shadow-sm hover:border-gecl-accent transition">
                  <FaShieldAlt className="mx-auto text-2xl text-gecl-primary mb-2" />
                  <p className="text-sm font-semibold">24x7 Security</p>
                </div>
              </div>
            </section>

            {/* Critical Warning */}
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <FaExclamationTriangle className="text-red-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-red-800 text-sm">
                  Anti-Ragging Compliance
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  Ragging in any form is strictly prohibited inside the hostel.
                  Students found guilty will be expelled immediately and an FIR
                  will be lodged. An Anti-Ragging Affidavit (Hostel) must be
                  signed by parents.
                </p>
              </div>
            </div>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                {
                  label: "Hostel Admission",
                  href: "/admissions/hostel-admission",
                  active: true,
                },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                {
                  label: "Admission Process",
                  href: "/admissions/admission-process",
                },
                {
                  label: "Required Documents",
                  href: "/admissions/required-documents",
                },
              ]}
            />

            <SidebarWidget title="Downloads">
              <div className="space-y-3">
                <FileCard
                  title="Hostel Allotment Form"
                  subtitle="Application PDF"
                  viewLink="#"
                  downloadLink="#"
                />
                <FileCard
                  title="Anti-Ragging Affidavit"
                  subtitle="Hostel Format"
                  viewLink="#"
                />
                <FileCard
                  title="Mess Menu (Veg/Non-Veg)"
                  subtitle="Weekly Chart"
                  viewLink="#"
                />
              </div>
            </SidebarWidget>

            <SidebarWidget title="Hostel Contacts">
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-gecl-text-muted uppercase font-bold">
                    Boy's Hostel Warden
                  </p>
                  <p className="text-sm font-semibold text-gecl-primary">
                    Mr. [Name Needed]
                  </p>
                  <p className="text-xs text-gecl-text-muted">+91-XXXXXXXXXX</p>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <p className="text-xs text-gecl-text-muted uppercase font-bold">
                    Girl's Hostel Warden
                  </p>
                  <p className="text-sm font-semibold text-gecl-primary">
                    Mrs. [Name Needed]
                  </p>
                  <p className="text-xs text-gecl-text-muted">+91-XXXXXXXXXX</p>
                </div>
              </div>
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HostelAdmissionPage;
