import type { Metadata } from "next";
import { ServiceCard } from "@/components/ServiceCard";
import { BookingCta } from "@/components/BookingCta";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Habit & routine building, board exam prep, career counseling, and vetted teacher recommendations for Class 2–12 students.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl text-center">
          <span className="eyebrow">Our Services</span>
          <h1 className="text-4xl font-bold sm:text-5xl">Support for every stage, Class 2 to 12</h1>
          <p className="mt-5 text-lg text-ink-500">
            Four focused programs, each built around what your child needs at their specific stage
            of school.
          </p>
        </div>
      </section>

      <section>
        <div className="section">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section text-center">
          <h2 className="text-3xl font-bold">Not sure which program fits?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-500">
            Start with a free 10-minute call — we&apos;ll help you figure out the right starting
            point.
          </p>
          <div className="mt-6">
            <BookingCta>Book a Free Session</BookingCta>
          </div>
        </div>
      </section>
    </>
  );
}
