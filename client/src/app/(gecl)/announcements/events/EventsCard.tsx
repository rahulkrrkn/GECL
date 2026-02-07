import Link from "next/link";
import Image from "next/image";
import {
  FiClock,
  FiMapPin,
  FiVideo,
  FiArrowRight,
  FiCalendar,
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
  // Event Specific Fields
  event: {
    mode: "ONLINE" | "OFFLINE" | "HYBRID";
    startDate: string;
    endDate?: string;
    venue?: string;
    meetingLink?: string;
  };
}

// Helper: Get Day/Month for the "Calendar Badge"
const getDateParts = (dateString: string) => {
  const d = new Date(dateString);
  return {
    day: d.getDate(),
    month: d.toLocaleString("default", { month: "short" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
};

export default function EventsCard({ event }: { event: EventItem }) {
  const imageUrl = event.coverImage?.url;
  const { day, month, time } = getDateParts(event.event.startDate);

  // Determine Status
  const now = new Date();
  const start = new Date(event.event.startDate);
  const isPast = start < now;
  const isLive = start <= now && new Date(event.event.endDate || start) >= now;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Pinned Badge */}
      {event.isPinned && (
        <div className="absolute top-3 right-3 z-30 bg-violet-600 text-white p-1.5 rounded-full shadow-lg">
          <LuPin size={14} fill="currentColor" />
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent opacity-70" />

        {/* 📅 CALENDAR DATE BADGE (Absolute on Image) */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-2 text-center min-w-[50px] shadow-lg border border-slate-200 z-20">
          <span className="block text-[10px] font-black text-violet-600 uppercase tracking-wider">
            {month}
          </span>
          <span className="block text-xl font-black text-slate-900 leading-none">
            {day}
          </span>
        </div>

        {/* Status Tag */}
        <div className="absolute bottom-3 left-3">
          {isLive ? (
            <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded animate-pulse">
              Live Now
            </span>
          ) : isPast ? (
            <span className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded">
              Completed
            </span>
          ) : (
            <span className="px-2 py-1 bg-violet-600 text-white text-[10px] font-bold uppercase rounded shadow-lg">
              Upcoming
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta Row: Time & Mode */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-3">
          <div className="flex items-center gap-1.5 text-violet-600">
            <FiClock /> {time}
          </div>
          <div className="flex items-center gap-1.5">
            {event.event.mode === "ONLINE" ? <FiVideo /> : <FiMapPin />}
            <span className="uppercase">{event.event.mode}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight line-clamp-2 group-hover:text-violet-600 transition-colors">
          <Link
            href={`/announcements/events/${event.slug}`}
            className="focus:outline-none"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {event.title}
          </Link>
        </h3>

        {/* Location Text */}
        <p className="text-xs font-medium text-slate-400 mb-3 truncate flex items-center gap-2">
          {event.event.mode === "ONLINE"
            ? "Virtual Event (Link available)"
            : event.event.venue || "Venue TBD"}
        </p>

        {/* Summary */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {event.summary}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1">
            {event.categories.slice(0, 1).map((cat, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase"
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
