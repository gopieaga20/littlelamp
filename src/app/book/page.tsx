import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PricingSection } from "@/components/PricingSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Free Session",
  description:
    "Request your free 10-minute intro call with a LittleLamp counselor — share your details and we'll call you to schedule it.",
};

// Cal.com isn't connected yet (see calBookingUrl in site-config.ts), so the
// callback-request form is the primary booking flow for now. Swap this back
// to a two-column layout with <BookingEmbed /> once a real Cal.com event
// exists.
export default function BookPage() {
  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl text-center">
          <span className="eyebrow">Book a Free Session</span>
          <h1 className="text-4xl font-bold sm:text-5xl">Request your free 10-minute call</h1>
          <p className="mt-5 text-lg text-ink-500">
            Share your details below and we&apos;ll call you to schedule your free session — no
            payment, no pressure.
          </p>
        </div>
      </section>

      <PricingSection compact eyebrow="Pricing" title="What it costs" />

      <section>
        <div className="section max-w-xl space-y-6">
          <LeadForm
            source="BOOKING_FORM"
            title="Tell us about your child"
            submitLabel="Request My Free Session"
          />
          <div className="card text-center">
            <p className="text-sm text-ink-500">Prefer WhatsApp? We&apos;re happy to chat there too.</p>
            <div className="mt-4 flex justify-center">
              <WhatsAppButton />
            </div>
            <p className="mt-2 text-xs text-ink-400">Available {siteConfig.availableHours}</p>
          </div>
        </div>
      </section>
    </>
  );
}
