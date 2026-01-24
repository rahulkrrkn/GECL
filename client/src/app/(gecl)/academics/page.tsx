import type { Metadata } from "next";
import Link from "next/link";
import {
  LuGraduationCap,
  LuCalendarDays,
  LuBookOpen,
  LuClock,
  LuScale,
  LuArrowRight,
  LuAward,
  LuFileText,
  LuLibrary,
} from "react-icons/lu";
import { FaCheckCircle,  } from "react-icons/fa";

// Import Reusable Components
import { PageHero,  StatCard } from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Academics | B.Tech Programs & Resources | GEC Lakhisarai",
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
    url: "https://geclakhisarai.ac.in/academics",
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

// --- NAVIGATION SECTIONS ---
const ACADEMIC_SECTIONS = [
  {
    title: "Academic Programs",
    desc: "Explore our 4-year B.Tech courses in CSE, Civil, Mechanical, and Electrical Engineering.",
    href: "/academics/programs",
    icon: LuGraduationCap,
    color: "bg-blue-600",
    theme: "text-blue-600 border-blue-100 bg-blue-50/50",
  },
  {
    title: "Syllabus & Curriculum",
    desc: "Download the latest AICTE & Bihar Engineering University (BEU) approved syllabus.",
    href: "/academics/syllabus",
    icon: LuBookOpen,
    color: "bg-indigo-600",
    theme: "text-indigo-600 border-indigo-100 bg-indigo-50/50",
  },
  {
    title: "Academic Calendar",
    desc: "View the official holiday list, vacation dates, and semester schedule for 2026.",
    href: "/academics/calendar",
    icon: LuCalendarDays,
    color: "bg-emerald-600",
    theme: "text-emerald-600 border-emerald-100 bg-emerald-50/50",
  },
  {
    title: "Class Routine",
    desc: "Check the daily class timetable, lab schedules, and faculty allotment for your batch.",
    href: "/academics/timetable",
    icon: LuClock,
    color: "bg-orange-600",
    theme: "text-orange-600 border-orange-100 bg-orange-50/50",
  },
  {
    title: "Attendance Policy",
    desc: "Understand the mandatory 75% attendance rule and biometric verification process.",
    href: "/academics/attendance-policy",
    icon: FaCheckCircle,
    color: "bg-teal-600",
    theme: "text-teal-600 border-teal-100 bg-teal-50/50",
  },
  {
    title: "Rules & Regulations",
    desc: "Student code of conduct, examination rules, and general campus discipline guidelines.",
    href: "/academics/rules-regulations",
    icon: LuScale,
    color: "bg-slate-600",
    theme: "text-slate-600 border-slate-200 bg-slate-100/50",
  },
];

export default function AcademicsHubPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Academic Excellence"
        badge="Quality Education"
        icon={<LuLibrary />}
        description="Empowering students with a rigorous curriculum, hands-on practical exposure, and a disciplined learning environment designed for the engineers of tomorrow."
        image="/gecl/images/academic-building.webp"
        className="bg-gecl-primary"
        themeColor="text-gecl-accent"
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Academics" }]}
      />

      <div className="container mx-auto px-4 py-16">
        {/* --- INSTITUTIONAL AFFILIATIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <StatCard
            icon={<LuAward />}
            number="AICTE"
            label="Approved Intake"
            variant="light"
          />
          <StatCard
            icon={<LuFileText />}
            number="BEU"
            label="Affiliated University"
            variant="light"
          />
          <StatCard
            icon={<LuGraduationCap />}
            number="B.Tech"
            label="Degree Program"
            variant="light"
          />
        </div>

        {/* --- MAIN NAVIGATION GRID --- */}
        <section className="mb-24">
          <SectionHeader
            title="Academic Resources"
            subtitle="Everything you need for your academic journey at GECL"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {ACADEMIC_SECTIONS.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className={`group relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full bg-white border-slate-100`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-4 rounded-2xl text-white shadow-lg ${item.color}`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-gecl-primary group-hover:text-white transition-all">
                    <LuArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-gecl-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                <div
                  className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-full border ${item.theme}`}
                >
                  Explore <LuArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- QUICK ACTION BANNER --- */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Link
            href="/academics/timetable"
            className="relative overflow-hidden rounded-3xl bg-orange-600 p-8 text-white group shadow-xl"
          >
            <div className="absolute -right-10 -top-10 text-white/10 group-hover:scale-110 transition-transform duration-500">
              <LuClock size={200} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Class Routine</h3>
              <p className="text-orange-100 mb-6 text-sm max-w-xs">
                Don't miss a lecture. Check your batch's daily timetable and lab
                schedules.
              </p>
              <span className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                View Timetable
              </span>
            </div>
          </Link>

          <Link
            href="/academics/syllabus"
            className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 text-white group shadow-xl"
          >
            <div className="absolute -right-10 -top-10 text-white/10 group-hover:scale-110 transition-transform duration-500">
              <LuBookOpen size={200} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Detailed Syllabus</h3>
              <p className="text-indigo-100 mb-6 text-sm max-w-xs">
                Stay ahead in your studies. Download the subject-wise curriculum
                for all branches.
              </p>
              <span className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                Download Syllabus
              </span>
            </div>
          </Link>
        </div>

        {/* --- ADMISSION CTA SECTION --- */}
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gecl-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-gecl-accent/10 border border-gecl-accent/20 text-gecl-accent text-xs font-bold uppercase tracking-widest mb-6">
                Admission Portal
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Aspiring to be an Engineer? <br />
                <span className="text-gecl-accent">Join GEC Lakhisarai.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Admissions for the 2026-27 session are conducted via the Bihar
                UGEAC counseling process based on your JEE Main scores.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {["JEE Mains", "BCECE", "Lateral Entry"].map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10"
                  >
                    <span className="w-2 h-2 rounded-full bg-gecl-accent"></span>{" "}
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/admissions/how-to-apply"
              className="flex-shrink-0 px-10 py-5 bg-gecl-accent text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-950/40 flex items-center gap-3 transform hover:-translate-y-1"
            >
              Apply Now <LuArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- LOCAL COMPONENT HELPERS ---
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        {title}
      </h2>
      <p className="text-slate-500">{subtitle}</p>
      <div className="w-20 h-1.5 bg-gecl-accent mx-auto mt-6 rounded-full"></div>
    </div>
  );
}
