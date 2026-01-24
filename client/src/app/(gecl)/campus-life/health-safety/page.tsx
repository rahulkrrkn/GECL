import type { Metadata } from "next";
import Script from "next/script";
import HealthSafetyContent from "./HealthSafetyContent";
import { Breadcrumb } from "@/gecl/components/ui";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Health, Safety & Anti-Ragging | GEC Lakhisarai",
  description:
    "Information on campus health services, 24/7 security, discipline rules, and our Zero-Tolerance Anti-Ragging policy at Government Engineering College, Lakhisarai.",
  keywords: [
    "GEC Lakhisarai Medical Facility",
    "Anti-Ragging Helpline",
    "Campus Security",
    "Student Safety",
    "Discipline Rules",
    "Emergency Contacts",
  ],
  openGraph: {
    title: "Safe & Secure Campus | GEC Lakhisarai",
    description:
      "Prioritizing student well-being with round-the-clock security and anti-ragging measures.",
    url: "https://geclakhisarai.ac.in/campus-life/health-safety",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/gecl/images/campus/college-security-gate.webp",
        width: 1200,
        height: 630,
        alt: "Security Checkpoint at GEC Lakhisarai",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA =====================
const healthSafetyData = {
  medical: {
    title: "Medical & First Aid",
    description:
      "The college maintains a basic health unit to handle minor ailments and first-aid emergencies during college hours. While we focus on immediate primary care, the college has arrangements with the nearby District Sadar Hospital, Lakhisarai, for any advanced medical requirements or emergencies.",
    features: [
      "First Aid Kits in Depts",
      "Visiting Medical Officer",
      "Ambulance on Call (District)",
      "Basic Medicines Available",
    ],
    imageSrc: "/gecl/images/campus/basic-medical-room.webp",
  },
  ragging: {
    title: "Anti-Ragging Cell",
    description:
      "GEC Lakhisarai has a ZERO TOLERANCE policy towards ragging. Ragging is strictly prohibited inside and outside the college campus. We follow the AICTE and UGC guidelines rigorously. Any student found guilty will face severe disciplinary action, including rustication and police FIR.",
    helpline: "1800-180-5522 (National Helpline)",
    email: "helpline@antiragging.in",
    imageSrc: "/gecl/images/campus/anti-ragging-poster.webp",
  },
  security: {
    title: "Security & Discipline",
    description:
      "To ensure a safe learning environment, the campus is under 24/7 surveillance. A team of dedicated security guards monitors all entry and exit points. Discipline is the core of our institution, and students are expected to adhere to the code of conduct at all times.",
    features: [
      "24/7 Security Guards",
      "CCTV Surveillance",
      "ID Card Compulsory",
      "Night Patrolling (Hostels)",
    ],
    imageSrc: "/gecl/images/campus/campus-cctv-security.webp",
  },
};

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Government Engineering College, Lakhisarai",
  url: "https://geclakhisarai.ac.in",
  department: [
    {
      "@type": "EmergencyService",
      name: "Anti-Ragging Committee",
      telephone: "1800-180-5522",
    },
    {
      "@type": "MedicalClinic",
      name: "GEC First Aid Center",
      description: "Basic First Aid Facility",
    },
  ],
};

export default function HealthSafetyPage() {
  return (
    <>
      <Script
        id="health-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HealthSafetyContent data={healthSafetyData} />
    </>
  );
}
