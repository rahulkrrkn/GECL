import { Navbar } from "@/gecl/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://gecl.rahulkrrkn.com"),
  title: {
    default:
      "Government Engineering College Lakhisarai | Engineering College in Bihar",
    template: "%s | GEC Lakhisarai",
  },
  description:
    "Government Engineering College, Lakhisarai is a public engineering institute established in 2019 in Bihar, offering B.Tech programs including Civil, Mechanical, Electrical, Data Science and AI. Approved by AICTE and affiliated with Bihar Engineering University.",
  keywords: [
    "Government Engineering College Lakhisarai",
    "GEC Lakhisarai",
    "Engineering College Bihar",
    "B.Tech in Bihar",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Computer Science Data Science",
    "AI Engineering",
  ],
  authors: [{ name: "Government Engineering College, Lakhisarai" }],
  creator: "Government Engineering College Lakhisarai",
  openGraph: {
    title:
      "Government Engineering College, Lakhisarai — Engineering College in Bihar",
    description:
      "Official details, courses, admissions, and overview of Government Engineering College in Lakhisarai, Bihar — public AICTE-approved technical institute established in 2019.",
    url: "https://gecl.rahulkrrkn.com",
    siteName: "GEC Lakhisarai",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
