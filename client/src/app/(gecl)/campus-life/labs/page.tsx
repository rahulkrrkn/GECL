import type { Metadata } from "next";
import Script from "next/script";
import LabsContent from "./LabsContent";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Engineering Laboratories & Workshops | GEC Lakhisarai",
  description:
    "Explore the advanced laboratories at GEC Lakhisarai. Featuring high-tech CSE computer centers, Civil Engineering concrete labs, Mechanical workshops, and Electrical labs.",
  keywords: [
    "GEC Lakhisarai Labs",
    "Civil Engineering Lab",
    "Computer Science Lab",
    "Mechanical Workshop",
    "Electrical Engineering Lab",
    "Fluid Mechanics Lab",
    "Engineering Physics Lab",
  ],
  openGraph: {
    title: "Advanced Engineering Labs | GEC Lakhisarai",
    description:
      "Hands-on learning with modern equipment and safety standards.",
    url: "https://geclakhisarai.ac.in/campus-life/labs",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/gecl/images/labs/mechanical-workshop-lathe.webp",
        width: 1200,
        height: 630,
        alt: "Students working on Lathe Machine in Mechanical Workshop",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA =====================
const labsData = {
  cse: {
    name: "Computer Science & Engg.",
    description:
      "Equipped with high-performance workstations and cloud servers for programming, AI, and web development.",
    labs: [
      {
        name: "Programming Lab (C/C++/Python)",
        equipment: [
          "i7 Workstations",
          "Linux/Windows Dual Boot",
          "GCC Compilers",
        ],
        image: "/gecl/images/labs/cse-programming-lab.webp",
      },
      {
        name: "Database & Web Tech Lab",
        equipment: [
          "Oracle/MySQL Servers",
          "Apache Tomcat",
          "High-Speed Internet",
        ],
        image: "/gecl/images/labs/cse-database-lab.webp",
      },
      {
        name: "Hardware & Networking Lab",
        equipment: [
          "Microprocessor Kits (8085/8086)",
          "LAN Trainers",
          "Router Config Kits",
        ],
        image: "/gecl/images/labs/cse-hardware-lab.webp",
      },
    ],
  },
  civil: {
    name: "Civil Engineering",
    description:
      "Focuses on material testing, soil mechanics, and surveying with industry-standard instruments.",
    labs: [
      {
        name: "Concrete Technology Lab",
        equipment: [
          "Compression Testing Machine (CTM)",
          "Slump Cone",
          "Vibrating Table",
        ],
        image: "/gecl/images/labs/civil-concrete-lab.webp",
      },
      {
        name: "Surveying Lab",
        equipment: [
          "Total Station",
          "Theodolites",
          "Dumpy Levels",
          "GPS Units",
        ],
        image: "/gecl/images/labs/civil-survey-lab.webp",
      },
      {
        name: "Soil Mechanics Lab",
        equipment: [
          "Casagrande Apparatus",
          "Triaxial Shear Test Setup",
          "Permeability Meter",
        ],
        image: "/gecl/images/labs/civil-soil-lab.webp",
      },
    ],
  },
  mech: {
    name: "Mechanical Engineering",
    description:
      "A hub of machinery and thermal engineering setups for hands-on manufacturing and fluid dynamics experience.",
    labs: [
      {
        name: "Central Workshop",
        equipment: [
          "Lathe Machines",
          "Drilling Machines",
          "Welding Stations (Arc/Gas)",
          "Carpentry Tools",
        ],
        image: "/gecl/images/labs/mechanical-workshop.webp",
      },
      {
        name: "Fluid Mechanics Lab",
        equipment: [
          "Pelton Wheel Turbine",
          "Francis Turbine",
          "Venturimeter Setup",
        ],
        image: "/gecl/images/labs/mechanical-fluid-lab.webp",
      },
      {
        name: "Thermodynamics & IC Engine",
        equipment: [
          "4-Stroke Diesel Engine Model",
          "Boiler Models",
          "Heat Transfer Setup",
        ],
        image: "/gecl/images/labs/mechanical-thermo-lab.webp",
      },
    ],
  },
  eee: {
    name: "Electrical & Electronics",
    description:
      "Advanced setups for circuit design, power systems analysis, and analog/digital electronics.",
    labs: [
      {
        name: "Basic Electrical Engg. Lab",
        equipment: [
          "Transformers",
          "DC Motors",
          "Function Generators",
          "Multimeters",
        ],
        image: "/gecl/images/labs/eee-basic-lab.webp",
      },
      {
        name: "Analog & Digital Electronics",
        equipment: [
          "Cathode Ray Oscilloscopes (CRO)",
          "Logic Gate Trainers",
          "Breadboards",
        ],
        image: "/gecl/images/labs/eee-digital-lab.webp",
      },
      {
        name: "Power Systems Lab",
        equipment: [
          "Transmission Line Simulators",
          "Relay Testing Kits",
          "Circuit Breakers",
        ],
        image: "/gecl/images/labs/eee-power-lab.webp",
      },
    ],
  },
  science: {
    name: "Basic Sciences",
    description:
      "Foundational laboratories for 1st-year students covering Physics and Chemistry.",
    labs: [
      {
        name: "Engineering Physics Lab",
        equipment: [
          "Laser Setup",
          "Optical Fiber Kits",
          "Newton’s Ring Apparatus",
        ],
        image: "/gecl/images/labs/physics-lab.webp",
      },
      {
        name: "Engineering Chemistry Lab",
        equipment: [
          "Titration Setup",
          "pH Meters",
          "Distillation Units",
          "Chemical Reagents",
        ],
        image: "/gecl/images/labs/chemistry-lab.webp",
      },
    ],
  },
};

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Government Engineering College, Lakhisarai",
  department: Object.values(labsData).map((dept) => ({
    "@type": "Laboratory",
    name: `${dept.name} Laboratories`,
    description: dept.description,
  })),
};

export default function LabsPage() {
  return (
    <>
      <Script
        id="labs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LabsContent data={labsData} />
    </>
  );
}
