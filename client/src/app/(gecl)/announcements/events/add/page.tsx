import { Metadata } from "next";
import AddEventsForm from "./AddEventsForm"; // Client Component
import { Breadcrumb } from "@/gecl/components/ui";

export const metadata: Metadata = {
  title: "Publish Event | Admin Console | GEC Lakhisarai",
  description:
    "Administrative portal to schedule official events and seminars.",
};

export default function AddEventPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "Events", href: "/announcements/events/" },
          { label: "Create Event" },
        ]}
      />
      <main className="min-h-screen bg-primary text-slate-200 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="mt-8">
            <AddEventsForm />
          </div>
        </div>
      </main>
    </>
  );
}
