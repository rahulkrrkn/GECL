import type { Metadata } from "next";
import Script from "next/script";
import SportsContent from "./SportsContent";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Sports, Gym & Fitness Facilities | GEC Lakhisarai",
  description:
    "Explore the sports infrastructure at GEC Lakhisarai: A full-size cricket & football ground, indoor games hall, yoga center, and a modern gymnasium for students.",
  keywords: [
    "GEC Lakhisarai Gym",
    "College Cricket Ground",
    "Football Field Bihar",
    "Indoor Sports Complex",
    "Table Tennis Hall",
    "Fitness Center",
    "Yoga Studio",
    "Student Activities",
  ],
  openGraph: {
    title: "Sports & Fitness Hub | GEC Lakhisarai",
    description:
      "Holistic development with world-class outdoor grounds and indoor fitness studios.",
    url: "https://geclakhisarai.ac.in/campus-life/sports",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/gecl/images/sports/college-gymnasium-interior.webp",
        width: 1200,
        height: 630,
        alt: "Modern Gymnasium at GEC Lakhisarai",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA (Reordered) =====================
const sportsData = [
  {
    id: "outdoor-games",
    title: "Outdoor Sports Complex",
    subtitle: "Field of Dreams",
    description:
      "The college boasts a sprawling main playground dedicated to outdoor sports. It serves as the central hub for inter-year tournaments and the annual sports meet 'Umang'. The ground is well-maintained and supports multiple sports simultaneously, fostering team spirit and physical endurance among future engineers.",
    imageSrc: "/gecl/images/sports/cricket-football-ground-panoramic.webp",
    imageAlt: "Panoramic view of GEC Lakhisarai cricket and football ground",
    features: [
      "Full-size Cricket Pitch",
      "Football Field",
      "Volleyball Courts",
      "Badminton Courts",
    ],
  },
  {
    id: "indoor-games",
    title: "Indoor Games Hall",
    subtitle: "Strategy & Focus",
    description:
      "Located within the Student Activity Center, the Indoor Games Hall provides a recreational escape. It is equipped with professional-grade table tennis tables, carrom boards, and chess stations, allowing students to sharpen their mental acuity and reflexes regardless of the weather.",
    imageSrc: "/gecl/images/sports/indoor-games-hall-table-tennis.webp",
    imageAlt: "Students playing Table Tennis in the indoor games hall",
    features: [
      "Pro Table Tennis Tables",
      "Carrom Boards",
      "Chess Stations",
      "Recreation Lounge",
    ],
  },
  {
    id: "wellness",
    title: "Yoga & Wellness Center",
    subtitle: "Mind & Body Balance",
    description:
      "To promote mental well-being alongside physical fitness, the college provides a dedicated Yoga and Aerobics space. This calm, well-ventilated area is used for morning yoga sessions, meditation workshops, and fitness drills, helping students manage stress and maintain a healthy lifestyle.",
    imageSrc: "/gecl/images/sports/yoga-wellness-center-interior.webp",
    imageAlt: "Yoga mats and fitness balls in the wellness center",
    features: [
      "Yoga Mats & Props",
      "Meditation Area",
      "Aerobics Space",
      "Sound System",
    ],
  },
  // ✅ GYM MOVED TO LAST
  {
    id: "gymnasium",
    title: "Modern Gymnasium",
    subtitle: "Strength & Cardio Zone",
    description:
      "GEC Lakhisarai features a fully equipped modern gymnasium for students and faculty. The facility includes a dedicated cardio zone with treadmills and spin bikes, alongside a strength training area featuring multi-station machines, free weights, and dumbbells to ensure a complete workout experience.",
    imageSrc: "/gecl/images/sports/college-gymnasium-cardio-weights.webp",
    imageAlt:
      "Students working out in the college gym with treadmills and weights",
    features: [
      "Heavy Duty Treadmills",
      "Multi-Station Gym",
      "Free Weights Zone",
      "Cross-Trainers",
    ],
  },
];

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "GEC Lakhisarai Sports Complex",
  url: "https://geclakhisarai.ac.in/campus-life/sports",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shivsona Road, Kharsari",
    addressLocality: "Lakhisarai",
    addressRegion: "Bihar",
    postalCode: "811311",
    addressCountry: "IN",
  },
  amenityFeature: sportsData.map((item) => ({
    "@type": "LocationFeatureSpecification",
    name: item.title,
    value: "True",
    image: `https://geclakhisarai.ac.in${item.imageSrc}`,
  })),
};

export default function SportsPage() {
  return (
    <>
      <Script
        id="sports-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SportsContent data={sportsData} />
    </>
  );
}
