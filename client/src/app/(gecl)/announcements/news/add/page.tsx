import { Metadata } from "next";
import AddNewsForm from "./AddNewsForm"; // Client Component
import { Breadcrumb } from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Publish News | Admin Console | GEC Lakhisarai",
  description: "Administrative portal to publish official news and updates.",
};

export default function AddNewsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "News", href: "/announcements/news/" },
          { label: "Create Article" },
        ]}
      />
      <main className="min-h-screen bg-primary text-slate-200 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="mt-8">
            <AddNewsForm />
          </div>
        </div>
      </main>
    </>
  );
}
