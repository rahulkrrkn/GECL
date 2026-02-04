import type { Metadata } from "next";
import Link from "next/link";
import {
  LuArrowRight,
  LuCpu,
  LuBuilding2,
  LuZap,
  LuSettings,
  LuDatabase,
  LuAtom,
  LuFlaskConical,
  LuUsers,
  LuGraduationCap,
  LuChevronRight,
  LuCheck,
  LuBookOpen,
  LuCalendarClock,
  LuTrophy,
  LuImage,
  LuPhone,
  LuFileText,
  LuMicrochip,
  LuSearch,
} from "react-icons/lu";

// Shared UI Components
import { PageHero, SectionHeader } from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Academic Departments & B.Tech Branches | GEC Lakhisarai",
  description:
    "Official repository for GEC Lakhisarai Engineering Departments. Explore CSE Artificial Intelligence, Data Science, Civil, Electrical, and Mechanical branches. Access HOD details, Labs, and Faculty.",
  keywords: [
    "GEC Lakhisarai HOD",
    "Engineering Branches Bihar",
    "CSE AI GEC Lakhisarai",
    "Mechanical Labs GECL",
    "Electrical Engineering Syllabus BEU",
  ],
};

const DEPTS = [
  {
    name: "Applied Science and Humanities",
    slug: "applied-science",
    icon: LuAtom,
    color: "bg-blue-600",
    intake: "Common",
    desc: "Foundation for all B.Tech disciplines, specializing in Applied Physics, Chemistry, and Mathematics.",
    links: [
      { label: "About", slug: "about", icon: LuFileText },
      { label: "Faculty", slug: "faculty", icon: LuUsers },
      { label: "Syllabus", slug: "syllabus", icon: LuBookOpen },
      { label: "Labs", slug: "labs", icon: LuFlaskConical },
      { label: "Time Table", slug: "timetable", icon: LuCalendarClock },
      { label: "Contact", slug: "contact", icon: LuPhone },
    ],
  },
  {
    name: "Computer Science (AI)",
    slug: "cse-ai",
    icon: LuCpu,
    color: "bg-indigo-600",
    intake: "60",
    desc: "Future-ready curriculum focusing on Neural Networks, Robotics, and Autonomous Systems.",
    links: [
      { label: "HOD", slug: "hod", icon: LuUsers },
      { label: "Syllabus", slug: "syllabus", icon: LuBookOpen },
      { label: "Faculty", slug: "faculty", icon: LuUsers },
      { label: "Placements", slug: "placements", icon: LuTrophy },
      { label: "AI Labs", slug: "labs", icon: LuMicrochip },
      { label: "Projects", slug: "projects", icon: LuSettings },
    ],
  },
  {
    name: "Computer Science (DS)",
    slug: "cse-ds",
    icon: LuDatabase,
    color: "bg-cyan-600",
    intake: "60",
    desc: "Transforming big data into actionable insights through statistical modeling and cloud computing.",
    links: [
      { label: "Syllabus", slug: "syllabus", icon: LuBookOpen },
      { label: "Faculty", slug: "faculty", icon: LuUsers },
      { label: "Labs", slug: "labs", icon: LuFlaskConical },
      { label: "Placements", slug: "placements", icon: LuTrophy },
      { label: "Research", slug: "research", icon: LuAtom },
      { label: "Gallery", slug: "gallery", icon: LuImage },
    ],
  },
  {
    name: "Civil Engineering",
    slug: "civil",
    icon: LuBuilding2,
    color: "bg-orange-600",
    intake: "60",
    desc: "Mastering structural integrity, sustainable urban planning, and geotechnical engineering.",
    links: [
      { label: "Syllabus", slug: "syllabus", icon: LuBookOpen },
      { label: "Faculty", slug: "faculty", icon: LuUsers },
      { label: "Labs", slug: "labs", icon: LuFlaskConical },
      { label: "Placements", slug: "placements", icon: LuTrophy },
      { label: "Activities", slug: "activities", icon: LuUsers },
      { label: "Contact", slug: "contact", icon: LuPhone },
    ],
  },
  {
    name: "Electrical Engineering",
    slug: "electrical",
    icon: LuZap,
    color: "bg-yellow-600",
    intake: "60",
    desc: "Innovating in power systems, control engineering, and renewable energy conversion.",
    links: [
      { label: "Syllabus", slug: "syllabus", icon: LuBookOpen },
      { label: "Faculty", slug: "faculty", icon: LuUsers },
      { label: "Labs", slug: "labs", icon: LuFlaskConical },
      { label: "Placements", slug: "placements", icon: LuTrophy },
      { label: "Time Table", slug: "timetable", icon: LuCalendarClock },
      { label: "Events", slug: "events", icon: LuImage },
    ],
  },
  {
    name: "Mechanical Engineering",
    slug: "mechanical",
    icon: LuSettings,
    color: "bg-slate-700",
    intake: "60",
    desc: "Advancing in thermal sciences, fluid mechanics, and automated manufacturing systems.",
    links: [
      { label: "Syllabus", slug: "syllabus", icon: LuBookOpen },
      { label: "Faculty", slug: "faculty", icon: LuUsers },
      { label: "Labs", slug: "labs", icon: LuFlaskConical },
      { label: "Workshop", slug: "labs", icon: LuSettings },
      { label: "Placements", slug: "placements", icon: LuTrophy },
      { label: "Contact", slug: "contact", icon: LuPhone },
    ],
  },
];

