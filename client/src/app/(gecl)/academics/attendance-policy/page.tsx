import type { Metadata } from "next";
import Image from "next/image";
import {
  LuClock,
  LuFileWarning,
  LuActivity,
  LuFileText,
  LuFingerprint,
  LuMapPin,
} from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FeatureItem,
  AccordionItem,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Attendance Policy | Government Engineering College, Lakhisarai",
  description:
    "Official attendance guidelines for B.Tech students. Minimum 75% attendance is mandatory. Attendance records are maintained offline by the Academic Cell.",
  keywords: [
    "GEC Lakhisarai Attendance Rules",
    "BEU Bihar Attendance Policy",
    "75% Attendance Rule Engineering",
    "Offline Attendance Verification",
    "Examination Eligibility Criteria",
  ],
  openGraph: {
    title: "Attendance Policy | GEC Lakhisarai",
    description:
      "Understand the mandatory 75% attendance rule and manual verification process.",
    url: "/academics/attendance-policy",
    type: "article",
    images: [
      {
        url: "/gecl/images/classroom-lecture.webp",
        width: 1200,
        height: 630,
        alt: "GEC Classroom Attendance",
      },
    ],
  },
};

export default function AttendancePolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. REUSABLE HERO SECTION */}
      <PageHero
        title="Attendance Policy"
        description="Regular class attendance is the foundation of academic success. GEC Lakhisarai strictly adheres to the university's attendance norms."
        badge="Academic Regulations"
        image="/gecl/images/classroom-lecture.webp"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Attendance Policy" },
        ]}
      />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4 space-y-12">
            {/* 1. THE 75% RULE */}
            <section id="mandatory-rule" className="scroll-mt-28">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center gap-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded-full">
                    <FaExclamationTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      The 75% Mandatory Rule
                    </h2>
                    <p className="text-slate-500 text-sm">
                      As per Bihar Engineering University Ordinance
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Every student is required to attend at least{" "}
                    <strong className="text-red-700">
                      75% of the total classes held
                    </strong>{" "}
                    in each subject (Theory, Practical, and Sessional)
                    individually to be eligible to appear in the End Semester
                    Examination.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                      <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" /> Eligible
                        (&ge; 75%)
                      </h4>
                      <p className="text-sm text-green-800">
                        Students with 75% or more attendance are fully eligible
                        to fill out the exam form and appear for all papers.
                      </p>
                    </div>

                    <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                      <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                        <LuFileWarning className="text-red-600" /> Detained
                        (&lt; 65%)
                      </h4>
                      <p className="text-sm text-red-800">
                        Students with less than 65% attendance (even after
                        medical condonation) will be <strong>Detained</strong>{" "}
                        and must repeat the semester.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. BIOMETRIC SYSTEM */}
            <section id="biometric" className="scroll-mt-28">
              <SectionHeader
                title="Biometric Attendance System"
                icon={LuFingerprint}
              />

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 relative h-64 w-full rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/gecl/images/biometric-attendance.webp"
                    alt="Biometric Attendance"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    To ensure transparency and accuracy, GEC Lakhisarai has
                    implemented a{" "}
                    <strong>
                      Aadhaar-enabled Biometric Attendance System (AEBAS)
                    </strong>
                    .
                  </p>
                  <ul className="space-y-3">
                    <FeatureItem text="Students must punch in/out daily using the biometric devices installed in the Academic Block." />
                    <FeatureItem text="Manual registers are maintained as a backup by respective faculty members." />
                    <FeatureItem text="Attendance data is compiled monthly by the Academic Cell for eligibility calculation." />
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. CONDONATION RULES */}
            <section id="condonation" className="scroll-mt-28">
              <SectionHeader
                title="Medical Leave & Condonation"
                icon={LuActivity}
              />

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Relaxation up to 10%
                </h3>
                <p className="text-slate-700 mb-6">
                  The Principal may condone a shortage of attendance up to{" "}
                  <strong>10%</strong> (i.e., attendance between 65% and 75%)
                  only on genuine medical grounds or participation in authorized
                  extracurricular activities (NSS/Sports/NCC).
                </p>

                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-3">
                  Procedure to Apply:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 text-sm">
                  <li>
                    Submit a formal application to the HOD within{" "}
                    <strong>3 days</strong> of returning to college.
                  </li>
                  <li>
                    Attach a valid Medical Certificate from a Registered Medical
                    Practitioner.
                  </li>
                  <li>
                    In case of sports/events, attach the Participation
                    Certificate approved by the Faculty Coordinator.
                  </li>
                </ol>
              </div>
            </section>

            {/* 4. FAQs */}
            <section id="faq" className="scroll-mt-28">
              <SectionHeader
                title="Frequently Asked Questions"
                icon={FaCheckCircle}
              />
              <div className="space-y-4">
                <AccordionItem
                  question="How can I check my current attendance?"
                  answer="Attendance records are maintained offline. You must visit your Department's HOD Office or contact your Class Coordinator to verify your monthly attendance status."
                />
                <AccordionItem
                  question="Is there an online portal to check attendance?"
                  answer="Currently, there is no online portal for students to check daily attendance. The data is stored offline in the Academic Cell database."
                />
                <AccordionItem
                  question="What happens if I miss a lab session?"
                  answer="Labs are critical. If you miss a lab, you must perform the experiment in a make-up class (if permitted by the faculty) before the next practical session."
                />
                <AccordionItem
                  question="Is attendance mandatory for Mid-Sem exams?"
                  answer="Yes. Absence in Mid-Semester exams will result in zero marks for that component, significantly affecting your internal assessment score."
                />
              </div>
            </section>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* 2. REUSABLE SIDEBAR WIDGET (Check Attendance) */}
              <SidebarWidget
                title="Check Attendance"
                variant="default" // Using default style, can switch to 'info' if you prefer blue
                className="bg-gecl-primary text-white border-none" // Custom override for primary color theme
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <LuFileText className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-blue-200 text-xs mb-4">
                    Offline Verification Only
                  </p>
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20 flex items-start gap-3 text-left">
                    <LuMapPin className="w-5 h-5 text-gecl-accent mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-white">
                      <strong>Academic Block, 1st Floor</strong>
                      <br />
                      GEC Lakhisarai Campus
                    </div>
                  </div>
                </div>
              </SidebarWidget>

              {/* 3. REUSABLE SIDEBAR NAVIGATION */}
              <SidebarNavigation
                title="Quick Navigation"
                links={[
                  { label: "75% Rule", href: "#mandatory-rule" },
                  { label: "Biometric System", href: "#biometric" },
                  { label: "Medical Leave", href: "#condonation" },
                  { label: "Academic Calendar", href: "/academics/calendar" },
                ]}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
