import Link from "next/link";
import {
  LuConstruction,
  LuServerCog,
  LuChevronRight,
  LuBookOpen,
  LuBuilding2,
  LuCircle,
  LuGraduationCap,
  LuLayoutGrid,
} from "react-icons/lu";

// --- ACTIVE LINK GROUPS (Derived from your 'done' list) ---
const ACTIVE_ZONES = [
  {
    category: "Academics",
    icon: LuBookOpen,
    links: [
      { label: "Academic Calendar", href: "/academics/calendar" },
      { label: "Syllabus", href: "/academics/syllabus" },
      { label: "Timetable", href: "/academics/timetable" },
    ],
  },
  {
    category: "Admissions",
    icon: LuGraduationCap,
    links: [
      { label: "Admission Process", href: "/admissions/admission-process" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
      { label: "Apply Now", href: "/admissions/how-to-apply" },
    ],
  },
  {
    category: "Departments",
    icon: LuLayoutGrid,
    links: [
      { label: "All Departments", href: "/departments" },
      { label: "CSE (AI)", href: "/departments/cse-ai" },
      { label: "Civil Engg", href: "/departments/civil" },
    ],
  },
  {
    category: "Student Portal",
    icon: LuCircle,
    links: [
      { label: "Student Login", href: "/login" },
      { label: "New Registration", href: "/register/student" },
      { label: "Hostel Info", href: "/campus-life/hostel" },
    ],
  },
];

export function WorkInProgress({ title }: { title?: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-16 px-6 bg-white border border-slate-100 rounded-[3rem] text-center shadow-sm">
      {/* 1. Status Icon Animation */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-amber-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative w-24 h-24 bg-white rounded-3xl border-2 border-slate-50 shadow-xl flex items-center justify-center">
          <LuServerCog
            className="text-slate-400 group-hover:text-amber-500 transition-colors"
            size={40}
          />
        </div>
        <div className="absolute -bottom-3 -right-3 bg-slate-900 text-white p-2.5 rounded-xl border-4 border-white shadow-md animate-bounce">
          <LuConstruction size={18} />
        </div>
      </div>

      {/* 2. Message */}
      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
        {title || "Page Under Upgrade"}
      </h2>

      <p className="text-slate-500 font-medium max-w-lg leading-relaxed mb-12 mx-auto">
        This specific section is currently offline for **backend improvements**.
        However, the rest of the portal is fully active. Please navigate using
        the links below.
      </p>

      {/* 3. ACTIVE ZONES GRID (Based on your 'done' list) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        {ACTIVE_ZONES.map((zone) => (
          <div
            key={zone.category}
            className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <zone.icon size={18} />
              </div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">
                {zone.category}
              </h4>
            </div>

            <ul className="space-y-2">
              {zone.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-indigo-600 hover:pl-2 transition-all p-2 rounded-lg hover:bg-indigo-50"
                  >
                    {link.label}
                    <LuChevronRight size={12} className="opacity-30" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 4. Footer */}
      <div className="mt-10 pt-8 border-t border-slate-100 w-full flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-bold text-slate-400">
        <span>GEC Lakhisarai Portal</span>
        <span className="hidden md:inline">•</span>
        <Link
          href="/contact"
          className="hover:text-indigo-500 transition-colors"
        >
          Contact Administration
        </Link>
      </div>
    </div>
  );
}
