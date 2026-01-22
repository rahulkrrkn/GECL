import { IconType } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";
import { cn } from "@/gecl/lib/cn";

interface FeatureItemProps {
  text: string;
  title?: string; // Optional title (e.g., "75% Rule")
  icon?: IconType;
  variant?: "default" | "warning" | "success";
  className?: string;
}

export default function FeatureItem({
  text,
  title,
  icon: Icon = FaCheckCircle,
  variant = "default",
  className,
}: FeatureItemProps) {
  const colors = {
    default: "text-gecl-primary",
    warning: "text-red-500",
    success: "text-green-500",
  };

  return (
    <div
      className={cn(
        "flex gap-3 items-start p-3 rounded-lg hover:bg-slate-50 transition-colors",
        className,
      )}
    >
      <div className={cn("mt-0.5 flex-shrink-0", colors[variant])}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        {title && (
          <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
        )}
        <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
