import type { Metadata } from "next";
import Script from "next/script";
import ClubsEventsContent from "./ClubsEventsContent";
import { Breadcrumb } from "@/gecl/components/ui";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Clubs, Events & Aagaz Fest | Student Life at GEC Lakhisarai",
  description:
    "Explore student life at GEC Lakhisarai. Join the Startup Cell, Sports Activity Council (SAC), and participate in 'Aagaz' (Annual Fest) and technical workshops like ANSYS & MATLAB.",
  keywords: [
    "GEC Lakhisarai Aagaz Fest",
    "Startup Cell Bihar",
    "Sports Activity Council",
    "ANSYS Workshop",
    "Bihar Diwas Celebration",
    "Fresher's Party",
    "Technical Clubs",
  ],
  openGraph: {
    title: "Vibrant Campus Life | GEC Lakhisarai",
    description:
      "From the 'Aagaz' cultural fest to Startup Cell funding, discover opportunities beyond the classroom.",
    url: "https://geclakhisarai.ac.in/campus-life/clubs-events",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/gecl/images/events/aagaz-college-fest.webp",
        width: 1200,
        height: 630,
        alt: "Students celebrating at Aagaz Annual Fest",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA (Sourced from Newsletters) =====================
const clubsEventsData = {
  clubs: [
    {
      id: "startup",
      name: "Startup Cell",
      description:
        "A government-backed initiative empowering student entrepreneurs. Recently, students were selected for ₹10 Lakh seed funding under the Bihar Startup Policy 2022.",
      icon: "rocket",
    },
    {
      id: "sac",
      name: "Sports Activity Council (SAC)",
      description:
        "The official body managing campus sports. Organizes tournaments for Cricket, Volleyball, and Badminton, and manages the college gym facilities.",
      icon: "trophy",
    },
    {
      id: "training",
      name: "Training & Placement Cell",
      description:
        "Organizes expert talks, 'Hands-on Training' sessions, and soft skill workshops to prepare students for industry role.",
      icon: "briefcase",
    },
    {
      id: "pahal",
      name: "PAHAL (Social Unit)",
      description:
        "A student-led social initiative focusing on community welfare, environmental drives like 'World Environment Day' tree plantations.",
      icon: "hand-heart",
    },
    {
      id: "coding",
      name: "Technical Society",
      description:
        "Focuses on skill development through software workshops like MATLAB, SolidWorks, and QGIS for engineering students.",
      icon: "code",
    },
  ],
  technicalEvents: {
    title: "Technical Workshops & Innovation",
    description:
      "Our academic calendar is packed with industry-relevant workshops to bridge the gap between theory and practice.",
    events: [
      {
        title: "MATLAB & Control Systems",
        date: "Recent",
        desc: "Workshop by EE Dept on Control System Toolbox and project execution.",
      },
      {
        title: "ANSYS & SolidWorks",
        date: "Annual",
        desc: "Mechanical Dept workshop on Finite Element Analysis (FEA) and 3D Modeling.",
      },
      {
        title: "Peak Performance Seminar",
        date: "Guest Lecture",
        desc: "Session by Life Coach Mr. Prakash Chandra on stress management and mental health.",
      },
      {
        title: "Bihar Startup Policy",
        date: "Achievement",
        desc: "Selection of student projects for ₹10 Lakh Seed Funding.",
      },
    ],
    imageSrc: "/gecl/images/events/technical-workshop-lab.webp",
  },
  culturalEvents: {
    title: "Cultural & College Fests",
    description:
      "We celebrate tradition and talent with equal enthusiasm, bringing the entire college family together.",
    events: [
      {
        title: "Aagaz 2.0",
        date: "Annual Fest",
        desc: "The flagship annual college fest featuring music, dance, drama, and art competitions.",
      },
      {
        title: "Bihar Diwas",
        date: "March 22",
        desc: "Grand celebration honoring the state's heritage, with awards presented by the District Magistrate.",
      },
      {
        title: "Saraswati Puja",
        date: "Spring",
        desc: "A campus-wide devotion celebrated with art, decoration, and community feasting.",
      },
      {
        title: "World Environment Day",
        date: "June 5",
        desc: "Tree plantation drives ('Ped Lagao, Paryavaran Bachao') organized by the cells.",
      },
    ],
    imageSrc: "/gecl/images/events/aagaz-cultural-fest.webp",
  },
};

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Aagaz 2.0 Annual Fest",
  location: {
    "@type": "Place",
    name: "Government Engineering College, Lakhisarai",
    address: "Shivsona Road, Kharsari, Lakhisarai, Bihar",
  },
  organizer: {
    "@type": "Organization",
    name: "GEC Lakhisarai",
  },
  description: "Annual cultural and technical festival of GEC Lakhisarai.",
};

export default function ClubsEventsPage() {
  return (
    <>
      <Script
        id="events-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ClubsEventsContent data={clubsEventsData} />
    </>
  );
}
