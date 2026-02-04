// app/academics/faculty/AllFacultyView.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuSearch,
  LuBriefcase,
  LuGraduationCap,
  LuExternalLink,
  LuFilter,
  LuUsers,
  LuShieldCheck,
} from "react-icons/lu";
import { useApi } from "@/gecl/hooks/useApi";
import { FacultyMember, FacultyApiResponse } from "@/gecl/types/faculty";
import { PageHero } from "@/gecl/components/ui";

const DEPARTMENTS = [
  { label: "All Departments", value: "ALL" },
  { label: "Computer Science (AI)", value: "CSE-AI" },
  { label: "Computer Science (DS)", value: "CSE-DS" },
  { label: "Civil Engineering", value: "CE" },
  { label: "Mechanical Engineering", value: "ME" },
  { label: "Electrical Engineering", value: "EE" },
  { label: "Applied Science", value: "AS&H" },
];

export default function AllFacultyView() {
  const { request } = useApi();
  const [allFaculty, setAllFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDept, setActiveDept] = useState("ALL");

  useEffect(() => {
    const fetchAllFaculty = async () => {
      try {
        setLoading(true);
        // Change the generic here to return the correct structure
        const res = await request<FacultyApiResponse>({
          method: "GET",
          url: "/academics/faculty",
        });

        if (res.success && Array.isArray(res.data)) {
          const sorted = [...res.data].sort((a, b) => {
            if (a.teacher?.isHod) return -1;
            if (b.teacher?.isHod) return 1;
            return (
              (b.teacher?.experienceYears ?? 0) -
              (a.teacher?.experienceYears ?? 0)
            );
          });
          setAllFaculty(sorted);
        }
      } catch (err) {
        console.error("Global Faculty Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFaculty();
  }, [request]);

  const filteredFaculty = useMemo(() => {
    return allFaculty.filter((f) => {
      const matchesDept = activeDept === "ALL" || f.branch.includes(activeDept);
      const matchesSearch =
        f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.teacher?.specialization
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [allFaculty, activeDept, searchQuery]);

  return (
    <main className="bg-[#fcfcfd] min-h-screen pb-24">
      <PageHero
        title="Faculty Directory"
        badge="Academic Leadership"
        description="The intellectual core of GEC Lakhisarai. Focus on research, mentorship, and technical excellence."
        image="/gecl/images/campus/college-building.webp"
        className="bg-gecl-primary"
        themeColor="text-gecl-accent"
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Faculty" }]}
      />

      {/* COMPACT FILTER DOCK - Upgraded UI */}
      <section className="container mx-auto px-4 -mt-12 relative z-30">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-3 flex flex-col lg:flex-row items-center gap-3 border border-white/50">
          <div className="relative flex-grow w-full">
            <LuSearch
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gecl-primary/30"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-100/50 rounded-2xl outline-none font-semibold text-sm text-gecl-primary focus:bg-white focus:ring-2 focus:ring-gecl-accent/20 transition-all"
            />
          </div>
          <div className="relative w-full lg:w-72">
            <LuFilter
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gecl-accent"
              size={16}
            />
            <select
              value={activeDept}
              onChange={(e) => setActiveDept(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-slate-100/50 rounded-2xl outline-none font-black text-[10px] uppercase tracking-widest text-gecl-primary appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 bg-slate-200 animate-pulse rounded-[3.5rem]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredFaculty.map((member) => (
              <Link
                href={`/academics/faculty/${member._id}`}
                key={member._id}
                className="group bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-gecl-accent/30 transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                {/* Visual Section */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.profilePicUrl}
                    alt={`Professor ${member.fullName}`}
                    fill
                    className="object-cover object-top transition-transform group-hover:scale-105 duration-700"
                    priority={member.teacher?.isHod}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {member.teacher?.isHod && (
                    <div className="absolute top-6 right-6 z-20 bg-gecl-accent text-white p-2.5 rounded-2xl shadow-xl ring-4 ring-white/20">
                      <LuShieldCheck size={20} />
                    </div>
                  )}

                  <div className="absolute bottom-6 left-8 flex flex-wrap gap-2">
                    {member.branch.map((b) => (
                      <span
                        key={b}
                        className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/20"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 flex-grow">
                  <h2 className="text-2xl font-black text-gecl-primary tracking-tight group-hover:text-gecl-accent transition-colors">
                    {member.fullName}
                  </h2>
                  <p className="text-gecl-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    {member.teacher?.designation}
                  </p>

                  <div className="space-y-4">
                    {/* ONLY SHOWS IF DATA EXISTS */}
                    {member.teacher?.specialization && (
                      <div className="flex items-center gap-4 text-slate-500">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-gecl-primary group-hover:bg-gecl-primary group-hover:text-white transition-all">
                          <LuGraduationCap size={18} />
                        </div>
                        <p className="text-xs font-bold leading-snug">
                          {member.teacher.specialization}
                        </p>
                      </div>
                    )}

                    {(member.teacher?.experienceYears ?? 0) > 0 && (
                      <div className="flex items-center gap-4 text-slate-500">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-gecl-primary group-hover:bg-gecl-primary group-hover:text-white transition-all">
                          <LuBriefcase size={18} />
                        </div>
                        <p className="text-xs font-bold leading-snug">
                          {member.teacher.experienceYears} Years Tenure
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <div className="w-full py-5 bg-slate-50 border border-slate-100 text-gecl-primary rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest group-hover:bg-gecl-primary group-hover:text-white transition-all">
                    View Full Dossier <LuExternalLink size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredFaculty.length === 0 && (
          <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
            <LuUsers size={64} className="mx-auto text-slate-300 mb-6" />
            <h3 className="text-2xl font-black text-gecl-primary">
              No Matching Faculty
            </h3>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Try changing your search terms or department filter.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
