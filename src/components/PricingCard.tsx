import Link from "next/link";
import { formatINR } from "@/lib/utils";
import type { PricingPackageDTO } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PricingCard({
  pkg,
  highlighted = false,
}: {
  pkg: PricingPackageDTO;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "card flex flex-col text-center",
        highlighted && "border-2 border-primary-500 shadow-glow"
      )}
    >
      <span className="text-3xl" aria-hidden="true">
        {pkg.emoji}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-ink-800">{pkg.name}</h3>
      <p className="mt-1 text-sm text-ink-500">{pkg.hours}</p>
      <p className="mt-4 text-3xl font-bold text-ink-800">{formatINR(pkg.priceRupees)}</p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-primary-700">
        Best for {pkg.bestFor}
      </p>
      <Link
        href="/book"
        className={cn(
          "mt-6",
          highlighted ? "btn-primary" : "btn-secondary"
        )}
      >
        Book Free Session
      </Link>
    </div>
  );
}
