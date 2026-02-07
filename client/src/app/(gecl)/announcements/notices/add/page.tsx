import { Metadata } from "next";
import AddNoticeForm from "./AddNoticeForm"; // Client Component
import { Breadcrumb } from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Publish Notice | Admin Console | GEC Lakhisarai",
  description:
    "Administrative portal to publish official notices and circulars.",
};

export default function AddNoticePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "Notices", href: "/announcements/notices/" },
          { label: "Create New" },
        ]}
      />
      <main className="min-h-screen bg-primary text-slate-200 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="mt-8">
            <AddNoticeForm />
          </div>
        </div>
      </main>
    </>
  );
}
