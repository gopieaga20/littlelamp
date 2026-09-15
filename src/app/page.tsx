import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BookingCta } from "@/components/BookingCta";
import { ServiceCard } from "@/components/ServiceCard";
import { IconTextCard } from "@/components/IconTextCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PricingSection } from "@/components/PricingSection";
import { getServices, getTestimonials } from "@/lib/content";
import { painPoints, trustBadges } from "@/data/page-content";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([getServices(), getTestimonials()]);
  const featuredTestimonial = testimonials[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="section grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{siteConfig.tagline}</span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Personalized guidance for every stage of your child&apos;s school journey
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-500">
              From building study habits in Class 2 to choosing a career path in Class 12 —
              LittleLamp gives your child a clear plan and you peace of mind.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookingCta>
                Book a Free Session <ArrowRight className="h-4 w-4" />
              </BookingCta>
              <Link href="/services" className="btn-secondary">
                Explore Services
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-600 shadow-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary-600" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary-200/50 blur-3xl" aria-hidden="true" />
            <svg viewBox="0 0 240 240" className="relative h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="heroFlame" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFE29A" />
                  <stop offset="45%" stopColor="#F5A524" />
                  <stop offset="100%" stopColor="#C2790C" />
                </radialGradient>
              </defs>
              <circle cx="120" cy="120" r="118" fill="#FFF8EC" stroke="#F0E4CC" strokeWidth="2" />
              <path
                d="M120 50c13 16 24 30 24 46 0 15-11 25-24 25s-24-10-24-25c0-16 11-30 24-46z"
                fill="url(#heroFlame)"
              />
              <path
                d="M60 120c0 13 7 24 17 32-4 6-6 13-6 20 0 25 22 38 49 38s49-13 49-38c0-7-2-14-6-20 10-8 17-19 17-32 0-4-3-8-8-8H68c-5 0-8 4-8 8z"
                fill="#1B2740"
              />
              <ellipse cx="120" cy="120" rx="52" ry="10" fill="#3C4E77" />
            </svg>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-white">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The Challenge Every Parent Faces</span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Every stage of school brings a different struggle
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {painPoints.map((point) => (
              <IconTextCard
                key={point.title}
                icon={point.icon}
                title={`${point.title} (${point.classRange})`}
                description={point.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section>
        <div className="section text-center">
          <span className="eyebrow">Who We Are</span>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
            A counseling partner that treats every child as an individual
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-500">
            LittleLamp exists to give parents a clear, personalized plan for their child&apos;s
            academic journey — from daily study habits to life-defining career choices.
          </p>
          <span className="mt-6 inline-block rounded-full bg-ink-800 px-5 py-2 text-sm font-semibold text-cream">
            100% personalized. 100% parent-friendly.
          </span>
        </div>
      </section>

      {/* Services teaser */}
      <section className="bg-white">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Services</span>
            <h2 className="text-3xl font-bold sm:text-4xl">Support for every class, 2 through 12</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection subtitle="No hidden fees — pay only for the hours you use." />

      {/* Testimonial highlight */}
      {featuredTestimonial && (
        <section>
          <div className="section max-w-2xl text-center">
            <span className="eyebrow">What Parents Say</span>
            <TestimonialCard testimonial={featuredTestimonial} />
            <Link
              href="/testimonials"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              Read more stories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-ink-800">
        <div className="section text-center">
          <h2 className="text-3xl font-bold text-cream sm:text-4xl">
            Ready to give your child a clear plan forward?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-200">
            Start with a free, no-obligation 10-minute session — no payment, no pressure.
          </p>
          <div className="mt-8">
            <BookingCta>
              Book a Free Session <ArrowRight className="h-4 w-4" />
            </BookingCta>
          </div>
        </div>
      </section>
    </>
  );
}
