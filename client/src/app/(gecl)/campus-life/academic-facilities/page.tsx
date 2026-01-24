import type { Metadata } from "next";
import Script from "next/script";
import AcademicFacilitiesContent from "./AcademicFacilitiesContent";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Academic Facilities & Infrastructure | GEC Lakhisarai",
  description:
    "Explore the academic infrastructure at GEC Lakhisarai: Central Library, Computer Center, specialized Engineering Labs, and Smart Classrooms designed for technical excellence.",
  keywords: [
    "Central Library GEC Lakhisarai",
    "Computer Center",
    "Civil Engineering Labs",
    "Mechanical Workshops",
    "Smart Classrooms",
    "Seminar Hall",
    "College Infrastructure Bihar",
    "Engineering Syllabus",
  ],
  openGraph: {
    title: "World-Class Academic Facilities | GEC Lakhisarai",
    description:
      "State-of-the-art labs, digital library, and smart learning environments.",
    url: "https://geclakhisarai.ac.in/campus-life/academic-facilities",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/gecl/images/academic/academic-block-building-exterior.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Academic Infrastructure",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA (With Internal Links) =====================
const facilitiesData = [
  {
    id: "library",
    title: "Central Library",
    subtitle: "Knowledge Resource Center",
    description:
      "The Central Library is the intellectual heart of GEC Lakhisarai. Spanning over 400 sq. meters, it is fully automated using KOHA Integrated Library Management System. It houses a rich collection of engineering textbooks, reference materials, and national/international journals.",
    imageSrc: "/gecl/images/academic/central-library-reading-room.webp",
    imageAlt: "Students studying in the Central Library reading room",
    link: "/campus-life/library", // ✅ Internal Link
    features: [
      "15,000+ Volumes",
      "Wi-Fi Enabled Reading Room",
      "Digital E-Learning Section",
      "RFID Security System",
    ],
  },
  {
    id: "computer-center",
    title: "Central Computer Center",
    subtitle: "High-Performance Computing Hub",
    description:
      "Our centralized Computer Center serves as the technological backbone. It features over 150 latest configuration workstations (Intel i7/i5) connected via high-speed Gigabit Ethernet. Operational 24/7 for research, coding competitions, and online examinations.",
    imageSrc: "/gecl/images/academic/central-computer-center-lab.webp",
    imageAlt: "High-tech computer lab with students coding",
    link: "/campus-life/labs", // ✅ Internal Link
    features: [
      "150+ Workstations",
      "1 Gbps NKN Internet",
      "MATLAB & AutoCAD Installed",
      "UPS Power Backup",
    ],
  },
  {
    id: "laboratories",
    title: "Departmental Laboratories",
    subtitle: "Bridging Theory & Practice",
    description:
      "We believe in 'Learning by Doing'. GEC Lakhisarai boasts specialized laboratories for Civil, Mechanical, Electrical, and CSE departments. Every facility is equipped with precision instruments and industry-grade machinery to ensure students gain hands-on expertise.",
    imageSrc: "/gecl/images/academic/mechanical-civil-engineering-lab.webp",
    imageAlt:
      "Engineering students working on machinery in the Mechanical Workshop",
    link: "/campus-life/labs", // ✅ Internal Link
    features: [
      "Advanced Surveying Lab",
      "High-Voltage Lab",
      "IoT & Robotics Lab",
      "Material Testing Lab",
    ],
  },
  {
    id: "classrooms",
    title: "Smart Classrooms",
    subtitle: "Modern Learning Environment",
    description:
      "Our academic complex features spacious, amphitheater-style lecture halls designed for optimal acoustics and visibility. Select classrooms are upgraded to 'Smart Classrooms' featuring interactive smart boards and audio-visual systems.",
    imageSrc: "/gecl/images/academic/smart-classroom-lecture-hall.webp",
    imageAlt: "Modern smart classroom with projector and stepped seating",
    features: [
      "Multimedia Projectors",
      "Interactive Smart Boards",
      "Step-Tiered Seating",
      "CCTV Surveillance",
    ],
  },
  {
    id: "seminar-hall",
    title: "Seminar Hall",
    subtitle: "Conference & Events Venue",
    description:
      "The institute houses a fully air-conditioned Seminar Hall with a seating capacity of 250+. It is the venue for national conferences, expert guest lectures, workshops, and pre-placement talks.",
    imageSrc: "/gecl/images/academic/seminar-hall-auditorium.webp",
    imageAlt: "GEC Lakhisarai Seminar Hall and Auditorium",
    features: [
      "250+ Seating Capacity",
      "Central Air Conditioning",
      "Premium Audio System",
      "Video Conferencing Ready",
    ],
  },
];

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Government Engineering College, Lakhisarai",
  url: "https://geclakhisarai.ac.in",
  amenityFeature: facilitiesData.map((item) => ({
    "@type": "LocationFeatureSpecification",
    name: item.title,
    value: "True",
    image: `https://geclakhisarai.ac.in${item.imageSrc}`,
  })),
};

export default function AcademicFacilitiesPage() {
  return (
    <>
      <Script
        id="academic-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AcademicFacilitiesContent data={facilitiesData} />
    </>
  );
}
