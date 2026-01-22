import { cn } from "@/gecl/lib/cn";

interface StatCardProps {
  number: string; // e.g., "1200+"
  label: string; // e.g., "Students"
  variant?: "primary" | "light"; // Dark bg or Light bg
  className?: string;
}

export default function StatCard({
  number,
  label,
  variant = "light",
  className,
}: StatCardProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "text-center p-4 rounded-xl transition-transform hover:-translate-y-1",
        isPrimary
          ? "bg-gecl-primary text-white"
          : "bg-white border border-slate-100",
        className,
      )}
    >
      <div
        className={cn(
          "text-3xl md:text-4xl font-bold font-display mb-1",
          isPrimary ? "text-white" : "text-gecl-primary",
        )}
      >
        {number}
      </div>
      <div
        className={cn(
          "text-xs font-bold uppercase tracking-wide",
          isPrimary ? "text-blue-200" : "text-slate-400",
        )}
      >
        {label}
      </div>
    </div>
  );
}
