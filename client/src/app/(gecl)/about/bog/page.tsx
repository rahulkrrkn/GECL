import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuLandmark,
  LuAward,
  LuShieldCheck,
  LuGraduationCap,
  LuUser,
  LuMail,
  LuUsers,
  LuUserCog,
  LuHistory,
  LuExternalLink,
  LuArrowRight,
} from "react-icons/lu";
import { FaBuildingColumns, FaMicrochip, FaUsersGear } from "react-icons/fa6";

// Shared UI Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Administration & Governance Tree | GEC Lakhisarai",
  description:
    "The complete organizational hierarchy of GEC Lakhisarai from the Chief Minister of Bihar to Department HODs and Staff.",
};

// --- DATA: APEX LEADERSHIP ---
const STATE_LEADERS = [
  {
    role: "Hon'ble Chief Minister, Bihar",
    name: "Shri Nitish Kumar",
    image: "/gecl/images/gov/cm-nitish-kumar.webp",
    link: "https://cm.bihar.gov.in/",
    tag: "Chief Patron",
  },
  {
    role: "Hon't Minister, DSTTE",
    name: "Shri Sunil Kumar",
    image: "/gecl/images/gov/minister-dstte.webp",
    link: "https://state.bihar.gov.in/dst/",
    tag: "Governing Head",
  },
  {
    role: "Secretary, DSTTE",
    name: "[Name of Secretary]",
    image: "/gecl/images/gov/secretary-dstte.webp",
    link: "https://state.bihar.gov.in/dst/",
    tag: "Administrative Head",
  },
];

