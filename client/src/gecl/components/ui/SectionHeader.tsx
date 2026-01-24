import { IconType } from "react-icons";
import { cn } from "@/gecl/lib/cn";

interface SectionHeaderProps {
  title: string;
  icon?: IconType; // Made optional with '?'
  subtitle?: string; // Added subtitle support to match the AboutHubPage UI
  className?: string;
}

export default function SectionHeader({
  title,
  icon: Icon,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 mb-8 pb-4 border-b border-slate-200",
        className,
      )}
    >
      {/* Only render the icon container if an icon is provided */}
      {Icon && (
        <div className="p-2.5 bg-slate-100 rounded-xl text-indigo-600 shadow-inner shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}

      <div className="flex flex-col">
        <h2 className="text-2xl md:text-3xl font-black text-gecl-primary tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-500 text-sm mt-1 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
