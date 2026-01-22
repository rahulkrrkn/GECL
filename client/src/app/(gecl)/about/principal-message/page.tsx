import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/gecl/components/ui";
import {
  LuQuote,
  LuGraduationCap,
  LuTarget,
  LuHistory,
  LuBuilding2,
  LuPhone,
} from "react-icons/lu";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Principal's Message | Government Engineering College, Lakhisarai",
  description:
    "Read the inspiring message from Prof. (Dr.) Bimlesh Kumar, Principal of GEC Lakhisarai. Discover our vision for technical education and student excellence in Bihar.",
  keywords: [
    "Principal Message GEC Lakhisarai",
    "Dr. Bimlesh Kumar Principal",
    "Government Engineering College Lakhisarai Administration",
    "Best Engineering College Bihar",
    "GEC Lakhisarai Vision",
  ],
  openGraph: {
    title: "Principal's Message | GEC Lakhisarai",
    description:
      "Welcome note from the Principal of Government Engineering College, Lakhisarai.",
    url: "https://www.geclakhisarai.ac.in/about/principal-message",
    type: "article",
    images: [
      {
        url: "/gecl/images/principal-bimlesh-kumar.webp",
        width: 1200,
        height: 630,
        alt: "Prof. (Dr.) Bimlesh Kumar, Principal GEC Lakhisarai",
      },
    ],
  },
};

