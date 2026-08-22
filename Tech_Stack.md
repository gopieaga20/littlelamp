# LittleLamp — Complete Tech Stack
## Full-Stack Recommendation

This site is content-heavy, SEO-driven, mostly static/marketing content with one interactive piece (booking) and one dynamic piece (editable pricing/testimonials/services). It doesn't need user accounts, payments, or a database of transactional records — so the stack is intentionally lean: a JAMstack-style frontend + light headless CMS + a couple of managed third-party services, rather than a custom backend/server to maintain.

---

## 1. Architecture at a Glance

```
Parent's Browser
      │
      ▼
Next.js site (SSG/ISR) ── hosted on Vercel
      │                         │
      ├─── Sanity CMS (content: services, pricing, testimonials, blog)
      ├─── Cal.com / Calendly embed (booking widget)
      ├─── Lead form → Formspree/API route → Google Sheets or Airtable + email notification
      ├─── WhatsApp click-to-chat link (wa.me)
      └─── GA4 + Meta Pixel (analytics/ad tracking)
```

No custom database, no auth system, no payment gateway, no dedicated backend server — matches the "out of scope" items already confirmed (no login, no online payments, no LMS).

---

## 2. Frontend

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSG/ISR gives fast, SEO-friendly pages for every route (`/services/board-exam-prep`, etc.); file-based routing maps 1:1 to the multi-page sitemap already defined |
| Language | **TypeScript** | Catches bugs early, self-documents content shapes (e.g., a `PricingPackage` type), easier to hand off/maintain |
| Styling | **Tailwind CSS** | Fast to build consistent, responsive UI; pairs well with a small design system once brand colors/fonts are set |
| UI components | **shadcn/ui** (Radix-based) | Accessible, unstyled primitives (accordions, carousels for testimonials, dialogs) that are easy to theme with Tailwind |
| Icons | **lucide-react** | Matches the icon-driven card layout in the deck (service cards, "why choose us," process steps) |
| Forms | **React Hook Form + Zod** | Client-side validation for the lead/booking form (required fields, email/phone format) |
| Animations (optional) | **Framer Motion** | Subtle entrance/scroll animations for cards, consistent with a polished marketing site |
| Fonts | **next/font** with Google Fonts (final pick depends on brand identity phase) | Optimized font loading, no layout shift |

---

## 3. Content Management (CMS)

| Concern | Choice | Why |
|---|---|---|
| CMS | **Sanity.io** (free tier) | Headless CMS with a friendly editor UI — lets the LittleLamp team update pricing, testimonials, service copy, and blog posts without a code deploy, as required in Section 4 of the requirements |
| Content types | `service`, `pricingPackage`, `testimonial`, `blogPost`, `siteSettings` (footer/social links) | Matches directly to the sections defined in the requirements doc |
| Alternative (simpler) | Git-based JSON/MDX content files in the repo, edited via GitHub or a tool like Tina CMS | Lower cost/complexity if the team is comfortable with a lightweight editing workflow instead of a full CMS; good v0 option if budget is tight |

**Recommendation:** start with Sanity — it scales better once the blog and service pages grow, and it's still free at this size.

---

## 4. Booking

| Concern | Choice | Why |
|---|---|---|
| Scheduling | **Cal.com** (open-source, generous free tier) or **Calendly** | Embeddable widget, syncs to the counselor's Google Calendar, sends automatic confirmation email/SMS — matches the "directly bookable, no manual callback" decision |
| Embed method | Cal.com/Calendly **inline embed** on `/book`, plus a **popup/modal embed** triggered by the "Book Free Session" CTA on every other page | One booking flow reused site-wide, as required |

Cal.com is the slightly better long-term pick if the team ever wants to self-host or avoid per-seat pricing as booking volume grows; Calendly is the easier/faster to set up. Either satisfies the requirement as written.

---

## 5. Lead Capture / Backend Logic

Since there's no user accounts/database, "backend" here means a couple of small serverless functions:

| Concern | Choice | Why |
|---|---|---|
| Lead form handling | **Next.js API Route** (`/api/contact`) or **Formspree** | Receives the pre-booking form / general contact form submissions |
| Storage | **Google Sheets API** or **Airtable API** | Simple, non-technical-friendly place for the LittleLamp team to see leads — no database admin needed |
| Notifications | **Resend** or **SendGrid** | Sends an email/SMS notification to the counselor whenever a new lead comes in |
| Spam protection | **Cloudflare Turnstile** (free, privacy-friendlier than reCAPTCHA) | Satisfies the "form spam protection" non-functional requirement |
| WhatsApp | Static `wa.me/<number>?text=...` link | No API needed for a simple click-to-chat button |

