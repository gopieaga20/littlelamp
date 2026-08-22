// Static fallback/seed source for PricingPackage content.
// Money is stored as integer paise (see prisma/schema.prisma) to avoid float rounding issues.

export type PricingSeed = {
  slug: string;
  emoji: string;
  name: string;
  hours: string;
  priceInPaise: number;
  bestFor: string;
  order: number;
};

export const pricingPackages: PricingSeed[] = [
  {
    slug: "free-intro",
    emoji: "🎁",
    name: "Free Intro",
    hours: "10 min",
    priceInPaise: 0,
    bestFor: "All Classes",
    order: 1,
  },
  {
    slug: "starter-pack",
    emoji: "⭐",
    name: "Starter Pack",
    hours: "5 hrs",
    priceInPaise: 500000, // ₹5,000
    bestFor: "Class 2–5",
    order: 2,
  },
  {
    slug: "growth-pack",
    emoji: "📈",
    name: "Growth Pack",
    hours: "10 hrs",
    priceInPaise: 900000, // ₹9,000
    bestFor: "Class 6–8",
    order: 3,
  },
  {
    slug: "exam-ready-pack",
    emoji: "🎯",
    name: "Exam Ready Pack",
    hours: "15 hrs",
    priceInPaise: 1300000, // ₹13,000
    bestFor: "Class 9–12",
    order: 4,
  },
];
