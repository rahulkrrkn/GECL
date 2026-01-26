import Link from "next/link";
import {
  FiCalendar,
  FiFileText,
  FiImage,
  FiExternalLink,
} from "react-icons/fi";
import { LuPin } from "react-icons/lu";
import { Notice } from "@/types/notice";

// ✅ Date Formatter
const formatDate = (isoString: string) => {
  if (!isoString) return "Date N/A";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date); // e.g. "27 Jan, 2026"
};

const CATEGORY_STYLES: Record<string, string> = {
  EXAM: "bg-red-50 text-red-700 border-red-100",
  ACADEMIC: "bg-blue-50 text-blue-700 border-blue-100",
  GENERAL: "bg-slate-50 text-slate-700 border-slate-100",
  ADMISSION: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export default function NoticeCard({ notice }: { notice: Notice }) {
  const isPDF = notice.attachments.some(
    (a) => a.fileType === "application/pdf",
  );
  const hasFiles = notice.attachments.length > 0;

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden
      ${notice.isPinned ? "border-indigo-200 ring-1 ring-indigo-50 shadow-indigo-100" : "border-slate-200 shadow-sm"}
    `}
    >
      {/* Pinned Indicator */}
      {notice.isPinned && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm z-10">
          <LuPin size={12} fill="currentColor" /> Pinned
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        {/* Header: Source & Date */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
              notice.source === "BEU"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-indigo-50 text-indigo-700 border-indigo-200"
            }`}
          >
            {notice.source}
          </span>

          {/* ✅ Correct Date Display */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <FiCalendar className="text-slate-300" />
            {formatDate(notice.publishAt)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <Link
            href={`/notices/${notice.slug}`}
            className="block group-hover:text-indigo-600 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
              {notice.title}
            </h3>
          </Link>

          <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {notice.content}
          </p>
        </div>

        {/* Footer: Tags & Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${CATEGORY_STYLES[notice.category] || CATEGORY_STYLES.GENERAL}`}
            >
              {notice.category}
            </span>

            {hasFiles && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                {isPDF ? <FiFileText /> : <FiImage />}
                {notice.attachments.length} File
                {notice.attachments.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <Link
            href={`/notices/${notice.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View <FiExternalLink />
          </Link>
        </div>
      </div>
    </div>
  );
}
