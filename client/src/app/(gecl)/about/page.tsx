import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuTarget,
  LuUser,
  LuShield,
  LuUsers,
  LuHistory,
  LuArrowRight,
  LuAward,
  LuGraduationCap,
  LuBookOpen,
  LuBuilding2,
  LuWifi,
  LuLibrary,
} from "react-icons/lu";
import { FaBuildingColumns, FaGlobe } from "react-icons/fa6";

// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  StatCard,
  FeatureItem,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "About Us | GEC Lakhisarai | Institutional Profile",
  description:
    "Discover Government Engineering College Lakhisarai: A premier AICTE-approved institute in Bihar fostering technical excellence since 2019.",
  keywords: [
    "GEC Lakhisarai Profile",
    "Engineering College Bihar",
    "Technical Institute Lakhisarai",
    "GEC Campus Infrastructure",
    "About GEC",
  ],
};

// --- DATA: NAVIGATION CARDS ---
const SECTIONS = [
  {
    title: "About the College",
    desc: "Explore our history, campus infrastructure, affiliation details, and our journey since 2019.",
    href: "/about/college",
    icon: LuHistory,
    color: "bg-blue-600",
    theme: "text-blue-600 bg-blue-50/50",
  },
  {
    title: "Vision & Mission",
    desc: "Our strategic roadmap for academic excellence, innovation, and holistic student development.",
    href: "/about/vision-mission",
    icon: LuTarget,
    color: "bg-emerald-600",
    theme: "text-emerald-600 bg-emerald-50/50",
  },
  {
    title: "Principal's Message",
    desc: "Inspirational words and future outlook from our Principal, Prof. (Dr.) Bimlesh Kumar.",
    href: "/about/principal-message",
    icon: LuUser,
    color: "bg-orange-600",
    theme: "text-orange-600 bg-orange-50/50",
  },
  {
    title: "Administration",
    desc: "Meet the leadership team, Heads of Departments (HODs), and key administrative officials.",
    href: "/about/administration",
    icon: LuShield,
    color: "bg-purple-600",
    theme: "text-purple-600 bg-purple-50/50",
  },
  {
    title: "Board of Governors",
    desc: "The Board of Governors (BoG) that steers the institution's policies and quality standards.",
    href: "/about/bog",
    icon: LuUsers,
    color: "bg-cyan-600",
    theme: "text-cyan-600 bg-cyan-50/50",
  },
  {
    title: "Mandatory Disclosure",
    desc: "Official public disclosures, AICTE approvals, and compliance documents.",
    href: "/mandatory-disclosure",
    icon: LuAward,
    color: "bg-rose-600",
    theme: "text-rose-600 bg-rose-50/50",
  },
];

export default function AboutHubPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Institutional Profile"
        badge="About Us"
        icon={<LuBuilding2 />}
        description="Engineering a brighter tomorrow through technical innovation, ethical values, and academic excellence in the heart of Bihar."
        image="/gecl/images/campus/gecl-campus-main.webp"
        className="bg-indigo-950" // Deep Professional Theme
        themeColor="text-indigo-400"
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* --- STATS STRIP --- */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="2019" label="Year Established" variant="light" />
            <StatCard
              number="5+"
              label="B.Tech Specializations"
              variant="light"
            />
            <StatCard
              number="1200+"
              label="Enrolled Students"
              variant="light"
            />
            <StatCard number="100%" label="AICTE Approved" variant="light" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* --- MAIN CONTENT AREA --- */}
          <div className="lg:w-full space-y-24">
            {/* 1. EXPLORE NAVIGATION GRID */}
            <section>
              <SectionHeader
                title="Institutional Pillars"
                subtitle="Navigate through the core components of GEC Lakhisarai"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {SECTIONS.map((section, idx) => (
                  <Link
                    key={idx}
                    href={section.href}
                    className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className={`p-4 rounded-2xl text-white shadow-lg ${section.color}`}
                      >
                        <section.icon className="w-6 h-6" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <LuArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                      {section.desc}
                    </p>

                    <div
                      className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full border border-transparent ${section.theme}`}
                    >
                      View Details <LuArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* 2. CORE DIFFERENTIATORS */}
            <section className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full opacity-50 -z-0"></div>

              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
                <div className="w-full lg:w-1/2">
                  <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                    Institutional Value
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                    Technical Excellence <br />
                    In Every Aspect
                  </h2>
                  <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                    We provide a holistic environment that combines rigorous
                    academics with practical exposure, ensuring our students are
                    industry-ready for global challenges.
                  </p>

                  <div className="grid gap-6">
                    <FeatureItem
                      icon={FaBuildingColumns}
                      title="Modern Infrastructure"
                      text="Smart classrooms and specialized laboratories for CSE, Civil, and Mechanical branches."
                    />
                    <FeatureItem
                      icon={LuGraduationCap}
                      title="Academic Quality"
                      text="Affiliated with Bihar Engineering University (BEU) and mentored by expert BPSC faculty."
                    />
                    <FeatureItem
                      icon={FaGlobe}
                      title="Industry Alignment"
                      text="Regular workshops, hackathons, and seminars to bridge the gap between campus and corporate."
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl group">
                    <Image
                      src="/gecl/images/campus/college-building.webp"
                      alt="GEC Lakhisarai Building"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent flex items-end p-8">
                      <div className="text-white">
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-200 mb-1">
                          Campus Life
                        </p>
                        <h4 className="text-xl font-bold italic">
                          "Empowering Bihar through Innovation"
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* --- ADMISSION CTA SECTION --- */}
      <section className="container mx-auto px-4">
        <div className="bg-indigo-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <LuLibrary
              size={400}
              className="absolute -left-20 -bottom-20 text-white"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
            Join the Next Generation of Engineers
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Take the first step towards a rewarding career. Explore our
            admission process and secure your future at GECL.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/admissions/how-to-apply"
              className="px-10 py-4 bg-white text-indigo-900 font-black rounded-xl hover:bg-indigo-50 transition-all shadow-lg uppercase text-xs tracking-widest"
            >
              Apply for Admission
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-transparent border-2 border-indigo-400 text-white font-black rounded-xl hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
            >
              Contact Helpdesk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
