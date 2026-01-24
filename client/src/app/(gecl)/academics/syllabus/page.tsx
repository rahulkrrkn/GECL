import type { Metadata } from "next";
import Link from "next/link";
import {
  LuBookOpen,
  LuDownload,
  LuCpu,
  LuZap,
  LuBuilding2,
  LuSettings,
  LuDatabase,
  LuFileText,
  LuExternalLink,
  LuArrowRight,
  LuAtom,
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
  title: "B.Tech Syllabus & Curriculum | BEU Patna | GEC Lakhisarai",
  description:
    "Access the official BEU Patna syllabus for Applied Science (1st Year) and specialized Engineering branches at GEC Lakhisarai. Download semester-wise course structures.",
  keywords: [
    "GEC Lakhisarai Syllabus",
    "Applied Science and Humanities Syllabus",
    "BEU Patna Engineering Curriculum",
    "B.Tech 1st Year Syllabus Bihar",
    "CSE AI Data Science Syllabus",
  ],
};

// --- BRANCH DATA ---
const DEPT_SYLLABUS = [
  {
    title: "Computer Science (AI)",
    slug: "cse-ai",
    icon: LuCpu,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Computer Science (DS)",
    slug: "cse-ds",
    icon: LuDatabase,
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    title: "Civil Engineering",
    slug: "civil",
    icon: LuBuilding2,
    color: "text-orange-600 bg-orange-50",
  },
  {
    title: "Electrical Engineering",
    slug: "electrical",
    icon: LuZap,
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    title: "Mechanical Engineering",
    slug: "mechanical",
    icon: LuSettings,
    color: "text-slate-600 bg-slate-100",
  },
];

export default function SyllabusHubPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Curriculum & Syllabus"
        badge="BEU Patna Standards"
        icon={<LuBookOpen />}
        description="Explore the academic roadmap for the Department of Applied Applied Science and all core Engineering branches."
        image="/gecl/images/campus/college-building.webp"
        className="bg-[#0f172a]"
        themeColor="text-blue-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Syllabus" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <div className="lg:w-3/4 space-y-16">
            {/* 1. FOUNDATION: Applied Science */}
            <section id="applied-science" className="scroll-mt-28">
              <SectionHeader
                title="Applied Applied Science"
                icon={LuAtom}
                subtitle="The foundation semesters for all engineering disciplines."
              />

              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full pointer-events-none opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-slate-800 mb-4">
                    First Year Curriculum
                  </h3>
                  <p className="text-slate-600 mb-8 leading-relaxed max-w-2xl">
                    All undergraduate students at GEC Lakhisarai begin their
                    journey with the Department of Applied Applied Science,
                    mastering the fundamental concepts of physics, chemistry,
                    and mathematics.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sem 1 Card */}
                    <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                          01
                        </span>
                        <h4 className="font-bold text-slate-800">
                          1st Semester
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mb-6">
                        Physics, Math-I, Basic Electrical, and Graphics modules.
                      </p>
                      <Link
                        href="/departments/applied-science/syllabus"
                        className="text-sm font-black text-blue-600 flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Detailed Syllabus <LuArrowRight size={16} />
                      </Link>
                    </div>

                    {/* Sem 2 Card */}
                    <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                          02
                        </span>
                        <h4 className="font-bold text-slate-800">
                          2nd Semester
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mb-6">
                        Chemistry, Math-II, PPS, and Workshop modules.
                      </p>
                      <Link
                        href="/departments/applied-science/syllabus"
                        className="text-sm font-black text-emerald-600 flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Detailed Syllabus <LuArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center md:justify-start">
                    <Link
                      href="/departments/applied-science/syllabus"
                      className="bg-[#0f172a] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
                    >
                      Visit Department Syllabus Page{" "}
                      <LuExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. CORE ENGINEERING BRANCHES */}
            <section id="engineering-branches" className="scroll-mt-28">
              <SectionHeader
                title="Engineering Specializations"
                icon={LuFileText}
                subtitle="Course structures for Semester 3 to Semester 8."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {DEPT_SYLLABUS.map((dept) => (
                  <Link
                    key={dept.slug}
                    href={`/departments/${dept.slug}/syllabus`}
                    className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl shrink-0 transition-transform group-hover:scale-110 duration-300 ${dept.color}`}
                      >
                        <dept.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {dept.title}
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Branch Core
                        </p>
                      </div>
                    </div>
                    <LuArrowRight
                      className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                      size={18}
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28 space-y-8">
              <SidebarNavigation
                title="Curriculum Hub"
                links={[
                  {
                    label: "Applied Science",
                    href: "#applied-science",
                  },
                  {
                    label: "Engineering Branches",
                    href: "#engineering-branches",
                  },
                  { label: "Academic Calendar", href: "/academics/calendar" },
                  {
                    label: "Examination Rules",
                    href: "/academics/rules-regulations",
                  },
                ]}
              />

              <SidebarWidget title="Official PDF" variant="info">
                <div className="space-y-4">
                  <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                    Download the complete BEU Patna 2023-Scheme credit
                    distribution.
                  </p>
                  <button className="bg-white text-indigo-600 w-full py-2.5 rounded-xl border border-indigo-200 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
                    <LuDownload size={14} /> Download BEU Master PDF
                  </button>
                </div>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
