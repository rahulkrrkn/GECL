// app/academics/faculty/[id]/SingleFacultyView.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuMail,
  LuGraduationCap,
  LuBriefcase,
  LuShieldCheck,
  LuCalendar,
  LuAward,
  LuArrowLeft,
  LuCopy,
  LuCheck,
  LuSend,
  LuMapPin,
  LuQuote,
  LuBookOpen,
  LuActivity,
  LuFingerprint,
} from "react-icons/lu";
import { useApi } from "@/gecl/hooks/useApi";
import { FacultyMember } from "@/gecl/types/faculty";

export default function SingleFacultyView({ id }: { id: string }) {
  const { request } = useApi();
  const [member, setMember] = useState<FacultyMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [mailConfirm, setMailConfirm] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await request<any>({
          method: "GET",
          url: `/academics/faculty/${id}`,
        });
        if (res.success && res.data) setMember(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id, request]);

  if (loading) return <ProfileSkeleton />;
  if (!member) return <NotFoundState />;

  // JSON-LD for Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.fullName,
    jobTitle: member.teacher?.designation,
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "Government Engineering College, Lakhisarai",
    },
    description: member.teacher?.specialization,
    image: member.profilePicUrl,
    email: member.teacher?.officialEmail || member.email,
  };

  return (
    <main className="bg-gecl-background min-h-screen pb-24 selection:bg-gecl-accent/20">
      {/* Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* 1. CINEMATIC TOP NAV */}
      <nav className="bg-white/40 backdrop-blur-md border-b border-gecl-secondary/30 sticky top-0 z-[50]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/academics/faculty"
            className="group flex items-center gap-2 text-gecl-primary font-black text-[10px] uppercase tracking-widest"
          >
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Faculty
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-gecl-primary/40 uppercase tracking-widest">
              Active Academic Session 2026
            </span>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- LEFT COLUMN: PERSONAL IDENTITY --- */}
          <aside className="lg:col-span-4 space-y-8">
            <header className="bg-gecl-primary rounded-[4rem] p-10 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gecl-accent/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative w-52 h-52 mx-auto mb-8">
                <div className="absolute inset-0 bg-gecl-accent rounded-[3.5rem] rotate-12" />
                <Image
                  src={member.profilePicUrl}
                  alt={`Official portrait of ${member.fullName}`}
                  fill
                  className="relative object-cover object-top rounded-[3.5rem] border-4 border-white shadow-2xl"
                  priority
                />
                {member.teacher?.isHod && (
                  <div className="absolute -bottom-2 -right-2 bg-white text-gecl-accent p-3 rounded-2xl shadow-xl border border-gecl-secondary">
                    <LuShieldCheck size={24} />
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
                {member.fullName}
              </h1>
              <p className="text-gecl-secondary text-xs font-black uppercase tracking-[0.3em] mt-3">
                {member.teacher?.designation}
              </p>

              <div className="mt-10 flex flex-col gap-3">
                <button
                  onClick={() => setMailConfirm(true)}
                  className="w-full py-4 bg-gecl-accent text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg"
                >
                  Send Official Inquiry
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      member.teacher?.officialEmail || member.email,
                    );
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }}
                  className="w-full py-4 bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
                >
                  {copySuccess ? (
                    <LuCheck className="inline mr-2" />
                  ) : (
                    <LuCopy className="inline mr-2" />
                  )}
                  {copySuccess ? "Copied" : "Copy Email"}
                </button>
              </div>
            </header>

            <div className="bg-white rounded-[3rem] p-8 border border-gecl-secondary shadow-sm space-y-6">
              <DetailRow
                icon={<LuMapPin />}
                label="Office Address"
                value="Faculty Block A, Room 302"
              />
              <DetailRow
                icon={<LuMail />}
                label="University Email"
                value={member.teacher?.officialEmail || member.email}
              />
              <DetailRow
                icon={<LuFingerprint />}
                label="Faculty UID"
                value={`GECL-FAC-${member._id.slice(-5).toUpperCase()}`}
              />
            </div>
          </aside>

          {/* --- RIGHT COLUMN: ACADEMIC STORY --- */}
          <section className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<LuAward />}
                title="Expertise"
                value={member.teacher?.specialization || "Engineering"}
                color="text-gecl-accent"
              />
              <StatCard
                icon={<LuBriefcase />}
                title="Experience"
                value={`${member.teacher?.experienceYears} Years`}
                color="text-blue-600"
              />
              <StatCard
                icon={<LuActivity />}
                title="BPSC Status"
                value="Commissioned"
                color="text-emerald-600"
              />
            </div>

            <div className="bg-white rounded-[4rem] p-10 md:p-16 border border-gecl-secondary shadow-sm relative overflow-hidden">
              <LuQuote className="absolute top-12 left-12 text-gecl-secondary/20 text-8xl pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-gecl-primary mb-8 flex items-center gap-4">
                  <LuBookOpen className="text-gecl-accent" /> Teaching
                  Philosophy
                </h2>
                <div className="prose prose-slate prose-lg max-w-none text-gecl-text-primary leading-relaxed font-medium">
                  <p className="text-xl text-gecl-primary/70 mb-8 font-bold italic border-l-4 border-gecl-accent pl-6">
                    "Dedicated to nurturing the next generation of engineers at
                    GEC Lakhisarai through a blend of theoretical rigor and
                    practical industry insights."
                  </p>
                  <p>
                    {member.fullName} currently serves as a{" "}
                    {member.teacher?.designation} in the {member.branch[0]}{" "}
                    department.
                  </p>
                </div>

                {member.teacher?.joiningDate && (
                  <div className="mt-12 inline-flex items-center gap-6 p-6 bg-gecl-background rounded-3xl border border-gecl-secondary">
                    <div className="w-14 h-14 bg-gecl-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <LuCalendar size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gecl-primary/40 uppercase tracking-widest">
                        Commissioned On
                      </p>
                      <p className="text-lg font-black text-gecl-primary">
                        {new Date(
                          member.teacher.joiningDate,
                        ).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* --- MAIL CONFIRM MODAL --- */}
      {mailConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-gecl-primary/95 backdrop-blur-xl"
            onClick={() => setMailConfirm(false)}
          />
          <div className="bg-white w-full max-w-md rounded-[4rem] p-12 text-center shadow-2xl relative">
            <div className="w-20 h-20 bg-gecl-accent/10 text-gecl-accent rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <LuSend size={32} />
            </div>
            <h3 className="text-2xl font-black text-gecl-primary mb-2">
              Compose Email?
            </h3>
            <p className="text-sm text-gecl-text-muted mb-10">
              {" "}
              Launch official mail client for: <br />
              <span className="text-gecl-primary font-bold">
                {member.teacher?.officialEmail || member.email}
              </span>
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  window.location.href = `mailto:${member.teacher?.officialEmail || member.email}`;
                  setMailConfirm(false);
                }}
                className="w-full py-5 bg-gecl-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gecl-accent transition-all"
              >
                Open Mailer
              </button>
              <button
                onClick={() => setMailConfirm(false)}
                className="w-full py-5 bg-gecl-secondary/30 text-gecl-primary rounded-2xl font-black text-xs uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- REFINED UI COMPONENTS ---

function StatCard({ icon, title, value, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gecl-secondary shadow-sm group hover:border-gecl-accent transition-all flex items-center gap-6">
      <div
        className={`w-14 h-14 rounded-2xl bg-gecl-secondary/20 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-[9px] font-black text-gecl-primary/30 uppercase tracking-[0.2em] mb-1">
          {title}
        </p>
        <p className="text-base font-black text-gecl-primary leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="text-gecl-accent mt-1">{icon}</div>
      <div className="min-w-0">
        <p className="text-[9px] font-black text-gecl-primary/40 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-xs font-bold text-gecl-primary truncate">{value}</p>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gecl-background p-12 animate-pulse">
      <div className="max-w-6xl mx-auto h-150 bg-gecl-secondary/10 rounded-[4rem]" />
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-black">Profile Not Found</h2>
      <Link
        href="/academics/faculty"
        className="text-gecl-accent underline mt-4"
      >
        Back to Directory
      </Link>
    </div>
  );
}
