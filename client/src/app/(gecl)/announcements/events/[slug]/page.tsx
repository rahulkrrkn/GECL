import { Metadata } from "next";
import SingleEventClient from "./SingleEventsClient";
import { apiRequest } from "@/gecl/utils/apiRequest";

// Match API response for Events
interface EventItem {
  _id: string;
  title: string;
  summary: string;
  content: string;
  coverImage?: { url: string } | null;
  categories: string[];
  event: {
    mode: "ONLINE" | "OFFLINE" | "HYBRID";
    startDate: string;
    endDate?: string;
    venue?: string;
    meetingLink?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await apiRequest<EventItem>({
      method: "GET",
      url: `/announcements/events/${slug}`,
    });

    const event = res.data;

    if (!event) return { title: "Event Not Found" };

    return {
      title: event.seo?.metaTitle || event.title,
      description: event.seo?.metaDescription || event.summary,
      keywords: event.seo?.keywords?.join(", "),
      openGraph: {
        title: event.seo?.metaTitle || event.title,
        description: event.seo?.metaDescription || event.summary,
        type: "website",
        images: event.coverImage?.url ? [event.coverImage.url] : [],
        url: `https://geclakhisarai.ac.in/announcements/events/${slug}`,
      },
    };
  } catch (error) {
    return { title: "Event | GEC Lakhisarai" };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <SingleEventClient slug={slug} />;
}
