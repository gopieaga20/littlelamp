import type { Metadata } from "next";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BookingCta } from "@/components/BookingCta";
import { getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "See what parents are saying about their experience with LittleLamp.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <section className="bg-white">
        <div className="section max-w-3xl text-center">
          <span className="eyebrow">What Parents Say</span>
          <h1 className="text-4xl font-bold sm:text-5xl">Real stories from real families</h1>
        </div>
      </section>

      <section>
        <div className="section">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.parentName} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section text-center">
          <h2 className="text-3xl font-bold">Ready to write your own story?</h2>
          <div className="mt-6">
            <BookingCta>Book a Free Session</BookingCta>
          </div>
        </div>
      </section>
    </>
  );
}
