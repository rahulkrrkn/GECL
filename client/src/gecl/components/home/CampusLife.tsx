import Image from "next/image";

const HIGHLIGHTS = [
  "/gecl/images/vision-future.webp",
  "/gecl/heroPage/img.jpg",
  "/gecl/heroPage/img.jpg",
];

export const CampusLife = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Life at GECL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Campus Highlights
            </h2>
          </div>
          <button className="text-slate-600 font-semibold hover:text-blue-600 transition">
            View Gallery →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-[500px]">
          {/* Large Main Image */}
          <div className="lg:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden group">
            <Image
              src={HIGHLIGHTS[0]}
              alt="Campus Event"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div>
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                  Event
                </span>
                <h3 className="text-white text-xl font-bold">
                  Tech Fest 2025: Innovation Unleashed
                </h3>
              </div>
            </div>
          </div>

          {/* Secondary Images */}
          <div className="relative rounded-2xl overflow-hidden group">
            <Image
              src={HIGHLIGHTS[1]}
              alt="Labs"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold">
              Modern Labs
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <Image
              src={HIGHLIGHTS[2]}
              alt="Sports"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold">
              Sports Complex
            </div>
          </div>

          {/* Stats/Extra Card */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-center text-white lg:col-span-2">
            <h3 className="text-2xl font-bold mb-2">Student Achievements</h3>
            <p className="text-slate-400 mb-6">
              Our students consistently secure top ranks in BEU exams and win
              national hackathons.
            </p>
            <div className="flex gap-8">
              <div>
                <span className="block text-3xl font-bold text-blue-400">
                  100+
                </span>
                <span className="text-xs uppercase text-slate-500 font-bold">
                  Placements
                </span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-emerald-400">
                  15+
                </span>
                <span className="text-xs uppercase text-slate-500 font-bold">
                  Awards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
