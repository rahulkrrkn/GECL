import { Metadata } from "next";
import SingleNoticeClient from "./SingleNoticeClient";
import { apiRequest } from "@/gecl/utils/apiRequest";
import { Notice } from "@/types/notice";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Dynamic Metadata for SEO (Server-side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await apiRequest<Notice>({
      method: "GET",
      url: `/announcements/notices/${slug}`,
    });

    const notice = res.data;

    if (!notice) return { title: "Notice Not Found" };

    return {
      title: notice.seo?.metaTitle || notice.title,
      description:
        notice.seo?.metaDescription || notice.content.substring(0, 160),
      keywords: notice.seo?.keywords?.join(", "),
      openGraph: {
        title: notice.seo?.metaTitle || notice.title,
        description:
          notice.seo?.metaDescription || notice.content.substring(0, 160),
        type: "article",
        publishedTime: notice.publishAt,
        url: `https://geclakhisarai.ac.in/announcements/notices/${slug}`,
      },
    };
  } catch (error) {
    return { title: "Notice | GEC Lakhisarai" };
  }
}

// 2. Main Page Entry
export default async function Page({ params }: Props) {
  const { slug } = await params; // Resolve the async params

  return <SingleNoticeClient slug={slug} />;
}
