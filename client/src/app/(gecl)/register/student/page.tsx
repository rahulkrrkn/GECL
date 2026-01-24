import { Metadata } from "next";
import StudentRegisterForm from "./StudentRegisterForm"; // Importing the client component
import { Breadcrumb } from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Student Registration | Government Engineering College, Lakhisarai",
  description:
    "Official B.Tech student registration portal for Government Engineering College, Lakhisarai (GEC Lakhisarai). Create your digital identity for academic access.",
  keywords: [
    "GEC Lakhisarai Student Portal",
    "Student Registration GEC Lakhisarai",
    "B.Tech Admission Bihar",
    "Government Engineering College Lakhisarai",
    "Bihar Engineering University Student Login",
    "GEC Lakhisarai CSE ECE Civil Mechanical",
  ],
  openGraph: {
    title: "Student Registration - GEC Lakhisarai",
    description: "Join the digital campus. Access course materials, library",
    url: "https://geclakhisarai.ac.in/auth/register/student",
    siteName: "GEC Lakhisarai Official Portal",
    images: [
      {
        url: "/gecl/images/college/gecl-campus.webp",
        width: 1200,
        height: 630,
        alt: "GEC Lakhisarai Campus",
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

export default function StudentRegistrationPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Register" },
          { label: "Student" },
        ]}
      />
      <StudentRegisterForm />;
    </>
  );
}
