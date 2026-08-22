import type { Metadata } from "next";
import { BookingCta } from "@/components/BookingCta";
import { whyChooseUs } from "@/data/page-content";
import { IconTextCard } from "@/components/IconTextCard";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "LittleLamp is an education counseling startup helping parents of Class 2–12 students with study habits, board exam prep, and career guidance.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl text-center">
          <span className="eyebrow">Who We Are</span>
          <h1 className="text-4xl font-bold sm:text-5xl">Guiding every child to their best future</h1>
          <p className="mt-5 text-lg text-ink-500">
            LittleLamp was founded on a simple belief: every child does better with a personalized
            plan and a guide who genuinely knows them — not a one-size-fits-all worksheet or a
            generic coaching class.
          </p>
        </div>
      </section>

      <section>
        <div className="section grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 text-ink-500">
              We work with parents of Class 2–12 students across three critical moments: building
              consistent study habits early, navigating board exam pressure, and making clear-eyed
              career decisions at the Class 11–12 crossroads. Our counselors combine structured
              assessment with honest, parent-friendly communication — so every recommendation is
              something you can actually act on.
            </p>
            <span className="mt-6 inline-block rounded-full bg-primary-100 px-5 py-2 text-sm font-semibold text-primary-800">
              100% personalized. 100% parent-friendly.
            </span>
          </div>
          <div className="card">
            <h3 className="font-semibold text-ink-800">What guides our approach</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li>We start with a free session — no pressure to commit.</li>
              <li>Every plan is built around your specific child, not a template.</li>
              <li>We recommend teachers only after vetting them ourselves.</li>
              <li>We explain things in plain language, not jargon.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="text-3xl font-bold sm:text-4xl">What makes LittleLamp different</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <IconTextCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="section text-center">
          <h2 className="text-3xl font-bold">Ready to meet your counselor?</h2>
          <div className="mt-6">
            <BookingCta>Book a Free Session</BookingCta>
          </div>
        </div>
      </section>
    </>
  );
}
