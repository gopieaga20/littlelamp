# LittleLamp

Marketing & booking website for LittleLamp, an education counseling startup (Class 2–12).
Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma/PostgreSQL, per
[`Tech_Stack.md`](./Tech_Stack.md) and [`Web_App_Requirements.md`](./Web_App_Requirements.md).

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, lucide-react icons
- **Forms:** React Hook Form + Zod (shared client/server validation)
- **Database:** PostgreSQL via Prisma — stores editable content (services, pricing, testimonials,
  blog) and captured leads/bookings
- **Booking:** Cal.com inline embed on `/book` (placeholder URL — swap in `src/lib/site-config.ts`)
- **Lead capture:** `POST /api/contact` → Postgres `Lead` table, with a honeypot field for basic
  spam resistance and a stubbed email-notification hook (`src/lib/notify.ts`)

## Getting started

```bash
npm install
cp .env.example .env   # set DATABASE_URL to your Postgres instance
npm run db:push        # create tables from prisma/schema.prisma
npm run db:seed        # load starter services/pricing/testimonials
npm run dev
```

The app runs and builds even without `DATABASE_URL` configured — every content query in
[`src/lib/content.ts`](./src/lib/content.ts) falls back to the static seed data in `src/data/` if
Postgres isn't reachable, so you can preview the site immediately and wire up the database
whenever it's ready. Once Postgres is live, seed it and all content becomes editable via
`npm run db:studio` (Prisma Studio) without a code deploy.

> **Local dev database:** already set up against the machine's local PostgreSQL 18 install
> (`postgresql://postgres:***@127.0.0.1:5432/littlelamp`), schema pushed and seeded. `.env` holding
> that connection string is gitignored and stays local-only — anyone else cloning this repo needs
> their own Postgres instance and `.env` (steps above). For a shared/production database, set
> `DATABASE_URL` in Vercel's project environment variables instead and run `db:push`/`db:seed`
> against that connection string.

## Database design

See [`prisma/schema.prisma`](./prisma/schema.prisma) for the full schema. Summary:

| Model | Purpose |
|---|---|
| `Service` / `ServiceFeature` | The 4 service segments shown on `/services` and their bullet features |
| `PricingPackage` | Editable pricing shown on Home, each service page, and `/book` — money stored as integer paise |
| `Testimonial` | Parent testimonials (`/testimonials`, homepage highlight) |
| `BlogPost` | Optional blog/resources content |
| `SiteSetting` | Free-form key/value store for footer/social links etc. |
| `Lead` | Every contact/booking form submission, with `source` and a `status` pipeline (`NEW` → `CONTACTED` → `BOOKED` → `CONVERTED`/`CLOSED_LOST`) |
| `Booking` | 1:1 with a `Lead` once a call is scheduled; keeps a link to the external Cal.com/Calendly event |

No user-auth tables exist — the requirements explicitly rule out parent/student logins for v1.

## Brand identity

- **Logo:** `public/logo/logo-full.svg` (horizontal lockup) and `logo-mark.svg` (icon only) — a
  diya/oil lamp with a warm flame, echoing the "LittleLamp" name and "guiding" positioning.
- **Palette** (`tailwind.config.ts`): amber flame (`primary`, `#F5A524`) as the CTA/accent color,
  deep navy (`ink`, `#1B2740`) for text and the lamp base, warm cream (`cream`, `#FFF8EC`) as the
  page background. Same palette is used everywhere — logo, buttons, badges, icons.

## What still needs real accounts before launch

These are stubbed with clear `TODO` comments so the app runs today and only needs config, not
code changes, once accounts exist:

- `src/lib/site-config.ts` — Cal.com booking URL, social links, address
  (`url` is now the real domain, `littlelamp.co.in`)
  (phone/email/WhatsApp are now real)
- `src/lib/notify.ts` — Resend/SendGrid API key for lead-notification emails
- GA4 / Meta Pixel — not yet wired in; add via `@next/third-parties` in `src/app/layout.tsx` once
  tracking IDs exist
- Cloudflare Turnstile — the current spam defense is a honeypot field only; add Turnstile to
  `LeadForm.tsx` + `api/contact/route.ts` if spam becomes an issue
