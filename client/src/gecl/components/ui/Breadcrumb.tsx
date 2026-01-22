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
        "w-full max-w-7xl mx-auto px-4 lg:px-6 py-4",
        "bg-transparent",
        className,
      )}
    >
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
                    "text-[var(--color-gecl-text-muted)]",
                    "hover:text-[var(--color-gecl-primary)] hover:underline decoration-[var(--color-gecl-accent)] decoration-2 underline-offset-4",
                  )}
                >
                  {isHome ? <LuHouse className="w-4 h-4 mb-0.5" /> : item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={cn(
                    "font-semibold truncate max-w-[200px] sm:max-w-none",
                    "text-[var(--color-gecl-primary)]",
                  )}
                >
                  {item.label}
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <LuChevronRight
                  className="w-4 h-4 text-gray-300 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
