import Link from "next/link";
import { LuFileText, LuDownload, LuEye, LuCalendar } from "react-icons/lu";
import { cn } from "@/gecl/lib/cn";

interface FileCardProps {
  title: string;
  subtitle?: string; // e.g., "CSE - 3rd Sem"
  date?: string;
  viewLink?: string;
  downloadLink?: string;
  className?: string;
}

export default function FileCard({
  title,
  subtitle,
  date,
  viewLink,
  downloadLink,
  className,
}: FileCardProps) {
  return (
    <div
      className={cn(
        "group p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-gecl-primary/30 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between",
        className,
      )}
    >
      {/* Icon & Text */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
          <LuFileText className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm md:text-base mb-1 group-hover:text-gecl-primary transition-colors">
            {title}
          </h4>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            {subtitle && (
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-600">
                {subtitle}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1">
                <LuCalendar className="w-3 h-3" /> {date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {viewLink && (
          <Link
            href={viewLink}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-gecl-primary border border-gecl-primary/30 rounded-lg hover:bg-gecl-primary hover:text-white transition-all"
          >
            <LuEye className="w-4 h-4" /> View
          </Link>
        )}
        {downloadLink && (
          <a
            href={downloadLink}
            download
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            <LuDownload className="w-4 h-4" /> Download
          </a>
        )}
      </div>
    </div>
  );
}
