import Link from "next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarCheck,
  FaCircleInfo,
  FaFileLines,
  FaGraduationCap,
  FaListCheck,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
export const metadata = {
  title: "Lateral Entry Admission (B.Tech 2nd Year) | GEC Lakhisarai",
  description:
    "Direct 2nd Year B.Tech Admission (Lateral Entry) at Government Engineering College Lakhisarai via BCECE LE. Check eligibility, seats, and documents.",
};

export default function LateralEntryPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#0f172a] text-white pt-32 pb-20 px-6 overflow-hidden border-b-4 border-yellow-500">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 border border-yellow-500 text-yellow-500 text-xs font-bold tracking-wider uppercase">
                Admission 2024-25
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Lateral Entry Admission <br />
                <span className="text-slate-400 text-2xl md:text-3xl font-normal block mt-2">
                  (Direct 2nd Year B.Tech)
                </span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                Government Engineering College, Lakhisarai offers direct
                admission into the 3rd Semester (2nd Year) of B.Tech for Diploma
                holders and B.Sc graduates through the{" "}
                <strong className="text-white">BCECE (LE)</strong> State
                Entrance Exam.
              </p>
            </div>

            {/* Quick Stats Card */}
            <div className="hidden lg:block bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md min-w-[280px]">
              <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2">
                <FaCircleInfo /> Quick Facts
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Exam:</span>{" "}
                  <span className="font-bold text-white">BCECE (LE)</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Duration:</span>{" "}
                  <span className="font-bold text-white">3 Years</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mode:</span>{" "}
                  <span className="font-bold text-white">Offline Test</span>
                </li>
                <li className="flex justify-between">
                  <span>Total Seats:</span>{" "}
                  <span className="font-bold text-white">~30 + Vacant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* --- LEFT SIDEBAR (Navigation) --- */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">
              On This Page
            </h3>
            <nav className="flex flex-col space-y-1">
              <ScrollLink href="#eligibility">Eligibility Criteria</ScrollLink>
              <ScrollLink href="#seat-matrix">Seat Matrix</ScrollLink>
              <ScrollLink href="#process">Admission Process</ScrollLink>
              <ScrollLink href="#documents">Documents Required</ScrollLink>
              <ScrollLink href="#faqs">Frequently Asked Questions</ScrollLink>
            </nav>

            <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-2 text-sm">
                Need Help?
              </h4>
              <p className="text-xs text-blue-600 mb-3 leading-relaxed">
                For admission queries, contact the admission cell or visit the
                campus.
              </p>
              <a
                href="tel:+919430056200"
                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
              >
                <FaUsers /> Contact Admission Cell
              </a>
            </div>
          </div>
        </aside>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="lg:col-span-9 space-y-16">
          {/* 1. ELIGIBILITY SECTION */}
          <section id="eligibility" className="scroll-mt-24">
            <SectionHeader
              icon={<FaGraduationCap />}
              title="Eligibility Criteria"
            />
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <EligibilityCard
                title="Diploma Holders"
                subtitle="3-Year Polytechnic Diploma"
              >
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />{" "}
                    Passed 3-year Diploma in Engineering from a recognized
                    institution.
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />{" "}
                    Minimum <strong>45% marks</strong> (40% for Reserved
                    Categories) in the qualifying examination.
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />{" "}
                    Candidates appearing in the final year exam are also
                    eligible.
                  </li>
                </ul>
              </EligibilityCard>

              <EligibilityCard
                title="B.Sc Graduates"
                subtitle="Bachelor of Science"
              >
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />{" "}
                    Passed B.Sc Degree from a recognized University as defined
                    by UGC.
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />{" "}
                    Must have passed <strong>Mathematics</strong> as a subject
                    in Class 12th.
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />{" "}
                    Must clear Engineering Graphics/Drawing and Mechanics
                    subjects in the 2nd year.
                  </li>
                </ul>
              </EligibilityCard>
            </div>
          </section>

          {/* 2. SEAT MATRIX SECTION */}
          <section id="seat-matrix" className="scroll-mt-24">
            <SectionHeader icon={<FaUsers />} title="Seat Matrix (Tentative)" />
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <p className="text-xs text-slate-500 italic">
                  * Seats = 10% of Intake + Previous Year Vacancies
                </p>
                <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  Session 2024-25
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Branch Name</th>
                      <th className="px-6 py-4 text-center">Regular Intake</th>
                      <th className="px-6 py-4 text-center">
                        Lateral Seats (10%)
                      </th>
                      <th className="px-6 py-4 text-center">Likely Vacancy</th>
                      <th className="px-6 py-4 text-right">Total LE Seats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <TableRow
                      branch="Civil Engineering"
                      intake="120"
                      le="12"
                      vacancy="~ 5-10"
                      total="~ 20"
                    />
                    <TableRow
                      branch="Computer Science (CSE)"
                      intake="60"
                      le="06"
                      vacancy="~ 2-5"
                      total="~ 10"
                    />
                    <TableRow
                      branch="Electrical Engineering"
                      intake="60"
                      le="06"
                      vacancy="~ 5-8"
                      total="~ 12"
                    />
                    <TableRow
                      branch="Mechanical Engineering"
                      intake="60"
                      le="06"
                      vacancy="~ 5-10"
                      total="~ 15"
                    />
                    {/* Add more rows if needed */}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold text-slate-900">
                    <tr>
                      <td className="px-6 py-4">Total Estimated Seats</td>
                      <td className="px-6 py-4 text-center">300</td>
                      <td className="px-6 py-4 text-center">30</td>
                      <td className="px-6 py-4 text-center">~ 20</td>
                      <td className="px-6 py-4 text-right">~ 50+ Seats</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>

          {/* 3. ADMISSION PROCESS (TIMELINE) */}
          <section id="process" className="scroll-mt-24">
            <SectionHeader
              icon={<FaCalendarCheck />}
              title="Admission Process Step-by-Step"
            />
            <div className="mt-8 relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8">
              <TimelineItem
                step="01"
                title="Online Application (BCECE Board)"
                desc="Register online at bceceboard.bihar.gov.in when the notification is released (usually in April/May)."
                date="Apr - May"
              />
              <TimelineItem
                step="02"
                title="Admit Card & Entrance Exam"
                desc="Download admit card and appear for the BCECE (LE) offline examination covering Engg Mechanics, Math, and English."
                date="June - July"
              />
              <TimelineItem
                step="03"
                title="Rank Card Declaration"
                desc="Results are declared in the form of a Rank Card (General & Category Rank)."
                date="July End"
              />
              <TimelineItem
                step="04"
                title="Online Counseling (Choice Filling)"
                desc="Register for counseling (UGEAC-LE) and fill GEC Lakhisarai as your top preference."
                date="August"
              />
              <TimelineItem
                step="05"
                title="Seat Allotment & Reporting"
                desc="Download allotment letter and report to the reporting center for document verification and admission."
                date="Aug - Sept"
              />
            </div>
          </section>

          {/* 4. DOCUMENTS REQUIRED */}
          <section id="documents" className="scroll-mt-24">
            <SectionHeader icon={<FaFileLines />} title="Documents Checklist" />
            <div className="mt-6 p-6 bg-[#fffbeb] border border-yellow-200 rounded-2xl">
              <p className="mb-4 text-sm text-yellow-800 font-medium">
                Candidates must carry{" "}
                <strong>Original + 2 Sets of Photocopies</strong> of the
                following documents during reporting:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <CheckItem>BCECE (LE) Rank Card & Admit Card</CheckItem>
                <CheckItem>
                  Class 10th (Matric) Marksheet & Certificate
                </CheckItem>
                <CheckItem>Diploma/B.Sc Marksheets (All Semesters)</CheckItem>
                <CheckItem>Diploma/B.Sc Passing Certificate</CheckItem>
                <CheckItem>Caste Certificate (if applicable)</CheckItem>
                <CheckItem>Residential Certificate (Domicile)</CheckItem>
                <CheckItem>
                  Character Certificate (from last institute)
                </CheckItem>
                <CheckItem>Migration / SLC / CLC Certificate</CheckItem>
                <CheckItem>Aadhar Card (Original)</CheckItem>
                <CheckItem>6 Passport Size Photographs</CheckItem>
                <CheckItem>Part A & B of Application Form</CheckItem>
                <CheckItem>Medical Fitness Certificate</CheckItem>
              </div>
            </div>
          </section>

          {/* 5. CTA SECTION */}
          <section className="mt-12 text-center py-12 bg-slate-900 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 blur-[100px] opacity-20 pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
              Ready to Apply?
            </h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">
              Visit the official BCECE Board website for the latest
              notifications and application links.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a
                href="https://bceceboard.bihar.gov.in"
                target="_blank"
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-lg transition transform hover:-translate-y-1"
              >
                Visit BCECE Board
              </a>
              <Link
                href="/contact"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/10 transition"
              >
                Contact College
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ===================== COMPONENT HELPERS ===================== */

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
      <span className="text-2xl text-yellow-600 bg-yellow-50 p-2 rounded-lg">
        {icon}
      </span>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
  );
}

function ScrollLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block px-4 py-2 text-sm text-slate-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors border-l-2 border-transparent hover:border-yellow-500"
    >
      {children}
    </a>
  );
}

function EligibilityCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <FaUserGraduate size={20} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500 uppercase font-semibold">
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

function TableRow({
  branch,
  intake,
  le,
  vacancy,
  total,
}: {
  branch: string;
  intake: string;
  le: string;
  vacancy: string;
  total: string;
}) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-medium text-slate-800">{branch}</td>
      <td className="px-6 py-4 text-center text-slate-500">{intake}</td>
      <td className="px-6 py-4 text-center text-blue-600 font-semibold">
        {le}
      </td>
      <td className="px-6 py-4 text-center text-slate-500">{vacancy}</td>
      <td className="px-6 py-4 text-right font-bold text-green-600">{total}</td>
    </tr>
  );
}

function TimelineItem({
  step,
  title,
  desc,
  date,
}: {
  step: string;
  title: string;
  desc: string;
  date: string;
}) {
  return (
    <div className="relative pl-8 md:pl-12 group">
      {/* Dot */}
      <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-slate-300 group-hover:bg-yellow-500 group-hover:scale-125 transition-all ring-4 ring-slate-50"></span>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-1 block">
            Step {step}
          </span>
          <h4 className="text-lg font-bold text-slate-800">{title}</h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed max-w-xl">
            {desc}
          </p>
        </div>
        <div className="shrink-0 mt-2 sm:mt-0">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-yellow-100 shadow-sm">
      <FaListCheck className="text-yellow-500 shrink-0" />
      <span className="text-sm text-slate-700 font-medium">{children}</span>
    </div>
  );
}
