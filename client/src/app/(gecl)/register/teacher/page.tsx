// app/auth/register/teacher/page.tsx
import { Metadata } from "next";
import TeacherRegisterForm from "./TeacherRegisterForm";
import { Breadcrumb } from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Faculty Registration | Government Engineering College, Lakhisarai",
  description:
    "Official teacher registration portal for GEC Lakhisarai. Join the faculty of Bihar's premier engineering institute. Affiliated with Bihar Engineering University.",
  keywords: [
    "GEC Lakhisarai",
    "Faculty Registration",
    "Engineering College Bihar",
    "Government Engineering College Lakhisarai",
    "Teacher Recruitment",
    "Bihar Engineering University",
  ],
  openGraph: {
    title: "Join the Faculty at GEC Lakhisarai",
    description:
      "Register as a Professor, Assistant Professor, or Guest Lecturer.",
    images: ["/gecl/images/college/gecl-campus.webp"],
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {" "}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Register" },
          { label: "Teacher" },
        ]}
      />
      <TeacherRegisterForm />;
    </>
  );
}
