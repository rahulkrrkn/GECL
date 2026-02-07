import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuGraduationCap,
  LuBookOpen,
  LuClock,
  LuUsers,
  LuCpu,
  LuBuilding,
  LuZap,
  LuSettings,
  LuBell,
  LuDownload,
  LuArrowRight,
} from "react-icons/lu";
import { FaCheckCircle, FaLaptopCode } from "react-icons/fa"; // Updated Icons

// Import Reusable Components
import {
  PageHero,
  SidebarNavigation,
  SidebarWidget,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Academic Programs | Government Engineering College, Lakhisarai",
  description:
    "Explore B.Tech programs offered at GEC Lakhisarai. AICTE approved courses in CSE (AI & Data Science), Civil, Mechanical, and Electrical Engineering.",
  keywords: [
    "B.Tech Courses GEC Lakhisarai",
    "Civil Engineering Admission Bihar",
    "CSE AI Data Science Colleges Bihar",
    "Mechanical Engineering GEC",
    "Electrical Engineering Syllabus",
  ],
  openGraph: {
    title: "Academic Programs | GEC Lakhisarai",
    description:
      "4-Year B.Tech Degree Programs affiliated with Bihar Engineering University.",
    url: "https://geclakhisarai.ac.in/academics/programs",
    type: "website",
    images: [
      {
        url: "/gecl/images/campus/gecl-campus-main.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Academic Block",
      },
    ],
  },
};

// --- PROGRAMS DATA ---
const PROGRAMS = [
  {
    id: "civil",
    name: "Civil Engineering",
    intake: 120,
    duration: "4 Years",
    icon: LuBuilding,
    color: "text-orange-600 bg-orange-50",
    image: "/gecl/images/departments/dept-civil.webp",
    desc: "Focuses on infrastructure development, structural engineering, surveying, and sustainable construction practices.",
  },
  {
    id: "cse-ai",
    name: "Computer Science (AI)",
    intake: 60,
    duration: "4 Years",
    icon: LuCpu,
    color: "text-blue-600 bg-blue-50",
    image: "/gecl/images/departments/dept-cse-ai.webp",
    desc: "Advanced curriculum covering Neural Networks, Deep Learning, Robotics, and intelligent system design.",
  },
  {
    id: "cse-ds",
    name: "Computer Science (Data Science)",
    intake: 60,
    duration: "4 Years",
    icon: LuBookOpen,
    color: "text-indigo-600 bg-indigo-50",
    image: "/gecl/images/departments/dept-cse-ds.webp",
    desc: "Specialized program in Big Data Analytics, Statistical Modeling, and Data Visualization techniques.",
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    intake: 60,
    duration: "4 Years",
    icon: LuSettings,
    color: "text-slate-600 bg-slate-100",
    image: "/gecl/images/departments/dept-mech.webp",
    desc: "Covers Thermodynamics, Fluid Mechanics, CAD/CAM, and modern manufacturing processes.",
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    intake: 60,
    duration: "4 Years",
    icon: LuZap,
    color: "text-yellow-600 bg-yellow-50",
    image: "/gecl/images/departments/dept-ee.webp",
    desc: "Studies in Power Systems, Control Systems, IoT, and renewable energy technologies.",
  },
];

export default function ProgramsPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. REUSABLE HERO SECTION */}
      <PageHero
        title="Academic Programs"
        description="Comprehensive B.Tech degree programs designed to foster technical expertise and innovation."
        badge="Undergraduate Courses"
        icon={<LuGraduationCap />}
        image="/gecl/images/campus/college-building-main.webp"
        className="bg-blue-950" // Academic Theme
        themeColor="text-blue-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Programs" },
        ]}
      />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gecl-primary mb-4 flex items-center gap-2">
                <LuGraduationCap className="text-gecl-accent" />
                Bachelor of Technology (B.Tech)
              </h2>
              <p className="text-slate-600 leading-relaxed border-l-4 border-gecl-accent pl-4">
                GEC Lakhisarai offers full-time, four-year B.Tech programs
                approved by AICTE and affiliated with Bihar Engineering
                University. Admission is conducted via UGEAC (based on JEE Mains
                score).
              </p>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative top-0 hover:-top-1"
                >
                  {/* Image Header */}
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div
                        className={`inline-flex p-2 rounded-lg mb-2 shadow-sm ${program.color} bg-white`}
                      >
                        <program.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg leading-tight drop-shadow-md">
                        {program.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-6 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <LuUsers className="w-4 h-4 text-gecl-primary" />
                        <span className="font-semibold text-slate-700">
                          {program.intake} Seats
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <LuClock className="w-4 h-4 text-gecl-primary" />
                        <span>{program.duration}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                      {program.desc}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <Link
                        href={`/departments/${program.id}`}
                        className="flex-1 py-2.5 text-center rounded-lg bg-gecl-primary text-white text-sm font-semibold hover:bg-gecl-primary/90 transition-colors shadow-md shadow-blue-100"
                      >
                        View Details
                      </Link>

                      {/* Syllabus Button */}
                      <Link
                        href="/academics/syllabus"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:text-gecl-primary hover:border-gecl-primary transition-colors bg-slate-50 hover:bg-white"
                        title="View Syllabus"
                      >
                        <LuBookOpen className="w-4 h-4" /> Syllabus
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Note */}
            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-1 shrink-0">
                <LuGraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">
                  Admission Eligibility
                </h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Admissions are based on the rank secured in JEE (Mains)
                  conducted by NTA, followed by counselling (UGEAC) by BCECE
                  Board, Govt. of Bihar.
                </p>
                <Link
                  href="/admissions/eligibility"
                  className="text-sm font-bold text-blue-700 hover:underline mt-2 inline-flex items-center gap-1"
                >
                  View Eligibility Criteria <LuArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* 2. REUSABLE SIDEBAR NAVIGATION */}
              <SidebarNavigation
                title="Academics"
                links={[
                  { label: "Programs Offered", href: "/academics/programs" },
                  { label: "Academic Calendar", href: "/academics/calendar" },
                  { label: "Class Routine", href: "/academics/timetable" },
                  { label: "Syllabus", href: "/academics/syllabus" },
                  {
                    label: "Rules & Regulations",
                    href: "/academics/rules-regulations",
                  },
                  {
                    label: "Anti-Ragging Policy",
                    href: "/academics/anti-ragging",
                  },
                ]}
              />

              {/* 3. REUSABLE SIDEBAR WIDGET (Admission Modes) */}
              <SidebarWidget
                title={
                  <div className="flex items-center gap-2 text-indigo-900">
                    <FaCheckCircle className="text-indigo-600" /> Ways to
                    Admission
                  </div>
                }
                className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100"
              >
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
                        Primary mode for 1st Year B.Tech via BCECE counselling.
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
                        State level entrance for filling remaining vacant seats.
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
                        Direct 2nd Year admission for Diploma/B.Sc holders.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/announcements/notices/"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:border-gecl-primary hover:text-gecl-primary transition-all shadow-sm"
                >
                  <LuBell className="w-3.5 h-3.5" />
                  View All Admission Notices
                </Link>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
