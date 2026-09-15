import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";
import { BookingCta } from "@/components/BookingCta";
import { PricingSection } from "@/components/PricingSection";
import { getServiceBySlug, getServices } from "@/lib/content";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} (${service.classRange})`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <DynamicIcon name={service.icon} className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary-700">
            {service.classRange}
          </p>
          <h1 className="mt-1 text-4xl font-bold sm:text-5xl">{service.title}</h1>
          <p className="mt-5 text-lg text-ink-500">{service.description}</p>
        </div>
      </section>

      <section>
        <div className="section max-w-3xl">
          <h2 className="text-2xl font-bold">What&apos;s included</h2>
          <ul className="mt-6 space-y-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <span className="text-ink-600">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BookingCta>Book a Free Session</BookingCta>
          </div>
        </div>
      </section>

      <PricingSection compact eyebrow="Pricing" title="What this costs" />
    </>
  );
}
