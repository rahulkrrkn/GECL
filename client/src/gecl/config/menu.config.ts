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
  FaVirus,
  FaUsers,
  FaBook,
  FaMicroscope,
  FaChalkboardUser,
  FaUserTie,
  FaFlask,
  FaBridge,
  FaRobot,
  FaDatabase,
  FaBolt,
  FaGears,
  FaBriefcase,
  FaDiagramProject,
  FaMagnifyingGlass,
  FaImages,
  FaPhone,
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
        icon: FaBuildingColumns,
      },
      {
        label: "Board of Governors (BOG)",
        href: "/about/bog",
        icon: FaUsers,
      },
      {
        label: "Vision & Mission",
        href: "/about/vision-mission",
        icon: FaBullseye,
      },
      {
        label: "Principal's Message",
        href: "/about/principal-message",
        icon: FaQuoteLeft,
      },
      {
        label: "Administration",
        href: "/about/administration",
        icon: FaUsersGear,
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
        label: "Syllabus",
        href: "/academics/syllabus",
        icon: FaBook,
      },
      {
        label: "Class Routine",
        href: "/academics/timetable",
        icon: FaBarsProgress,
      },
      {
        label: "Programs",
        href: "/academics/programs",
        icon: FaLayerGroup,
      },
      {
        label: "Calendar",
        href: "/academics/calendar",
        icon: FaCalendarDays,
      },
      {
        label: "Rules & Regulations",
        href: "/academics/rules-regulations",
        icon: FaScaleBalanced,
      },
      {
        label: "Anti-Ragging",
        href: "/academics/anti-ragging",
        icon: FaShieldHalved,
      },
      {
        label: "Attendance Policy",
        href: "/academics/attendance-policy",
        icon: FaClipboardUser,
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
        label: "Eligibility",
        href: "/admissions/eligibility",
        icon: FaListCheck,
      },
      {
        label: "How to Apply",
        href: "/admissions/how-to-apply",
        icon: FaLaptopFile,
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
        label: "Required Documents",
        href: "/admissions/required-documents",
        icon: FaFileContract,
      },
      {
        label: "Hostel Admission",
        href: "/admissions/hostel-admission",
        icon: FaBed,
      },
      {
        label: "Admission Process",
        href: "/admissions/admission-process",
        icon: FaBarsProgress,
      },
      {
        label: "Lateral Entry (LE)",
        href: "/admissions/lateral-entry",
        icon: FaArrowRightToBracket,
      },
      {
        label: "Seat Intake",
        href: "/admissions/seat-intake",
        icon: FaChair,
      },
      {
        label: "FAQ",
        href: "/admissions/faq",
        icon: FaCircleQuestion,
      },
    ],
  },

  // ✅ Departments (Branch-wise)
  {
    label: "Departments",
    href: "/departments",
    icon: FaBuildingColumns,
    children: [
      //     // ✅ Applied Science
      {
        label: "Applied Science",
        href: "/departments/applied-science",
        icon: FaFlask,
      },

      // ✅ Civil Engineering
      {
        label: "Civil Engineering",
        href: "/departments/civil",
        icon: FaBridge,
      },

      // ✅ CSE - AI
      {
        label: "CSE (AI)",
        href: "/departments/cse-ai",
        icon: FaRobot,
      },

      // ✅ CSE - DS
      {
        label: "CSE (DS)",
        href: "/departments/cse-ds",
        icon: FaDatabase,
      },

      // ✅ Electrical Engineering
      {
        label: "Electrical Engineering",
        href: "/departments/electrical",
        icon: FaBolt,
      },

      // ✅ Mechanical Engineering
      {
        label: "Mechanical Engineering",
        href: "/departments/mechanical",
        icon: FaGears,
      },
    ],
  },

  // ✅ Campus Life
  {
    label: "Campus Life",
    href: "/campus-life",
    icon: FaBuildingColumns,
    children: [
      {
        label: "Hostel",
        href: "/campus-life/hostel",
        icon: FaBed,
      },
      {
        label: "Academic Facilities",
        href: "/campus-life/academic-facilities",
        icon: FaGraduationCap,
      },
      {
        label: "Sports",
        href: "/campus-life/sports",
        icon: FaFutbol,
      },
      {
        label: "Food",
        href: "/campus-life/food",
        icon: FaUtensils,
      },
      {
        label: "Health & Safety",
        href: "/campus-life/health-safety",
        icon: FaVirus,
      },
      {
        label: "Clubs & Events",
        href: "/campus-life/clubs-events",
        icon: FaUsers,
      },
      {
        label: "Library",
        href: "/campus-life/library",
        icon: FaBook,
      },
      {
        label: "Labs",
        href: "/campus-life/labs",
        icon: FaMicroscope,
      },
    ],
  },

  // ✅ All Links
  {
    roles: ["teacher", "principal", "guest"],
    label: "All Links",
    href: "/links",
    icon: FaHouse,
  },
  {
    roles: ["teacher", "guest"],
    label: "All Images",
    href: "/images",
    icon: FaHouse,
  },
];
