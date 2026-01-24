import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LuQuote,
  LuMail,
  LuPhone,
  LuMapPin,
  LuGraduationCap,
  LuAward,
  LuLinkedin,
  LuFileText,
  LuCheck,
} from "react-icons/lu";
import { HOD_DATA } from "./hodData";
// --- GENUINE HOD DATA (GEC Lakhisarai) ---



// --- SEO METADATA ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ dept: string }>;
}): Promise<Metadata> {
  const { dept } = await params;
  const data = HOD_DATA[dept];
  return {
    title: `HOD Desk | ${data?.name || "Department"} | GEC Lakhisarai`,
    description: `Message from ${data?.name}, HOD of ${dept} at Government Engineering College, Lakhisarai.`,
  };
}

export default async function HODPage({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;
  const data = HOD_DATA[dept];

  if (!data) notFound();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* PAGE TITLE */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900">
          Head of Department
        </h2>
        <p className="text-slate-500 text-sm font-medium mt-1">
          Leadership & Vision
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* LEFT: STICKY PROFILE CARD */}
        <aside className="xl:w-[350px] shrink-0">
          <div className="xl:sticky xl:top-32 bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-32 bg-slate-900"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-[url('/gecl/images/patterns/grid.svg')] opacity-20"></div>

            <div className="relative z-10 flex flex-col items-center text-center mt-6">
              {/* Profile Image */}
              <div className="w-36 h-36 rounded-3xl border-4 border-white shadow-lg overflow-hidden relative bg-slate-100 mb-4">
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-xl font-black text-slate-900">{data.name}</h3>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1 mb-4">
                {data.role}
              </p>

              {/* Qualifications Badge */}
              <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl flex items-center gap-2 mb-6">
                <LuGraduationCap className="text-slate-400" size={16} />
                <span className="text-xs font-bold text-slate-600">
                  {data.qualification}
                </span>
              </div>

              {/* Contact Info */}
              <div className="w-full space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <LuMail size={14} />
                  </div>
                  <span className="truncate">{data.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <LuMapPin size={14} />
                  </div>
                  <span>Dept. Office, Main Building</span>
                </div>
              </div>

              {/* Social/Profile Button */}
              <Link
                href="#"
                className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <LuFileText size={14} /> View Profile
              </Link>
            </div>
          </div>
        </aside>

        {/* RIGHT: MESSAGE CONTENT */}
        <article className="xl:w-full space-y-8">
          {/* 1. The Message Box */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <LuQuote className="absolute top-8 left-8 text-indigo-500/10 text-9xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                Message from the Desk
                <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
              </h3>

              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                <p className="mb-6">
                  <span className="text-4xl float-left mr-3 mt-[-6px] font-black text-indigo-600">
                    "
                  </span>
                  {data.message}
                </p>
                <p>
                  We at GEC Lakhisarai believe in a student-centric approach.
                  Our faculty members are dedicated to mentoring students not
                  just academically, but also in their overall personality
                  development. We encourage students to participate in NPTEL
                  courses, internships, and technical fests to broaden their
                  horizons.
                </p>
              </div>

              <div className="mt-12 flex items-center justify-end">
                <div className="text-right">
                  {/* Signature simulation */}
                  <p
                    className="font-handwriting text-2xl text-slate-800 mb-1 opacity-70"
                    style={{ fontFamily: "cursive" }}
                  >
                    {data.name.split(" ")[1]}
                  </p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {data.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Key Priorities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                  <LuAward size={20} />
                </div>
                <h4 className="font-black text-slate-900 text-lg">
                  Our Vision
                </h4>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                "{data.vision}"
              </p>
            </div>

            <div className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                  <LuCheck size={20} />
                </div>
                <h4 className="font-black text-slate-900 text-lg">
                  Key Focus Areas
                </h4>
              </div>
              <ul className="space-y-3">
                {data.priorities.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-slate-700 font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
