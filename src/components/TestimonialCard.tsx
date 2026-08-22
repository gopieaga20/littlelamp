import { Star, Quote } from "lucide-react";
import type { TestimonialDTO } from "@/lib/content";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialDTO }) {
  const initials = testimonial.parentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="card h-full">
      <Quote className="h-6 w-6 text-primary-400" aria-hidden="true" />
      <p className="mt-3 text-sm leading-relaxed text-ink-600">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-4 flex" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary-500 text-primary-500" : "text-cream-300"}`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-800 text-sm font-semibold text-cream">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-800">{testimonial.parentName}</p>
          <p className="text-xs text-ink-500">{testimonial.studentInfo}</p>
        </div>
      </div>
    </div>
  );
}
