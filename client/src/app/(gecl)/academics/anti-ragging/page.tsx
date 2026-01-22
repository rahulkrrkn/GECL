import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuShieldAlert,
  LuPhone,
  LuMail,
  LuGavel,
  LuFileWarning,
  LuDownload,
  LuUsers,
  LuExternalLink,
  LuMegaphone,
  LuHeartHandshake,
} from "react-icons/lu";
import { FaExclamationTriangle } from "react-icons/fa";

// Import Reusable Components
import {
  Breadcrumb,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
  FeatureItem,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Anti-Ragging Policy | Government Engineering College, Lakhisarai",
  description:
    "Zero Tolerance towards ragging. View GEC Lakhisarai's Anti-Ragging Committee details, helpline numbers, and UGC regulations.",
  keywords: [
    "Anti-Ragging GEC Lakhisarai",
    "UGC Anti-Ragging Helpline",
    "Ragging Complaint Bihar",
    "GEC Anti-Ragging Committee",
    "Zero Tolerance Policy",
  ],
  openGraph: {
    title: "Anti-Ragging Policy | GEC Lakhisarai",
    description: "Say NO to Ragging. We are a ragging-free campus.",
    url: "/academics/anti-ragging",
    type: "website",
    images: [
      {
        url: "/gecl/images/anti-ragging-poster.webp",
        width: 1200,
        height: 630,
        alt: "Stop Ragging Campaign",
      },
    ],
  },
};

// --- COMMITTEE DATA ---
const COMMITTEE_MEMBERS = [
  {
    id: 1,
    name: "Prof. (Dr.) Bimlesh Kumar",
    designation: "Principal",
    role: "Chairman",
    phone: "9431XXXXXX",
  },
  {
    id: 2,
    name: "Prof. Manish Kumar Mandal",
    designation: "HOD, Civil Engg.",
    role: "Convener",
    phone: "9123XXXXXX",
  },
  {
    id: 3,
    name: "Prof. Phool Kumari",
    designation: "HOD, CSE",
    role: "Member",
    phone: "8210XXXXXX",
  },
  {
    id: 4,
    name: "Dr. Vijay Kumar",
    designation: "Chief Warden",
    role: "Member",
    phone: "7870XXXXXX",
  },
  {
    id: 5,
    name: "Prof. Krishna Raj",
    designation: "Warden (Boys)",
    role: "Member",
    phone: "9934XXXXXX",
  },
  {
    id: 6,
    name: "SHO, Lakhisarai",
    designation: "Police Station In-charge",
    role: "External Member",
    phone: "06346-XXXXXX",
  },
];

