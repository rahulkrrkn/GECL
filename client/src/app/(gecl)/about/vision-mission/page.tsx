import type { Metadata } from "next";
import Image from "next/image";
import {
  LuTarget,
  LuCompass,
  LuLightbulb,
  LuUsers,
  LuBookOpen,
  LuBuilding2,
} from "react-icons/lu";

// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  FeatureItem,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Vision & Mission | Government Engineering College, Lakhisarai",
  description:
    "Explore the Vision and Mission of GEC Lakhisarai. We are committed to providing quality technical education, fostering innovation, and developing socially responsible engineers.",
  keywords: [
    "GEC Lakhisarai Vision",
    "GEC Lakhisarai Mission",
    "Engineering College Bihar Values",
    "Technical Education Lakhisarai",
    "GEC Vision Statement",
  ],
  openGraph: {
    title: "Vision & Mission | GEC Lakhisarai",
    description:
      "Our roadmap to excellence in technical education and nation-building.",
    url: "https://www.geclakhisarai.ac.in/about/vision-mission",
    type: "website",
    images: [
      {
        url: "/gecl/images/campus-overview.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Campus Vision",
      },
    ],
  },
};

export default function VisionMissionPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. REUSABLE HERO SECTION */}
      <PageHero
        title="Vision & Mission"
        description="Laying the foundation for a technically advanced and ethically strong society through excellence in engineering education."
        badge="Our Guiding Principles"
        // Optional: Add a subtle background image if available
        // image="/gecl/images/vision-bg.webp"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Vision & Mission" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-2/3 space-y-20">
            {/* 1. VISION SECTION */}
            <section id="vision" className="scroll-mt-28">
              <SectionHeader title="Our Vision" icon={LuTarget} />

              <div className="relative group rounded-2xl overflow-hidden shadow-2xl mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-gecl-primary/90 to-gecl-primary/40 z-10"></div>
                <Image
                  src="/gecl/images/vision-future.webp"
                  alt="Future of Engineering at GEC Lakhisarai"
                  width={800}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center p-8 text-center">
                  <p className="text-2xl md:text-3xl font-serif text-white font-medium italic leading-relaxed">
                    "To become a center of excellence in technical education,
                    fostering innovation, research, and human values to empower
                    students to meet global challenges."
                  </p>
                </div>
              </div>

              <div className="prose prose-lg text-slate-600">
                <p>
                  At Government Engineering College, Lakhisarai, we envision a
                  future where our graduates are not just job seekers but job
                  creators. Established under the{" "}
                  <strong>Saat Nishchay Program</strong> of the Bihar
                  Government, our goal is to bridge the gap between rural talent
                  and global technology standards.
                </p>
              </div>
            </section>

            {/* 2. MISSION SECTION */}
            <section id="mission" className="scroll-mt-28">
              <SectionHeader title="Our Mission" icon={LuCompass} />

              <div className="grid md:grid-cols-2 gap-6">
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
                  variant="green"
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
                  variant="purple"
                />
              </div>
            </section>

            {/* 3. CORE VALUES IMAGE BREAK */}
            <section className="relative h-96 rounded-3xl overflow-hidden shadow-2xl my-12">
              <Image
                src="/gecl/images/values-community.webp"
                alt="Community and Values at GEC Lakhisarai"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gecl-primary/80 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Core Values
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    "Integrity",
                    "Excellence",
                    "Innovation",
                    "Discipline",
                    "Sustainability",
                  ].map((val) => (
                    <span
                      key={val}
                      className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium transition-transform hover:scale-105"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* --- SIDEBAR NAVIGATION --- */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="sticky top-24">
              {/* 2. REUSABLE SIDEBAR NAVIGATION */}
              <SidebarNavigation
                title="About GEC Lakhisarai"
                links={[
                  { label: "History", href: "/about/college" },
                  { label: "Vision & Mission", href: "/about/vision-mission" },
                  {
                    label: "Principal's Message",
                    href: "/about/principal-message",
                  },
                  { label: "Administration", href: "/about/administration" },
                ]}
              />

              {/* Quick Contact Widget (Using standard SidebarWidget pattern if desired, or custom as below for CTA) */}
              <div className="bg-gecl-surface rounded-2xl shadow-lg border border-gecl-border p-6">
                <h4 className="font-bold text-gecl-primary mb-2">
                  Join Our Journey
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Be a part of Bihar's growing technical ecosystem.
                </p>
                <a
                  href="/admissions/apply"
                  className="block w-full text-center py-3 bg-gecl-accent hover:bg-orange-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-orange-900/20"
                >
                  Apply for Admission
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// --- LOCAL HELPER COMPONENT (Mission Card) ---
interface MissionCardProps {
  icon: any;
  title: string;
  desc: string;
  variant: "blue" | "green" | "orange" | "purple";
}

function MissionCard({ icon: Icon, title, desc, variant }: MissionCardProps) {
  const styles = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      groupHover: "group-hover:bg-blue-600 group-hover:text-white",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      groupHover: "group-hover:bg-green-600 group-hover:text-white",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      groupHover: "group-hover:bg-orange-600 group-hover:text-white",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      groupHover: "group-hover:bg-purple-600 group-hover:text-white",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:border-gecl-primary/20 group h-full">
      <div
        className={`w-14 h-14 ${currentStyle.bg} rounded-full flex items-center justify-center ${currentStyle.text} mb-6 transition-all duration-300 ${currentStyle.groupHover}`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-gecl-primary transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
