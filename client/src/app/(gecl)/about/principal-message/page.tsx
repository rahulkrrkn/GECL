import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuQuote,
  LuGraduationCap,
  LuTarget,
  LuHistory,
  LuBuilding2,
  LuPhone,
  LuMail,
  LuChevronRight,
} from "react-icons/lu";

// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Principal's Message | GEC Lakhisarai | Leading Technical Education",
  description:
    "Read the inspiring message from Prof. (Dr.) Bimlesh Kumar, Principal of GEC Lakhisarai. Discover our vision for technical education and student excellence in Bihar.",
  keywords: [
    "Principal Message GEC Lakhisarai",
    "Dr. Bimlesh Kumar Principal",
    "Best Engineering College Bihar",
    "GEC Lakhisarai Vision",
  ],
};

export default function PrincipalMessagePage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-20">
      {/* 1. HERO SECTION */}
      <PageHero
        title="Principal's Message"
        description="Leading GEC Lakhisarai towards a future of innovation, discipline, and academic brilliance."
        badge="From the Principal's Desk"
        icon={<LuQuote />}
        image="/gecl/images/campus/college-building.webp"
        className="bg-gecl-primary"
        themeColor="text-gecl-accent"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Principal's Message" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT AREA --- */}
          <article className="lg:w-2/3">
            {/* Principal Identity Card */}
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 mb-12">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative h-80 md:h-auto">
                  <Image
                    src="/gecl/images/principal-bimlesh-kumar.webp"
                    alt="Prof. (Dr.) Bimlesh Kumar"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gecl-primary/60 to-transparent md:bg-gradient-to-r"></div>
                </div>
                <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center bg-slate-50/50">
                  <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">
                    Prof. (Dr.) Bimlesh Kumar
                  </h2>
                  <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-6">
                    Principal, GEC Lakhisarai
                  </p>

                  <div className="space-y-4">
                    <a
                      href="mailto:principalgeclakhisarai@gmail.com"
                      className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors text-sm"
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <LuMail size={16} />
                      </div>
                      principalgeclakhisarai@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* The Message Body */}
            <div className="prose prose-lg prose-slate max-w-none">
              <div className="relative mb-12">
                <LuQuote className="absolute -left-4 -top-8 text-8xl text-indigo-100 -z-10" />
                <p className="text-2xl font-serif italic text-slate-800 leading-relaxed pt-4">
                  "Welcome to Government Engineering College, Lakhisarai. It is
                  my privilege to lead this premier institution which was
                  inaugurated by the Hon'ble Chief Minister Sri Nitish Kumar in
                  2019."
                </p>
              </div>

              <p>
                As an institute operating under the Department of Science,
                Technology & Technical Education, Government of Bihar, and
                affiliated with{" "}
                <strong>Bihar Engineering University (BEU), Patna</strong>, we
                are committed to providing quality technical education that is
                accessible and impactful.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                  <LuTarget size={20} />
                </span>
                Our Vision for Students
              </h3>

              <p>
                In the rapidly evolving world of Industry 4.0, technical
                knowledge alone is not enough. My vision for GEC Lakhisarai is
                to create a holistic ecosystem where:
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-3 text-sm">
                  <LuGraduationCap className="text-indigo-600 shrink-0 mt-1" />
                  We develop technical manpower that meets international
                  standards.
                </li>
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-3 text-sm">
                  <LuBuilding2 className="text-indigo-600 shrink-0 mt-1" />
                  Students are trained through immersive practical sessions in
                  modern labs.
                </li>
              </ul>

              {/* --- EVENT PHOTOS --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12 not-prose">
                <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src="/gecl/images/principal-event-1.webp"
                    alt="Principal addressing students"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white font-bold text-sm">
                      Addressing the Student Body
                    </p>
                  </div>
                </div>
                <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src="/gecl/images/principal-event-2.webp"
                    alt="Campus Inspection"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white font-bold text-sm">
                      Ensuring Infrastructure Excellence
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">
                A Call to Action
              </h3>
              <p>
                To my dear students, college life is the golden period of your
                journey. The infrastructure we have built—from our 21,000+ books
                in the library to our specialized language labs—is designed
                solely for your growth.
              </p>
              <p className="mb-10">
                I urge you to participate actively in our technical clubs,
                maintain 75% attendance, and respect the discipline of this
                institution. Let us work together to make GEC Lakhisarai a
                beacon of knowledge in Bihar.
              </p>

              {/* Final Signed Quote */}
              <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                <LuQuote className="absolute right-4 bottom-4 text-9xl text-white/5 rotate-12" />
                <p className="text-xl md:text-2xl font-serif italic mb-8 relative z-10 leading-relaxed">
                  "We are not just building engineers; we are building the
                  nation builders of tomorrow. I invite all parents and students
                  to join us in this journey of excellence."
                </p>
                <div className="flex items-center gap-6">
                  <div className="h-px w-12 bg-gecl-accent"></div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tighter">
                      Prof. (Dr.) Bimlesh Kumar
                    </h4>
                    <p className="text-xs text-indigo-300 font-bold uppercase tracking-widest">
                      Principal, GEC Lakhisarai
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-8">
              <SidebarNavigation
                title="About GEC"
                links={[
                  { label: "History of College", href: "/about/college" },
                  {
                    label: "Principal's Message",
                    href: "/about/principal-message",
                    active: true,
                  },
                  { label: "Administration", href: "/about/administration" },
                  { label: "Vision & Mission", href: "/about/vision-mission" },
                ]}
              />

              <SidebarWidget title="Quick Support" variant="info">
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    For academic or administrative queries, reach out to the
                    office.
                  </p>
                  <a
                    href="tel:+916346290000"
                    className="flex items-center gap-3 text-indigo-700 font-bold hover:underline"
                  >
                    <LuPhone size={18} /> 06346-29xxxx
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                  >
                    Visit Office <LuChevronRight size={14} />
                  </Link>
                </div>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