If lead volume grows and the team wants proper pipeline management later, this can be swapped for a real CRM (HubSpot free tier) without changing the frontend.

---

## 6. Hosting & Infrastructure

| Concern | Choice | Why |
|---|---|---|
| Hosting | **Vercel** | Built for Next.js, generous free tier, automatic preview deployments per PR, handles ISR/SSG out of the box |
| Domain/DNS | Domain registrar of choice (e.g., GoDaddy, Namecheap) → **Vercel DNS or Cloudflare** | Cloudflare in front also gives free CDN caching, DDoS protection |
| Environment | `.env` for Sanity project ID/token, Cal.com/Calendly keys, Sheets/Airtable API keys, Resend/SendGrid key | Standard 12-factor config |
| CI/CD | **GitHub + Vercel Git integration** | Push to `main` → auto-deploy; PR previews for review before merging |

---

## 7. SEO, Analytics & Tracking

| Concern | Choice | Why |
|---|---|---|
| SEO | Next.js `metadata` API per route, `next-sitemap` for sitemap.xml/robots.txt, JSON-LD structured data (`LocalBusiness`/`Service` schema) | Matches SEO non-functional requirement; important since multi-page structure is specifically meant to capture per-service search intent |
| Analytics | **GA4** via `@next/third-parties` | Lightweight, official Next.js integration |
| Ad tracking | **Meta Pixel** | Needed for the Instagram/Facebook campaigns referenced in the pitch deck's social post content |
| Conversion tracking | GA4 events on: "Book Free Session" clicks, booking widget completions, contact form submits | Ties directly to the site's primary conversion goal |

---

## 8. Accessibility, Performance & QA

| Concern | Choice/Approach |
|---|---|
| Accessibility | shadcn/ui + Radix primitives are accessible by default; manual audit with **axe DevTools** before launch; alt text required on all CMS images |
| Image optimization | `next/image` (automatic resizing, lazy loading, WebP) |
| Performance budget | Lighthouse CI in the deploy pipeline; target Core Web Vitals "Good" thresholds |
| Testing | **Playwright** for a handful of end-to-end smoke tests (nav loads, booking modal opens, form submits) rather than heavy unit test coverage — appropriate for a marketing site's risk profile |

---

## 9. Legal/Compliance

| Concern | Choice |
|---|---|
| Privacy Policy / Terms | Static pages (`/privacy`, `/terms`), content drafted with the business, stored in the CMS or as MDX |
| Cookie/consent (if targeting India + any EU visitors) | Simple cookie banner (e.g., `react-cookie-consent`) gating GA4/Meta Pixel until consent given |

---

## 10. Cost Summary (starting point — all free/near-free tiers)

| Service | Free tier sufficient? |
|---|---|
| Vercel hosting | Yes, at this traffic level |
| Sanity CMS | Yes (free tier: 3 users, generous API limits) |
| Cal.com | Yes (free tier for single user) |
| Resend | Yes (free tier: 3,000 emails/month) |
| Cloudflare Turnstile | Yes, free |
| Google Sheets/Airtable | Yes |
| Domain registration | ~$10–15/year (only real fixed cost) |

This matches the "no fixed budget, hosting should stay lean" constraint — the whole stack can run near-$0/month until traffic or team size grows.

---

## 11. Suggested Build Order (maps to the phased plan in the requirements doc)

1. **Setup:** Next.js + TypeScript + Tailwind scaffold, GitHub repo, Vercel project
2. **Brand tokens:** wire up brand colors/fonts once the identity phase delivers them (Tailwind config)
3. **CMS schema:** define Sanity schemas for services, pricing, testimonials
4. **Core pages:** Home, Services (+ 4 detail pages), Pricing, Book
5. **Booking + lead form integration:** Cal.com embed, API route → Sheets/Airtable + email notification
6. **Remaining pages:** About, How It Works, Testimonials, Blog scaffold
7. **SEO pass:** metadata, sitemap, structured data, Meta Pixel/GA4
8. **QA:** accessibility audit, Lighthouse pass, Playwright smoke tests, cross-browser check
9. **Launch:** domain cutover, monitoring (Vercel Analytics or GA4 real-time)

---

### Notes / Alternatives Considered

- **Why not WordPress?** Would satisfy the CMS/no-code-edit requirement faster out of the box, but Next.js + Sanity gives better performance, cleaner multi-page SEO control, and a nicer dev experience for future iteration — worth the slightly higher initial setup effort for a startup expecting to grow content over time.
- **Why not a no-code builder (Webflow/Framer)?** Viable if the team wants zero custom code and is fine with the associated subscription cost; the stack above is recommended instead because it stays close to $0/month and gives full control if the business later wants custom features (e.g., a parent portal, phase 2).
