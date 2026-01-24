import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuBuilding2,
  LuBookOpen,
  LuGraduationCap,
  LuMapPin,
  LuHistory,
  LuAward,
  LuWifi,
  LuCoffee,
  LuHouse,
  LuArrowRight,
} from "react-icons/lu";
import { FaBuildingColumns, FaMapLocationDot } from "react-icons/fa6";

// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  StatCard,
  FeatureItem,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "About College | GEC Lakhisarai | Legacy of Technical Excellence",
  description:
    "Established in 2019 under the 'Saat Nischay' program, GEC Lakhisarai is an AICTE-approved premier government institute affiliated with Bihar Engineering University (BEU).",
  keywords: [
    "About GEC Lakhisarai",
    "History of GEC Lakhisarai",
    "Best Government Engineering College Bihar",
    "Bihar Engineering University Affiliated Colleges",
    "GEC Lakhisarai Faculty",
  ],
};

export default function AboutCollegePage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-16">
      {/* 1. HERO SECTION */}
      <PageHero
        title="A Legacy of Technical Excellence"
        description="Government Engineering College, Lakhisarai is dedicated to fostering innovation and empowering the youth of Bihar with world-class technical education."
        badge="Estd. 2019 • AICTE Approved"
        image="/gecl/images/college-building-main.webp"
        className="bg-gecl-primary"
        themeColor="text-gecl-accent"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "About College" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4 space-y-16">
            {/* 1. INTRODUCTION & HISTORY */}
            <section id="history" className="scroll-mt-28">
              <SectionHeader title="Our History & Inception" icon={LuHistory} />

              <div className="prose prose-lg text-slate-600 max-w-none mb-10">
                <p className="leading-relaxed">
                  Government Engineering College (GEC), Lakhisarai was
                  established on <strong>25th September 2019</strong>. The
                  foundation stone was laid and the institution was inaugurated
                  by the Honorable Chief Minister of Bihar,
                  <strong> Shri Nitish Kumar</strong>.
                </p>

                <p className="leading-relaxed">
                  Created under the visionary <strong>"Saat Nischay"</strong>
                  (Seven Resolves) program of the Bihar Government, the college
                  operates under the Department of Science, Technology &
                  Technical Education (DSTTE). It is now proudly affiliated with
                  the <strong>Bihar Engineering University (BEU), Patna</strong>
                  .
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard number="2019" label="Established" variant="light" />
                <StatCard number="AICTE" label="Approved" variant="light" />
                <StatCard number="BEU" label="Affiliated" variant="light" />
                <StatCard number="360" label="Annual Intake" variant="light" />
              </div>
            </section>

            {/* 2. CAMPUS & INFRASTRUCTURE */}
            <section id="campus" className="scroll-mt-28">
              <SectionHeader title="Campus Infrastructure" icon={LuBuilding2} />

              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-10 group border-4 border-white">
                <Image
                  src="/gecl/images/college-building-main.webp"
                  alt="GEC Lakhisarai Campus View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <span className="inline-block px-3 py-1 bg-gecl-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                      Campus Main View
                    </span>
                    <h3 className="text-2xl font-bold">Shivsona Road Campus</h3>
                    <p className="opacity-90 flex items-center gap-2 text-sm mt-1">
                      <LuMapPin size={14} /> Kharsari, Chandwara, Lakhisarai
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FeatureItem
                  icon={LuBookOpen}
                  title="Central Library"
                  text="Equipped with 21,000+ volumes, NDL access, and digital journals. A dedicated study zone for 150+ students."
                />
                <FeatureItem
                  icon={LuWifi}
                  title="Fiber-Optic WiFi"
                  text="High-speed internet connectivity across all academic blocks and administrative centers for seamless research."
                />
                <FeatureItem
                  icon={LuHouse}
                  title="Residential Facility"
                  text="Separate high-security hostels for Boys and Girls with modern mess facilities and 24/7 power backup."
                />
                <FeatureItem
                  icon={LuCoffee}
                  title="Student Amenities"
                  text="Vibrant canteen, lush green grounds for sports, and specialized language labs for professional development."
                />
              </div>
            </section>

            {/* 3. ACADEMIC DEPARTMENTS */}
            <section id="departments" className="scroll-mt-28">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 shadow-inner">
                    <LuGraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      Departments & Intake
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Undergraduate B.Tech degree programs
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <th className="py-4 pr-4">B.Tech Specialization</th>
                        <th className="py-4 px-4 text-center">Annual Seats</th>
                        <th className="py-4 pl-4 text-right">
                          Key Faculty Lab
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 divide-y divide-slate-50">
                      <TableRow
                        name="Civil Engineering"
                        intake="120"
                        focus="Concrete Tech Lab"
                      />
                      <TableRow
                        name="Computer Science (AI)"
                        intake="60"
                        focus="NVIDIA GPU Lab"
                      />
                      <TableRow
                        name="Computer Science (Data Science)"
                        intake="60"
                        focus="Analytics Center"
                      />
                      <TableRow
                        name="Mechanical Engineering"
                        intake="60"
                        focus="Central Workshop"
                      />
                      <TableRow
                        name="Electrical Engineering"
                        intake="60"
                        focus="Power Systems Lab"
                      />
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400 italic">
                    * Current seat matrix approved by AICTE & BEU Patna.
                  </p>
                  <Link
                    href="/admissions/seat-intake"
                    className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    View Detailed Seat Matrix <LuArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </section>

            {/* 4. LOCATION MAP */}
            <section id="location" className="scroll-mt-28">
              <SectionHeader title="Reach Our Campus" icon={FaMapLocationDot} />

              <div className="bg-slate-200 rounded-3xl h-96 border-4 border-white shadow-xl relative overflow-hidden mt-8">
                <iframe
                  src="https://www.google.com/maps?q=Government%20Engineering%20College%20Lakhisarai&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="GEC Lakhisarai Location Map"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </section>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28 space-y-8">
              <SidebarNavigation
                title="About Section"
                links={[
                  { label: "About College", href: "/about/college" },
                  { label: "Administration", href: "/about/administration" },
                  { label: "Vision & Mission", href: "/about/vision-mission" },
                  { label: "Contact Us", href: "/contact" },
                ]}
              />

              <SidebarWidget
                title="College Leadership"
                variant="default"
                className="text-center"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 overflow-hidden border-2 border-gecl-accent relative">
                  <Image
                    src="/gecl/images/principal-bimlesh-kumar.webp"
                    alt="Dr. Bimlesh Kumar"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-slate-800">Dr. Bimlesh Kumar</h4>
                <p className="text-[10px] uppercase font-black text-slate-400 mb-4 tracking-widest">
                  Principal, GEC Lakhisarai
                </p>
                <Link
                  href="/about/principal-message"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
                >
                  Principal's Message <LuArrowRight size={12} />
                </Link>
              </SidebarWidget>

              <SidebarWidget title="Affiliation" variant="info">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <LuAward className="text-indigo-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        AICTE Approved
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Ministry of Education, GoI
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBuildingColumns className="text-indigo-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        BEU Affiliated
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Bihar Engineering University
                      </p>
                    </div>
                  </div>
                </div>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// --- LOCAL HELPER (Table Row) ---
function TableRow({
  name,
  intake,
  focus,
}: {
  name: string;
  intake: string;
  focus: string;
}) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="py-5 pr-4 font-bold text-slate-800 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-slate-100 group-hover:bg-indigo-500 rounded-full transition-colors"></div>
        {name}
      </td>
      <td className="py-5 px-4 text-center">
        <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-100">
          {intake}
        </span>
      </td>
      <td className="py-5 pl-4 text-right text-sm font-medium text-slate-500">
        {focus}
      </td>
    </tr>
  );
}
