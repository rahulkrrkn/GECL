import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/gecl/components/ui/";
import {
  LuGraduationCap,
  LuCalendarDays,
  LuBookOpen,
  LuClock,
  LuScale,
  LuShieldAlert,
  LuArrowRight,
  LuAward,
  LuFileText,
} from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Academics | Government Engineering College, Lakhisarai",
  description:
    "Central hub for GEC Lakhisarai academics. Access B.Tech programs, syllabus, academic calendar, class routines, and examination rules.",
  keywords: [
    "GEC Lakhisarai Academics",
    "B.Tech Syllabus Bihar",
    "Engineering Class Routine",
    "GEC Academic Calendar",
    "BEU Exam Rules",
  ],
  openGraph: {
    title: "Academics | GEC Lakhisarai",
    description:
      "Excellence in Technical Education. Explore our programs and academic resources.",
    url: "/academics",
    type: "website",
    images: [
      {
        url: "/gecl/images/academic-building.webp",
        width: 1200,
        height: 630,
        alt: "GEC Academic Block",
      },
    ],
  },
};

// --- NAVIGATION CARDS ---
const ACADEMIC_SECTIONS = [
  {
    title: "Academic Programs",
    desc: "Explore our 4-year B.Tech courses in CSE, Civil, Mechanical, and Electrical Engineering.",
    href: "/academics/programs",
    icon: LuGraduationCap,
    color: "bg-blue-600",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    title: "Syllabus & Curriculum",
    desc: "Download the latest AICTE & Bihar Engineering University (BEU) approved syllabus.",
    href: "/academics/syllabus",
    icon: LuBookOpen,
    color: "bg-indigo-600",
    bg: "bg-indigo-50 border-indigo-100",
  },
  {
    title: "Academic Calendar",
    desc: "View the official holiday list, vacation dates, and semester schedule for 2026.",
    href: "/academics/calendar",
    icon: LuCalendarDays,
    color: "bg-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
  },
  {
    title: "Class Routine",
    desc: "Check the daily class timetable, lab schedules, and faculty allotment for your batch.",
    href: "/academics/timetable",
    icon: LuClock,
    color: "bg-orange-600",
    bg: "bg-orange-50 border-orange-100",
  },
  {
    title: "Attendance Policy",
    desc: "Understand the mandatory 75% attendance rule and biometric verification process.",
    href: "/academics/attendance-policy",
    icon: FaCheckCircle,
    color: "bg-teal-600",
    bg: "bg-teal-50 border-teal-100",
  },
  {
    title: "Rules & Regulations",
    desc: "Student code of conduct, examination rules, and general campus discipline guidelines.",
    href: "/academics/rules-regulations",
    icon: LuScale,
    color: "bg-slate-600",
    bg: "bg-slate-100 border-slate-200",
  },
  {
    title: "Anti-Ragging",
    desc: "Zero Tolerance Policy. Access helpline numbers and report incidents immediately.",
    href: "/academics/anti-ragging",
    icon: LuShieldAlert,
    color: "bg-red-600",
    bg: "bg-red-50 border-red-100",
  },
];

export default function AcademicsHubPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gecl-primary text-white py-20 lg:py-24 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('/gecl/images/academic-building.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gecl-primary via-gecl-primary/95 to-gecl-primary/80"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-gecl-accent/20 border border-gecl-accent/30 text-gecl-accent font-semibold text-sm mb-4 backdrop-blur-sm">
            Knowledge & Innovation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">
            Academic Excellence
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Empowering students with a rigorous curriculum, practical exposure,
            and a disciplined learning environment.
          </p>
        </div>
      </section>

      {/* --- BREADCRUMB --- */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Academics" }]}
        />

      <div className="container mx-auto px-4 py-16">
        {/* --- INTRODUCTION STATS --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 border-b border-slate-200 pb-16">
          <div className="text-center">
            <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
              <LuAward className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">AICTE Approved</h3>
            <p className="text-slate-500 text-sm">
              All programs approved by All India Council for Technical
              Education.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 bg-orange-50 text-orange-600 rounded-2xl mb-4">
              <LuFileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">BEU Affiliated</h3>
            <p className="text-slate-500 text-sm">
              Curriculum and examinations conducted by Bihar Engineering
              University.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 bg-green-50 text-green-600 rounded-2xl mb-4">
              <LuGraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              NBA Accredited*
            </h3>
            <p className="text-slate-500 text-sm">
              Striving for excellence with outcome-based education standards.
            </p>
          </div>
        </div>

        {/* --- MAIN NAVIGATION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_SECTIONS.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full ${item.bg}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`p-3.5 rounded-xl text-white shadow-md ${item.color}`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-gecl-primary transition-colors">
                  <LuArrowRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-gecl-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                {item.desc}
              </p>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-gecl-primary mt-auto">
                View Details
              </span>
            </Link>
          ))}
        </div>

        {/* --- ADMISSION CTA SECTION --- */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center md:text-left">
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gecl-accent/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to join GEC Lakhisarai?
              </h2>
              <p className="text-slate-400 max-w-xl">
                Admissions are open for the 2026-27 academic session through JEE
                Mains, BCECE, and Lateral Entry modes.
              </p>

              <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>{" "}
                  JEE Mains
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>{" "}
                  BCECE
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>{" "}
                  Lateral Entry
                </div>
              </div>
            </div>

            <Link
              href="/admissions/how-to-apply"
              className="flex-shrink-0 px-8 py-4 bg-gecl-accent text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/30 flex items-center gap-2"
            >
              Apply Now <LuArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