export default function AntiRaggingPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* --- HERO SECTION (Kept Original Red Theme as requested) --- */}
      <section className="relative bg-red-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#991b1b,#7f1d1d)]"></div>
        {/* Warning Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #222 25%, #222 75%, #000 75%, #000)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/50 border border-red-400/50 text-red-100 text-sm font-bold mb-6 backdrop-blur-md">
            <LuShieldAlert className="w-4 h-4" />
            Zero Tolerance Policy
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 tracking-tight uppercase">
            Anti-Ragging Cell
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto font-medium">
            Ragging is a crime. GEC Lakhisarai is committed to keeping the
            campus ragging-free.
          </p>
        </div>
      </section>

      {/* Reusable Breadcrumb */}
      <div className="sticky top-[64px] z-30 w-full">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Academics", href: "/academics" },
            { label: "Anti-Ragging" },
          ]}
        />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4 space-y-16">
            {/* 1. WHAT IS RAGGING? */}
            <section id="definition" className="scroll-mt-28">
              <SectionHeader
                title="What Constitutes Ragging?"
                icon={FaExclamationTriangle}
              />

              <div className="prose prose-slate max-w-none text-slate-600 mb-8">
                <p className="lead border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
                  According to the UGC Regulation on Curbing the Menace of
                  Ragging in Higher Educational Institutions, 2009, ragging
                  constitutes one or more of any of the following acts:
                </p>
              </div>

              {/* Using FeatureItem for definitions for cleaner look */}
              <div className="grid md:grid-cols-2 gap-4">
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  text="Any conduct by any student whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student."
                />
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  text="Indulging in rowdy or undisciplined activities which causes or is likely to cause annoyance, hardship, physical or psychological harm or to raise fear."
                />
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  text="Asking any student to do any act which such student will not in the ordinary course do and which has the effect of causing shame or embarrassment."
                />
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  text="Any act that prevents, disrupts or disturbs the regular academic activity of a student."
                />
              </div>
            </section>

            {/* 2. NEW PHOTO SECTION (Campus Harmony) */}
            <section className="relative h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
              <Image
                src="/gecl/images/students-harmony.webp"
                alt="Students bonding on GEC Campus"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-transparent flex items-center p-8">
                <div className="text-white max-w-md">
                  <div className="flex items-center gap-2 mb-3 text-red-200 font-bold uppercase tracking-wider text-xs">
                    <LuHeartHandshake className="w-5 h-5" /> Campus Harmony
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-display">
                    Build Bonds, Not Barriers
                  </h3>
                  <p className="text-sm text-red-100 leading-relaxed">
                    GEC Lakhisarai encourages a culture of friendship and
                    mentorship. Seniors are expected to guide freshers, not
                    harass them. Together, we build a family.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. PUNISHMENTS */}
            <section id="punishments" className="scroll-mt-28">
              <SectionHeader
                title="Punishments & Consequences"
                icon={LuGavel}
              />

              <div className="bg-slate-900 text-slate-300 rounded-xl p-8 relative overflow-hidden shadow-xl">
                {/* Background Blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <h3 className="text-white text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
                  <LuFileWarning className="text-red-500" />
                  Possible Disciplinary Actions:
                </h3>

                <div className="grid md:grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-3">
                    <PunishmentItem text="Suspension from attending classes and academic privileges." />
                    <PunishmentItem text="Withholding/withdrawing scholarship/fellowship and other benefits." />
                    <PunishmentItem text="Debarring from appearing in any test/examination." />
                  </div>
                  <div className="space-y-3">
                    <PunishmentItem text="Cancellation of admission." />
                    <PunishmentItem text="Rustication from the institution for 1 to 4 semesters." />
                    <PunishmentItem text="Filing of First Information Report (FIR) with the police." />
                  </div>
                </div>
              </div>
            </section>

            {/* 4. COMMITTEE */}
            <section id="committee" className="scroll-mt-28">
              <SectionHeader title="Anti-Ragging Committee" icon={LuUsers} />

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Designation</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {COMMITTEE_MEMBERS.map((member) => (
                        <tr
                          key={member.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-bold text-slate-700">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {member.designation}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${member.role === "Chairman" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}
                            >
                              {member.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-slate-600">
                            {member.phone}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 5. ONLINE AFFIDAVIT */}
            <section id="affidavit" className="scroll-mt-28">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="p-4 bg-white rounded-full shadow-md text-blue-600">
                  <LuDownload className="w-8 h-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    Mandatory Online Affidavit
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    It is mandatory for every student and his/her parents to
                    submit an anti-ragging affidavit at the time of admission.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {/* <Link
                      href="https://www.antiragging.in/"
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                      Fill Affidavit Online{" "}
                      <LuExternalLink className="w-4 h-4" />
                    </Link> */}
                    <a
                      href="#"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      Download Format (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* 2. REUSABLE SIDEBAR WIDGET (Emergency) */}
              <SidebarWidget
                title={
                  <span className="flex items-center gap-2 text-red-700">
                    <LuMegaphone className="w-5 h-5" /> Emergency Helpline
                  </span>
                }
                variant="alert"
                className="animate-pulse-border border-red-200 shadow-red-100"
              >
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold text-red-800 uppercase mb-1">
                      National Helpline (24x7)
                    </p>
                    <a
                      href="tel:18001805522"
                      className="flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-red-600 transition-colors"
                    >
                      <LuPhone className="w-5 h-5 text-red-500" /> 1800-180-5522
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-800 uppercase mb-1">
                      Email Complaint
                    </p>
                    <a
                      href="mailto:helpline@antiragging.in"
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-red-600 transition-colors"
                    >
                      <LuMail className="w-5 h-5 text-red-500" />{" "}
                      helpline@antiragging.in
                    </a>
                  </div>
                  <div className="h-px bg-red-200 my-2"></div>
                  <div>
                    <p className="text-xs font-bold text-red-800 uppercase mb-1">
                      College Proctor
                    </p>
                    <a
                      href="tel:+919431XXXXXX"
                      className="flex items-center gap-2 font-bold text-slate-800 hover:text-red-600 transition-colors"
                    >
                      <LuShieldAlert className="w-4 h-4 text-red-500" /> +91
                      9431X XXXXX
                    </a>
                  </div>
                </div>
              </SidebarWidget>

              {/* 3. REUSABLE SIDEBAR NAVIGATION */}
              <SidebarNavigation
                title="On this page"
                links={[
                  { label: "What is Ragging?", href: "#definition" },
                  { label: "Punishments", href: "#punishments" },
                  { label: "Committee Members", href: "#committee" },
                  { label: "Online Affidavit", href: "#affidavit" },
                ]}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// --- LOCAL HELPER COMPONENT (Punishment Item) ---
function PunishmentItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 bg-red-950/30 p-3 rounded-lg border border-red-500/20 items-start">
      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
      <p className="text-sm text-red-100 leading-snug">{text}</p>
    </div>
  );
}
