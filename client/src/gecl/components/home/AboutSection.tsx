import Image from "next/image";
import Link from "next/link";
import { LuQuote, LuBell, LuArrowRight, LuCalendar } from "react-icons/lu";

const NOTICES = [
  {
    id: 1,
    text: "B.Tech 7th Semester Mid-Term Examination Schedule",
    date: "Oct 12",
    type: "Exam",
  },
  {
    id: 2,
    text: "Registration for 1st Year B.Tech (2025-29 Batch)",
    date: "Oct 10",
    type: "Admission",
  },
  {
    id: 3,
    text: "Holiday List Update: Durga Puja Vacation",
    date: "Oct 05",
    type: "General",
  },
  {
    id: 4,
    text: "Tender Notification: Supply of Lab Equipment",
    date: "Oct 01",
    type: "Tender",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* --- LEFT: PRINCIPAL'S DESK (7 Cols) --- */}
          <div className="lg:col-span-7">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2 block">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              Principal's Message
            </h2>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative">
              <LuQuote className="absolute top-8 right-8 text-slate-200 w-24 h-24 rotate-180" />

              <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                <div className="shrink-0">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <Image
                      src="/gecl/images/principal-bimlesh-kumar.webp"
                      alt="Principal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-bold text-slate-900">
                      Dr. Bimlesh Kumar
                    </h3>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">
                      Principal
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    "Government Engineering College, Lakhisarai is not just an
                    institution; it is a vision to empower the youth of Bihar
                    with cutting-edge technical knowledge. We strive to create
                    an environment where innovation meets ethics, fostering
                    engineers who are ready to lead the future."
                  </p>
                  <Link
                    href="/about/principal-message"
                    className="text-blue-600 font-bold text-sm inline-flex items-center gap-2 hover:underline"
                  >
                    Read Full Message <LuArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Established", value: "2019" },
                { label: "Departments", value: "06" },
                { label: "Students", value: "1200+" },
                { label: "Faculty", value: "50+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 p-4 rounded-xl text-center shadow-sm hover:shadow-md transition"
                >
                  <div className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: NOTICE BOARD (5 Cols) --- */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <LuBell />
                </span>
                Notice Board
              </h2>
              <Link
                href="/announcements/notices/"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg flex-1 overflow-hidden flex flex-col">
              <div className="overflow-y-auto max-h-[500px] p-2 custom-scrollbar">
                {NOTICES.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition group cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0 w-14 h-14 bg-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition">
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          {notice.date.split(" ")[0]}
                        </span>
                        <span className="text-xl font-bold text-slate-800">
                          {notice.date.split(" ")[1]}
                        </span>
                      </div>
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 mb-2 uppercase tracking-wide">
                          {notice.type}
                        </span>
                        <h4 className="text-sm font-medium text-slate-700 leading-snug group-hover:text-blue-600 transition">
                          {notice.text}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 mt-auto">
                <Link
                  href="/academics/calendar"
                  className="flex items-center justify-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition"
                >
                  <LuCalendar /> Academic Calendar 2026
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
