import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuScale,
  LuClock,
  LuBookOpen,
  LuFileWarning,
  LuShieldAlert,
  LuDownload,
  LuArrowRight,
  LuSchool,
} from "react-icons/lu";

import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaClipboardCheck,
} from "react-icons/fa";

// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FeatureItem,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Rules & Regulations | Student Code of Conduct | GEC Lakhisarai",
  description:
    "Official code of conduct, academic regulations, attendance policy (75%), and anti-ragging guidelines for students of Government Engineering College Lakhisarai.",
  keywords: [
    "GEC Lakhisarai Rules",
    "Attendance Policy Bihar Engineering",
    "Anti-Ragging Regulations",
    "Student Code of Conduct",
    "BEU Patna Exam Rules",
  ],
  openGraph: {
    title: "Rules & Regulations | GEC Lakhisarai",
    description: "Official guidelines for discipline and academic excellence.",
    url: "https://geclakhisarai.ac.in/academics/rules-regulations",
    type: "article",
    images: [
      {
        url: "/gecl/images/students-discipline.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Discipline and Conduct",
      },
    ],
  },
};

export default function RulesPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Rules & Regulations"
        badge="Institutional Policy"
        icon={<LuScale />}
        description="To ensure a conducive environment for learning, GEC Lakhisarai mandates strict adherence to the following code of conduct and academic policies."
        image="/gecl/images/students-discipline.webp"
        className="bg-indigo-950" // Formal/Legal Theme
        themeColor="text-indigo-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Rules & Regulations" },
        ]}
      />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <div className="lg:w-3/4 space-y-16">
            {/* 1. GENERAL CONDUCT */}
            <section id="general" className="scroll-mt-28">
              <SectionHeader icon={LuSchool} title="General Code of Conduct" />

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mt-6">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-1 space-y-6">
                    <FeatureItem
                      icon={FaCheckCircle}
                      title="Identity Card"
                      text="Students must carry their Identity Card at all times. Entry to labs and library will be denied without a valid ID."
                    />
                    <FeatureItem
                      icon={FaCheckCircle}
                      title="Dress Code"
                      text="Students are expected to wear formal/decent attire. Prescribed uniforms are mandatory during workshops and examinations."
                    />
                    <FeatureItem
                      icon={FaCheckCircle}
                      title="Campus Timings"
                      text="Academic hours are from 10:00 AM to 05:00 PM. Punctuality is expected for all lectures and lab sessions."
                    />
                    <FeatureItem
                      icon={FaCheckCircle}
                      title="Digital Discipline"
                      text="Use of mobile phones is strictly prohibited inside classrooms, laboratories, and the library."
                    />
                  </div>

                  {/* Visual Context */}
                  <div className="md:w-1/3 w-full shrink-0">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white group">
                      <Image
                        src="/gecl/images/campus/college-building.webp"
                        alt="Disciplined Campus Life"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent flex items-end p-6">
                        <p className="text-white text-xs font-semibold leading-relaxed">
                          "Discipline is the bridge between goals and
                          accomplishment."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. ACADEMIC & ATTENDANCE */}
            <section id="attendance" className="scroll-mt-28">
              <SectionHeader
                icon={LuClock}
                title="Attendance & Academic Policy"
              />

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                {/* 75% Rule Card */}
                <div className="bg-red-50 rounded-2xl p-6 border border-red-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-600 text-white rounded-xl shadow-md">
                      <LuFileWarning className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-red-900">
                      75% Mandatory Rule
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    As per Bihar Engineering University (BEU) ordinances, a
                    student must secure a minimum of{" "}
                    <strong className="text-red-700">75% attendance</strong> in
                    every subject to be eligible for exams.
                  </p>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li className="flex gap-2">
                      <span className="shrink-0">•</span> Shortage up to 10% may
                      be condoned only on genuine medical grounds.
                    </li>
                    <li className="flex gap-2 font-bold">
                      <span className="shrink-0">•</span> Students below 65%
                      will be detained (Year Back).
                    </li>
                  </ul>
                </div>

                {/* Evaluation Card */}
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
                      <FaClipboardCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-900">
                      Evaluation System
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    Continuous internal assessment is combined with end-semester
                    results.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/80 p-3 rounded-xl border border-indigo-100 text-sm">
                      <span className="font-medium">Mid-Semester Exam</span>
                      <span className="font-bold text-indigo-700">
                        20 Marks
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-white/80 p-3 rounded-xl border border-indigo-100 text-sm">
                      <span className="font-medium">
                        Class Test / Assignments
                      </span>
                      <span className="font-bold text-indigo-700">
                        10 Marks
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-600 p-3 rounded-xl text-white text-sm shadow-md">
                      <span className="font-bold">End-Semester Exam</span>
                      <span className="font-black">70 Marks</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. ANTI-RAGGING */}
            <section id="ragging" className="scroll-mt-28">
              <SectionHeader icon={LuShieldAlert} title="Anti-Ragging Policy" />

              <div className="bg-white rounded-2xl shadow-md border-l-8 border-red-600 p-6 md:p-10 mt-6">
                <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-tighter text-sm mb-4">
                  <FaExclamationTriangle /> Zero Tolerance Policy
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Ragging is a punishable offence.
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  GEC Lakhisarai follows strict AICTE and UGC regulations. Any
                  student found guilty will face immediate expulsion and
                  criminal proceedings (FIR).
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  <PenaltyItem text="Immediate Suspension from classes." />
                  <PenaltyItem text="Cancellation of Admission." />
                  <PenaltyItem text="Withholding of Degree/Placements." />
                  <PenaltyItem text="Debarring from Exams." />
                  <PenaltyItem text="Rustication from 1 to 4 Semesters." />
                  <PenaltyItem text="Filing of criminal FIR." />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/academics/anti-ragging"
                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                  >
                    Anti-Ragging Committee
                  </Link>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-200 transition-all"
                  >
                    <LuDownload /> Download Affidavit
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4">
            <div className="sticky top-28 space-y-8">
              <SidebarNavigation
                title="Rules Hub"
                links={[
                  { label: "General Conduct", href: "#general" },
                  { label: "Attendance Policy", href: "#attendance" },
                  { label: "Anti-Ragging Cell", href: "#ragging" },
                  { label: "Exam Hall Rules", href: "#exams" },
                  { label: "Academic Calendar", href: "/academics/calendar" },
                ]}
              />

              <SidebarWidget title="Download Center">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                      <LuBookOpen className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      Student Handbook
                    </h4>
                    <p className="text-[10px] text-slate-500 mb-4 px-4 leading-tight">
                      Contains detailed campus, hostel, and library bye-laws.
                    </p>
                    <button className="w-full py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2">
                      <LuDownload /> Download Handbook PDF
                    </button>
                  </div>
                </div>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// --- LOCAL HELPER COMPONENTS ---

function PenaltyItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 items-start">
      <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]"></div>
      <p className="text-xs font-bold text-slate-700 leading-tight">{text}</p>
    </div>
  );
}

function RuleItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1">
        <FaCheckCircle className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm md:text-base leading-none mb-1.5">
          {title}
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
