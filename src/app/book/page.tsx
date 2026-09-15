import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { BookingEmbed } from "@/components/BookingEmbed";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PricingSection } from "@/components/PricingSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Free Session",
  description:
    "Book your free 10-minute intro call with a LittleLamp counselor. Pick a time that works, no manual back-and-forth.",
};

export default function BookPage() {
  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl text-center">
          <span className="eyebrow">Book a Free Session</span>
          <h1 className="text-4xl font-bold sm:text-5xl">Pick a time for your free 10-minute call</h1>
          <p className="mt-5 text-lg text-ink-500">
            Choose an open slot below, or share your details and we&apos;ll reach out to schedule it
            for you.
          </p>
        </div>
      </section>

      <PricingSection compact eyebrow="Pricing" title="What it costs" />

      <section>
        <div className="section grid gap-10 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <BookingEmbed />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <LeadForm
              source="BOOKING_FORM"
              title="Prefer we call you?"
              submitLabel="Request a callback"
            />
            <div className="card text-center">
              <p className="text-sm text-ink-500">Prefer WhatsApp? We&apos;re happy to chat there too.</p>
              <div className="mt-4 flex justify-center">
                <WhatsAppButton />
              </div>
              <p className="mt-2 text-xs text-ink-400">Available {siteConfig.availableHours}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
