import type { Metadata } from "next";
import {
  NewsTicker,
  HeroSection,
  PrincipalAndNotices,
  LeadershipGallery,
  AcademicDepartments,
  CampusLifePreview,
  CallToAction,
} from "@/gecl/components/home";

export const metadata: Metadata = {
  title:
    "Government Engineering College, Lakhisarai | Dept. of Science & Technology, Bihar",
  description:
    "Official website of GEC Lakhisarai. A premier technical institute established under 'Saat Nischay' by Govt. of Bihar. AICTE Approved & Affiliated to Bihar Engineering University (BEU).",
  keywords: [
    "GEC Lakhisarai",
    "Government Engineering College Bihar",
    "BCECE Admission",
    "JEE Mains Bihar Counselling",
    "B.Tech Civil CSE Electrical Mechanical",
    "DST Bihar Colleges",
  ],
  openGraph: {
    type: "website",
    url: "https://www.geclakhisarai.ac.in",
    title: "GEC Lakhisarai - Govt. of Bihar",
    description:
      "Excellence in Technical Education. AICTE Approved. BEU Affiliated.",
    images: [
      {
        url: "/gecl/images/college-building-main.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HomePage() {
  // JSON-LD for Google Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Government Engineering College, Lakhisarai",
    alternateName: "GEC Lakhisarai",
    url: "https://www.geclakhisarai.ac.in",
    logo: "https://www.geclakhisarai.ac.in/logo.png",
    department: [
      { "@type": "Department", name: "Computer Science & Engineering" },
      { "@type": "Department", name: "Civil Engineering" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lakhisarai",
      addressRegion: "Bihar",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-slate-50 min-h-screen font-sans text-slate-800">
        <NewsTicker />
        <HeroSection />
        <PrincipalAndNotices />
        <AcademicDepartments />
        <LeadershipGallery />
        <CampusLifePreview />
        <CallToAction />
      </main>
    </>
  );
}
