import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuUser,
  LuMail,
  LuFileText,
  LuGraduationCap,
  LuShieldCheck,
  LuBuilding2,
  LuBriefcase,
  LuAward,
  LuPhone,
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
  title: "Administration | Government Engineering College, Lakhisarai",
  description:
    "Meet the administrative leadership of GEC Lakhisarai, including Principal Dr. Bimlesh Kumar, HODs, and key officials dedicated to academic excellence.",
  keywords: [
    "GEC Lakhisarai Principal",
    "Dr. Bimlesh Kumar GEC",
    "GEC Lakhisarai HOD List",
    "CSE AI HOD Lakhisarai",
    "GEC Administration",
  ],
  openGraph: {
    title: "Administration | GEC Lakhisarai",
    description:
      "Leadership and organizational structure of Government Engineering College, Lakhisarai.",
    url: "https://www.geclakhisarai.ac.in/about/administration",
    type: "website",
    images: [
      {
        url: "/gecl/images/principal-bimlesh-kumar.webp",
        width: 1200,
        height: 630,
        alt: "Dr. Bimlesh Kumar - Principal GEC Lakhisarai",
      },
    ],
  },
};

// --- GENUINE DATA ---
const HOD_DATA = [
  {
    name: "Prof. [Name Required]",
    dept: "Computer Science (AI)",
    email: "hod.cse@geclakhisarai.ac.in",
  },
  {
    name: "Prof. Phool Kumari",
    dept: "Computer Science (Data Science)",
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
    dept: "Applied Science & Humanities",
    email: "vijaykr.02023@gmail.com",
  },
];

const ADMIN_OFFICIALS = [
  {
    role: "Training & Placement Officer (TPO)",
    name: "Prof. Navdeep Raj",
    icon: LuBriefcase,
  },
  {
    role: "Chief Warden",
    name: "Dr. Vijay Kumar",
    icon: LuShieldCheck,
  },
  {
    role: "Warden (Boys Hostel)",
    name: "Prof. Krishna Raj",
    icon: LuBuilding2,
  },
  {
    role: "Examination Controller",
    name: "Prof. [Name Required]",
    icon: LuGraduationCap,
  },
  {
    role: "Nodal Officer (Academic)",
    name: "Prof. [Name Required]",
    icon: LuFileText,
  },
];

export default function AdministrationPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. REUSABLE HERO SECTION */}
      <PageHero
        title="Administration"
        description="The dedicated team leading GEC Lakhisarai towards academic brilliance and operational excellence."
        badge="Leadership & Governance"
        image="/gecl/images/admin-block.webp"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Administration" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4 space-y-16">
            {/* 1. HEAD OF INSTITUTION */}
            <section>
              <SectionHeader title="Head of Institution" icon={LuAward} />

              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col md:flex-row transform hover:shadow-xl transition-shadow duration-300">
                <div className="md:w-1/3 relative h-80 md:h-auto bg-slate-200">
                  <Image
                    src="/gecl/images/principal-bimlesh-kumar.webp"
                    alt="Prof. (Dr.) Bimlesh Kumar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-gecl-primary/10 text-gecl-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Principal
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">
                    Prof. (Dr.) Bimlesh Kumar
                  </h3>
                  <p className="text-slate-600 mb-6 italic border-l-4 border-gecl-accent pl-4">
                    "Leading with a vision to create technically competent and
                    socially responsible engineers."
                  </p>

                  <div className="space-y-3">
                    <ContactRow
                      icon={LuMail}
                      text="principalgeclakhisarai@gmail.com"
                      href="mailto:principalgeclakhisarai@gmail.com"
                    />
                    <ContactRow
                      icon={LuFileText}
                      text="Read Principal's Message"
                      href="/about/principal-message"
                      link
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. ADMINISTRATIVE OFFICIALS */}
            <section>
              <SectionHeader
                title="Key Administrative Officials"
                icon={LuShieldCheck}
              />

              <div className="grid md:grid-cols-2 gap-6">
                {ADMIN_OFFICIALS.map((official, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-gecl-primary/20 transition-all flex items-start gap-4 group"
                  >
                    <div className="p-3 bg-slate-50 rounded-lg text-gecl-primary group-hover:bg-gecl-primary group-hover:text-white transition-colors shrink-0">
                      <official.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                        {official.role}
                      </h4>
                      <p className="text-lg font-semibold text-slate-800">
                        {official.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. HEADS OF DEPARTMENTS (HODs) */}
            <section>
              <SectionHeader
                title="Heads of Departments"
                icon={LuGraduationCap}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {HOD_DATA.map((hod, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:-translate-y-1 transition-transform duration-300 group"
                  >
                    <div className="w-16 h-16 bg-gecl-secondary/20 rounded-full flex items-center justify-center text-gecl-primary mb-4 group-hover:bg-gecl-primary group-hover:text-white transition-colors">
                      <LuUser className="w-8 h-8" />
                    </div>
                    <h4
                      className="text-lg font-bold text-slate-800 mb-1 line-clamp-1"
                      title={hod.name}
                    >
                      {hod.name}
                    </h4>
                    <p className="text-sm text-gecl-accent font-medium mb-4 min-h-[40px] line-clamp-2">
                      {hod.dept}
                    </p>

                    <a
                      href={`mailto:${hod.email}`}
                      className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gecl-primary transition-colors"
                      title={hod.email}
                    >
                      <LuMail className="w-4 h-4" />
                      Email HOD
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* 2. REUSABLE SIDEBAR NAVIGATION */}
              <SidebarNavigation
                title="About Section"
                links={[
                  { label: "About College", href: "/about/college" },
                  { label: "Administration", href: "/about/administration" },
                  { label: "Vision & Mission", href: "/about/vision-mission" },
                  { label: "Contact Us", href: "/contact" },
                ]}
              />

              {/* 3. REUSABLE SIDEBAR WIDGET */}
              <SidebarWidget title="Office of the Principal" variant="default">
                <p className="text-sm text-slate-600 mb-4">
                  For administrative queries, please contact the main office
                  during working hours.
                </p>
                <div className="text-sm font-medium text-slate-700">
                  <p className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Mon - Sat: 10:00 AM - 5:00 PM
                  </p>
                  <p className="mt-3 text-gecl-primary flex items-center gap-2">
                    <LuPhone className="w-4 h-4" />
                    06346-29xxxx
                  </p>
                </div>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// --- LOCAL HELPER COMPONENT (Specific to this page) ---
function ContactRow({ icon: Icon, text, href, link = false }: any) {
  const content = (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-gecl-accent flex-shrink-0" />
      <span
        className={
          link
            ? "font-medium underline decoration-slate-300 underline-offset-4"
            : ""
        }
      >
        {text}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block text-slate-600 hover:text-gecl-primary transition-colors"
      >
        {content}
      </Link>
    );
  }
  return <div className="text-slate-600">{content}</div>;
}
