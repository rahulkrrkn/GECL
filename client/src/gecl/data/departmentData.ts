import {
  FaBuilding,
  FaLaptopCode,
  FaDatabase,
  FaBolt,
  FaCogs,
  FaFlask,
} from "react-icons/fa";

export const departments = {
  civil: {
    name: "Civil Engineering",
    code: "CE",
    icon: FaBuilding,
    hod: "Prof. Murari Kumar",
    description:
      "Focusing on infrastructure, structural engineering, and sustainable development.",
    stats: { students: 240, faculty: 12, labs: 8 },
  },
  "cse-ai": {
    name: "Computer Science (AI)",
    code: "CSE-AI",
    icon: FaLaptopCode,
    hod: "Prof. Abhimanyu Kumar",
    description:
      "Advanced computing focused on Artificial Intelligence and Machine Learning.",
    stats: { students: 240, faculty: 10, labs: 6 },
  },
  "cse-ds": {
    name: "Computer Science (Data Science)",
    code: "CSE-DS",
    icon: FaDatabase,
    hod: "Prof. [Name Needed]",
    description:
      "Big Data analytics, statistical modeling, and database management.",
    stats: { students: 120, faculty: 8, labs: 4 },
  },
  mechanical: {
    name: "Mechanical Engineering",
    code: "ME",
    icon: FaCogs,
    hod: "Prof. Raushan Kumar",
    description:
      "Core engineering covering thermodynamics, manufacturing, and robotics.",
    stats: { students: 240, faculty: 14, labs: 10 },
  },
  electrical: {
    name: "Electrical Engineering",
    code: "EE",
    icon: FaBolt,
    hod: "Prof. [Name Needed]",
    description: "Power systems, circuit theory, and control systems.",
    stats: { students: 240, faculty: 12, labs: 8 },
  },
  "applied-science": {
    name: "Applied Science",
    code: "BSH",
    icon: FaFlask,
    hod: "Prof. [Name Needed]",
    description: "Foundation courses: Physics, Chemistry, Math, and English.",
    stats: { students: 300, faculty: 15, labs: 4 },
  },
};

// Menu links common to all departments
export const getDeptLinks = (slug: string) => [
  { label: "About & HOD", href: `/departments/${slug}` },
  { label: "Faculty", href: `/departments/${slug}/faculty` },
  { label: "Syllabus", href: `/departments/${slug}/syllabus` },
  { label: "Labs", href: `/departments/${slug}/labs` },
  { label: "Timetable", href: `/departments/${slug}/timetable` },
  { label: "Placements", href: `/departments/${slug}/placements` }, // BSH might hide this
  { label: "Events & Gallery", href: `/departments/${slug}/events` },
  { label: "Contact", href: `/departments/${slug}/contact` },
];
