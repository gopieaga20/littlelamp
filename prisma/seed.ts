import { PrismaClient } from "@prisma/client";
import { services } from "../src/data/services";
import { pricingPackages } from "../src/data/pricing";
import { testimonials } from "../src/data/testimonials";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding services...");
  for (const s of services) {
    const existingService = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (existingService) {
      // A plain `upsert` can't express "replace the features relation on
      // update" — its `update` payload has no `deleteMany`/`create` slot for
      // a nested relation the way `create` does, so features would silently
      // never sync on re-seed. Do it explicitly instead.
      await prisma.service.update({
        where: { slug: s.slug },
        data: {
          title: s.title,
          classRange: s.classRange,
          summary: s.summary,
          description: s.description,
          icon: s.icon,
          order: s.order,
          features: {
            deleteMany: {},
            create: s.features.map((label, i) => ({ label, order: i })),
          },
        },
      });
    } else {
      await prisma.service.create({
        data: {
          slug: s.slug,
          title: s.title,
          classRange: s.classRange,
          summary: s.summary,
          description: s.description,
          icon: s.icon,
          order: s.order,
          features: {
            create: s.features.map((label, i) => ({ label, order: i })),
          },
        },
      });
    }
  }

  console.log("Seeding pricing packages...");
  for (const p of pricingPackages) {
    await prisma.pricingPackage.upsert({
      where: { slug: p.slug },
      update: {
        emoji: p.emoji,
        name: p.name,
        hours: p.hours,
        priceInPaise: p.priceInPaise,
        bestFor: p.bestFor,
        order: p.order,
      },
      create: {
        slug: p.slug,
        emoji: p.emoji,
        name: p.name,
        hours: p.hours,
        priceInPaise: p.priceInPaise,
        bestFor: p.bestFor,
        order: p.order,
      },
    });
  }
  // Remove packages that have since been dropped from the seed data (e.g. the
  // old tiered packages replaced by a flat hourly rate) — upsert alone never
  // deletes rows whose slug no longer appears above.
  await prisma.pricingPackage.deleteMany({
    where: { slug: { notIn: pricingPackages.map((p) => p.slug) } },
  });

  console.log("Seeding testimonials...");
  for (const [i, t] of testimonials.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { parentName: t.parentName } });
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: {
          studentInfo: t.studentInfo,
          quote: t.quote,
          rating: t.rating,
          order: t.order,
        },
      });
    } else {
      await prisma.testimonial.create({
        data: {
          parentName: t.parentName,
          studentInfo: t.studentInfo,
          quote: t.quote,
          rating: t.rating,
          order: i,
        },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
