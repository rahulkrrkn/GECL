import { notFound } from "next/navigation";
import Link from "next/link";
import {
  LuGraduationCap,
  LuShieldCheck,
  LuChevronRight,
  LuUser,
  LuUsers,
  LuBookOpen,
  LuCalendarClock,
  LuFlaskConical,
  LuTrophy,
  LuImage,
  LuPhone,
  LuAtom,
  LuSettings,
  LuLayoutGrid,
  LuActivity,
  LuLayers,
} from "react-icons/lu";
import { NAV_META, DEPT_MAP } from "./deptLayoutData";

export default async function DepartmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;
  const currentDept = DEPT_MAP[dept];

  if (!currentDept) notFound();

  // Helper: Group Links by Category for Sidebar
  const groupedLinks = currentDept.links.reduce((acc: any, slug: string) => {
    const meta = NAV_META[slug];
    if (!acc[meta.category]) acc[meta.category] = [];
    acc[meta.category].push({ slug, ...meta });
    return acc;
  }, {});

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900 selection:bg-indigo-100">
      {/* --- 1. HERO SECTION: "QUANTUM ANIMATED" --- */}
      <header
        className={`relative bg-gradient-to-br ${currentDept.gradient} pt-16 pb-24 overflow-hidden`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] ${currentDept.glow} rounded-full blur-[120px] opacity-40 animate-pulse`}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            {/* Title Block */}
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  GECL
                </Link>
                <LuChevronRight size={10} className="opacity-50" />
                <Link
                  href="/departments"
                  className="hover:text-white transition-colors"
                >
                  Departments
                </Link>
                <LuChevronRight size={10} className="opacity-50" />
                <span className={currentDept.accent}>{currentDept.short}</span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                Department of <br />
                <span className="text-white/90">{currentDept.name}</span>
              </h1>
            </div>

            {/* Glass Cards */}
            <div className="flex gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 delay-100">
              <div className="group bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all cursor-default">
                <LuShieldCheck
                  className={`${currentDept.accent} group-hover:scale-110 transition-transform`}
                  size={18}
                />
                <div>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">
                    Status
                  </p>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider">
                    AICTE Approved
                  </p>
                </div>
              </div>
              <div className="group bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all cursor-default">
                <LuGraduationCap
                  className={`${currentDept.accent} group-hover:scale-110 transition-transform`}
                  size={18}
                />
                <div>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">
                    Affiliation
                  </p>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider">
                    BEU Patna
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- 2. CONTENT PORTAL --- */}
      <div className="container mx-auto px-6 -mt-12 pb-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- SIDEBAR: "CATEGORIZED VERTICAL LIST" --- */}
          <aside className="lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
              <div className="p-5 bg-slate-50 border-b border-slate-100">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Navigator
                </h3>
              </div>

              {/* Categorized List */}
              <nav className="max-h-[calc(100vh-140px)] overflow-y-auto custom-sidebar-scroll p-4 space-y-6">
                {Object.entries(groupedLinks).map(([category, links]: any) => (
                  <div key={category}>
                    <p className="px-3 mb-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {category}
                    </p>
                    <div className="space-y-1">
                      {links.map((link: any) => (
                        <Link
                          key={link.slug}
                          href={`/departments/${dept}/${link.slug === "overview" ? "" : link.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
                        >
                          <link.icon
                            className="text-slate-400 group-hover:text-indigo-600 transition-colors"
                            size={16}
                          />
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Footer Status */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Session 2026
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* --- CONTENT CANVAS --- */}
          <article className="lg:w-3/4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 min-h-[80vh]">
              {children}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
