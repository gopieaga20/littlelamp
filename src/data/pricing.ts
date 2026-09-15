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
    slug: "ongoing-sessions",
    emoji: "⭐",
    name: "Ongoing Sessions",
    hours: "Per Hour",
    priceInPaise: 100000, // ₹1,000/hr
    bestFor: "Class 2–12",
    order: 2,
  },
];
