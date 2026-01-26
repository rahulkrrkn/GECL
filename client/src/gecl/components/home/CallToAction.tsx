import Link from "next/link";
import { LuDownload, LuExternalLink } from "react-icons/lu";

export const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-900 to-slate-900 rounded-[2.5rem] p-10 md:p-20 text-center md:text-left relative overflow-hidden shadow-2xl">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Join GEC Lakhisarai
            </h2>
            <p className="text-blue-100 max-w-xl text-lg mb-8 leading-relaxed">
              Admission to B.Tech courses is strictly based on merit through{" "}
              <strong>JEE Mains</strong> (UGEAC) and <strong>BCECE</strong>{" "}
              counselling conducted by the Government of Bihar.
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-white/80">
              <span className="flex items-center gap-2">
                ✓ Low Fee Structure
              </span>
              <span className="flex items-center gap-2">
                ✓ Govt. Scholarships
              </span>
              <span className="flex items-center gap-2">
                ✓ Bihar Student Credit Card
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 min-w-[240px]">
            <Link
              href="/admissions/how-to-apply"
              className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-center flex items-center justify-center gap-2"
            >
              Admission Guidelines
            </Link>
            <Link
              href="https://bceceboard.bihar.gov.in/"
              target="_blank"
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <LuExternalLink /> Visit BCECE Board
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
