import { IconType } from "react-icons";
import {
  FaHouse,
  FaCircleInfo,
  FaBuildingColumns,
  FaBullseye,
  FaQuoteLeft,
  FaUsersGear,
  FaGraduationCap,
  FaLayerGroup,
  FaCalendarDays,
  FaScaleBalanced,
  FaShieldHalved,
  FaClipboardUser,
  FaUserPlus,
  FaListCheck,
  FaLaptopFile,
  FaMoneyBillWave,
  FaHandHoldingDollar,
  FaFileContract,
  FaBed,
  FaBarsProgress,
  FaArrowRightToBracket,
  FaChair,
  FaCircleQuestion,
  FaFutbol,
  FaUtensils,
  FaHeartPulse,
  FaUsers,
  FaBookOpen,
  FaFlask,
  FaChalkboardUser,
  FaBridgeWater,
  FaRobot,
  FaDatabase,
  FaBolt,
  FaGear,
  FaBriefcase,
  FaSitemap,
  FaImage,
  FaBuilding,
  FaBus,
  FaWifi,
  FaUserTie,
  FaTimeline,
  FaFilePdf,
  FaPlus,
  FaNewspaper,
} from "react-icons/fa6";

// ✅ Roles (Updated)
export type UserRole =
  | "guest"
  | "student"
  | "hod"
  | "teacher"
  | "vice_principal"
  | "principal"
  | "librarian"
  | "tpo"
  | "alumni"
  | "staff"
  | "admin"
  | "super-admin";

export interface MenuItem {
  label: string;
  href: string;
  icon?: IconType;
  description?: string;
  children?: MenuItem[];
  megaMenu?: boolean;
  roles?: UserRole[];
}

