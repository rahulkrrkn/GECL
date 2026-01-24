import {
  LuGraduationCap,
  LuShieldCheck,
  LuChevronRight,
  LuUser,
  LuUsers,
  LuBookOpen,
  LuCalendarClock,
  LuFlaskConical,
  LuTrophy,
  LuImage,
  LuPhone,
  LuAtom,
  LuSettings,
  LuLayoutGrid,
  LuActivity,
  LuLayers,
} from "react-icons/lu";
// --- CONFIGURATION ---
export const DEPT_MAP: Record<
  string,
  {
    name: string;
    short: string;
    gradient: string;
    accent: string;
    glow: string;
    links: string[];
  }
> = {
  "applied-science": {
    name: "Applied Applied Science",
    short: "AS&H",
    // Animated Deep Gradient
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    accent: "text-emerald-400",
    glow: "bg-emerald-500/20",
    links: [
      "overview",
      "hod",
      "faculty",
      "syllabus",
      "about",
      "timetable",
      "labs",
      "activities",
      "events",
      "gallery",
      "contact",
    ],
  },
  "cse-ai": {
    name: "Computer Science (AI)",
    short: "CSE-AI",
    gradient: "from-violet-950 via-indigo-950 to-slate-950",
    accent: "text-violet-400",
    glow: "bg-violet-500/20",
    links: [
      "overview",
      "hod",
      "faculty",
      "syllabus",
      "timetable",
      "labs",
      "placements",
      "projects",
      "research",
      "activities",
      "events",
      "gallery",
      "contact",
    ],
  },
  civil: {
    name: "Civil Engineering",
    short: "CIVIL",
    gradient: "from-stone-900 via-neutral-900 to-slate-900",
    accent: "text-orange-400",
    glow: "bg-orange-500/20",
    links: [
      "overview",
      "hod",
      "faculty",
      "syllabus",
      "timetable",
      "labs",
      "placements",
      "activities",
      "events",
      "gallery",
      "contact",
    ],
  },
  "cse-ds": {
    name: "Computer Science (DS)",
    short: "CSE-DS",
    gradient: "from-cyan-950 via-sky-950 to-slate-950",
    accent: "text-cyan-400",
    glow: "bg-cyan-500/20",
    links: [
      "overview",
      "hod",
      "faculty",
      "syllabus",
      "timetable",
      "labs",
      "placements",
      "projects",
      "research",
      "activities",
      "events",
      "gallery",
      "contact",
    ],
  },
  electrical: {
    name: "Electrical Engineering",
    short: "EE",
    gradient: "from-amber-950 via-yellow-950 to-slate-950",
    accent: "text-amber-400",
    glow: "bg-amber-500/20",
    links: [
      "overview",
      "hod",
      "faculty",
      "syllabus",
      "timetable",
      "labs",
      "placements",
      "activities",
      "events",
      "gallery",
      "contact",
    ],
  },
  mechanical: {
    name: "Mechanical Engineering",
    short: "ME",
    gradient: "from-gray-900 via-zinc-900 to-slate-950",
    accent: "text-blue-400",
    glow: "bg-blue-500/20",
    links: [
      "overview",
      "hod",
      "faculty",
      "syllabus",
      "timetable",
      "labs",
      "placements",
      "activities",
      "events",
      "gallery",
      "contact",
    ],
  },
};

export const NAV_META: Record<
  string,
  { label: string; icon: any; category: string }
> = {
  overview: { label: "Overview", icon: LuLayers, category: "Main" },
  about: { label: "About", icon: LuShieldCheck, category: "Main" },
  hod: { label: "HOD Message", icon: LuUser, category: "Main" },
  faculty: { label: "Faculty Directory", icon: LuUsers, category: "Main" },
  contact: { label: "Contact Info", icon: LuPhone, category: "Main" },

  syllabus: { label: "Syllabus", icon: LuBookOpen, category: "Academic" },
  timetable: {
    label: "Class Routine",
    icon: LuCalendarClock,
    category: "Academic",
  },
  labs: { label: "Laboratories", icon: LuFlaskConical, category: "Academic" },
  projects: {
    label: "Student Projects",
    icon: LuSettings,
    category: "Academic",
  },
  research: { label: "Research", icon: LuAtom, category: "Academic" },

  placements: {
    label: "Placements",
    icon: LuTrophy,
    category: "Student Life",
  },
  activities: {
    label: "Activities",
    icon: LuActivity,
    category: "Student Life",
  },
  events: { label: "Events", icon: LuImage, category: "Student Life" },
  gallery: { label: "Gallery", icon: LuImage, category: "Student Life" },
};
