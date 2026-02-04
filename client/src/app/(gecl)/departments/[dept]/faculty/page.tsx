"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuMail,
  LuGraduationCap,
  LuExternalLink,
  LuEye,
  LuSearch,
  LuBriefcase,
  LuSend,
  LuX,
  LuCopy,
  LuShieldCheck,
  LuArrowRight,
  LuUser,
  LuFingerprint,
} from "react-icons/lu";
import { useApi } from "@/gecl/hooks/useApi";
import { FacultyMember, FacultyApiResponse } from "@/gecl/types/faculty";

const BRANCH_MAP: Record<string, string> = {
  "cse-ai": "CSE-AI",
  "cse-ds": "CSE-DS",
  civil: "CE",
  mechanical: "ME",
  electrical: "EE",
  "applied-science": "AS&H",
};

export default function FacultyPage({
  params: paramsPromise,
}: {
  params: Promise<{ dept: string }>;
}) {
  const params = use(paramsPromise);
  const { request } = useApi();

  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(
    null,
  );
  const [mailConfirm, setMailConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const branchCode = BRANCH_MAP[params.dept] || params.dept.toUpperCase();
        const res = await request<FacultyApiResponse>(
          { method: "GET", url: `/academics/faculty/department/${branchCode}` },
          { showMsg: false, showErrorMsg: true },
        );

        if (res?.success && res.data) {
          // Forced type-cast to ensure the build passes
          const facultyArray = res.data as unknown as FacultyMember[];
          const sorted = [...facultyArray].sort((a, b) =>
            a.teacher?.isHod ? -1 : 1,
          );
          setFaculty(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [params.dept, request]);

  const filteredFaculty = faculty.filter((f) =>
    f.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return (
      <div className="columns-1 md:columns-2 gap-8 space-y-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-80 bg-gecl-secondary/10 rounded-[3rem] w-full"
          />
        ))}
      </div>
    );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-[1400px] mx-auto">
      {/* --- REFINED COMPACT HEADER --- */}
      <header className="mb-10 p-6 md:p-8 bg-gecl-primary rounded-[2.5rem] lg:rounded-[3rem] relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gecl-accent/10 rounded-full blur-[80px] -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-white/10 items-center justify-center text-gecl-accent border border-white/10">
              <LuFingerprint size={24} />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                Faculty <span className="text-gecl-secondary">Directory</span>
              </h1>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-0.5">
                {params.dept.toUpperCase()} • GEC Lakhisarai
              </p>
            </div>
          </div>

          <div className="w-full lg:w-72">
            <div className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-2xl focus-within:bg-white transition-all group">
              <LuSearch
                className="text-white/30 group-focus-within:text-gecl-primary"
                size={18}
              />
              <input
                type="text"
                placeholder="Find faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-xs font-bold text-white group-focus-within:text-gecl-primary w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- MASONRY GRID --- */}
      <section className="columns-1 sm:columns-2 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {filteredFaculty.map((member) => (
          <article
            key={member._id}
            className="break-inside-avoid group bg-white border border-gecl-secondary/40 rounded-[2.5rem] md:rounded-[3rem] p-2.5 hover:border-gecl-primary hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative h-64 md:h-72 w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
              <Image
                src={member.profilePicUrl}
                alt={member.fullName}
                fill
                // className="object-cover object-top transition-transform group-hover:scale-110 duration-700"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gecl-primary/90 via-transparent to-transparent" />

              {member.teacher?.isHod && (
                <div className="absolute top-5 left-5 px-3 py-1.5 bg-gecl-accent text-white rounded-xl text-[8px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5">
                  <LuShieldCheck size={12} /> HOD
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-xl font-black tracking-tight leading-none">
                  {member.fullName}
                </h2>
                <p className="text-gecl-secondary text-[9px] font-black uppercase tracking-widest mt-1.5 opacity-80">
                  {member.teacher?.designation}
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex flex-wrap gap-2 mb-6 min-h-[28px]">
                {member.teacher?.specialization && (
                  <div className="px-3 py-1 bg-gecl-background text-gecl-primary text-[9px] font-bold rounded-lg border border-gecl-secondary/60 flex items-center gap-2">
                    <LuGraduationCap size={13} className="text-gecl-accent" />{" "}
                    {member.teacher.specialization}
                  </div>
                )}
                {(member.teacher?.experienceYears ?? 0) > 0 && (
                  <div className="px-3 py-1 bg-gecl-background text-gecl-primary text-[9px] font-bold rounded-lg border border-gecl-secondary/60 flex items-center gap-2">
                    <LuBriefcase size={13} className="text-gecl-accent" />{" "}
                    {member.teacher.experienceYears}Y Exp.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedFaculty(member)}
                  className="flex items-center justify-center gap-2 py-3 bg-gecl-secondary/30 text-gecl-primary rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gecl-primary hover:text-white transition-all group/btn"
                >
                  <LuEye
                    size={14}
                    className="group-hover/btn:scale-110 transition-transform"
                  />{" "}
                  Quick View
                </button>
                <Link
                  href={`/academics/faculty/${member._id}`}
                  className="flex items-center justify-center gap-2 py-3 bg-gecl-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gecl-accent transition-all group/link shadow-md"
                >
                  Profile{" "}
                  <LuArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* --- QUICK VIEW MODAL --- */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gecl-primary/95 backdrop-blur-xl animate-in fade-in"
            onClick={() => setSelectedFaculty(null)}
          />
          <div className="bg-white w-full max-w-4xl rounded-[3rem] relative shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 rounded-full text-gecl-primary hover:bg-gecl-error hover:text-white transition-all flex items-center justify-center shadow-lg"
            >
              <LuX size={18} />
            </button>

            <div className="w-full md:w-[45%] relative h-64 md:h-auto">
              <Image
                src={selectedFaculty.profilePicUrl}
                alt={selectedFaculty.fullName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gecl-primary via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {selectedFaculty.fullName}
                </h3>
                <span className="inline-block mt-3 px-4 py-1.5 bg-gecl-accent text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                  {selectedFaculty.teacher?.designation}
                </span>
              </div>
            </div>

            <div className="w-full md:w-[55%] p-8 md:p-12 bg-gecl-background flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6 text-gecl-accent font-black text-[9px] uppercase tracking-[0.3em]">
                <LuUser size={16} /> Faculty Dossier
              </div>

              <div className="space-y-4 mb-10">
                {selectedFaculty.teacher?.specialization && (
                  <div className="bg-white p-4 rounded-2xl border border-gecl-secondary flex gap-4">
                    <LuGraduationCap
                      className="text-gecl-accent shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="text-[8px] font-black text-gecl-primary/40 uppercase mb-0.5">
                        Specialization
                      </p>
                      <p className="text-xs font-bold text-gecl-primary">
                        {selectedFaculty.teacher.specialization}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      setMailConfirm(
                        selectedFaculty.teacher?.officialEmail ||
                          selectedFaculty.email,
                      )
                    }
                    className="flex-grow py-4 bg-gecl-primary text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-gecl-accent transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <LuMail size={16} /> Contact Faculty
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        selectedFaculty.teacher?.officialEmail ||
                          selectedFaculty.email,
                      );
                      setCopySuccess(true);
                      setTimeout(() => setCopySuccess(false), 2000);
                    }}
                    className="px-5 bg-white border border-gecl-secondary text-gecl-primary rounded-xl transition-all shadow-sm"
                  >
                    {copySuccess ? (
                      <LuUser className="text-gecl-success" size={20} />
                    ) : (
                      <LuCopy size={20} />
                    )}
                  </button>
                </div>
              </div>

              <Link
                href={`/academics/faculty/${selectedFaculty._id}`}
                className="block w-full py-4 bg-white border-2 border-gecl-primary text-gecl-primary rounded-xl text-center font-black text-[9px] uppercase tracking-widest hover:bg-gecl-primary hover:text-white transition-all"
              >
                Access Full Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIL CONFIRM --- */}
      {mailConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-gecl-primary/98 backdrop-blur-2xl"
            onClick={() => setMailConfirm(null)}
          />
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative text-center shadow-2xl">
            <div className="w-16 h-16 bg-gecl-accent/10 text-gecl-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LuSend size={28} />
            </div>
            <h3 className="text-xl font-black text-gecl-primary mb-2">
              Compose Email?
            </h3>
            <p className="text-xs text-gecl-text-muted mb-8 italic">
              {mailConfirm}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  window.location.href = `mailto:${mailConfirm}`;
                  setMailConfirm(null);
                }}
                className="w-full py-4 bg-gecl-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gecl-accent transition-all"
              >
                Open Mailer
              </button>
              <button
                onClick={() => setMailConfirm(null)}
                className="w-full py-4 bg-gecl-secondary/30 text-gecl-primary rounded-xl font-black text-[10px] uppercase tracking-widest"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