// ✅ Single Menu Config Only (Public + Role Protected)
export const menuConfig: MenuItem[] = [
  // ---------------- PUBLIC MENU ----------------

  // ✅ Home
  {
    label: "Home",
    href: "/",
    icon: FaHouse,
  },

  // ✅ About
  {
    label: "About",
    href: "/about",
    icon: FaCircleInfo,
    children: [
      {
        label: "About College",
        href: "/about/college",
        icon: FaBuilding,
      },
      {
        label: "Principal's Message",
        href: "/about/principal-message",
        icon: FaQuoteLeft,
      },
      {
        label: "Vision & Mission",
        href: "/about/vision-mission",
        icon: FaBullseye,
      },
      {
        label: "Administration",
        href: "/about/administration",
        icon: FaUsersGear,
      },
      {
        label: "Board of Governors (BOG)",
        href: "/about/bog",
        icon: FaUsers,
      },
    ],
  },

  // ✅ Academics
  {
    label: "Academics",
    href: "/academics",
    icon: FaGraduationCap,
    children: [
      {
        label: "Programs Offered",
        href: "/academics/programs",
        icon: FaLayerGroup,
      },
      {
        label: "Syllabus",
        href: "/academics/syllabus",
        icon: FaBookOpen,
      },
      {
        label: "Academic Calendar",
        href: "/academics/calendar",
        icon: FaCalendarDays,
      },
      {
        label: "Class Routine",
        href: "/academics/timetable",
        icon: FaTimeline,
      },
      {
        label: "Rules & Regulations",
        href: "/academics/rules-regulations",
        icon: FaScaleBalanced,
      },
      {
        label: "Attendance Policy",
        href: "/academics/attendance-policy",
        icon: FaClipboardUser,
      },
      {
        label: "Anti-Ragging",
        href: "/academics/anti-ragging",
        icon: FaShieldHalved,
      },
    ],
  },

  // ✅ Departments (Branch-wise)
  {
    label: "Departments",
    href: "/departments",
    icon: FaBuildingColumns,
    children: [
      {
        label: "Civil Engineering",
        href: "/departments/civil",
        icon: FaBridgeWater,
      },
      {
        label: "Computer Science (AI)",
        href: "/departments/cse-ai",
        icon: FaRobot,
      },
      {
        label: "Computer Science (Data Science)",
        href: "/departments/cse-ds",
        icon: FaDatabase,
      },
      {
        label: "Electrical Engineering",
        href: "/departments/electrical",
        icon: FaBolt,
      },
      {
        label: "Mechanical Engineering",
        href: "/departments/mechanical",
        icon: FaGear,
      },
      {
        label: "Applied Science & Humanities",
        href: "/departments/applied-science",
        icon: FaFlask,
      },
    ],
  },

  // ✅ Admissions
  {
    label: "Admissions",
    href: "/admissions",
    icon: FaUserPlus,
    children: [
      {
        label: "Admission Process",
        href: "/admissions/admission-process",
        icon: FaBarsProgress,
      },
      {
        label: "Eligibility Criteria",
        href: "/admissions/eligibility",
        icon: FaListCheck,
      },
      {
        label: "Seat Intake",
        href: "/admissions/seat-intake",
        icon: FaChair,
      },
      {
        label: "Fee Structure",
        href: "/admissions/fee-structure",
        icon: FaMoneyBillWave,
      },
      {
        label: "Scholarships",
        href: "/admissions/scholarships",
        icon: FaHandHoldingDollar,
      },
      {
        label: "Lateral Entry (LE)",
        href: "/admissions/lateral-entry",
        icon: FaArrowRightToBracket,
      },
      {
        label: "Hostel Admission",
        href: "/admissions/hostel-admission",
        icon: FaBed,
      },
      {
        label: "Required Documents",
        href: "/admissions/required-documents",
        icon: FaFileContract,
      },
      {
        label: "FAQ",
        href: "/admissions/faq",
        icon: FaCircleQuestion,
      },
    ],
  },

  // ✅ Campus Life
  {
    label: "Campus Life",
    href: "/campus-life",
    icon: FaBuildingColumns, // Or FaCity
    children: [
      {
        label: "Academic Facilities",
        href: "/campus-life/academic-facilities",
        icon: FaGraduationCap,
      },
      {
        label: "Hostel Facilities",
        href: "/campus-life/hostel",
        icon: FaBed,
      },
      {
        label: "Central Library",
        href: "/campus-life/library",
        icon: FaBookOpen,
      },
      {
        label: "Laboratories",
        href: "/campus-life/labs",
        icon: FaFlask,
      },
      {
        label: "Canteen & Mess",
        href: "/campus-life/food",
        icon: FaUtensils,
      },
      {
        label: "Sports & Fitness",
        href: "/campus-life/sports",
        icon: FaFutbol,
      },
      {
        label: "Clubs & Events",
        href: "/campus-life/clubs-events",
        icon: FaUsers,
      },
      // {
      //   label: "Transport",
      //   href: "/campus-life/transport",
      //   icon: FaBus,
      // },
      {
        label: "Health & Safety",
        href: "/campus-life/health-safety",
        icon: FaHeartPulse,
      },
      // {
      //   label: "Wi-Fi & IT",
      //   href: "/campus-life/wifi",
      //   icon: FaWifi,
      // },
    ],
  },

  // ✅ Placements
  // {
  //   label: "Placements",
  //   href: "/placements",
  //   icon: FaBriefcase,
  //   children: [
  //     {
  //       label: "Training & Placement Cell",
  //       href: "/placements/tpo-cell",
  //       icon: FaUserTie,
  //     },
  //     {
  //       label: "Placement Records",
  //       href: "/placements/records",
  //       icon: FaListCheck,
  //     },
  //     {
  //       label: "Our Recruiters",
  //       href: "/placements/recruiters",
  //       icon: FaHandHoldingDollar,
  //     },
  //   ],
  // },
  {
    label: "Notices",
    href: "/notices",
    icon: FaNewspaper,
    children: [
      {
        roles: ["hod", "principal", "admin", "super-admin"],
        label: "Add Notice",
        href: "/notices/add",
        icon: FaPlus,
      },
    ],
  },

  // ---------------- DEV / ADMIN TOOLS ----------------
  {
    roles: ["teacher", "principal", "admin", "super-admin"],
    label: "Quick Links",
    href: "/links",
    icon: FaSitemap,
  },
  {
    roles: ["teacher", "admin", "super-admin"],
    label: "Asset Gallery",
    href: "/gallery/tracker",
    icon: FaImage,
  },
];
