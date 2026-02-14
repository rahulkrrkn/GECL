import Link from "next/link";
import Image from "next/image";
import {
  FiClock,
  FiMapPin,
  FiVideo,
  FiArrowRight,
  FiImage,
} from "react-icons/fi";
import { LuPin } from "react-icons/lu";

// ✅ STRICT TYPE DEFINITION
interface EventItem {
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
  isPinned: boolean;
  event: {
    mode: "ONLINE" | "OFFLINE" | "HYBRID";
    startDate: string;
    endDate?: string;
    venue?: string;
    meetingLink?: string;
  };
}

// ✅ ROBUST DATE HELPER
const getEventStatus = (startStr: string, endStr?: string) => {
  const now = new Date();
  const start = new Date(startStr);
  // If no end date, assume it lasts 2 hours for status calculation
  const end = endStr
    ? new Date(endStr)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  if (now > end) return "COMPLETED";
  if (now >= start && now <= end) return "LIVE";
  return "UPCOMING";
};

const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  return {
    day: d.getDate(),
    // en-US for short month is safer for consistent 3-letter rendering
    month: d.toLocaleString("en-US", { month: "short" }),
    // Force specific 12-hour format to prevent server/client mismatch
    time: d
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase(),
  };
};

export default function EventsCard({ event }: { event: EventItem }) {
  const imageUrl = event.coverImage?.url;
  const { day, month, time } = formatDate(event.event.startDate);
  const status = getEventStatus(event.event.startDate, event.event.endDate);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* 📌 Pinned Badge */}
      {event.isPinned && (
        <div className="absolute top-3 right-3 z-30 bg-violet-600 text-white p-1.5 rounded-full shadow-lg ring-2 ring-white">
          <LuPin size={14} fill="currentColor" />
        </div>
      )}

      {/* 🖼️ Image Section */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            // ✅ PERF: Add sizes to prevent downloading massive images on small cards
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
            <FiImage size={40} />
            <span className="text-[10px] uppercase font-bold mt-2 tracking-widest opacity-60">
              Event
            </span>
          </div>
        )}

        {/* Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-50 transition-opacity" />

        {/* 📅 Date Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2 text-center min-w-[50px] shadow-lg border border-slate-200 z-20">
          <span className="block text-[10px] font-black text-violet-600 uppercase tracking-wider">
            {month}
          </span>
          <span className="block text-xl font-black text-slate-900 leading-none">
            {day}
          </span>
        </div>

        {/* 🚦 Status Tag */}
        <div className="absolute bottom-3 left-3 z-20">
          {status === "LIVE" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded-full animate-pulse shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full" /> Live Now
            </span>
          )}
          {status === "COMPLETED" && (
            <span className="px-2.5 py-1 bg-slate-800/90 backdrop-blur-sm text-slate-300 text-[10px] font-bold uppercase rounded-full border border-slate-700">
              Completed
            </span>
          )}
          {status === "UPCOMING" && (
            <span className="px-2.5 py-1 bg-violet-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase rounded-full shadow-sm">
              Upcoming
            </span>
          )}
        </div>
      </div>

      {/* 📝 Content Section */}
      <div className="p-5 flex flex-col flex-grow relative">
        {/* Meta Row */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-3">
          <div className="flex items-center gap-1.5 text-violet-600 bg-violet-50 px-2 py-1 rounded-md">
            <FiClock /> {time}
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
            {event.event.mode === "ONLINE" ? <FiVideo /> : <FiMapPin />}
            <span className="uppercase">{event.event.mode}</span>
          </div>
        </div>

        {/* Title & Link Overlay */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight line-clamp-2 group-hover:text-violet-600 transition-colors">
          <Link
            href={`/announcements/events/${event.slug}`}
            className="focus:outline-none"
          >
            {/* This span makes the whole card clickable without nesting invalid HTML */}
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {event.title}
          </Link>
        </h3>

        {/* Venue/Location Text */}
        <p className="text-xs font-medium text-slate-400 mb-3 truncate flex items-center gap-2">
          {event.event.mode === "ONLINE"
            ? "Virtual Event (Link available)"
            : event.event.venue || "Venue To Be Announced"}
        </p>

        {/* Summary */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {event.summary}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1 relative z-20">
            {event.categories.slice(0, 1).map((cat, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 rounded font-bold uppercase tracking-wide"
              >
                {cat}
              </span>
            ))}
          </div>

          <span className="text-xs font-bold text-violet-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details <FiArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
}
