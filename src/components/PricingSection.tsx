import { getPricingPackages } from "@/lib/content";
import { PricingCard } from "@/components/PricingCard";
import { cn } from "@/lib/utils";

// Reused on Home, each Service detail page, and the Book page now that there's
// no dedicated /pricing route — `compact` narrows it to fit inside another
// page's content flow instead of taking a full section-width slot.
export async function PricingSection({
  eyebrow = "Pricing",
  title = "Simple, transparent pricing",
  subtitle,
  compact = false,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const packages = await getPricingPackages();

  return (
    <section className={compact ? undefined : "bg-white"}>
      <div className={compact ? "section max-w-3xl" : "section"}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className={cn("font-bold", compact ? "text-2xl" : "text-3xl sm:text-4xl")}>{title}</h2>
          {subtitle && <p className="mt-3 text-ink-500">{subtitle}</p>}
        </div>
        <div className="mx-auto mt-10 grid max-w-xl gap-6 sm:grid-cols-2">
          {packages.map((pkg) => (
            <PricingCard key={pkg.slug} pkg={pkg} highlighted={pkg.slug === "ongoing-sessions"} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          Prices shown are indicative — your counselor confirms the plan that fits your child during
          the free intro session. Payment for ongoing sessions is handled offline by phone, never on
          this website.
        </p>
      </div>
    </section>
  );
}
