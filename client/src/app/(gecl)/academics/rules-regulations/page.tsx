import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/gecl/components/ui/";
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
import { FaExclamationTriangle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Rules & Regulations | Government Engineering College, Lakhisarai",
  description:
    "Official code of conduct, academic regulations, attendance policy (75%), and anti-ragging guidelines for students of GEC Lakhisarai.",
  keywords: [
    "GEC Lakhisarai Rules",
    "Engineering College Attendance Policy Bihar",
    "Anti-Ragging Affidavit GEC",
    "Student Code of Conduct",
    "BEU Exam Regulations",
  ],
  openGraph: {
    title: "Rules & Regulations | GEC Lakhisarai",
    description:
      "Guidelines for maintaining discipline and academic excellence on campus.",
    url: "/academics/rules-regulations",
    type: "article",
    images: [
      {
        url: "/gecl/images/students-discipline.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Students",
      },
    ],
  },
};

export default function RulesPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gecl-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#1e293b,#0f172a)]"></div>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <LuScale className="w-6 h-6 text-gecl-secondary" />
            </span>
            <span className="font-bold text-gecl-secondary tracking-wide uppercase text-sm">
              Student Handbook
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 tracking-tight">
            Rules & Regulations
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            To ensure a conducive environment for learning, GEC Lakhisarai
            mandates strict adherence to the following code of conduct and
            academic policies.
          </p>
        </div>
      </section>

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Rules & Regulations" },
        ]}
      />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4 space-y-12">
            {/* 1. GENERAL CONDUCT */}
            <section id="general" className="scroll-mt-28">
              <SectionHeader icon={LuSchool} title="General Code of Conduct" />

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <RuleItem
                      title="Identity Card"
                      desc="Students must carry their Identity Card at all times on campus. Entry to labs and library will be denied without it."
                    />
                    <RuleItem
                      title="Dress Code"
                      desc="Students are expected to wear formal/decent attire. The college uniform (if prescribed for specific batches) is mandatory during workshops and exams."
                    />
                    <RuleItem
                      title="Campus Timings"
                      desc="Academic hours are from 10:00 AM to 05:00 PM. Loitering in corridors during class hours is strictly prohibited."
                    />
                    <RuleItem
                      title="Mobile Phones"
                      desc="Use of mobile phones is strictly prohibited inside classrooms, laboratories, and the library."
                    />
                  </div>
                  {/* Image Context */}
                  <div className="md:w-1/3 w-full">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/gecl/images/students-discipline.webp"
                        alt="Disciplined Students"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <p className="text-white text-xs font-medium">
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

              <div className="grid md:grid-cols-2 gap-6">
                {/* 75% Rule Card */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <div className="flex items-center gap-3 mb-3">
                    <LuFileWarning className="w-8 h-8 text-red-600" />
                    <h3 className="text-lg font-bold text-red-900">
                      75% Attendance Mandatory
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    As per Bihar Engineering University (BEU) ordinances, a
                    student must secure a minimum of{" "}
                    <strong className="text-red-700">75% attendance</strong> in
                    both theory and practical classes to be eligible for
                    End-Semester Examinations.
                  </p>
                  <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                    <li>
                      Shortage &lt; 10% may be condoned on medical grounds.
                    </li>
                    <li>Students below 65% will be detained (Year Back).</li>
                  </ul>
                </div>

                {/* Evaluation Card */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <FaCheckCircle className="w-8 h-8 text-blue-600" />
                    <h3 className="text-lg font-bold text-blue-900">
                      Evaluation System
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    Academic performance is evaluated through continuous
                    internal assessment and end-semester exams.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white p-2 rounded border border-blue-100">
                      <span>Mid-Semester Exam</span>
                      <span className="font-bold">20 Marks</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded border border-blue-100">
                      <span>Class Test/Assignment</span>
                      <span className="font-bold">10 Marks</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded border border-blue-100">
                      <span>End-Semester Exam</span>
                      <span className="font-bold">70 Marks</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. ANTI-RAGGING */}
            <section id="ragging" className="scroll-mt-28">
              <SectionHeader
                icon={LuShieldAlert}
                title="Anti-Ragging Policy (Zero Tolerance)"
              />

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-red-500 p-6 md:p-8">
                <p className="text-lg text-slate-800 font-medium mb-4">
                  Ragging in any form is strictly prohibited within and outside
                  the college campus.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  GEC Lakhisarai strictly follows the{" "}
                  <strong>AICTE Notification F.No.37-3/Legal/AICTE/2009</strong>
                  . Any student found guilty of ragging will face severe
                  disciplinary action, including:
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <PenaltyItem text="Suspension from attending classes and academic privileges." />
                  <PenaltyItem text="Withholding/withdrawing scholarship/fellowship and other benefits." />
                  <PenaltyItem text="Debarring from appearing in any test/examination." />
                  <PenaltyItem text="Rustication from the institution for periods ranging from 1 to 4 semesters." />
                  <PenaltyItem text="Expulsion from the institution and consequent debarring from admission to any other institution." />
                  <PenaltyItem text="Lodging of FIR with the Police." />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/academics/anti-ragging"
                    className="px-5 py-2.5 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                  >
                    Report an Incident
                  </Link>
                  <a
                    href="#"
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors border border-slate-200 flex items-center gap-2"
                  >
                    <LuDownload className="w-4 h-4" /> Download Affidavit Format
                  </a>
                </div>
              </div>
            </section>

            {/* 4. EXAMINATION RULES */}
            <section id="exams" className="scroll-mt-28">
              <SectionHeader icon={LuFileWarning} title="Examination Rules" />

              <div className="relative rounded-xl overflow-hidden bg-slate-900 text-slate-300">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/gecl/images/exam-hall.webp"
                    fill
                    className="object-cover"
                    alt="Exam Hall"
                  />
                </div>
                <div className="relative z-10 p-6 md:p-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">
                      Unfair Means (UFM)
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="text-red-400">✖</span> Possession of
                        chits, notes, or books during exam.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400">✖</span> Writing on
                        desks, question papers, or body parts.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400">✖</span> Disobeying the
                        invigilator's instructions.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">
                      Instructions
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="text-green-400">✔</span> Report to the
                        exam hall 15 minutes before time.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">✔</span> Bring your own
                        calculator (non-programmable).
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">✔</span> Check seating
                        plan displayed on notice board.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* Navigation Widget */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-gecl-primary p-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <LuBookOpen className="text-gecl-secondary" />
                    Quick Navigation
                  </h3>
                </div>
                <nav className="p-2 flex flex-col gap-1">
                  <SidebarLink href="#general" label="General Conduct" />
                  <SidebarLink href="#attendance" label="Attendance Policy" />
                  <SidebarLink href="#ragging" label="Anti-Ragging" />
                  <SidebarLink href="#exams" label="Exam Rules" />
                  <div className="h-px bg-slate-100 my-2"></div>
                  <SidebarLink
                    href="/academics/calendar"
                    label="Academic Calendar"
                  />
                  <SidebarLink href="/hostel/rules" label="Hostel Rules" />
                </nav>
              </div>

              {/* Download Handbook Widget */}
              <div className="bg-gecl-surface rounded-xl shadow-md border border-gecl-border p-6 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gecl-primary mx-auto mb-4 shadow-sm border border-slate-100">
                  <LuBookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gecl-primary mb-2">
                  Student Handbook
                </h4>
                <p className="text-xs text-slate-600 mb-4">
                  Download the complete rule book including hostel and library
                  bye-laws.
                </p>
                <button className="w-full py-2.5 bg-gecl-primary text-white text-sm font-bold rounded-lg hover:bg-gecl-primary/90 transition-colors shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2">
                  <LuDownload className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-gecl-primary">{title}</h2>
    </div>
  );
}

function RuleItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-1">
        <FaCheckCircle className="w-5 h-5 text-gecl-primary" />
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm md:text-base">
          {title}
        </h4>
        <p className="text-sm text-slate-600 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function PenaltyItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 bg-red-50 p-3 rounded-lg border border-red-100 items-start">
      <FaExclamationTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs font-medium text-red-800 leading-tight">{text}</p>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-50 hover:text-gecl-primary hover:pl-5"
    >
      {label}
      <LuArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
    </Link>
  );
}
