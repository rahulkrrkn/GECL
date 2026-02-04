import { Metadata } from "next";
import LoginPage from "./LoginPage"; // Import the client component
import { Breadcrumb } from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Login | Government Engineering College, Lakhisarai",
  description:
    "Secure login portal for GEC Lakhisarai students, faculty, and staff. Access your dashboard, attendance, results, and digital library. Affiliated with Bihar Engineering University.",
  keywords: [
    "GEC Lakhisarai Login",
    "Student Login GEC Lakhisarai",
    "Faculty Login Bihar Engineering",
    "Government Engineering College Lakhisarai Portal",
    "BEU Bihar Login",
    "GEC Lakhisarai ERP",
  ],
  openGraph: {
    title: "GEC Lakhisarai - Digital Campus Login",
    description: "Unified access for Students and Faculty.",
    url: "https://geclakhisarai.ac.in/auth/login",
    siteName: "GEC Lakhisarai",
    images: [
      {
        url: "/gecl/images/college/gecl-campus.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Administrative Block",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Login - GEC Lakhisarai",
  description:
    "Secure authentication gateway for Government Engineering College Lakhisarai.",
  provider: {
    "@type": "CollegeOrUniversity",
    name: "Government Engineering College, Lakhisarai",
    url: "https://geclakhisarai.ac.in",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Login" }]} />
      <LoginPage />
    </>
  );
}
