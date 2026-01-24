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
  LuArrowRight,
  LuQuote,
} from "react-icons/lu";

// Import Reusable Components
import {
  PageHero,
  SectionHeader,
  SidebarNavigation,
  SidebarWidget,
} from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Administration & Leadership | GEC Lakhisarai",
  description:
    "Meet the governing leadership of GEC Lakhisarai, from the Hon'ble Chief Minister of Bihar to our dedicated college HODs.",
};

// --- DATA: STATE PATRONS ---
const STATE_PATRONS = [
  {
    role: "Hon'ble Chief Minister, Bihar",
    name: "Shri Nitish Kumar",
    image: "/gecl/images/gov/cm-nitish-kumar.webp",
    message:
      "Transforming Bihar into a technical hub through 7 Nischay initiative.",
    color: "border-orange-500",
  },
  {
    role: "Hon'ble Minister, DSTTE",
    name: "Shri Sumit Kumar Singh",
    image: "/gecl/images/gov/minister-sumit-singh.webp",
    message:
      "Empowering youth with world-class technical education and infrastructure.",
    color: "border-blue-500",
  },
];

// --- DATA: HODs ---
const HOD_DATA = [
  {
    name: "Prof. [Name]",
    dept: "Computer Science (AI)",
    email: "hod.cse@geclakhisarai.ac.in",
  },
  {
    name: "Prof. Phool Kumari",
    dept: "Computer Science (DS)",
    email: "phoolkumari.cusb@gmail.com",
  },
  {
    name: "Prof. Manish Kumar Mandal",
    dept: "Civil Engineering",
    email: "manishkm.gecl@gmail.com",
  },
  {
    name: "Prof. Priyesh Kumar",
    dept: "Mechanical Engineering",
    email: "kumarpriyesh303@gmail.com",
  },
  {
    name: "Prof. Ajnish Kumar Sharma",
    dept: "Electrical Engineering",
    email: "ajnishgecl@gmail.com",
  },
  {
    name: "Dr. Vijay Kumar",
    dept: "Applied Science",
    email: "vijaykr.02023@gmail.com",
  },
];

export default function AdministrationPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-20">
      <PageHero
        title="Administration"
        badge="Governance"
        icon={<LuLandmark />}
        description="The leadership framework ensuring excellence in technical education and institutional growth."
        image="/gecl/images/admin-block.webp"
        className="bg-indigo-950"
        themeColor="text-indigo-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Administration" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <div className="lg:w-3/4 space-y-24">
            {/* 1. STATE LEADERSHIP (CM & MINISTER) */}
            <section>
              <SectionHeader
                title="State Leadership & Vision"
                icon={LuLandmark}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {STATE_PATRONS.map((patron, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-3xl p-6 border-t-8 ${patron.color} shadow-lg hover:shadow-xl transition-all group`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 shadow-inner">
                        <Image
                          src={patron.image}
                          alt={patron.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {patron.role}
                        </span>
                        <h4 className="text-xl font-bold text-slate-800">
                          {patron.name}
                        </h4>
                      </div>
                    </div>
                    <div className="mt-6 relative italic text-slate-600 text-sm leading-relaxed pl-8">
                      <LuQuote className="absolute left-0 top-0 text-slate-200 w-6 h-6 -z-10" />
                      {patron.message}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. UNIVERSITY LEADERSHIP (BEU) */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-50"></div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0 border-4 border-white shadow-lg">
                  <LuGraduationCap size={64} />
                </div>
                <div>
                  <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
                    Affiliating University Head
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">
                    Prof. (Dr.) Sharat Kumar Singh
                  </h3>
                  <p className="text-indigo-600 font-semibold mb-4">
                    Vice Chancellor, Bihar Engineering University (BEU)
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                    Steering the academic standard and examination integrity of
                    all engineering colleges across Bihar.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. HEAD OF INSTITUTION (PRINCIPAL) */}
            <section>
              <SectionHeader title="Head of Institution" icon={LuAward} />
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row mt-10">
                <div className="md:w-2/5 relative h-96 md:h-auto">
                  <Image
                    src="/gecl/images/principal-bimlesh-kumar.webp"
                    alt="Principal"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center bg-linear-to-br from-white to-slate-50">
                  <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] w-fit mb-6">
                    Principal
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">
                    Prof. (Dr.) Bimlesh Kumar
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 italic">
                    "GEC Lakhisarai is not just an institute, it is a crucible
                    where we mold raw talent into engineering pioneers."
                  </p>
                  <div className="flex flex-col gap-4">
                    <a
                      href="mailto:principal@geclakhisarai.ac.in"
                      className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <LuMail className="text-indigo-500" />{" "}
                      principalgeclakhisarai@gmail.com
                    </a>
                    <Link
                      href="/about/principal-message"
                      className="text-indigo-600 font-bold hover:gap-4 transition-all flex items-center gap-2 group"
                    >
                      Read Detailed Message{" "}
                      <LuArrowRight className="group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. HEADS OF DEPARTMENTS (HODs) */}
            <section>
              <SectionHeader title="Heads of Departments" icon={LuUser} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {HOD_DATA.map((hod, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl border border-slate-100 p-6 hover:shadow-2xl transition-all group"
                  >
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                      <LuUser size={28} />
                    </div>
                    <h4 className="text-lg font-black text-slate-800 mb-1">
                      {hod.name}
                    </h4>
                    <p className="text-xs text-indigo-600 font-bold mb-4 uppercase tracking-tighter">
                      {hod.dept}
                    </p>
                    <a
                      href={`mailto:${hod.email}`}
                      className="text-[11px] font-bold text-slate-400 flex items-center gap-2"
                    >
                      <LuMail size={14} /> {hod.email}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4">
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

              <SidebarWidget title="Institutional Support" variant="info">
                <div className="space-y-3">
                  <p className="text-xs text-indigo-800 leading-relaxed">
                    Administration also includes the **Scholarship Cell**,
                    **Admission Cell**, and **Examination Cell**.
                  </p>
                  <Link
                    href="/admissions/contact"
                    className="text-xs font-black text-indigo-600 flex items-center gap-1 hover:underline"
                  >
                    View Support Cells <LuArrowRight size={12} />
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
