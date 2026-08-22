import type { Metadata } from "next";
import { BookingCta } from "@/components/BookingCta";
import { IconTextCard } from "@/components/IconTextCard";
import { howItWorksSteps } from "@/data/page-content";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From your first free call to ongoing follow-ups — see how LittleLamp supports your child every step of the way.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl text-center">
          <span className="eyebrow">How It Works</span>
          <h1 className="text-4xl font-bold sm:text-5xl">A simple, guided process</h1>
          <p className="mt-5 text-lg text-ink-500">
            From your first free call to ongoing follow-ups — we stay with your child every step of
            the way.
          </p>
        </div>
      </section>

      <section>
        <div className="section">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, i) => (
              <IconTextCard
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                step={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section text-center">
          <h2 className="text-3xl font-bold">Start with the free intro call</h2>
          <div className="mt-6">
            <BookingCta>Book a Free Session</BookingCta>
          </div>
        </div>
      </section>
    </>
  );
}
