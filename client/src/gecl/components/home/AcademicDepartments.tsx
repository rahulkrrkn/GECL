import Link from "next/link";
import {
  LuCpu,
  LuBuilding2,
  LuSettings,
  LuZap,
  LuBookOpen,
  LuChevronRight,
  LuFlaskConical,
} from "react-icons/lu";

const DEPARTMENTS = [
  {
    id: "civil",
    name: "Civil Engineering",
    icon: LuBuilding2,
    color: "text-orange-600",
    bg: "bg-orange-50",
    link: "/departments/civil",
    seats: "120 Seats",
    desc: "Focuses on infrastructure, structural design, and construction. Largest department with 120 annual intake.",
  },
  {
    id: "cse-ai",
    name: "CSE (Artificial Intelligence)",
    icon: LuCpu,
    color: "text-blue-600",
    bg: "bg-blue-50",
    link: "/departments/cse-ai",
    seats: "60 Seats",
    desc: "Advanced curriculum covering Machine Learning, Neural Networks, and Robotics. AICTE approved specialized course.",
  },
  {
    id: "cse-ds",
    name: "CSE (Data Science)",
    icon: LuBookOpen,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    link: "/departments/cse-ds",
    seats: "60 Seats",
    desc: "Specialized program in Big Data Analytics, Statistical Modeling, and Cloud Computing.",
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    icon: LuSettings,
    color: "text-slate-700",
    bg: "bg-slate-100",
    link: "/departments/mechanical",
    seats: "60 Seats",
    desc: "Core engineering branch dealing with thermodynamics, fluid mechanics, and manufacturing technology.",
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    icon: LuZap,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    link: "/departments/electrical",
    seats: "60 Seats",
    desc: "Covers power systems, circuit theory, and control systems. Vital for the energy and power sector.",
  },
  {
    id: "applied-science",
    name: "Applied Science & Humanities",
    icon: LuFlaskConical,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    link: "/departments/applied-science",
    seats: "1st Year",
    desc: "Foundational department for all 1st-year B.Tech students, covering Physics, Chemistry, and Mathematics.",
  },
];

export const AcademicDepartments = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Academics
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              B.Tech Programs
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl">
              GEC Lakhisarai offers <strong>AICTE approved</strong>{" "}
              undergraduate engineering courses affiliated with{" "}
              <strong>Bihar Engineering University (BEU), Patna</strong>.
              Admission is strictly through{" "}
              <strong>JEE Mains & BCECE (UGEAC)</strong>.
            </p>
          </div>
          <Link
            href="/academics/programs"
            className="text-slate-600 font-semibold hover:text-blue-600 transition flex items-center gap-2"
          >
            View Seat Matrix <LuChevronRight />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.id}
              href={dept.link}
              className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top decoration */}
              <div
                className={`absolute top-0 left-0 w-full h-1 ${dept.bg.replace("bg-", "bg-")}-500/50`}
              />

              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-14 h-14 ${dept.bg} ${dept.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}
                >
                  <dept.icon />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Intake
                  </span>
                  <span className={`text-sm font-bold ${dept.color}`}>
                    {dept.seats}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {dept.name}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {dept.desc}
              </p>

              <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                Explore Department <LuChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
