import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/gecl/components/ui/";
import {
  LuBuilding2,
  LuTarget,
  LuUser,
  LuShield,
  LuUsers,
  LuHistory,
  LuArrowRight,
  LuAward,
  LuGraduationCap,
  LuBookOpen,
} from "react-icons/lu";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "About Us | Government Engineering College, Lakhisarai",
  description:
    "Discover GEC Lakhisarai: A premier government engineering institute in Bihar established in 2019. Explore our history, leadership, vision, and academic excellence.",
  keywords: [
    "GEC Lakhisarai Profile",
    "Engineering College Bihar",
    "Technical Institute Lakhisarai",
    "GEC Campus Infrastructure",
    "About GEC",
  ],
  openGraph: {
    title: "About Us | GEC Lakhisarai",
    description:
      "Discover the legacy and future of Government Engineering College, Lakhisarai.",
    url: "/about",
    siteName: "GEC Lakhisarai",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/gecl/images/campus-overview.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Campus View",
      },
    ],
  },
};

// --- DATA: NAVIGATION CARDS ---
const SECTIONS = [
  {
    title: "About the College",
    desc: "Explore our history, campus infrastructure, affiliation details, and our journey since 2019.",
    href: "/about/college",
    icon: LuHistory,
    color:
      "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    borderColor: "hover:border-blue-200",
  },
  {
    title: "Vision & Mission",
    desc: "Our strategic roadmap for academic excellence, innovation, and holistic student development.",
    href: "/about/vision-mission",
    icon: LuTarget,
    color:
      "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    borderColor: "hover:border-emerald-200",
  },
  {
    title: "Principal's Message",
    desc: "Inspirational words and future outlook from our Principal, Prof. (Dr.) Bimlesh Kumar.",
    href: "/about/principal-message",
    icon: LuUser,
    color:
      "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    borderColor: "hover:border-orange-200",
  },
  {
    title: "Administration",
    desc: "Meet the leadership team, Heads of Departments (HODs), and key administrative officials.",
    href: "/about/administration",
    icon: LuShield,
    color:
      "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    borderColor: "hover:border-purple-200",
  },
  {
    title: "Governing Body",
    desc: "The Board of Governors (BoG) that steers the institution's policies and quality standards.",
    href: "/about/governing-body",
    icon: LuUsers,
    color:
      "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
    borderColor: "hover:border-cyan-200",
  },
  {
    title: "Mandatory Disclosure",
    desc: "Official public disclosures, AICTE approvals, and compliance documents.",
    href: "/mandatory-disclosure",
    icon: LuAward,
    color:
      "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
    borderColor: "hover:border-rose-200",
  },
];

export default function AboutHubPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 overflow-x-hidden">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative bg-gecl-primary py-16 md:py-20 lg:py-28 overflow-hidden w-full">
        {/* Background Effects (Clipped to container) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f3a5f,#162e4d)]"></div>
        {/* Responsive Blobs: Smaller on mobile to prevent overflow */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gecl-accent/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gecl-secondary text-xs md:text-sm font-semibold mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gecl-accent animate-pulse"></span>
            Discover GEC Lakhisarai
          </div>

          {/* Responsive Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 tracking-tight leading-tight">
            Engineering the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gecl-secondary to-white">
              Future
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
            A center of technical excellence dedicated to nurturing innovation,
            ethics, and engineering skills in the heart of Bihar.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      {/* --- 3. STATS STRIP --- */}
      <div className="bg-white border-b border-slate-200 py-8 md:py-10">
        <div className="container mx-auto px-4">
          {/* Mobile: Grid 2x2, Desktop: Grid 4x1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:divide-x divide-slate-100">
            <StatItem number="2019" label="Year Established" />
            <StatItem number="5+" label="B.Tech Programs" />
            <StatItem number="1200+" label="Student Strength" />
            <StatItem number="100%" label="AICTE Approved" />
          </div>
        </div>
      </div>

      {/* --- 4. NAVIGATION GRID --- */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gecl-primary mb-4">
            Explore Our Institution
          </h2>
          <p className="text-slate-600 text-sm md:text-base px-2">
            Navigate through the pillars that make GEC Lakhisarai a leading
            technical institute.
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((section, idx) => (
            <Link
              key={idx}
              href={section.href}
              className={`group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full ${section.borderColor}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`p-3.5 rounded-xl transition-colors duration-300 ${section.color}`}
                >
                  <section.icon className="w-7 h-7" />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-100 group-hover:text-gecl-primary transition-colors">
                  <LuArrowRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3 group-hover:text-gecl-primary transition-colors">
                {section.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">
                {section.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* --- 5. "WHY CHOOSE US" SECTION --- */}
      <section className="bg-gecl-surface py-16 md:py-20 border-y border-gecl-border w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Image Side - Order 1 on Mobile */}
            <div className="w-full lg:w-1/2 relative order-1 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[4px] md:border-[6px] border-white aspect-video lg:aspect-auto lg:h-[400px]">
                <Image
                  src="/gecl/images/campus-overview.webp"
                  alt="GEC Campus Life"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gecl-primary/80 to-transparent flex items-end p-6">
                  <p className="text-white text-sm md:text-base font-medium italic">
                    "Empowering Bihar through Technology"
                  </p>
                </div>
              </div>

              {/* Floating Badge (Hidden on small mobile) */}
              <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white p-3 md:p-4 rounded-xl shadow-lg border border-slate-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <LuAward className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">
                      Affiliated With
                    </p>
                    <p className="text-sm md:text-base font-bold text-gecl-primary">
                      Bihar Engg. University
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side - Order 2 on Mobile */}
            <div className="w-full lg:w-1/2 order-2 lg:order-2">
              <span className="text-gecl-accent font-bold uppercase tracking-widest text-xs mb-2 block">
                Why Choose GEC
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-gecl-primary mb-4 md:mb-6">
                Excellence in Every Aspect
              </h2>
              <p className="text-slate-600 mb-8 text-base md:text-lg leading-relaxed">
                We provide a holistic environment that combines rigorous
                academics with practical exposure, ensuring our students are
                industry-ready.
              </p>

              <div className="grid gap-4 md:gap-6">
                <FeatureRow
                  icon={LuBuilding2}
                  title="State-of-the-Art Infrastructure"
                  desc="Smart classrooms, advanced labs, and a fully Wi-Fi enabled campus."
                />
                <FeatureRow
                  icon={LuGraduationCap}
                  title="Expert Faculty"
                  desc="Mentored by highly qualified professors recruited via BPSC."
                />
                <FeatureRow
                  icon={LuBookOpen}
                  title="Research & Innovation"
                  desc="Active encouragement for student projects, hackathons, and research papers."
                />
              </div>

              <div className="mt-8 md:mt-10">
                <Link
                  href="/admissions/how-to-apply"
                  className="inline-flex items-center gap-2 bg-gecl-primary text-white px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-semibold hover:bg-gecl-primary/90 hover:-translate-y-1 transition-all shadow-lg shadow-blue-900/20 text-sm md:text-base"
                >
                  Apply for Admission <LuArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center px-2">
      <div className="text-2xl md:text-4xl font-bold text-gecl-primary mb-1 font-display">
        {number}
      </div>
      <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 p-3 md:p-4 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
      <div className="flex-shrink-0 mt-1 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-gecl-primary">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold text-slate-800 mb-1 text-sm md:text-base">
          {title}
        </h3>
        <p className="text-slate-600 text-xs md:text-sm">{desc}</p>
      </div>
    </div>
  );
}
