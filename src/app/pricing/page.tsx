import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { getPricingPackages } from "@/lib/content";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for LittleLamp's counseling packages. Start with a free 10-minute session — payment for paid packages is handled offline after your call.",
};

export default async function PricingPage() {
  const packages = await getPricingPackages();

  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl text-center">
          <span className="eyebrow">Pricing</span>
          <h1 className="text-4xl font-bold sm:text-5xl">Simple, transparent packages</h1>
          <p className="mt-5 text-lg text-ink-500">
            Start free. Paid packages are billed only after your intro call, over a quick phone
            call — never a checkout page.
          </p>
        </div>
      </section>

      <section>
        <div className="section">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, i) => (
              <PricingCard key={pkg.slug} pkg={pkg} highlighted={i === packages.length - 1} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-400">
            Payment for paid packages is handled offline by phone after your free session — nothing
            is charged on this website.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="section text-center">
          <h2 className="text-3xl font-bold">Have a question about pricing?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-500">
            Message us on WhatsApp and we&apos;ll help you pick the right package.
          </p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </>
  );
}
