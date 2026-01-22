import { cn } from "@/gecl/lib/cn";
import { Breadcrumb } from "@/gecl/components/ui/";

interface PageHeroProps {
  title: string;
  description?: string;
  badge?: string;
  image?: string; // Optional background image URL
  breadcrumbItems: { label: string; href?: string }[];
  className?: string;
}

export default function PageHero({
  title,
  description,
  badge,
  image,
  breadcrumbItems,
  className,
}: PageHeroProps) {
  return (
    <>
      <section
        className={cn(
          "relative bg-gecl-primary text-white py-16 lg:py-20 overflow-hidden",
          className,
        )}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#1e293b,#0f172a)] z-0"></div>

        {/* Optional Image Overlay */}
        {image && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay z-0"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-r from-gecl-primary via-gecl-primary/95 to-gecl-primary/80 z-0"></div>
          </>
        )}

        {/* Abstract Pattern (CSS-based) */}
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          {badge && (
            <span className="inline-block py-1 px-3 rounded-full bg-gecl-accent/20 border border-gecl-accent/30 text-gecl-accent font-semibold text-sm mb-4 backdrop-blur-sm">
              {badge}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />
    </>
  );
}
