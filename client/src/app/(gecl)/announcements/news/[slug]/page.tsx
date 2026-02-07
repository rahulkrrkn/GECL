import { Metadata } from "next";
import SingleNewsClient from "./SingleNewsClient";
import { apiRequest } from "@/gecl/utils/apiRequest";

// Match your API response interface
interface NewsItem {
  _id: string;
  title: string;
  summary: string;
  content: string;
  coverImage?: { url: string } | null;
  publishAt: string;
  categories: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Dynamic Metadata for SEO (Server-side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await apiRequest<NewsItem>({
      method: "GET",
      url: `/announcements/news/${slug}`,
    });

    const news = res.data;

    if (!news) return { title: "News Not Found" };

    return {
      title: news.seo?.metaTitle || news.title,
      description: news.seo?.metaDescription || news.summary,
      keywords: news.seo?.keywords?.join(", "),
      openGraph: {
        title: news.seo?.metaTitle || news.title,
        description: news.seo?.metaDescription || news.summary,
        type: "article",
        publishedTime: news.publishAt,
        images: news.coverImage?.url ? [news.coverImage.url] : [],
        url: `https://geclakhisarai.ac.in/announcements/news/${slug}`,
      },
    };
  } catch (error) {
    return { title: "News | GEC Lakhisarai" };
  }
}

// 2. Main Page Entry
export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <SingleNewsClient slug={slug} />;
}
