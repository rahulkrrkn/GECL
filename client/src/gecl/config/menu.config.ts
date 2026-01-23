import {
  FiHome,
  FiInfo,
  FiTarget,
  FiMessageSquare,
  FiUsers,
  FiBook,
  FiLayers,
  FiCalendar,
  FiClock,
  FiFileText,
  FiAlertCircle,
  FiShield,
  FiCheckSquare,
  FiGrid,
} from "react-icons/fi";
import { IconType } from "react-icons";

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
    icon: FiHome,
  },
  {
    label: "About",
    href: "/about",
    icon: FiInfo,
    children: [
      {
        label: "About College",
        href: "/about/college",
        icon: FiGrid,
      },
      {
        label: "Vision & Mission",
        href: "/about/vision-mission",
        icon: FiTarget,
      },
      {
        label: "Principal's Message",
        href: "/about/principal-message",
        icon: FiMessageSquare,
      },
      {
        label: "Administration",
        href: "/about/administration",
        icon: FiUsers,
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    icon: FiBook,
    children: [
      {
        label: "Programs",
        href: "/academics/programs",
        icon: FiLayers,
      },
      {
        label: "Calendar",
        href: "/academics/calendar",
        icon: FiCalendar,
      },
      // {
      //   label: "Timetable",
      //   href: "/academics/timetable",
      //   icon: FiClock,
      // },
      // {
      //   label: "Syllabus",
      //   href: "/academics/syllabus",
      //   icon: FiFileText,
      // },
      {
        label: "Rules & Regulations",
        href: "/academics/rules-regulations",
        icon: FiAlertCircle,
      },
      {
        label: "Anti-Ragging",
        href: "/academics/anti-ragging",
        icon: FiShield,
      },
      {
        label: "Attendance Policy",
        href: "/academics/attendance-policy",
        icon: FiCheckSquare,
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    icon: FiHome,
    children: [
      {
        label: "Eligibility",
        href: "/admissions/eligibility",
        icon: FiHome,
      },
      {
        label: "How to Apply",
        href: "/admissions/how-to-apply",
        icon: FiHome,
      },
      {
        label: "Fee Structure",
        href: "/admissions/fee-structure",
        icon: FiHome,
      },
      {
        label: "Scholarships",
        href: "/admissions/scholarships",
        icon: FiHome,
      },
      {
        label: "Required Documents",
        href: "/admissions/required-documents",
        icon: FiHome,
      },
      {
        label: "Hostel Admission",
        href: "/admissions/hostel-admission",
        icon: FiHome,
      },
      {
        label: "Admission Process",
        href: "/admissions/admission-process",
        icon: FiHome,
      },
      {
        label: "Seat Intake",
        href: "/admissions/seat-intake",
        icon: FiHome,
      },
      {
        label: "FAQ",
        href: "/admissions/faq",
        icon: FiHome,
      },
    ],
  },
];
// /admissions
// /admissions/eligibility
// /admissions/how-to-apply
// /admissions/fee-structure
// /admissions/scholarships
// /admissions/required-documents
// /admissions/hostel-admission
// /admissions/admission-process
// /admissions/seat-intake
// /admissions/faq
