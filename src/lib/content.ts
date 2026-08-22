import { prisma } from "@/lib/prisma";
import { services as fallbackServices } from "@/data/services";
import { pricingPackages as fallbackPricing } from "@/data/pricing";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";

// Content is served from Postgres (via Prisma) so the LittleLamp team can edit
// pricing/services/testimonials without a code deploy, as required.
//
// Each getter falls back to the static seed data in src/data/* if the database
// is unreachable (e.g. DATABASE_URL not yet configured in this environment).
// This keeps `next build` and local dev usable before Postgres is provisioned,
// while production with a live DB always reads real, editable content.

export type ServiceWithFeatures = {
  slug: string;
  title: string;
  classRange: string;
  summary: string;
  description: string;
  icon: string;
  features: string[];
};

export async function getServices(): Promise<ServiceWithFeatures[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: { features: { orderBy: { order: "asc" } } },
    });
    if (rows.length === 0) throw new Error("empty");
    return rows.map((s) => ({
      slug: s.slug,
      title: s.title,
      classRange: s.classRange,
      summary: s.summary,
      description: s.description,
      icon: s.icon,
      features: s.features.map((f) => f.label),
    }));
  } catch {
    return fallbackServices
      .sort((a, b) => a.order - b.order)
      .map((s) => ({ ...s }));
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceWithFeatures | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export type PricingPackageDTO = {
  slug: string;
  emoji: string;
  name: string;
  hours: string;
  priceRupees: number;
  bestFor: string;
};

export async function getPricingPackages(): Promise<PricingPackageDTO[]> {
  try {
    const rows = await prisma.pricingPackage.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) throw new Error("empty");
    return rows.map((p) => ({
      slug: p.slug,
      emoji: p.emoji,
      name: p.name,
      hours: p.hours,
      priceRupees: p.priceInPaise / 100,
      bestFor: p.bestFor,
    }));
  } catch {
    return fallbackPricing
      .sort((a, b) => a.order - b.order)
      .map((p) => ({
        slug: p.slug,
        emoji: p.emoji,
        name: p.name,
        hours: p.hours,
        priceRupees: p.priceInPaise / 100,
        bestFor: p.bestFor,
      }));
  }
}

export type BlogPostDTO = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string | null;
};

const fallbackBlogPosts: BlogPostDTO[] = [
  {
    slug: "building-a-study-routine-that-sticks",
    title: "Building a Study Routine That Actually Sticks",
    excerpt:
      "Most study schedules fail in the first week. Here's what makes the difference for Class 2–8 students.",
    content:
      "Most study schedules fail in the first week — not because the child lacks discipline, but because the schedule was never realistic to begin with. The routines that stick share three traits: they're built around the child's actual energy levels, they start smaller than feels necessary, and a parent reinforces them without becoming the enforcer. In our habit-building sessions, we start every plan with a one-week trial, then adjust based on what actually happened rather than what we hoped would happen.",
    publishedAt: "2026-06-01",
  },
  {
    slug: "helping-your-child-choose-a-stream",
    title: "Helping Your Child Choose a Stream Without the Guesswork",
    excerpt:
      "Science, Commerce, or Humanities — how to make this Class 10 decision with actual clarity.",
    content:
      "The Class 10 stream decision often gets made under pressure, based on what friends are choosing or which stream 'keeps options open.' A better approach starts with an honest look at aptitude and interest, followed by a real conversation about what each stream actually leads to — not the mythology around it. We walk families through both in a single counseling session, so the decision is theirs, but an informed one.",
    publishedAt: "2026-05-15",
  },
];

export async function getBlogPosts(): Promise<BlogPostDTO[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length === 0) throw new Error("empty");
    return rows.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      publishedAt: p.publishedAt?.toISOString() ?? null,
    }));
  } catch {
    return fallbackBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDTO | null> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export type TestimonialDTO = {
  parentName: string;
  studentInfo: string;
  quote: string;
  rating: number;
  avatarUrl?: string | null;
};

export async function getTestimonials(): Promise<TestimonialDTO[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) throw new Error("empty");
    return rows.map((t) => ({
      parentName: t.parentName,
      studentInfo: t.studentInfo,
      quote: t.quote,
      rating: t.rating,
      avatarUrl: t.avatarUrl,
    }));
  } catch {
    return fallbackTestimonials.sort((a, b) => a.order - b.order);
  }
}