export default function AdministrationFullTree() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-16">
      {/* 1. HERO SECTION */}
      <PageHero
        title="Administration & Hierarchy"
        badge="Organizational Tree"
        icon={<LuLandmark />}
        description="A comprehensive view of the leadership governing GEC Lakhisarai, ensuring transparency and institutional excellence."
        image="/gecl/images/campus/college-building.webp"
        className="bg-[#0f172a]"
        themeColor="text-blue-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Board of Governors (BOG)" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        {/* ================= LEVEL 1: THE APEX (STATE GOVT) ================= */}
        <section id="apex" className="mb-24">
          <SectionHeader
            title="State Leadership & Patronage"
            subtitle="Government of Bihar"
            icon={LuLandmark}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {STATE_LEADERS.map((leader, idx) => (
              <a
                key={idx}
                href={leader.link}
                target="_blank"
                className="bg-white rounded-[2rem] p-6 border-b-8 border-blue-600 shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="relative w-32 h-32 rounded-3xl overflow-hidden mb-6 border-4 border-slate-50 shadow-inner mx-auto group-hover:border-blue-100">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] block mb-2">
                    {leader.role}
                  </span>
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {leader.name}
                  </h4>
                  <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-black text-slate-400 group-hover:text-blue-600 transition-colors uppercase">
                    Official Portal <LuExternalLink size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ================= LEVEL 2: UNIVERSITY OVERSIGHT ================= */}
        <section
          id="university"
          className="mb-24 bg-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-bl-full opacity-50 -z-0"></div>
          <SectionHeader
            title="University Governance"
            icon={FaBuildingColumns}
            className="relative z-10"
          />

          <div className="flex flex-col md:flex-row items-center gap-12 mt-12 relative z-10">
            <div className="w-48 h-48 rounded-full border-8 border-slate-50 shadow-2xl overflow-hidden shrink-0">
              <Image
                src="/gecl/images/gov/vc-beu.webp"
                alt="VC BEU"
                width={192}
                height={192}
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                Vice Chancellor
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Prof. Suresh Kant Verma
              </h3>
              <p className="text-xl text-slate-500 font-medium mt-1">
                Bihar Engineering University (BEU), Patna
              </p>
              <div className="h-1 w-20 bg-blue-600 my-6 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-slate-600 max-w-2xl text-base leading-relaxed italic">
                "Guiding the academic framework and examination integrity of all
                premier technical institutions in Bihar."
              </p>
            </div>
          </div>
        </section>

        {/* ================= LEVEL 3: COLLEGE CORE ADMINISTRATION ================= */}
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/4 space-y-24">
            {/* PRINCIPAL PROFILE */}
            <section id="principal">
              <SectionHeader title="Head of Institution" icon={LuAward} />
              <div className="bg-[#0f172a] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row mt-10">
                <div className="md:w-2/5 relative h-96 md:h-auto">
                  <Image
                    src="/gecl/images/principal-bimlesh-kumar.webp"
                    alt="Principal"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-transparent to-transparent"></div>
                </div>
                <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center text-white">
                  <span className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-4">
                    Principal Message
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                    Prof. (Dr.) Bimlesh Kumar
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
                    "GEC Lakhisarai is committed to creating a fear-free,
                    innovation-driven environment where students transform into
                    nation-builders."
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/about/principal-message"
                      className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      Full Message <LuArrowRight size={18} />
                    </Link>
                    <a
                      href="mailto:principal@geclakhisarai.ac.in"
                      className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                    >
                      Contact Office
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* HIERARCHY TREE DIAGRAM PLACEHOLDER */}
            <section className="py-10 text-center bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300">
              <p className="text-slate-400 text-sm mt-4 font-medium uppercase tracking-widest">
                Reporting Structure Visual
              </p>
            </section>

            {/* HEADS OF DEPARTMENTS (HODs) */}
            <section id="hods">
              <SectionHeader
                title="Heads of Departments"
                icon={LuUsers}
                subtitle="Academic Execution Team"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {/* BRANCH: CSE (AI) */}
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-blue-50 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaMicrochip size={100} />
                  </div>
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                    <FaMicrochip size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-800 leading-tight">
                    Prof. [Name]
                  </h4>
                  <p className="text-xs text-blue-600 font-black uppercase tracking-tighter mt-1 mb-6">
                    Computer Science (AI)
                  </p>
                  <a
                    href="mailto:hod.ai@gecl.ac.in"
                    className="text-[11px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-2 transition-colors"
                  >
                    <LuMail size={14} /> hod.ai@gecl.ac.in
                  </a>
                </div>

                <HODCard
                  icon={<LuUsers />}
                  name="Prof. Ajnish Kumar Sharma"
                  dept="Electrical Engineering"
                  email="ajnishgecl@gmail.com"
                />
                <HODCard
                  icon={<LuUsers />}
                  name="Prof. Manish Kumar Mandal"
                  dept="Civil Engineering"
                  email="manishkm.gecl@gmail.com"
                />
                <HODCard
                  icon={<LuUsers />}
                  name="Prof. Phool Kumari"
                  dept="CSE (Data Science)"
                  email="phoolkumari.cusb@gmail.com"
                />
                <HODCard
                  icon={<LuUsers />}
                  name="Prof. Priyesh Kumar"
                  dept="Mechanical Engineering"
                  email="kumarpriyesh303@gmail.com"
                />
                <HODCard
                  icon={<LuUsers />}
                  name="Dr. Vijay Kumar"
                  dept="Applied Science"
                  email="vijaykr.02023@gmail.com"
                />
              </div>
            </section>
          </div>

          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:w-1/4">
            <div className="sticky top-28 space-y-8">
              <SidebarNavigation
                title="Quick Navigation"
                links={[
                  { label: "State Patrons", href: "#apex" },
                  { label: "University Level", href: "#university" },
                  { label: "College Principal", href: "#principal" },
                  { label: "HODs & Faculty", href: "#hods" },
                ]}
              />

              <SidebarWidget title="Administrative Help" variant="info">
                <div className="space-y-4">
                  <div className="pb-3 border-b border-blue-100">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">
                      TPO In-charge
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      Prof. Navdeep Raj
                    </p>
                  </div>
                  <div className="pb-3 border-b border-blue-100">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">
                      Chief Warden
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      Dr. Vijay Kumar
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">
                      Hostel Warden
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      Prof. Krishna Raj
                    </p>
                  </div>
                </div>
              </SidebarWidget>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center">
                <FaUsersGear
                  className="text-slate-200 mx-auto mb-4"
                  size={50}
                />
                <h4 className="font-bold text-slate-800 text-sm mb-2">
                  Faculty Recruitment
                </h4>
                <p className="text-xs text-slate-500 mb-6">
                  Our professors are selected via Bihar Public Service
                  Commission (BPSC).
                </p>
                <Link
                  href="/mandatory-disclosure"
                  className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  View Staff List
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// --- LOCAL COMPONENT ---
function HODCard({ name, dept, email, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all group">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
        {icon}
      </div>
      <h4 className="text-lg font-black text-slate-800 leading-tight">
        {name}
      </h4>
      <p className="text-[10px] text-blue-600 font-black uppercase mt-1 mb-6 tracking-tighter">
        {dept}
      </p>
      <a
        href={`mailto:${email}`}
        className="text-[11px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-2 transition-colors"
      >
        <LuMail size={14} /> {email}
      </a>
    </div>
  );
}
