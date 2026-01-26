import { Navbar } from "@/gecl/components/navbar";
import { Footer } from "@/gecl/components/footer";
import { ContentProtection } from "@/gecl/components/ui";
import type { Metadata, Viewport } from "next";

// ✅ 1. Add Viewport settings to block Zooming (Page Size Change)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Disables pinch-to-zoom
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gecl.rahulkrrkn.com"),
  title: {
    default:
      "Government Engineering College Lakhisarai | Engineering College in Bihar",
    template: "%s | GEC Lakhisarai",
  },
  description:
    "Government Engineering College, Lakhisarai is a public engineering institute...",
  keywords: ["GEC Lakhisarai", "Engineering College Bihar", "B.Tech"],
  authors: [{ name: "Government Engineering College, Lakhisarai" }],
  openGraph: {
    title: "GEC Lakhisarai",
    description: "Official details of GEC Lakhisarai.",
    url: "https://gecl.rahulkrrkn.com",
    siteName: "GEC Lakhisarai",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/gecl/images/college-building-main.webp" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContentProtection />
      <Navbar />
      <main className="select-none"> {children}</main>
      <Footer />
    </>
  );
}
