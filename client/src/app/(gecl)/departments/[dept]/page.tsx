import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LuBookOpen,
  LuFlaskConical,
  LuArrowRight,
  LuTarget,
  LuUsers,
  LuExternalLink,
  LuQuote,
  LuCheck,
  LuBrainCircuit,
  LuDownload,
  LuMapPin,
  LuGraduationCap,
} from "react-icons/lu";

// Shared UI Components
import { SectionHeader } from "@/gecl/components/ui";

// --- GENUINE GEC LAKHISARAI DATA (Verified 2025-26) ---
import { DEPT_DATA } from "./deptPageData";

// --- SEO ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ dept: string }>;
}): Promise<Metadata> {
  const { dept } = await params;
  const data = DEPT_DATA[dept];
  return {
    title: `${data?.name || "Department"} | GEC Lakhisarai`,
    description: `Official department page of ${data?.name} at Government Engineering College, Lakhisarai (Est. 2019).`,
  };
}

export default async function DepartmentHomePage({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;
  const content = DEPT_DATA[dept];

  if (!content) notFound();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 1. BENTO GRID HERO: Intro & HOD */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT: Main Introduction (8 Cols) */}
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                Est. 2019
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1">
                <LuCheck size={12} /> AICTE Approved
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1">
                <LuMapPin size={12} /> Lakhisarai, Bihar
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              <span className="text-indigo-600">{content.name}</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl">
              {content.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-100 pt-8">
              <StatBlock value={content.intake} label="Annual Intake" />
              <StatBlock value={content.labs} label="Equipped Labs" />
              <StatBlock value={content.faculty} label="Faculty Members" />
            </div>
          </div>

          {/* Decorative Blob */}
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
        </div>

        {/* RIGHT: HOD Profile Card (4 Cols) */}
        <div className="xl:col-span-4 bg-[#0f172a] text-white rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('/gecl/images/patterns/grid.svg')] opacity-10"></div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-5 mb-8">
              <div className="relative w-20 h-20 shrink-0">
                <div className="absolute inset-0 bg-indigo-500 rounded-2xl rotate-6 opacity-50"></div>
                <Image
                  src={content.image}
                  alt={content.hod}
                  fill
                  className="object-cover rounded-2xl border-2 border-white/20 relative z-10 shadow-lg"
                />
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">
                  Head of Dept.
                </p>
                <h4 className="font-bold text-white text-lg leading-tight">
                  {content.hod}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                  {content.role}
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex-grow relative">
              <LuQuote
                className="text-indigo-500 absolute top-4 left-4 opacity-20"
                size={40}
              />
              <p className="text-slate-300 italic text-sm leading-relaxed relative z-10 pt-2">
                "{content.vision}"
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400">
                Contact HOD
              </span>
              <Link
                href={`/departments/${dept}/hod`}
                className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest hover:text-indigo-400 transition-colors"
              >
                Full Profile <LuArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <LuTarget size={24} />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">Our Vision</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {content.vision}
          </p>
        </div>
        <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <LuBrainCircuit size={24} />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">
            Our Mission
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {content.mission}
          </p>
        </div>
      </section>

      {/* 3. STUDENT ESSENTIALS */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-xl font-black text-slate-900">
            Academic Essentials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickLink
            href={`/departments/${dept}/syllabus`}
            icon={<LuDownload />}
            title="Syllabus"
            sub="Download PDF"
            color="text-red-500 bg-red-50 group-hover:bg-red-600"
          />
          <QuickLink
            href={`/departments/${dept}/timetable`}
            icon={<LuArrowRight />}
            title="Timetable"
            sub="Class Routine"
            color="text-blue-500 bg-blue-50 group-hover:bg-blue-600"
          />
          <QuickLink
            href={`/departments/${dept}/faculty`}
            icon={<LuUsers />}
            title="Faculty"
            sub="Staff Directory"
            color="text-purple-500 bg-purple-50 group-hover:bg-purple-600"
          />
          <QuickLink
            href={`/departments/${dept}/labs`}
            icon={<LuFlaskConical />}
            title="Labs"
            sub="Manuals & Info"
            color="text-emerald-500 bg-emerald-50 group-hover:bg-emerald-600"
          />
        </div>
      </section>

      {/* 4. BEU AFFILIATION NOTICE */}
      <section className="bg-slate-900 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <LuGraduationCap className="text-yellow-400" /> Affiliated to BEU
            Patna
          </h4>
          <p className="text-slate-400 text-sm">
            All courses and examinations are conducted as per the regulations of{" "}
            <strong>Bihar Engineering University (BEU), Patna</strong>.
          </p>
        </div>
        <Link
          href="https://beu-bih.ac.in/"
          target="_blank"
          className="relative z-10 px-6 py-3 bg-white text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-yellow-400 transition-colors flex items-center gap-2"
        >
          BEU Website <LuExternalLink size={14} />
        </Link>
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function StatBlock({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-black text-slate-900">{value}</span>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}

function QuickLink({ href, icon, title, sub, color }: any) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-300 hover:shadow-lg transition-all"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:text-white ${color}`}
      >
        {icon}
      </div>
      <div>
        <h5 className="font-bold text-slate-900 text-sm">{title}</h5>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
          {sub}
        </p>
      </div>
    </Link>
  );
}
