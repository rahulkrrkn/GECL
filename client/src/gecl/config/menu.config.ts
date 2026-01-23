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
  {
    label: "Home",
    href: "/",
    icon: FaHouse,
  },
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
  {
    label: "Academics",
    href: "/academics",
    icon: FaGraduationCap,
    children: [
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
      // {
      //   label: "Timetable",
      //   href: "/academics/timetable",
      //   icon: FaClock,
      // },
      // {
      //   label: "Syllabus",
      //   href: "/academics/syllabus",
      //   icon: FaFileLines,
      // },
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
];
