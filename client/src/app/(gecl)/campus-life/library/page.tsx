import type { Metadata } from "next";
import Script from "next/script";
import LibraryContent from "./LibraryContent";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Central Library | GEC Lakhisarai",
  description:
    "Explore the Central Library at Government Engineering College, Lakhisarai. Featuring 15,000+ books, KOHA automation, NDL access, and a digital e-library section.",
  keywords: [
    "GEC Lakhisarai Library",
    "College Library Automation",
    "KOHA System",
    "Engineering Textbooks",
    "National Digital Library",
    "Reading Room",
  ],
  openGraph: {
    title: "Knowledge Resource Center | GEC Lakhisarai",
    description:
      "A fully automated library empowering future engineers with vast knowledge resources.",
    url: "https://geclakhisarai.ac.in/campus-life/library",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/gecl/images/library/central-library-interior.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Central Library Reading Room",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA =====================
const libraryData = {
  stats: [
    { label: "Total Volumes", value: "15,000+" },
    { label: "E-Journals", value: "500+" },
    { label: "Seating Capacity", value: "120+" },
    { label: "Automation", value: "KOHA" },
  ],
  sections: [
    {
      id: "circulation",
      title: "Circulation Section",
      description:
        "The core of the library where lending and returning of books takes place. Fully automated using the KOHA Integrated Library Management System (ILMS) and Barcode technology for fast transactions.",
      image: "/gecl/images/library/circulation-counter.webp",
      features: ["Automated Issue/Return", "OPAC Kiosk", "Reference Desk"],
    },
    {
      id: "digital",
      title: "Digital Library & E-Resources",
      description:
        "A dedicated zone with high-speed internet enabled computers. Students can access the National Digital Library of India (NDL), DELNET, and NPTEL video lectures.",
      image: "/gecl/images/library/digital-library-computers.webp",
      features: ["NDL & DELNET Access", "NPTEL Archives", "High-Speed WiFi"],
      link: "/campus-life/labs", // Link to Computer Center
      linkText: "View Computer Center",
    },
    {
      id: "reading",
      title: "Reading Room",
      description:
        "A spacious, well-lit, and peaceful area designed for focused study. It is equipped with comfortable seating and provides easy access to newspapers, magazines, and reference journals.",
      image: "/gecl/images/library/reading-room-students.webp",
      features: [
        "Fully Air-Conditioned",
        "Newspapers & Magazines",
        "Quiet Zone",
      ],
    },
  ],
  timings: {
    weekdays: "10:00 AM - 10:00 PM",
    saturday: "10:00 AM - 10:00 PM",
    closed: "Sundays & Govt. Holidays",
  },
};

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Library",
  name: "Central Library, GEC Lakhisarai",
  image:
    "/gecl/images/library/central-library-interior.webp",
  openingHours: "Mo-Fr 09:00-17:00, Sa 09:00-14:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shivsona Road, Kharsari",
    addressLocality: "Lakhisarai",
    addressRegion: "Bihar",
    postalCode: "811311",
    addressCountry: "IN",
  },
};

export default function LibraryPage() {
  return (
    <>
      <Script
        id="library-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LibraryContent data={libraryData} />
    </>
  );
}
