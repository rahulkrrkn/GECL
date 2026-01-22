import Link from "next/link";
import { LuChevronRight, LuHouse } from "react-icons/lu";
import { cn } from "@/gecl/lib/cn";

// 1. Define the shape of a single item
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// 2. Define the props for the component
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({
  items = [],
  className = "",
}: BreadcrumbProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        // Layout & Positioning (Sticky bar below navbar)
        "w-full sticky top-12.5 z-20",
        "border-b border-slate-200 bg-white/80 backdrop-blur-md",
        "transition-all duration-200",
        className,
      )}
    >
      {/* Inner Container for centering content matching page layout */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-3">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isHome = index === 0 && item.label.toLowerCase() === "home";

            return (
              <li key={index} className="flex items-center gap-2">
                {/* Render Link or Text */}
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 transition-colors duration-200",
                      "text-slate-500 hover:text-gecl-primary",
                      "hover:underline decoration-gecl-accent decoration-2 underline-offset-4",
                    )}
                  >
                    {isHome ? (
                      <LuHouse className="w-4 h-4 mb-0.5" />
                    ) : (
                      item.label
                    )}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className={cn(
                      "font-semibold truncate max-w-50 sm:max-w-none",
                      "text-gecl-primary",
                    )}
                  >
                    {item.label}
                  </span>
                )}

                {/* Separator */}
                {!isLast && (
                  <LuChevronRight
                    className="w-4 h-4 text-slate-300 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
