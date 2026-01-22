import {
  LuInfo,
  LuGraduationCap,
  LuFileText,
  LuUsers,
  LuBuilding2,
  LuBriefcase,
  LuPhone,
  LuTarget,
  LuUser,
  LuShield,
  LuCalendar,
  LuClipboardList,
  LuDollarSign,
  LuBell,
  LuLibrary,
  LuTrendingUp,
  LuUserCheck,
  LuBuilding,
  LuLayoutDashboard,
  LuClock,
  LuCreditCard,
  LuUpload,
  LuCheck,
  LuSettings,
  LuFilePen,
  LuBook,
  LuSearch,
  LuFileDigit,
  LuBriefcaseBusiness,
  LuNetwork,
} from "react-icons/lu";
import { FiHome } from "react-icons/fi";
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
    icon: LuInfo,
    children: [
      { label: "About College", href: "/about/college", icon: LuBuilding2 },
      {
        label: "Vision & Mission",
        href: "/about/vision-mission",
        icon: LuTarget,
      },
      {
        label: "Principal's Message",
        href: "/about/principal-message",
        icon: LuUser,
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    icon: LuGraduationCap,
    megaMenu: true,
    children: [
      {
        label: "CSE Dept",
        href: "/academics/cse",
        icon: LuGraduationCap,
        description: "Computer Science",
      },
      {
        label: "ECE Dept",
        href: "/academics/ece",
        icon: LuGraduationCap,
        description: "Electronics",
      },
      {
        label: "Civil Dept",
        href: "/academics/ce",
        icon: LuGraduationCap,
        description: "Civil Engineering",
      },
      {
        label: "Mechanical Dept",
        href: "/academics/me",
        icon: LuGraduationCap,
        description: "Mechanical Engineering",
      },
      {
        label: "Syllabus",
        href: "/academics/syllabus",
        icon: LuFileText,
        description: "Download curriculum",
      },
      {
        label: "Academic Calendar",
        href: "/academics/calendar",
        icon: LuCalendar,
        description: "Yearly schedule",
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    icon: LuClipboardList,
    children: [
      { label: "Apply Now", href: "/admissions/apply", icon: LuFilePen },
      { label: "Fee Structure", href: "/admissions/fees", icon: LuDollarSign },
    ],
  },
  {
    label: "Examination",
    href: "/examination",
    icon: LuFileText,
    children: [
      { label: "Notices", href: "/examination/notices", icon: LuBell },
      { label: "Results", href: "/examination/results", icon: LuTrendingUp },
    ],
  },
  {
    label: "Placements",
    href: "/placements",
    icon: LuBriefcase,
    roles: ["guest", "student", "tpo", "admin", "principal", "super-admin"],
    children: [
      {
        label: "Placement Stats",
        href: "/placements/stats",
        icon: LuTrendingUp,
      },
      {
        label: "Recruiters",
        href: "/placements/recruiters",
        icon: LuUserCheck,
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    icon: LuPhone,
  },

  // ---------------- ROLE BASED MENU ----------------

  // ✅ Student
  {
    label: "Student",
    href: "/student",
    icon: LuLayoutDashboard,
    roles: ["student"],
    children: [
      {
        label: "My Dashboard",
        href: "/student/dashboard",
        icon: LuLayoutDashboard,
      },
      {
        label: "Class Attendance",
        href: "/student/attendance",
        icon: LuClock,
      },
      { label: "Exam Results", href: "/student/results", icon: LuTrendingUp },
      { label: "Pay Fees", href: "/student/fees", icon: LuCreditCard },
    ],
  },

  // ✅ Teacher
  {
    label: "Teacher",
    href: "/teacher",
    icon: LuUsers,
    roles: ["teacher"],
    children: [
      {
        label: "Faculty Dashboard",
        href: "/teacher/dashboard",
        icon: LuLayoutDashboard,
      },
      {
        label: "Mark Attendance",
        href: "/teacher/attendance",
        icon: LuCheck,
      },
      {
        label: "Upload Marks",
        href: "/teacher/marks",
        icon: LuFileText,
      },
      {
        label: "Lecture Notes",
        href: "/teacher/notes",
        icon: LuUpload,
      },
    ],
  },

  // ✅ HOD
  {
    label: "HOD",
    href: "/hod",
    icon: LuShield,
    roles: ["hod"],
    children: [
      {
        label: "HOD Dashboard",
        href: "/hod/dashboard",
        icon: LuLayoutDashboard,
      },
      { label: "Dept. Staff", href: "/hod/staff", icon: LuUsers },
      { label: "Approve Leaves", href: "/hod/leaves", icon: LuCheck },
      { label: "Dept. Reports", href: "/hod/reports", icon: LuFileText },
    ],
  },

  // ✅ Principal
  {
    label: "Principal",
    href: "/principal",
    icon: LuUser,
    roles: ["principal"],
    children: [
      {
        label: "Principal Dashboard",
        href: "/principal/dashboard",
        icon: LuLayoutDashboard,
      },
      {
        label: "College Overview",
        href: "/principal/overview",
        icon: LuBuilding2,
      },
      { label: "Staff Management", href: "/principal/staff", icon: LuUsers },
      {
        label: "Financial Reports",
        href: "/principal/finance",
        icon: LuDollarSign,
      },
    ],
  },

  // ✅ Vice Principal
  {
    label: "Vice Principal",
    href: "/vp",
    icon: LuUserCheck,
    roles: ["vice_principal"],
    children: [
      { label: "VP Dashboard", href: "/vp/dashboard", icon: LuLayoutDashboard },
      {
        label: "Academic Supervision",
        href: "/vp/academics",
        icon: LuGraduationCap,
      },
      { label: "Discipline", href: "/vp/discipline", icon: LuShield },
    ],
  },

  // ✅ Librarian
  {
    label: "Library",
    href: "/library",
    icon: LuLibrary,
    roles: ["librarian"],
    children: [
      { label: "Library Panel", href: "/library/dashboard", icon: LuLibrary },
      { label: "Manage Books", href: "/library/books", icon: LuBook },
      {
        label: "Issue/Return",
        href: "/library/circulation",
        icon: LuFileDigit,
      },
      { label: "Book Search", href: "/library/search", icon: LuSearch },
    ],
  },

  // ✅ TPO
  {
    label: "TPO",
    href: "/tpo",
    icon: LuBriefcase,
    roles: ["tpo"],
    children: [
      { label: "TPO Dashboard", href: "/tpo/dashboard", icon: LuBriefcase },
      { label: "Manage Companies", href: "/tpo/companies", icon: LuBuilding },
      {
        label: "Student Applications",
        href: "/tpo/applications",
        icon: LuUserCheck,
      },
      { label: "Placement Drives", href: "/tpo/drives", icon: LuCalendar },
    ],
  },

  // ✅ Alumni
  {
    label: "Alumni",
    href: "/alumni",
    icon: LuBriefcaseBusiness,
    roles: ["alumni"],
    children: [
      { label: "Alumni Profile", href: "/alumni/profile", icon: LuUser },
      { label: "Events", href: "/alumni/events", icon: LuCalendar },
      { label: "Job Board", href: "/alumni/jobs", icon: LuBriefcaseBusiness },
      { label: "Donations", href: "/alumni/donate", icon: LuUserCheck },
    ],
  },

  // ✅ Staff
  {
    label: "Staff",
    href: "/staff",
    icon: LuUsers,
    roles: ["staff"],
    children: [
      {
        label: "Staff Portal",
        href: "/staff/dashboard",
        icon: LuLayoutDashboard,
      },
      { label: "Payroll", href: "/staff/payroll", icon: LuDollarSign },
      { label: "Leave Application", href: "/staff/leave", icon: LuFileText },
    ],
  },

  // ✅ Admin + Super Admin
  {
    label: "Admin",
    href: "/admin",
    icon: LuSettings,
    roles: ["admin", "super-admin"],
    children: [
      { label: "Admin Control", href: "/admin", icon: LuSettings },
      { label: "User Management", href: "/admin/users", icon: LuUsers },
      { label: "Website CMS", href: "/admin/cms", icon: LuNetwork },
      { label: "System Logs", href: "/admin/logs", icon: LuFileDigit },
    ],
  },
];
