import { cn } from "@/gecl/lib/cn";
import { ReactNode } from "react";

interface StatCardProps {
  number: string; // e.g., "1200+"
  label: string; // e.g., "Students"
  variant?: "primary" | "light"; // Dark bg or Light bg
  className?: string;
  icon?: ReactNode; // ✅ Added to fix the 'icon does not exist' error
}

export default function StatCard({
  number,
  label,
  variant = "light",
  className,
  icon,
}: StatCardProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
        isPrimary
          ? "bg-gecl-primary text-white shadow-lg shadow-blue-900/20"
          : "bg-white border border-slate-100 shadow-sm",
        className,
      )}
    >
      {/* ✅ Icon Rendering logic */}
      {icon && (
        <div
          className={cn(
            "mb-4 inline-flex p-3 rounded-xl",
            isPrimary
              ? "bg-white/10 text-white"
              : "bg-slate-50 text-gecl-primary",
          )}
        >
          {/* If icon is an IconType component, it renders here. 
              If it's <LuAward />, it also renders here. */}
          <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        </div>
      )}

      <div
        className={cn(
          "text-3xl md:text-4xl font-black font-display mb-1 tracking-tight",
          isPrimary ? "text-white" : "text-gecl-primary",
        )}
      >
        {number}
      </div>

      <div
        className={cn(
          "text-[10px] md:text-xs font-bold uppercase tracking-[0.15em]",
          isPrimary ? "text-blue-200" : "text-slate-400",
        )}
      >
        {label}
      </div>
    </div>
  );
}