export default function DepartmentsHub() {
  return (
    <main className="bg-slate-50 min-h-screen pb-20 selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. HERO SECTION */}
      <PageHero
        title="Engineering Departments"
        badge="Academic Core"
        description="The intellectual foundation of GEC Lakhisarai, bridging the gap between traditional engineering principles and modern AI innovation."
        image="/gecl/images/campus/college-building.webp"
        className="bg-[#0f172a]"
        themeColor="text-indigo-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Departments" },
        ]}
      />

      {/* 2. INSTITUTIONAL QUALITY INDICATORS */}
      <div className="container mx-auto px-4 -mt-14 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem
            icon={<LuGraduationCap />}
            label="Annual Intake"
            value="300+"
            color="text-blue-600"
          />
          <StatItem
            icon={<LuFlaskConical />}
            label="Tech Laboratories"
            value="32"
            color="text-orange-600"
          />
          <StatItem
            icon={<LuUsers />}
            label="BPSC Faculty"
            value="48"
            color="text-indigo-600"
          />
          <StatItem
            icon={<LuCheck />}
            label="AICTE Approved"
            value="100%"
            color="text-emerald-600"
          />
        </div>
      </div>

      {/* 3. THE DEPARTMENT NAVIGATOR */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mb-16">
          <SectionHeader
            title="Explore Specializations"
            subtitle="Detailed academic paths, laboratory infrastructure, and faculty profiles for all branches."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DEPTS.map((d) => (
            <article
              key={d.slug}
              className="group bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 flex flex-col h-full"
            >
              <div className="p-8 pb-4">
                <header className="flex items-center justify-between mb-8">
                  <div
                    className={`w-16 h-16 ${d.color} text-white rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}
                  >
                    <d.icon size={32} />
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      B.Tech Intake
                    </span>
                    <span className="text-lg font-bold text-slate-800">
                      {d.intake}
                    </span>
                  </div>
                </header>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 tracking-tight">
                  {d.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {d.desc}
                </p>
              </div>

              {/* ACTION LINKS GRID - Improved UX for thumb-tapping on mobile */}
              <div className="px-8 flex-grow">
                <div className="bg-slate-50 rounded-[2rem] p-3 grid grid-cols-2 gap-2 border border-slate-100">
                  {d.links.map((link) => (
                    <Link
                      key={link.label}
                      href={`/departments/${d.slug}/${link.slug}`}
                      className="flex items-center gap-2.5 p-3.5 bg-white hover:bg-indigo-600 text-slate-600 hover:text-white rounded-2xl transition-all text-xs font-bold shadow-sm border border-slate-200/50 hover:border-indigo-600"
                    >
                      <link.icon
                        size={15}
                        className="shrink-0 opacity-70 group-hover:opacity-100"
                      />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FINAL CTA FOOTER */}
              <footer className="p-8 mt-auto">
                <Link
                  href={`/departments/${d.slug}`}
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                >
                  Enter Department <LuArrowRight size={16} />
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </div>

      {/* 4. ACADEMIC GOVERNANCE TREE VISUAL */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionHeader
              title="Academic Hierarchy"
              subtitle="Organizational flow from institutional oversight to departmental execution."
            />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ValueCard
              title="BEU Affiliation"
              desc="Academic oversight by Bihar Engineering University, Patna."
              icon={<LuCheck className="text-emerald-500" />}
            />
            <ValueCard
              title="NBA Alignment"
              desc="Curriculum and labs designed for future NBA accreditation."
              icon={<LuAward className="text-orange-500" />}
            />
            <ValueCard
              title="BPSC Mentorship"
              desc="Highly qualified faculty recruited via Bihar Public Service Commission."
              icon={<LuUsers className="text-indigo-500" />}
            />
          </div>
        </div>
      </section>

      {/* 5. QUICK NAVIGATION FOOTER */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-indigo-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 leading-tight">
            Empowering Bihar Through <br className="hidden md:block" />{" "}
            Technical Education
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center relative z-10">
            <Link
              href="/admissions"
              className="bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all shadow-lg"
            >
              Admission Inquiry
            </Link>
            <Link
              href="/notices"
              className="bg-transparent border-2 border-indigo-400 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              Latest Notices
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function StatItem({ icon, label, value, color }: any) {
  return (
    <div className="flex items-center gap-5">
      <div
        className={`p-4 bg-slate-50 rounded-2xl ${color} shadow-inner transition-transform hover:scale-110`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none mb-1.5">
          {value}
        </p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
          {label}
        </p>
      </div>
    </div>
  );
}

function ValueCard({ title, desc, icon }: any) {
  return (
    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all text-left group">
      <div className="mb-4 transform group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}

// Custom simple icons for build stability
function LuAward(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 15l-2 5 2-1 2 1-2-5zm0 0l-2-5h4l-2 5zm0-10a5 5 0 100 10 5 5 0 000-10z" />
    </svg>
  );
}
