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
  LuUser,
} from "react-icons/lu";

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
  title: "About College | Government Engineering College, Lakhisarai",
  description:
    "Established in 2019, GEC Lakhisarai is a premier AICTE-approved government institute affiliated with Bihar Engineering University, offering B.Tech in CSE, Civil, Mechanical, and Electrical Engineering.",
  keywords: [
    "About GEC Lakhisarai",
    "History of GEC Lakhisarai",
    "Best Government Engineering College Bihar",
    "B.Tech Admission Lakhisarai",
    "GEC Lakhisarai Infrastructure",
    "Bihar Engineering University Affiliated Colleges",
  ],
  openGraph: {
    title: "About Government Engineering College, Lakhisarai",
    description:
      "Discover our journey from 2019 to becoming a center of technical excellence in Bihar.",
    url: "https://www.geclakhisarai.ac.in/about/college",
    type: "website",
    images: [
      {
        url: "/gecl/images/college-building-main.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Administrative Building",
      },
    ],
  },
};

export default function AboutCollegePage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. REUSABLE HERO SECTION */}
      <PageHero
        title="A Legacy of Technical Excellence"
        description="Government Engineering College, Lakhisarai is dedicated to fostering innovation and empowering the youth of Bihar with world-class technical education."
        badge="Estd. 2019 • AICTE Approved"
        image="/gecl/images/college-building-main.webp"
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

              <div className="prose prose-lg text-slate-600 max-w-none">
                <p>
                  Government Engineering College (GEC), Lakhisarai was
                  established on <strong>25th September 2019</strong>. The
                  foundation stone was laid and the institution was inaugurated
                  by the Honorable Chief Minister of Bihar,{" "}
                  <strong>Shri Nitish Kumar</strong>.
                </p>
                <p>
                  Created under the visionary <strong>"Saat Nischay"</strong>{" "}
                  (Seven Resolves) program of the Bihar Government, the college
                  operates under the Department of Science, Technology &
                  Technical Education. While initially affiliated with
                  Aryabhatta Knowledge University (AKU), it is now proudly
                  affiliated with the newly formed{" "}
                  <strong>Bihar Engineering University (BEU), Patna</strong>.
                </p>
              </div>

              {/* Quick Stats Grid using Reusable StatCard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard number="2019" label="Established" variant="light" />
                <StatCard number="AICTE" label="Approved" variant="light" />
                <StatCard number="BEU" label="Affiliated" variant="light" />
                <StatCard number="300+" label="Intake/Year" variant="light" />
              </div>
            </section>

            {/* 2. CAMPUS & INFRASTRUCTURE */}
            <section id="campus" className="scroll-mt-28">
              <SectionHeader title="Campus Infrastructure" icon={LuBuilding2} />

              <div className="relative h-100 rounded-2xl overflow-hidden shadow-xl mb-8 group">
                <Image
                  src="/gecl/images/college-building-main.webp"
                  alt="GEC Lakhisarai Campus View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">Shivsona Road Campus</h3>
                    <p className="opacity-90">Located in Kharsari, Chandwara</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FeatureItem
                  icon={LuBookOpen}
                  title="Central Library"
                  text="Home to over 21,000+ technical books, digital journals, and a spacious reading room with Wi-Fi connectivity."
                />
                <FeatureItem
                  icon={LuWifi}
                  title="Smart Campus"
                  text="High-speed internet access across academic blocks, administrative buildings, and computer centers."
                />
                <FeatureItem
                  icon={LuHouse}
                  title="Hostels"
                  text="Separate, secure hostels for Boys and Girls with mess facilities, ensuring a comfortable stay for outstation students."
                />
                <FeatureItem
                  icon={LuCoffee}
                  title="Student Amenities"
                  text="Includes a canteen, common rooms, sports grounds, and language labs for soft-skills training."
                />
              </div>
            </section>

            {/* 3. ACADEMIC DEPARTMENTS */}
            <section
              id="departments"
              className="scroll-mt-28 bg-white p-8 rounded-2xl border border-slate-100 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <LuGraduationCap className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gecl-primary">
                  Departments & Intake
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-100 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 pr-4">Course Name (B.Tech)</th>
                      <th className="py-4 px-4 text-center">Annual Intake</th>
                      <th className="py-4 px-4">Focus Areas</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 divide-y divide-slate-100">
                    <TableRow
                      name="Civil Engineering"
                      intake="120"
                      focus="Structural, Geotechnical, Surveying"
                    />
                    <TableRow
                      name="Computer Science (Data Science)"
                      intake="60"
                      focus="Big Data, Analytics, Python"
                    />
                    <TableRow
                      name="Computer Science (AI)"
                      intake="60"
                      focus="Neural Networks, Robotics, AI"
                    />
                    <TableRow
                      name="Mechanical Engineering"
                      intake="60"
                      focus="Thermodynamics, CAD/CAM"
                    />
                    <TableRow
                      name="Electrical Engineering"
                      intake="60"
                      focus="Power Systems, Circuits, IoT"
                    />
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-500 italic">
                * Intake figures based on AICTE approval.
              </p>
            </section>

            {/* 4. LOCATION MAP */}
            <section id="location" className="scroll-mt-28">
              <SectionHeader title="Location" icon={LuMapPin} />

              <div className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center border border-slate-200 relative overflow-hidden">
                {/* Embed Google Map here in production */}
                <iframe
                  title="Government Engineering College Lakhisarai Location"
                  src="https://www.google.com/maps?q=Government%20Engineering%20College%20Lakhisarai&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />

                <iframe
                  src="https://www.google.com/maps?q=Government%20Engineering%20College%20Lakhisarai&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="GEC Lakhisarai Location"
                  className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
              <p className="mt-4 flex items-start gap-2 text-slate-600">
                <LuMapPin className="w-5 h-5 text-gecl-accent flex-shrink-0 mt-1" />
                <span>
                  <strong>Address:</strong> Shivsona Road, Kharsari, Chandwara,
                  Dist: Lakhisarai, Bihar - 811306
                </span>
              </p>
            </section>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* 2. REUSABLE SIDEBAR NAVIGATION */}
              <SidebarNavigation
                title="In This Section"
                links={[
                  { label: "History & Inception", href: "#history" },
                  { label: "Campus & Infrastructure", href: "#campus" },
                  { label: "Departments", href: "#departments" },
                  { label: "Location Map", href: "#location" },
                ]}
              />

              {/* 3. REUSABLE SIDEBAR WIDGET (Principal) */}
              <SidebarWidget
                title="Principal"
                variant="default"
                className="text-center p-0"
              >
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden border-2 border-gecl-accent mt-2">
                  <Image
                    src="/gecl/images/principal-bimlesh-kumar.webp"
                    alt="Principal"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="font-bold text-gecl-primary">
                  Dr. Bimlesh Kumar
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Principal, GEC Lakhisarai
                </p>
                <Link
                  href="/about/principal-message"
                  className="text-sm font-semibold text-gecl-accent hover:underline"
                >
                  Read Message →
                </Link>
              </SidebarWidget>

              {/* 4. REUSABLE SIDEBAR WIDGET (AICTE) */}
              <SidebarWidget
                title={
                  <div className="flex items-center gap-2 text-blue-800">
                    <LuAward className="w-5 h-5" /> Approved By
                  </div>
                }
                variant="info"
              >
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-900">AICTE</p>
                  <p className="text-xs text-blue-600">New Delhi</p>
                </div>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>
    </div>
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
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="py-4 pr-4 font-medium text-slate-800">{name}</td>
      <td className="py-4 px-4 text-center">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
          {intake}
        </span>
      </td>
      <td className="py-4 px-4 text-sm text-slate-500">{focus}</td>
    </tr>
  );
}
