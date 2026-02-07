import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiArrowRight, FiImage } from "react-icons/fi";
import { LuPin } from "react-icons/lu";

// ✅ UPDATE: Matches your API response exactly
interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: {
    url: string;
    name?: string;
    mimeType?: string;
  } | null;
  categories: string[];
  publishAt: string;
  isPinned: boolean;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function NewsCard({ news }: { news: NewsItem }) {
  // ✅ UPDATE: Safely access the URL
  const imageUrl = news.coverImage?.url;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Pinned Badge */}
      {news.isPinned && (
        <div className="absolute top-3 right-3 z-20 bg-emerald-600 text-white p-1.5 rounded-full shadow-lg">
          <LuPin size={14} fill="currentColor" />
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
            <FiImage size={40} />
            <span className="text-[10px] uppercase font-bold mt-2 tracking-widest opacity-60">
              No Cover Image
            </span>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Tag on Image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {news.categories.slice(0, 2).map((cat, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-slate-800 rounded shadow-xs"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Date */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          <FiCalendar className="text-emerald-500" />
          {formatDate(news.publishAt)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors">
          <Link
            href={`/announcements/news/${news.slug}`}
            className="focus:outline-none"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {news.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-grow leading-relaxed">
          {news.summary}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Article <FiArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
}
