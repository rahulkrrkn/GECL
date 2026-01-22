"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/gecl/components/ui/";
import {
  LuBookOpen,
  LuFileText,
  LuEye,
  LuDownload,
  LuFilter,
  LuArrowRight,
  LuBell,
} from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
// --- MOCK SYLLABUS DATA ---
const SYLLABUS_DATA = [
  {
    id: 1,
    branch: "CSE-AI",
    semester: "3rd Sem",
    subject: "B.Tech CSE (AI) Syllabus - 2024 Scheme",
    date: "Aug 2024",
  },
  {
    id: 2,
    branch: "CSE-AI",
    semester: "5th Sem",
    subject: "B.Tech CSE (AI) Syllabus - 2023 Scheme",
    date: "Aug 2023",
  },
  {
    id: 3,
    branch: "Civil",
    semester: "3rd Sem",
    subject: "B.Tech Civil Engineering Syllabus - 2024 Scheme",
    date: "Aug 2024",
  },
  {
    id: 4,
    branch: "Civil",
    semester: "5th Sem",
    subject: "B.Tech Civil Engineering Syllabus - 2023 Scheme",
    date: "Aug 2023",
  },
  {
    id: 5,
    branch: "Mechanical",
    semester: "3rd Sem",
    subject: "B.Tech Mechanical Syllabus - 2024 Scheme",
    date: "Aug 2024",
  },
  {
    id: 6,
    branch: "Electrical",
    semester: "3rd Sem",
    subject: "B.Tech Electrical Syllabus - 2024 Scheme",
    date: "Aug 2024",
  },
  {
    id: 7,
    branch: "Common",
    semester: "1st Year",
    subject: "1st Year Common Syllabus (All Branches)",
    date: "July 2024",
  },
];

export default function SyllabusPage() {
  const [activeTab, setActiveTab] = useState("All");

  // Filter Logic
  const filteredData =
    activeTab === "All"
      ? SYLLABUS_DATA
      : SYLLABUS_DATA.filter(
          (item) => item.branch === activeTab || item.branch === "Common",
        );

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gecl-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#1e293b)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold font-display mb-3">
            Syllabus & Curriculum
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            Download the latest AICTE & BEU approved course structure for your
            branch.
          </p>
        </div>
      </section>

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Syllabus" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4">
            {/* Branch Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["All", "CSE-AI", "Civil", "Mechanical", "Electrical"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      activeTab === tab
                        ? "bg-gecl-primary text-white border-gecl-primary shadow-md"
                        : "bg-white text-slate-600 border-slate-200 hover:border-gecl-primary hover:text-gecl-primary"
                    }`}
                  >
                    {tab === "All" ? "All Branches" : tab}
                  </button>
                ),
              )}
            </div>

            {/* Syllabus List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                  <LuFileText className="text-gecl-accent" />
                  Available Documents
                </h3>
                <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                  Total: {filteredData.length}
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <LuBookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm md:text-base mb-1 group-hover:text-gecl-primary transition-colors">
                          {item.subject}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-600">
                            {item.branch}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-gecl-accent"></span>
                            {item.semester}
                          </span>
                          <span>Updated: {item.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:ml-auto pl-14 md:pl-0">
                      {/* View Button */}
                      <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gecl-primary border border-gecl-primary/30 rounded-lg hover:bg-gecl-primary hover:text-white transition-all">
                        <LuEye className="w-4 h-4" /> View
                      </button>

                      {/* Download Button (Optional if different) */}
                      {/* <button className="p-2 text-slate-400 hover:text-gecl-accent transition-colors" title="Download PDF">
                        <LuDownload className="w-5 h-5" />
                      </button> */}
                    </div>
                  </div>
                ))}

                {filteredData.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    <LuFileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No syllabus documents found for this category.</p>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* Navigation Widget (Cleaned Up) */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-gecl-primary p-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <LuBookOpen className="text-gecl-secondary" />
                    Academics
                  </h3>
                </div>
                <nav className="p-2 flex flex-col gap-1">
                  <SidebarLink
                    href="/academics/programs"
                    label="Programs Offered"
                  />
                  <SidebarLink
                    href="/academics/calendar"
                    label="Academic Calendar"
                  />
                  <SidebarLink
                    href="/academics/syllabus"
                    label="Syllabus"
                    active
                  />
                  <SidebarLink
                    href="/academics/timetable"
                    label="Class Routine"
                  />
                  <SidebarLink
                    href="/academics/rules-regulations"
                    label="Rules & Regulations"
                  />
                  <SidebarLink
                    href="/academics/anti-ragging"
                    label="Anti-Ragging Policy"
                  />
                </nav>
              </div>

              {/* --- ADMISSION MODES WIDGET --- */}
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md border border-indigo-100 p-5">
                <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-indigo-600" />
                  Ways to Admission
                </h4>

                <div className="space-y-4">
                  {/* Mode 1 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800">
                        JEE Mains + UGEAC
                      </h5>
                      <p className="text-xs text-slate-500 leading-snug">
                        Primary mode for 1st Year B.Tech via BCECE counselling
                        based on JEE rank.
                      </p>
                    </div>
                  </div>

                  {/* Mode 2 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800">
                        BCECE Board Exam
                      </h5>
                      <p className="text-xs text-slate-500 leading-snug">
                        State level entrance for filling remaining vacant seats
                        (if any).
                      </p>
                    </div>
                  </div>

                  {/* Mode 3 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800">
                        BCECE (Lateral Entry)
                      </h5>
                      <p className="text-xs text-slate-500 leading-snug">
                        Direct 2nd Year admission for Diploma/B.Sc holders via
                        LE exam.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/notices"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:border-gecl-primary hover:text-gecl-primary transition-all shadow-sm"
                >
                  <LuBell className="w-3.5 h-3.5" />
                  View All Admission Notices
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENT ---
function SidebarLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
        active
          ? "bg-gecl-primary text-white shadow-md"
          : "text-slate-600 hover:bg-slate-50 hover:text-gecl-primary hover:pl-5"
      }`}
    >
      {label}
      {active && <LuArrowRight className="w-4 h-4" />}
    </Link>
  );
}
