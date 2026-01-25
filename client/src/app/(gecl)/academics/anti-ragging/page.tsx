import type { Metadata } from "next";
import Image from "next/image";
import {
  LuShieldAlert,
  LuPhone,
  LuMail,
  LuGavel,
  LuFileWarning,
  LuDownload,
  LuUsers,
  LuHeartHandshake,
  LuMegaphone,
} from "react-icons/lu";
import { FaExclamationTriangle } from "react-icons/fa";

// ✅ Shared Components
import {
  PageHero,
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
    url: "https://geclakhisarai.ac.in/academics/anti-ragging",
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
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-16">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Anti-Ragging Cell"
        badge="Zero Tolerance"
        icon={<LuShieldAlert />}
        description="Ragging is a criminal offence. GEC Lakhisarai is committed to creating a fearless, friendly, and conducive environment for learning."
        image="/gecl/images/campus/college-building.webp"
        className="bg-red-950"
        themeColor="text-red-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Anti-Ragging" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <div className="lg:w-3/4 space-y-16">
            {/* 1. WHAT IS RAGGING? */}
            <section id="definition" className="scroll-mt-28">
              <SectionHeader
                title="What Constitutes Ragging?"
                icon={FaExclamationTriangle}
              />

              <div className="mt-6 mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-red-900 font-medium leading-relaxed">
                  According to the UGC Regulation on Curbing the Menace of
                  Ragging in Higher Educational Institutions, 2009, ragging
                  constitutes one or more of any of the following acts:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  title="Verbal Abuse"
                  text="Any conduct by any student whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher."
                />
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  title="Psychological Harm"
                  text="Indulging in rowdy or undisciplined activities which causes or is likely to cause annoyance, hardship, physical or psychological harm or to raise fear."
                />
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  title="Forced Activity"
                  text="Asking any student to do any act which such student will not in the ordinary course do and which has the effect of causing shame or embarrassment."
                />
                <FeatureItem
                  variant="warning"
                  icon={FaExclamationTriangle}
                  title="Academic Disruption"
                  text="Any act that prevents, disrupts or disturbs the regular academic activity of a student."
                />
              </div>
            </section>

            {/* 2. CAMPUS HARMONY BANNER */}
            <section className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-slate-900">
                <Image
                  src="/gecl/images/students-harmony.webp"
                  alt="Students bonding"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-transparent flex items-center p-8 md:p-12">
                <div className="text-white max-w-lg">
                  <div className="flex items-center gap-2 mb-3 text-red-200 font-bold uppercase tracking-wider text-xs">
                    <LuHeartHandshake className="w-5 h-5" /> Campus Harmony
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 font-display">
                    Build Bonds, Not Barriers
                  </h3>
                  <p className="text-sm md:text-base text-red-100 leading-relaxed">
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

              <div className="bg-slate-900 text-slate-300 rounded-2xl p-8 relative overflow-hidden shadow-xl mt-6">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <h3 className="text-white text-lg font-bold mb-6 relative z-10 flex items-center gap-2">
                  <LuFileWarning className="text-red-500" />
                  Possible Disciplinary Actions:
                </h3>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
                  <PunishmentItem text="Suspension from attending classes and academic privileges." />
                  <PunishmentItem text="Cancellation of admission." />
                  <PunishmentItem text="Withholding/withdrawing scholarship/fellowship and other benefits." />
                  <PunishmentItem text="Rustication from the institution for 1 to 4 semesters." />
                  <PunishmentItem text="Debarring from appearing in any test/examination." />
                  <PunishmentItem text="Filing of First Information Report (FIR) with the police." />
                </div>
              </div>
            </section>

            {/* 4. COMMITTEE */}
            <section id="committee" className="scroll-mt-28">
              <SectionHeader title="Anti-Ragging Committee" icon={LuUsers} />

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
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
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                member.role === "Chairman"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
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
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="p-4 bg-white rounded-full shadow-md text-blue-600 shrink-0">
                  <LuDownload className="w-8 h-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    Mandatory Anti-Ragging Affidavit
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 max-w-xl">
                    It is mandatory for every student and his/her parents to
                    submit an anti-ragging affidavit at the time of admission.
                    You can download the format or fill it online.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all"
                    >
                      <LuDownload className="w-4 h-4" /> Download Format (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* 2. REUSABLE SIDEBAR WIDGET (Emergency) */}
              <SidebarWidget
                title={
                  <span className="flex items-center gap-2 text-red-700">
                    <LuMegaphone className="w-5 h-5" /> Emergency Helpline
                  </span>
                }
                className="border-red-200 bg-red-50"
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
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-red-600 transition-colors text-sm break-all"
                    >
                      <LuMail className="w-4 h-4 text-red-500 shrink-0" />
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
    </main>
  );
}

// --- LOCAL HELPER COMPONENT (Punishment Item) ---
function PunishmentItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
      <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
    </div>
  );
}
