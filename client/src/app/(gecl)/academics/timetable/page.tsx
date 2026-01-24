import type { Metadata } from "next";
import Link from "next/link";
import {
  LuCalendarClock,
  LuCpu,
  LuZap,
  LuBuilding2,
  LuSettings,
  LuDatabase,
  LuAtom,
  LuArrowRight,
  LuDownload,
  LuExternalLink,
  LuInfo,
  LuClock,
} from "react-icons/lu";

// Shared UI Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Class Timetable | Semester Jan-June 2026 | GEC Lakhisarai",
  description:
    "Access official class schedules for all departments including Applied Science, CSE (AI & DS), Civil, Mechanical, and Electrical Engineering at GEC Lakhisarai.",
  keywords: [
    "GEC Lakhisarai Class Routine",
    "Engineering Timetable Bihar",
    "BEU Patna Semester Schedule",
    "CSE AI Timetable GEC Lakhisarai",
  ],
};

// --- TIMETABLE LINKS DATA ---
const TIMETABLE_SECTIONS = [
  {
    title: "Applied Science",
    subtitle: "1st Year (Sem 1 & 2)",
    href: "/departments/applied-science/timetable",
    icon: LuAtom,
    color: "bg-blue-600",
    theme: "text-blue-600 bg-blue-50/50",
  },
  {
    title: "Computer Science (AI)",
    subtitle: "CSE Artificial Intelligence",
    href: "/departments/cse-ai/timetable",
    icon: LuCpu,
    color: "bg-indigo-600",
    theme: "text-indigo-600 bg-indigo-50/50",
  },
  {
    title: "Computer Science (DS)",
    subtitle: "CSE Data Science",
    href: "/departments/cse-ds/timetable",
    icon: LuDatabase,
    color: "bg-cyan-600",
    theme: "text-cyan-600 bg-cyan-50/50",
  },
  {
    title: "Electrical Engineering",
    subtitle: "EE Department Routine",
    href: "/departments/electrical/timetable",
    icon: LuZap,
    color: "bg-yellow-600",
    theme: "text-yellow-600 bg-yellow-50/50",
  },
  {
    title: "Mechanical Engineering",
    subtitle: "ME Department Routine",
    href: "/departments/mechanical/timetable",
    icon: LuSettings,
    color: "bg-slate-600",
    theme: "text-slate-600 bg-slate-50/50",
  },
  {
    title: "Civil Engineering",
    subtitle: "CE Department Routine",
    href: "/departments/civil/timetable",
    icon: LuBuilding2,
    color: "bg-orange-600",
    theme: "text-orange-600 bg-orange-50/50",
  },
];

export default function TimetableHubPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Class Timetables"
        badge="Academic Session 2025-26"
        icon={<LuCalendarClock />}
        description="Access the official daily class schedules and lab routines for all engineering branches and the foundation year."
        image="/gecl/images/campus/college-building.webp"
        className="bg-[#0f172a]"
        themeColor="text-blue-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Timetable" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* --- MAIN CONTENT --- */}
          <div className="lg:w-3/4 space-y-12">
            <section>
              <SectionHeader
                title="Departmental Schedules"
                subtitle="Select your department to view or download your specific class routine."
                icon={LuClock}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {TIMETABLE_SECTIONS.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex items-center gap-6"
                  >
                    <div
                      className={cn(
                        "p-4 rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110",
                        item.color,
                      )}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <LuArrowRight size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* --- GENERAL INSTRUCTIONS --- */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -z-0 opacity-50"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                <div className="p-4 bg-blue-600 text-white rounded-2xl">
                  <LuInfo size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    Timetable Instructions
                  </h3>
                  <ul className="space-y-3 text-slate-600 text-sm list-none p-0">
                    <li className="flex gap-3">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                      Students must adhere to the 75% attendance rule as per BEU
                      & AICTE norms.
                    </li>
                    <li className="flex gap-3">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                      Lab sessions are mandatory and are marked in the
                      departmental routines.
                    </li>
                    <li className="flex gap-3">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                      Any changes to the routine due to holidays or events will
                      be notified on the official notice board.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28 space-y-8">
              <SidebarNavigation
                title="Academic Links"
                links={[
                  { label: "Academic Syllabus", href: "/academics/syllabus" },
                  {
                    label: "Class Timetable",
                    href: "/academics/timetable",
                    active: true,
                  },
                  { label: "Academic Calendar", href: "/academics/calendar" },
                  { label: "Exam Schedules", href: "/academics/exams" },
                ]}
              />

              <SidebarWidget title="Need Offline Copy?" variant="info">
                <div className="space-y-4">
                  <p className="text-xs text-indigo-900 leading-relaxed italic">
                    You can download the master PDF containing all departmental
                    routines for this semester.
                  </p>
                  <button className="w-full py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    <LuDownload size={14} /> Download Master PDF
                  </button>
                </div>
              </SidebarWidget>

              <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
                <LuCalendarClock className="text-blue-400 mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2 leading-tight">
                  Academic Calendar
                </h4>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Check the session dates, holidays, and mid-semester exam
                  slots.
                </p>
                <Link
                  href="/academics/calendar"
                  className="text-xs font-black text-blue-400 flex items-center gap-2 hover:underline uppercase tracking-widest"
                >
                  View Calendar <LuArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// Local Utility for Tailwind classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
