// app/academics/faculty/page.tsx
import { Metadata } from "next";
import AllFacultyView from "./AllFacultyView";

export const metadata: Metadata = {
  title: "Expert Faculty Directory | GEC Lakhisarai",
  description:
    "Meet the distinguished faculty of Government Engineering College, Lakhisarai. Dedicated educators in AI, Data Science, Civil, and Mechanical Engineering.",
  alternates: {
    canonical: "https://geclakhisarai.ac.in/academics/faculty",
  },
  openGraph: {
    title: "Faculty Directory | GEC Lakhisarai",
    description:
      "Connect with academic experts and researchers at GEC Lakhisarai.",
    type: "website",
    images: [{ url: "/gecl/images/og-faculty.jpg", width: 1200, height: 630 }],
  },
};

export default function FacultyPage() {
  // Structured Data for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Faculty Members of GEC Lakhisarai",
    description: "List of professors and academic staff at GEC Lakhisarai",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Department of Computer Science (AI & DS)",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Department of Civil Engineering",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AllFacultyView />
    </>
  );
}
