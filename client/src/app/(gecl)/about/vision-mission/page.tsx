import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuTarget,
  LuCompass,
  LuLightbulb,
  LuUsers,
  LuBookOpen,
  LuBuilding2,
  LuGem,
  LuShieldCheck,
  LuLeaf,
  LuArrowRight,
  LuAward,
} from "react-icons/lu";
import { FaQuoteLeft } from "react-icons/fa6";

// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Vision & Mission | Our Guiding Principles | GEC Lakhisarai",
  description:
    "Discover the Vision and Mission of GEC Lakhisarai. Committed to technical excellence, innovation, and developing ethically strong engineers for Bihar and the nation.",
  keywords: [
    "GEC Lakhisarai Vision",
    "GEC Lakhisarai Mission",
    "Technical Education Bihar",
    "Engineering College Values",
    "Institutional Goals Lakhisarai",
  ],
};

export default function VisionMissionPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-20">
      {/* 1. HERO SECTION */}
      <PageHero
        title="Vision & Mission"
        description="Laying the foundation for a technically advanced and ethically strong society through excellence in engineering education."
        badge="Our Guiding Principles"
        icon={<LuCompass />}
        image="/gecl/images/campus/college-building.webp"
        className="bg-indigo-950"
        themeColor="text-indigo-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Vision & Mission" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* --- MAIN CONTENT --- */}
          <div className="lg:w-2/3 space-y-24">
            {/* 1. VISION SECTION */}
            <section id="vision" className="scroll-mt-28">
              <SectionHeader title="Our Vision" icon={LuTarget} />

              <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl mt-8 mb-10 border-4 border-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-900/60 to-transparent z-10"></div>
                <Image
                  src="/gecl/images/vision-future.webp"
                  alt="Vision of GEC Lakhisarai"
                  width={800}
                  height={450}
                  className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-10 md:p-16">
                  <FaQuoteLeft className="text-indigo-400/40 text-6xl mb-6" />
                  <p className="text-2xl md:text-4xl font-black text-white italic leading-tight tracking-tight">
                    To become a center of excellence in technical education,
                    fostering innovation and human values to empower students to
                    meet global challenges.
                  </p>
                </div>
              </div>

              <div className="prose prose-lg text-slate-600 border-l-4 border-indigo-600 pl-6 bg-white p-8 rounded-r-2xl shadow-sm">
                <p className="leading-relaxed">
                  At Government Engineering College, Lakhisarai, we envision a
                  future where our graduates are not just job seekers but job
                  creators. Established under the{" "}
                  <strong>Saat Nishchay Program</strong>
                  of the Bihar Government, our goal is to bridge the gap between
                  rural talent and global technology standards.
                </p>
              </div>
            </section>

            {/* 2. MISSION SECTION */}
            <section id="mission" className="scroll-mt-28">
              <SectionHeader title="Our Mission" icon={LuCompass} />

              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <MissionCard
                  icon={LuBookOpen}
                  title="Academic Excellence"
                  desc="To impart high-quality technical education through a diverse and intensive teaching-learning process that meets international standards."
                  variant="blue"
                />
                <MissionCard
                  icon={LuLightbulb}
                  title="Innovation & Research"
                  desc="To provide a dynamic environment that emphasizes open-ended design, problem-solving, and critical thinking skills."
                  variant="emerald"
                />
                <MissionCard
                  icon={LuUsers}
                  title="Social Responsibility"
                  desc="To develop socially responsible engineers who are committed to ethical practices and sustainable development."
                  variant="orange"
                />
                <MissionCard
                  icon={LuBuilding2}
                  title="Infrastructure"
                  desc="To provide state-of-the-art laboratories, workshops, and libraries that facilitate practical learning and skill development."
                  variant="indigo"
                />
              </div>
            </section>

            {/* 3. CORE VALUES SECTION */}
            <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

              <div className="relative z-10 text-center mb-12">
                <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
                  Foundation
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900">
                  Our Core Values
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                <ValueItem
                  icon={LuShieldCheck}
                  title="Integrity"
                  desc="Adherence to high moral standards."
                />
                <ValueItem
                  icon={LuGem}
                  title="Excellence"
                  desc="Continuous pursuit of quality."
                />
                <ValueItem
                  icon={LuLightbulb}
                  title="Innovation"
                  desc="Encouraging creative solutions."
                />
                <ValueItem
                  icon={LuAward}
                  title="Discipline"
                  desc="Consistency in conduct & study."
                />
                <ValueItem
                  icon={LuLeaf}
                  title="Sustainability"
                  desc="Commitment to environment."
                />
                <ValueItem
                  icon={LuUsers}
                  title="Inclusivity"
                  desc="Opportunities for all sectors."
                />
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="sticky top-28 space-y-8">
              <SidebarNavigation
                title="About Section"
                links={[
                  { label: "History of College", href: "/about/college" },
                  {
                    label: "Vision & Mission",
                    href: "/about/vision-mission",
                    active: true,
                  },
                  {
                    label: "Principal's Message",
                    href: "/about/principal-message",
                  },
                  { label: "Administration", href: "/about/administration" },
                ]}
              />

              <SidebarWidget title="Institutional Pledge" variant="default">
                <div className="text-center p-4">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "We pledge to uphold the dignity of our profession and
                    contribute to the growth of Bihar through innovation and
                    hard work."
                  </p>
                  <div className="w-10 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
                </div>
              </SidebarWidget>

              <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
                <h4 className="text-xl font-bold mb-4 relative z-10">
                  Join Our Mission
                </h4>
                <p className="text-indigo-200 text-sm mb-6 relative z-10">
                  Be a part of a community that is redefining technical
                  education in Bihar.
                </p>
                <Link
                  href="/admissions/how-to-apply"
                  className="inline-flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-lg"
                >
                  Apply Now <LuArrowRight size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// --- LOCAL HELPERS ---

function MissionCard({ icon: Icon, title, desc, variant }: any) {
  const themes = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
  };
  const currentTheme = themes[variant as keyof typeof themes];

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group h-full">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 shadow-inner ${currentTheme}`}
      >
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-black text-slate-800 mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ValueItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="group text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="p-3 bg-slate-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-base mb-1">{title}</h4>
          <p className="text-xs text-slate-500 leading-snug">{desc}</p>
        </div>
      </div>
    </div>
  );
}
