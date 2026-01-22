import { ReactNode } from "react";
import { cn } from "@/gecl/lib/cn";

interface SidebarWidgetProps {
  title: ReactNode; // Accepts text or JSX (e.g., icon + text)
  children: ReactNode;
  variant?: "default" | "alert" | "info";
  className?: string;
}

export default function SidebarWidget({
  title,
  children,
  variant = "default",
  className,
}: SidebarWidgetProps) {
  const variants = {
    default: "bg-white border-slate-200",
    alert: "bg-red-50 border-red-100",
    info: "bg-blue-50 border-blue-100",
  };

  return (
    <div
      className={cn(
        "rounded-xl shadow-md border p-6 overflow-hidden",
        variants[variant],
        className,
      )}
    >
      <div className="mb-4 font-bold text-lg flex items-center gap-2">
        {title}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
