import type { Metadata } from "next";
import Script from "next/script";
import CampusLifeHub from "./CampusLifeHub";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Campus Life at GEC Lakhisarai | Beyond Academics",
  description:
    "Experience the vibrant student life at Government Engineering College, Lakhisarai. From cultural fests and sports tournaments to tech clubs and hostel life.",
  keywords: [
    "GEC Lakhisarai Campus Life",
    "Student Activities",
    "College Fests",
    "Hostel Life Bihar",
    "Engineering College Campus",
    "Sports and Recreation",
  ],
  openGraph: {
    title: "Life at GEC Lakhisarai",
    description:
      "A campus that never sleeps. Explore hostels, mess, sports, and clubs.",
    url: "https://geclakhisarai.ac.in/campus-life",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/gecl/images/campus/campus-life-hero-collage.webp",
        width: 1200,
        height: 630,
        alt: "Students enjoying campus life at GEC Lakhisarai",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA (Hub Links) =====================
const lifeSections = [
  {
    id: "clubs",
    title: "Clubs & Events",
    description:
      "Join the Startup Cell, Robotics Club, or dance to the beats of 'Aagaz'.",
    link: "/campus-life/clubs-events",
    image: "/gecl/images/events/cultural-fest-stage-performance.webp",
    badge: "Vibrant",
  },
  {
    id: "sports",
    title: "Sports & Fitness",
    description:
      "Cricket ground, volleyball courts, and a modern gym for fitness enthusiasts.",
    link: "/campus-life/sports",
    image: "/gecl/images/sports/cricket-football-ground-panoramic.webp",
    badge: "Active",
  },
  {
    id: "food",
    title: "Food & Dining",
    description:
      "Check today's mess menu or grab a quick bite at the college canteen.",
    link: "/campus-life/food",
    image: "/gecl/images/food/student-mess-hall-lunch.webp",
    badge: "Tasty",
  },
  {
    id: "library",
    title: "Central Library",
    description:
      "15,000+ Books, WiFi-enabled reading rooms, and digital resources.",
    link: "/campus-life/library",
    image: "/gecl/images/library/central-library-interior.webp",
    badge: "Quiet",
  },
  {
    id: "labs",
    title: "Labs & Workshops",
    description:
      "High-tech laboratories for CSE, Civil, Mechanical, and Electrical depts.",
    link: "/campus-life/labs",
    image: "/gecl/images/labs/mechanical-workshop-lathe.webp",
    badge: "Tech",
  },
  {
    id: "health",
    title: "Health & Safety",
    description:
      "24/7 Security, Anti-Ragging measures, and medical facilities.",
    link: "/campus-life/health-safety",
    image: "/gecl/images/campus/college-security-gate.webp",
    badge: "Safe",
  },
  {
    id: "hostel",
    title: "Hostel Facilities",
    description: "Secure and comfortable accommodation for Boys and Girls.",
    link: "/campus-life/hostel",
    image: "/gecl/images/campus/hostel-building-exterior.webp",
    badge: "Home",
  },
  {
    id: "academics",
    title: "Academic Facilities",
    description:
      "Smart classrooms and seminar halls designed for modern learning.",
    link: "/campus-life/academic-facilities",
    image: "/gecl/images/academic/smart-classroom-lecture-hall.webp",
    badge: "Smart",
  },
];

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Campus Life at GEC Lakhisarai",
  description:
    "Overview of student facilities including sports, food, clubs, and library.",
  url: "https://geclakhisarai.ac.in/campus-life",
  hasPart: lifeSections.map((section) => ({
    "@type": "WebPage",
    name: section.title,
    url: `https://geclakhisarai.ac.in${section.link}`,
  })),
};

export default function CampusLifePage() {
  return (
    <>
      <Script
        id="campus-life-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampusLifeHub data={lifeSections} />
    </>
  );
}
