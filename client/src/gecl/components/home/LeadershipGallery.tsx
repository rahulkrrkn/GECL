import Image from "next/image";
import Link from "next/link";

const LEADERS = [
  {
    name: "Prof. (Dr.) Bimlesh Kumar",
    role: "Principal",
    dept: "Administration",
    link: "/about/principal-message",
    image: "/gecl/images/principal-bimlesh-kumar.webp",
  },
  {
    name: "Prof. Manish Kumar Mandal",
    role: "HOD",
    dept: "Civil Engineering",
    link: "/departments/civil/hod",
    image: "/gecl/images/departments/civil-engineering-hod-profile.webp",
  },
  {
    name: "Prof. Priyesh Kumar",
    role: "HOD",
    dept: "Mechanical Engineering",
    link: "/departments/mechanical/hod",
    image: "/gecl/images/departments/mechanical-engineering-hod-profile.webp",
  },
  {
    name: "Prof. Ajnish Kumar Sharma",
    role: "HOD",
    dept: "Electrical Engineering",
    link: "/departments/electrical/hod",
    image:
      "/gecl/images/departments/electrical-and-electronics-engineering-hod-profile.webp",
  },
  {
    name: "Prof. Phool Kumari",
    role: "HOD",
    dept: "CSE (AI & Data Science)",
    link: "/departments/cse-ai/hod",
    image: "/gecl/images/departments/cse-ai-hod-profile.webp",
  },
  {
    name: "Dr. Vijay Kumar",
    role: "HOD",
    dept: "Applied Science and Humanities & Humanities",
    link: "/departments/applied-science/hod",
    image:
      "/gecl/images/departments/applied-science-humanities-hod-profile.webp",
  },
];

export const LeadershipGallery = () => {
  return (
    <section className="py-20 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Administration
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            Academic Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {LEADERS.map((leader, idx) => (
            <Link
              href={leader.link}
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-blue-400 transition mb-4 relative bg-slate-200">
                {/* Fallback image if specific one not found */}
                <Image
                  src={
                    leader.image || "/gecl/images/college-building-main.webp"
                  }
                  alt={leader.name}
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition line-clamp-1">
                {leader.name}
              </h3>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-2">
                {leader.role}
              </span>
              <p className="text-xs text-slate-500 line-clamp-1">
                {leader.dept}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