export default function PrincipalMessagePage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gecl-primary text-white py-16 lg:py-24 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 tracking-tight">
            Principal's Message
          </h1>
          <div className="w-24 h-1 bg-gecl-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl mx-auto">
            Guiding the future of engineering at GEC Lakhisarai with innovation,
            discipline, and excellence.
          </p>
        </div>
      </section>

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Principal's Message" },
        ]}
      />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT AREA --- */}
          <main className="lg:w-2/3">
            {/* Principal Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border-t-4 border-gecl-accent transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Principal Photo */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 group">
                  <div className="absolute inset-0 bg-gecl-primary rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <Image
                    src="/gecl/images/principal-bimlesh-kumar.webp"
                    alt="Prof. (Dr.) Bimlesh Kumar"
                    fill
                    className="object-cover rounded-xl border-4 border-white shadow-lg"
                    priority
                  />
                </div>

                {/* Name & Designation */}
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gecl-primary mb-2">
                    Prof. (Dr.) Bimlesh Kumar
                  </h2>
                  <p className="text-lg font-medium text-gecl-accent mb-4">
                    Principal, Government Engineering College, Lakhisarai
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6 italic">
                    "Education is the most powerful weapon which you can use to
                    change the world. At GEC Lakhisarai, we strive to equip our
                    students with this weapon."
                  </p>

                  {/* Contact Button */}
                  <div className="flex justify-center md:justify-start">
                    <a
                      href="mailto:principalgeclakhisarai@gmail.com"
                      className="px-6 py-2.5 bg-slate-100 hover:bg-gecl-primary hover:text-white text-slate-700 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                    >
                      Email Principal
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* The Message Content */}
            <article className="prose prose-lg prose-slate max-w-none">
              <p className="lead text-xl text-slate-700 border-l-4 border-gecl-primary pl-6 py-2 mb-8 bg-slate-50/50 rounded-r-lg">
                "Welcome to Government Engineering College, Lakhisarai. It is my
                privilege to lead this premier institution which was inaugurated
                by the Hon'ble Chief Minister Sri Nitish Kumar in 2019."
              </p>

              <p>
                As an institute operating under the Department of Science,
                Technology & Technical Education, Government of Bihar, and
                affiliated with{" "}
                <Link
                  href="https://beu-bih.ac.in/"
                  target="_blank"
                  rel="nofollow"
                  className="text-gecl-primary font-medium underline decoration-dotted"
                >
                  Bihar Engineering University
                </Link>{" "}
                (formerly AKU), we are committed to providing quality technical
                education.
              </p>

              <h3 className="text-2xl font-bold text-gecl-primary mt-10 mb-4 flex items-center gap-2">
                <LuTarget className="w-6 h-6 text-gecl-accent" /> Our Vision &
                Mission
              </h3>
              <p>
                In the rapidly evolving world of Industry 4.0, technical
                knowledge alone is not enough. My vision for GEC Lakhisarai is
                to create a holistic ecosystem where:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6 marker:text-gecl-accent">
                <li>
                  We develop technical manpower that meets international
                  standards.
                </li>
                <li>
                  Students are trained not just in theory, but in practical
                  applications through our modern laboratories.
                </li>
                <li>
                  We foster discipline, ethics, and a spirit of innovation in
                  every engineer we graduate.
                </li>
              </ul>

              {/* --- PHOTO GRID --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10 not-prose">
                <div className="relative h-56 rounded-xl overflow-hidden shadow-md group">
                  <Image
                    src="/gecl/images/principal-event-1.webp"
                    alt="Principal addressing Annual Tech Fest"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-4">
                    <p className="text-white text-sm font-semibold translate-y-2 group-hover:translate-y-0 transition-transform">
                      Addressing Students
                    </p>
                  </div>
                </div>
                <div className="relative h-56 rounded-xl overflow-hidden shadow-md group">
                  <Image
                    src="/gecl/images/principal-event-2.webp"
                    alt="Principal inspecting Civil Engineering Labs"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-4">
                    <p className="text-white text-sm font-semibold translate-y-2 group-hover:translate-y-0 transition-transform">
                      Campus Inspection
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gecl-primary mt-10 mb-4 flex items-center gap-2">
                <LuGraduationCap className="w-6 h-6 text-gecl-accent" /> Message
                to Future Engineers
              </h3>
              <p>
                To my dear students, college life is the golden period of your
                life. The infrastructure we have built—from our 21,000+ books in
                the library to our specialized language labs—is for your growth.
              </p>
              <p>
                I urge you to participate actively in our{" "}
                <Link
                  href="/campus/clubs"
                  className="text-gecl-primary font-medium hover:underline"
                >
                  technical clubs
                </Link>
                , maintain 75% attendance, and respect the discipline of this
                institution. Let us work together to make GEC Lakhisarai a
                beacon of knowledge in Bihar.
              </p>

              <div className="mt-12 p-8 bg-gecl-secondary/20 rounded-2xl border border-gecl-secondary relative">
                <LuQuote className="absolute top-4 left-4 text-5xl text-gecl-primary/10" />
                <p className="font-serif text-lg text-slate-800 mb-6 relative z-10 italic">
                  "We are not just building engineers; we are building the
                  nation builders of tomorrow. I invite all parents and students
                  to join us in this journey of excellence."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-gecl-accent"></div>
                  <div className="font-bold text-gecl-primary">
                    Prof. (Dr.) Bimlesh Kumar <br />
                    <span className="text-sm font-normal text-slate-500">
                      Principal, GEC Lakhisarai
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </main>

          {/* --- SIDEBAR NAVIGATION --- */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="sticky top-24">
              {/* Navigation Widget */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-gecl-primary p-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <LuBuilding2 className="text-gecl-secondary" />
                    About Our College
                  </h3>
                </div>
                <nav className="p-2 flex flex-col gap-1">
                  <SidebarLink
                    href="/about/college"
                    icon={LuHistory}
                    label="History of GEC"
                  />
                  <SidebarLink
                    href="/about/principal-message"
                    icon={LuQuote}
                    label="Principal's Message"
                    active
                  />
                  <SidebarLink
                    href="/about/vision-mission"
                    icon={LuTarget}
                    label="Vision & Mission"
                  />
                  <SidebarLink
                    href="/about/administration"
                    icon={LuGraduationCap}
                    label="Administration"
                  />
                  <SidebarLink
                    href="/contact"
                    icon={LuPhone}
                    label="Contact Principal's Office"
                  />
                </nav>
              </div>

              {/* Info Widget */}
              <div className="bg-linear-to-br from-slate-50 to-white rounded-xl shadow-lg border border-slate-100 p-6 mt-6">
                <h4 className="font-bold text-gecl-primary mb-4">
                  Quick Facts
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Established</span>
                    <span className="font-semibold text-slate-800">2019</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Affiliation</span>
                    <span className="font-semibold text-slate-800">
                      BEU, Patna
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Approval</span>
                    <span className="font-semibold text-slate-800">AICTE</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Sidebar Links
function SidebarLink({ href, icon: Icon, label, active = false }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-gecl-primary text-white shadow-md transform scale-[1.02]"
          : "text-slate-600 hover:bg-slate-50 hover:text-gecl-primary"
      }`}
    >
      <Icon
        className={`w-5 h-5 ${active ? "text-gecl-secondary" : "text-slate-400"}`}
      />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
