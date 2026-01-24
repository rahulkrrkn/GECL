import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaSchool,
  FaBed,
  FaFile,
  FaHeadset,
  FaCircleQuestion,
} from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import * as motion from "framer-motion/client";

// ✅ Shared Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  AccordionItem,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Admissions FAQ | GECL Lakhisarai",
  description:
    "Common questions about B.Tech admission, hostel facilities, fee payment, and UGEAC counseling at Government Engineering College Lakhisarai.",
  openGraph: {
    title: "Admissions FAQ - GECL Lakhisarai",
    description: "Get quick answers to your admission queries.",
    images: ["/gecl/images/campus/gecl-campus-main.webp"],
  },
};

const FaqPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Admissions", href: "/admissions" },
    { label: "FAQ", href: "/admissions/faq" },
  ];

  return (
    <main className="bg-gecl-background min-h-screen pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Frequently Asked Questions"
        badge="Help Center"
        icon={<FaCircleQuestion />}
        description="Got questions about admission, fees, or campus life? Find clear answers here."
        image="/gecl/images/campus/gecl-campus-main.webp"
        className="bg-emerald-950" // Custom Theme
        themeColor="text-emerald-400"
        breadcrumbItems={breadcrumbItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== Main Content ==================== */}
          <div className="lg:col-span-2 space-y-10">
            {/* Intro Search Placeholder (Visual only) */}
            <div className="bg-gecl-surface p-6 rounded-xl shadow-sm border border-gecl-border flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-full shrink-0">
                <FaSearch className="text-gecl-primary text-xl" />
              </div>
              <div className="w-full">
                <h3 className="font-bold text-gecl-primary">Quick Search</h3>
                <p className="text-sm text-gecl-text-muted mb-3">
                  Browse the categories below to find your answer.
                </p>
              </div>
            </div>

            {/* 1. General & Admission Process */}
            <section id="general">
              <SectionHeader
                title="General & Admission Process"
                icon={FaSchool}
              />
              <div className="mt-4 bg-gecl-surface rounded-xl shadow-sm border border-gecl-border divide-y divide-gecl-border">
                <AccordionItem
                  question="Is GECL Lakhisarai a Government College?"
                  answer="Yes, Government Engineering College, Lakhisarai is a fully government institution established by the Department of Science & Technology, Govt. of Bihar. It is approved by AICTE and affiliated with Bihar Engineering University (BEU), Patna."
                />
                <AccordionItem
                  question="Can I take direct admission without JEE Main?"
                  answer="No. Admission to the 1st Year B.Tech program is strictly based on the merit list of JEE (Main) conducted by NTA. You must register for UGEAC counseling to get a seat. There is no management quota."
                />
                <AccordionItem
                  question="What is the cutoff rank for CSE?"
                  answer="Cutoffs vary every year based on category (UR/BC/EBC/SC/ST) and demand. Generally, CSE and CSE(AI) close at higher ranks compared to other branches. Please check the 'Opening & Closing Ranks' section for previous year data."
                />
                <AccordionItem
                  question="Is the college co-ed?"
                  answer="Yes, GECL is a co-educational institute. Furthermore, 33% of seats in every branch are horizontally reserved for female candidates as per Bihar Govt. rules."
                />
              </div>
            </section>

            {/* 2. Fees & Hostel */}
            <section id="hostel-fees">
              <SectionHeader title="Fees & Hostel Facilities" icon={FaBed} />
              <div className="mt-4 bg-gecl-surface rounded-xl shadow-sm border border-gecl-border divide-y divide-gecl-border">
                <AccordionItem
                  question="What is the fee for 1st Year Admission?"
                  answer="The total academic fee payable at the time of admission is approximately ₹3,130 (including Admission, Tuition, and Development fees). University Registration fee (approx ₹2,100) is paid separately."
                />
                <AccordionItem
                  question="Is hostel accommodation mandatory?"
                  answer="No, staying in the hostel is optional. However, it is highly recommended for students from distant districts due to convenience and safety."
                />
                <AccordionItem
                  question="What is the total hostel fee?"
                  answer="The total hostel fee at the time of allotment is ₹37,100. This includes Maintenance (₹14,400/year), Mess Advance (₹20,700 for 6 months), and Caution Money."
                />
                <AccordionItem
                  question="Does the hostel have Wi-Fi?"
                  answer="Yes, the campus and hostels are equipped with Wi-Fi connectivity. Speed and access rules are governed by the college IT policy."
                />
              </div>
            </section>

            {/* 3. Documents & Reporting */}
            <section id="documents">
              <SectionHeader title="Documents & Reporting" icon={FaFile} />
              <div className="mt-4 bg-gecl-surface rounded-xl shadow-sm border border-gecl-border divide-y divide-gecl-border">
                <AccordionItem
                  question="What if I don't have my CLC/Migration Certificate?"
                  answer="Original CLC and Migration are mandatory. If you don't have them on reporting day, you may be given a provisional time (usually 1 week) to submit them, subject to the Nodal Officer's approval."
                />
                <AccordionItem
                  question="Do I need to submit original certificates?"
                  answer="Yes. During reporting, your original 10th/12th marksheets are verified. CLC/TC and Migration certificates are submitted permanently. Other originals are returned after verification."
                />
                <AccordionItem
                  question="Where can I get the Medical Certificate format?"
                  answer="The Medical Certificate format is usually attached to the UGEAC Prospectus. You can also download it from our 'Downloads' section. It must be signed by a registered Medical Practitioner."
                />
              </div>
            </section>

            {/* Still Stuck? */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaHeadset className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                Our Admission Cell is here to help you during office hours
                (10:00 AM - 4:00 PM).
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-2 bg-gecl-primary text-white text-sm font-semibold rounded-md hover:bg-gecl-accent transition"
              >
                Contact Admission Cell
              </Link>
            </div>
          </div>

          {/* ==================== Sidebar ==================== */}
          <div className="lg:col-span-1 space-y-8">
            <SidebarNavigation
              title="Admissions"
              links={[
                { label: "FAQ", href: "/admissions/faq" },
                { label: "How to Apply", href: "/admissions/how-to-apply" },
                {
                  label: "Eligibility Criteria",
                  href: "/admissions/eligibility",
                },
                { label: "Fee Structure", href: "/admissions/fee-structure" },
                { label: "Scholarships", href: "/admissions/scholarships" },
              ]}
            />

            <SidebarWidget title="Need More Info?">
              <div className="space-y-3">
                <Link
                  href="/admissions/seat-intake"
                  className="flex items-center gap-3 p-3 bg-white border border-gecl-border rounded-lg hover:border-gecl-accent transition group"
                >
                  <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gecl-secondary">
                    <FaQuestionCircle className="text-gecl-text-muted group-hover:text-gecl-accent" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gecl-primary block">
                      Seat Matrix
                    </span>
                    <span className="text-xs text-gecl-text-muted">
                      Check capacity
                    </span>
                  </div>
                </Link>
                <Link
                  href="/campus-life/hostel"
                  className="flex items-center gap-3 p-3 bg-white border border-gecl-border rounded-lg hover:border-gecl-accent transition group"
                >
                  <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gecl-secondary">
                    <FaBed className="text-gecl-text-muted group-hover:text-gecl-accent" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gecl-primary block">
                      Hostel Life
                    </span>
                    <span className="text-xs text-gecl-text-muted">
                      Explore facilities
                    </span>
                  </div>
                </Link>
              </div>
            </SidebarWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FaqPage;
