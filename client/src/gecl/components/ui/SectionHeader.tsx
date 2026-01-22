import { IconType } from "react-icons";
import { cn } from "@/gecl/lib/cn";

interface SectionHeaderProps {
  title: string;
  icon: IconType;
  className?: string;
}

export default function SectionHeader({
  title,
  icon: Icon,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 mb-6 pb-4 border-b border-slate-200",
        className,
      )}
    >
      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-gecl-primary">{title}</h2>
    </div>
  );
}
