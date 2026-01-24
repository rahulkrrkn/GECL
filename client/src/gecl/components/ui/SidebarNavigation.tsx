"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBookOpen, LuArrowRight } from "react-icons/lu";
import { cn } from "@/gecl/lib/cn";

// ✅ Fix: Added 'active' (optional) to solve the build error
export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarNavigationProps {
  title?: string;
  links: NavLink[];
  className?: string;
}

export default function SidebarNavigation({
  title = "Quick Navigation",
  links,
  className,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden", // ❌ Removed 'sticky top-24'
        className,
      )}
    >
      <div className="bg-gecl-primary p-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <LuBookOpen className="text-gecl-secondary" />
          {title}
        </h3>
      </div>
      <nav className="p-2 flex flex-col gap-1">
        {links.map((link) => {
          // Logic: Use manual 'active' prop if provided, else check pathname
          const isActive =
            link.active !== undefined
              ? link.active
              : pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                isActive
                  ? "bg-gecl-primary text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-50 hover:text-gecl-primary hover:pl-5",
              )}
            >
              {link.label}
              {isActive && <LuArrowRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LuInfo,
//   LuUsers,
//   LuBookOpen,
//   LuCalendarClock,
//   LuFlaskConical,
//   LuTrophy,
//   LuImage,
//   LuPhone,
// } from "react-icons/lu";

// // ICON MAPPER: Translates strings into Components
// const ICONS: Record<string, any> = {
//   about: LuInfo,
//   hod: LuUsers,
//   faculty: LuUsers,
//   syllabus: LuBookOpen,
//   timetable: LuCalendarClock,
//   labs: LuFlaskConical,
//   placements: LuTrophy,
//   gallery: LuImage,
//   contact: LuPhone,
// };

// export default function SidebarNavigation({
//   title,
//   links,
// }: {
//   title: string;
//   links: any[];
// }) {
//   const pathname = usePathname();

//   return (
//     <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
//       <div className="p-6 bg-slate-50 border-b border-slate-100">
//         <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">
//           {title}
//         </h3>
//       </div>
//       <nav className="p-3">
//         {links.map((link) => {
//           const Icon = ICONS[link.iconKey] || LuInfo;
//           const isActive = pathname === link.href;

//           return (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all ${
//                 isActive
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
//                   : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
//               }`}
//             >
//               <Icon size={18} />
//               {link.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }
