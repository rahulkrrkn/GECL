import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuArrowRight,
  LuBell,
  LuDownload,
  LuCalendar,
  LuTrophy,
  LuUsers,
  LuBookOpen,
  LuBuilding2,
  LuGraduationCap,
  LuChevronRight,
  LuCpu,
  LuZap,
  LuSettings,
} from "react-icons/lu";

// Import Reusable Components
import { SectionHeader, StatCard, FeatureItem } from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Government Engineering College, Lakhisarai | Official Website",
  description:
    "Welcome to GEC Lakhisarai, a premier government engineering institute in Bihar approved by AICTE and affiliated with Bihar Engineering University. Excellence in Technical Education.",
  keywords: [
    "GEC Lakhisarai",
    "Government Engineering College Bihar",
    "B.Tech Admission 2026",
    "Engineering Colleges in Lakhisarai",
    "BEU Affiliated Colleges",
  ],
  openGraph: {
    title: "Government Engineering College, Lakhisarai",
    description:
      "Empowering the future with technical excellence and innovation.",
    url: "https://www.geclakhisarai.ac.in",
    type: "website",
    images: [
      {
        url: "/gecl/images/college-building-main.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Campus",
      },
    ],
  },
};

// --- MOCK NOTICE DATA ---
const NOTICES = [
  {
    id: 1,
    text: "B.Tech 7th Semester Mid-Term Examination Schedule Released",
    date: "Oct 12, 2025",
    new: true,
  },
  {
    id: 2,
    text: "Registration for 1st Year B.Tech (2025-29 Batch) Closing Soon",
    date: "Oct 10, 2025",
    new: true,
  },
  {
    id: 3,
    text: "Notice regarding Scholarship Application for OBC Students",
    date: "Oct 08, 2025",
    new: false,
  },
  {
    id: 4,
    text: "Holiday List Update: Durga Puja Vacation from Oct 17",
    date: "Oct 05, 2025",
    new: false,
  },
  {
    id: 5,
    text: "Tender Notification: Supply of Lab Equipment for CSE Dept",
    date: "Oct 01, 2025",
    new: false,
  },
];

