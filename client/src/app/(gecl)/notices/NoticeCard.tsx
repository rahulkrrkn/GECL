import Link from "next/link";
import {
  FiFileText,
  FiImage,
  FiCalendar,
  FiExternalLink,
} from "react-icons/fi";
import { LuPin } from "react-icons/lu";
import { Notice } from "@/types/notice";

// Helper to format date (Indian Standard)
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function NoticeCard({ notice }: { notice: Notice }) {
  // Determine if attachment is PDF or Image
  const isPDF = notice.attachments.some(
    (a) => a.fileType === "application/pdf",
  );
  const attachmentCount = notice.attachments.length;

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col
      ${
        notice.isPinned
          ? "border-indigo-200 shadow-indigo-100 ring-1 ring-indigo-50"
          : "border-slate-200 shadow-sm"
      }
    `}
    >
      {/* Pinned Badge */}
      {notice.isPinned && (
        <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-full shadow-md z-10">
          <LuPin size={14} fill="currentColor" />
        </div>
      )}

      <div className="p-5 flex flex-col h-full">
        {/* Header Tags & Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            {/* Source Tag: BEU (Amber) vs GECL (Blue) */}
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                notice.source === "BEU"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {notice.source}
            </span>
            {/* Category Tag */}
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border bg-slate-50 text-slate-600 border-slate-200">
              {notice.category}
            </span>
          </div>

          {/* Date Display */}
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <FiCalendar className="text-slate-300" />
            {formatDate(notice.publishAt)}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          <Link href={`/notices/${notice.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {notice.title}
          </Link>
        </h3>

        {/* Content Snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {notice.content}
        </p>

        {/* Footer: Attachments & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            {attachmentCount > 0 ? (
              <>
                {isPDF ? (
                  <FiFileText className="text-red-500" />
                ) : (
                  <FiImage className="text-blue-500" />
                )}
                <span>
                  {attachmentCount} File{attachmentCount > 1 ? "s" : ""}
                </span>
              </>
            ) : (
              <span className="text-slate-400">No Attachments</span>
            )}
          </div>

          <Link href={`/notices/${notice.slug}`} className="focus:outline-none">
            <div className="flex items-center gap-1 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
              Read <FiExternalLink />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
