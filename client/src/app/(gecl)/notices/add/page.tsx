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
    <main className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Notices", href: "/admin/notices" },
            { label: "Create New" },
          ]}
        />

        <div className="mt-8">
          <AddNoticeForm />
        </div>
      </div>
    </main>
  );
}
