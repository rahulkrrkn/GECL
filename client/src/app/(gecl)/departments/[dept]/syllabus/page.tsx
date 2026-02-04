"use client";

import React, { useState, use, useMemo } from "react";
import Link from "next/link";
import {
  LuLayers,
  LuHistory,
  LuFileText,
  LuLayoutGrid,
  LuUser,
  LuChevronRight,
  LuMousePointerClick,
} from "react-icons/lu";
import { PdfViewer } from "@/gecl/components/ui/PdfViewer";
import { SYLLABUS_DATA } from "@/gecl/config/allSyllabusData";

export default function DeptSyllabusPage({
  params: paramsPromise,
}: {
  params: Promise<{ dept: string }>;
}) {
  const params = use(paramsPromise);

  // 1. Get and Sort Years (Newest First)
  const availableYears = useMemo(() => {
    return Object.keys(SYLLABUS_DATA).sort(
      (a, b) => parseInt(b) - parseInt(a),
    ) as Array<keyof typeof SYLLABUS_DATA>;
  }, []);

  // 2. States
  const [activeYear, setActiveYear] = useState<keyof typeof SYLLABUS_DATA>(
    availableYears[0],
  );
  const [activeSem, setActiveSem] = useState<number | null>(null); // Start as null to prevent auto-load

  // 3. Branch Data lookup
  const batchInfo = SYLLABUS_DATA[activeYear];
  const branchData =
    batchInfo.branches[params.dept as keyof typeof batchInfo.branches];

  // 4. Find the PDF link only if activeSem is set
  const currentPdf = useMemo(() => {
    if (activeSem === null) return null;
    return branchData?.semesters.find((s) => s.sem === activeSem)?.link;
  }, [branchData, activeSem]);

  if (!branchData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <LuUser size={48} className="text-slate-200 mb-4" />
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
          Data Not Found
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          No syllabus registered for {params.dept} in {activeYear}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- BATCH HEADER --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Academic Syllabus
          </h2>
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
            Batch: {batchInfo.label}
          </p>
        </div>

        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => {
                setActiveYear(year);
                setActiveSem(null); // Reset viewer when switching years
              }}
              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                activeYear === year
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {year === "2024" ? "New (BEU)" : "Legacy (AKU)"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* --- LEFT: SEMESTER SELECTOR --- */}
        <aside className="xl:col-span-3 space-y-3">
          <div className="flex items-center gap-2 px-2 mb-4">
            <LuLayoutGrid className="text-indigo-600" size={16} />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Select Semester
            </span>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
            {branchData.semesters.map((s) => (
              <button
                key={s.sem}
                onClick={() => setActiveSem(s.sem)}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all group ${
                  activeSem === s.sem
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
                    : "bg-white border-slate-100 text-slate-500 hover:border-indigo-200"
                }`}
              >
                <span className="text-[11px] font-black uppercase tracking-wide">
                  Semester {s.sem}
                </span>
                <LuChevronRight
                  size={14}
                  className={
                    activeSem === s.sem
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0 group-hover:opacity-50 transition-all"
                  }
                />
              </button>
            ))}
          </div>
        </aside>

        {/* --- RIGHT: VIEWER AREA --- */}
        <section className="xl:col-span-9">
          <div className="bg-slate-50 rounded-[2.5rem] p-4 border border-slate-200 shadow-inner md:h-[80vh] flex flex-col relative overflow-hidden">
            {activeSem && currentPdf ? (
              <PdfViewer
                url={currentPdf}
                title={`${branchData.name} - Sem ${activeSem}`}
                downloadable={false}
              />
            ) : (
              /* Placeholder State when no Semester is selected */
              <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 text-indigo-600 animate-bounce">
                  <LuMousePointerClick size={32} />
                </div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  Awaiting Selection
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 max-w-[200px]">
                  Please click a semester from the left menu to load the
                  syllabus.
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 opacity-[0.03] rotate-12">
                  <LuFileText size={200} />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 px-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
              GECL Academic Portal • {activeYear} Edition
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
