import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";
import type { ServiceWithFeatures } from "@/lib/content";

export function ServiceCard({ service }: { service: ServiceWithFeatures }) {
  return (
    <div className="card flex h-full flex-col">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
        <DynamicIcon name={service.icon} className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary-700">
        {service.classRange}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-ink-800">{service.title}</h3>
      <p className="mt-2 text-sm text-ink-500">{service.summary}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink-600">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${service.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
      >
        Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