export default function HomePage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. HOME HERO SECTION (Custom for Landing Page) */}
      <section className="relative h-[85vh] min-h-150 flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gecl/images/college-building-main.webp"
            alt="GEC Lakhisarai Campus"
            fill
            className="object-cover opacity-40 scale-105 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/30 via-slate-900/60 to-slate-900"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold mb-6 backdrop-blur-md animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Admissions Open 2026-27
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 tracking-tight leading-tight drop-shadow-lg">
            Government Engineering College <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-white">
              Lakhisarai
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            An Institute under Department of Science, Technology & Technical
            Education, Government of Bihar. Affiliated to Bihar Engineering
            University, Patna.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/academics/programs"
              className="px-8 py-4 bg-gecl-accent hover:bg-orange-600 text-white font-bold rounded-full transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2"
            >
              <LuGraduationCap className="w-5 h-5" /> Explore Programs
            </Link>
            <Link
              href="/about/college"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full transition-all flex items-center gap-2"
            >
              About Institute <LuArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-400">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-slate-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* 2. NEWS TICKER */}
      <div className="bg-gecl-primary text-white overflow-hidden py-3 border-b border-white/10 relative z-20">
        <div className="container mx-auto px-4 flex items-center">
          <span className="bg-gecl-accent text-xs font-bold px-2 py-1 rounded mr-4 shrink-0 uppercase tracking-wider">
            Latest News
          </span>
          <div className="grow overflow-hidden relative h-6">
            <div className="absolute whitespace-nowrap animate-marquee flex items-center gap-8 text-sm font-medium text-blue-100">
              <span>
                🚀 Application forms for B.Tech Lateral Entry are now available.
              </span>
              <span>📅 Mid-Semester Exams for 3rd Sem start from Nov 15.</span>
              <span>
                🏆 GEC Lakhisarai wins 1st Prize in Smart India Hackathon
                Regionals!
              </span>
              <span>
                📢 75% Attendance is mandatory for all students as per BEU
                norms.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRINCIPAL & NOTICES SECTION */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Principal's Message (Left) */}
          <div className="lg:w-2/3">
            <SectionHeader title="Principal's Desk" icon={LuUsers} />
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
                <div className="absolute inset-0 bg-gecl-primary rounded-full blur-md opacity-20 transform translate-y-4"></div>
                <Image
                  src="/gecl/images/principal-bimlesh-kumar.webp"
                  alt="Prof. (Dr.) Bimlesh Kumar"
                  fill
                  className="object-cover rounded-full border-4 border-white shadow-xl"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Prof. (Dr.) Bimlesh Kumar
                </h3>
                <p className="text-gecl-primary font-medium mb-4">
                  Principal, GEC Lakhisarai
                </p>
                <div className="relative">
                  <span className="text-6xl text-slate-200 absolute -top-4 -left-4 font-serif">
                    “
                  </span>
                  <p className="text-slate-600 leading-relaxed italic relative z-10">
                    We are committed to fostering a culture of innovation and
                    excellence. Our goal is to empower students with not just
                    technical skills, but the ethical foundation to become
                    nation builders.
                  </p>
                </div>
                <Link
                  href="/about/principal-message"
                  className="inline-flex items-center gap-2 mt-6 text-gecl-accent font-bold hover:text-orange-700 transition-colors"
                >
                  Read Full Message <LuArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Stats Row (Integrated here) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <StatCard number="2019" label="Established" variant="primary" />
              <StatCard number="5+" label="Departments" />
              <StatCard number="1200+" label="Students" />
              <StatCard number="50+" label="Faculty" />
            </div>
          </div>

          {/* Notice Board (Right) */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden h-full flex flex-col">
              <div className="bg-gecl-primary p-5 flex justify-between items-center">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <LuBell className="text-gecl-secondary" /> Notice Board
                </h3>
                <Link
                  href="/notices"
                  className="text-xs text-blue-200 hover:text-white underline"
                >
                  View All
                </Link>
              </div>

              <div className="p-2 overflow-y-auto max-h-100 custom-scrollbar">
                <ul className="divide-y divide-slate-100">
                  {NOTICES.map((notice) => (
                    <li
                      key={notice.id}
                      className="p-4 hover:bg-slate-50 transition-colors group"
                    >
                      <Link href={`/notices/${notice.id}`} className="block">
                        <div className="flex gap-3">
                          <div className="bg-slate-100 text-slate-600 rounded-lg w-12 h-12 flex flex-col items-center justify-center shrink-0 border border-slate-200">
                            <span className="text-xs font-bold uppercase">
                              {notice.date.split(" ")[0]}
                            </span>
                            <span className="text-lg font-bold leading-none">
                              {notice.date.split(" ")[1].replace(",", "")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-gecl-primary transition-colors">
                              {notice.text}
                            </p>
                            {notice.new && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
                <Link
                  href="/academics/calendar"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-gecl-primary transition-colors"
                >
                  <LuCalendar className="w-4 h-4" /> Academic Calendar
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 4. ACADEMIC DEPARTMENTS GRID */}
      <section className="bg-slate-100 py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-gecl-primary font-bold uppercase tracking-widest text-sm mb-2 block">
              Academics
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Departments
            </h2>
            <div className="w-20 h-1 bg-gecl-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DeptCard
              title="Computer Science"
              subtitle="Artificial Intelligence"
              icon={LuCpu}
              href="/departments/cse-ai"
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <DeptCard
              title="Civil Engineering"
              subtitle="Infrastructure & Design"
              icon={LuBuilding2}
              href="/departments/civil"
              color="text-orange-600"
              bg="bg-orange-50"
            />
            <DeptCard
              title="Mechanical Engg."
              subtitle="Machines & Thermal"
              icon={LuSettings}
              href="/departments/mechanical"
              color="text-slate-600"
              bg="bg-slate-200"
            />
            <DeptCard
              title="Electrical Engg."
              subtitle="Power & Circuits"
              icon={LuZap}
              href="/departments/electrical"
              color="text-yellow-600"
              bg="bg-yellow-50"
            />
            <DeptCard
              title="CSE (Data Science)"
              subtitle="Big Data & Analytics"
              icon={LuBookOpen}
              href="/departments/cse-ds"
              color="text-indigo-600"
              bg="bg-indigo-50"
            />
            <div className="bg-gecl-primary rounded-2xl p-8 flex flex-col justify-center items-center text-center text-white hover:bg-slate-900 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LuArrowRight className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-1">View All Programs</h3>
              <p className="text-blue-200 text-sm mb-4">
                Check eligibility & syllabus
              </p>
              <Link
                href="/academics/programs"
                className="text-sm font-bold uppercase tracking-wide border-b border-white/30 pb-1 hover:border-white transition-colors"
              >
                Click Here
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-linear-to-r from-gecl-primary to-slate-900 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Start Your Engineering Journey
                </h2>
                <p className="text-blue-100 max-w-xl text-lg mb-6">
                  Admissions for the 2026-27 session are now open through JEE
                  Mains and BCECE. Don't miss your chance to join GEC
                  Lakhisarai.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <FeatureItem
                    text="AICTE Approved"
                    className="bg-white/10 text-white rounded-lg px-4 py-2 border-none"
                  />
                  <FeatureItem
                    text="Affordable Fee"
                    className="bg-white/10 text-white rounded-lg px-4 py-2 border-none"
                  />
                  <FeatureItem
                    text="Top Faculty"
                    className="bg-white/10 text-white rounded-lg px-4 py-2 border-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 min-w-50">
                <Link
                  href="/admissions/how-to-apply"
                  className="px-8 py-4 bg-gecl-accent text-white font-bold rounded-xl text-center hover:bg-orange-600 transition-colors shadow-lg"
                >
                  Apply Now
                </Link>
                <Link
                  href="/gecl/brochure-2026.pdf"
                  className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl text-center hover:bg-white hover:text-gecl-primary transition-colors flex items-center justify-center gap-2"
                >
                  <LuDownload className="w-5 h-5" /> Brochure
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- LOCAL COMPONENT: Department Card ---
function DeptCard({ title, subtitle, icon: Icon, href, color, bg }: any) {
  return (
    <Link
      href={href}
      className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5"
    >
      <div
        className={`w-16 h-16 ${bg} ${color} rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}
      >
        <Icon />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-gecl-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mb-2">{subtitle}</p>
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-400 group-hover:text-gecl-accent transition-colors">
          Details <LuChevronRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}
