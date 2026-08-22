# Web Application Requirements Document
## Education Counseling Startup — Marketing & Booking Website

---

## 1. Project Overview

**Business:** LittleLamp — an education counseling startup (Classes 2–12) offering personalized study-habit coaching, board-exam prep, competitive-exam/career counseling, and vetted teacher recommendations.

**Tagline:** "Guiding Every Child to Their Best Future"

**Goal of the website:** Convert visiting parents into leads by clearly explaining the problem, the service segments, pricing, and social proof — and driving them to book a **free 10-minute intro call**.

**Primary audience:** Parents of children in Class 2–12 in India, researching academic/career support.

**Primary conversion goal (CTA):** "Book your FREE 10-min session" — appears throughout the site.

---

## 2. Site Structure / Pages

**Decision: Multi-page site**, with each major section as its own route/URL (better for SEO — each page can target specific parent search intent, e.g., "board exam prep Class 10" vs. "JEE career counseling").

| Page | Route (suggested) | Purpose |
|---|---|---|
| Home | `/` | Hero, problem summary, service overview teaser, testimonial highlight, CTA |
| About Us | `/about` | Who We Are — mission, founders, "Who We Are" copy |
| Services | `/services` | Overview of all 4 service segments, each linking to its own detail page |
| ↳ Habit & Routine Building | `/services/habit-routine-building` | Class 2–8 detail page |
| ↳ Study Skills & Board Prep | `/services/board-exam-prep` | Class 9–10 detail page |
| ↳ Competitive Exam & Career Counseling | `/services/career-counseling` | Class 11–12 detail page |
| ↳ Teacher Recommendations | `/services/teacher-recommendations` | All Classes detail page |
| How It Works | `/how-it-works` | 4-step process page |
| Pricing | `/pricing` | Package comparison table |
| Testimonials | `/testimonials` | Full list of parent reviews |
| Contact / Book a Session | `/book` | Booking calendar + contact form |
| (Optional) Blog / Resources | `/blog` | For SEO and parent trust-building |

Each page should include the sticky nav, footer, and a persistent "Book Free Session" CTA (see Section 3.10).

---

## 3. Functional Requirements

### 3.1 Homepage / Hero
- Business name, tagline, and 3 trust badges: "Education Counseling," "Grades 2–12," "Personalized Guidance"
- Primary CTA button: "Book a Free Session" (sticky/visible on scroll)

### 3.2 Problem Section ("The Challenge Every Parent Faces")
- Intro paragraph
- 3 pain-point cards, each with icon/image, headline, and description:
  1. No study routine or structure (Class 2–8)
  2. Board exam anxiety (Class 9–10)
  3. Career confusion at the crossroads (Class 11–12)

### 3.3 About Section ("Who We Are")
- Mission statement paragraph
- Highlight badge: "100% personalized. 100% parent-friendly."

### 3.4 Services Section
Four service cards, each with icon, title, class range, and 3 bullet features:
1. Habit & Routine Building — Class 2–8
2. Study Skills & Board Prep — Class 9–10
3. Competitive Exam & Career Counseling — Class 11–12
4. Personalized Teacher Recommendations — All Classes

### 3.5 "How It Works" Section
- 4-step horizontal process flow: Intro Call → Assessment → Learning Plan → Guided Sessions
- Each step: icon, title, one-line description
- Supporting line: "From your first free call to ongoing follow-ups — we stay with your child every step of the way."

### 3.6 Pricing Section
Table/cards with columns: **Package | Hours | Price | Best For**

| Package | Hours | Price | Best For |
|---|---|---|---|
| 🎁 Free Intro | 10 min | ₹0 | All Classes |
| ⭐ Starter Pack | 5 hrs | ₹5,000 | Class 2–5 |
| 📈 Growth Pack | 10 hrs | ₹9,000 | Class 6–8 |
| 🎯 Exam Ready Pack | 15 hrs | ₹13,000 | Class 9–12 |

- Each row/card should link to the booking CTA (not a payment flow — **payment for paid packages is handled offline/by phone call after the counseling session**, not on the website).
- Prices should be stored as editable data (not hardcoded in markup) so the business can update them.

### 3.7 "Why Choose Us" Section
6 differentiator cards (icon + title + one-line description):
1. 100% Personalized Plans
2. Expert-Vetted Teachers
3. Start Free, Risk-Free
4. Parent-Friendly Communication
5. Covers Class 2 to 12
6. (space for a 6th, or reduce to 5 as in deck)

### 3.8 Testimonials Section
- 3 parent testimonials with quote, parent photo/avatar, and "Parent of a Class X student" attribution
- Should support a carousel/slider if more testimonials are added later

### 3.9 Contact / Booking Section (`/book`)
- **Decision: the free 10-minute session is directly bookable via an embedded calendar tool** (e.g., Calendly, Cal.com, or Google Calendar Appointment Slots) — parent picks an open time slot and books immediately, no manual back-and-forth.
- Short pre-booking form fields (captured by the calendar tool or a form right above it): Parent name, phone/email, child's class
- Automatic confirmation email/SMS with the booked time (handled by the calendar tool)
- Calendar tool should sync to the counselor's calendar to avoid double-booking
- Form validation (required fields, valid phone/email format)
- WhatsApp click-to-chat button as a secondary contact option (common expectation for Indian parent audience)
- This same booking widget/CTA should be embeddable/linkable from every other page (Home, Services, Pricing, etc.), not just `/book`

### 3.10 Navigation & Footer
- Sticky header nav with anchor links to each section + persistent "Book Free Session" button
- Footer: business name, contact info, social media links (Instagram/Facebook, per the social post content in the deck), quick links, copyright

---

## 4. Non-Functional Requirements

- **Responsive design:** mobile-first (majority of Indian parents will browse on mobile)
- **Performance:** page load under ~3s on 4G; optimized/compressed images
- **SEO:** meta titles/descriptions per section, semantic HTML, structured data (LocalBusiness/Service schema), sitemap.xml, robots.txt
- **Accessibility:** WCAG 2.1 AA — sufficient color contrast, alt text on all images, keyboard navigable forms
- **Browser support:** latest 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari/Chrome Android
- **Analytics:** Google Analytics/GA4 + conversion tracking on the booking CTA and form submits
- **Security:** HTTPS everywhere, form spam protection (reCAPTCHA or equivalent), input sanitization
- **Content management:** Pricing, testimonials, and service copy should be editable without a code deploy (CMS or simple JSON/config-driven content)

---

## 5. Technical Recommendations (suggested stack — adjust to team preference)

| Layer | Suggestion |
|---|---|
| Frontend | Next.js (SSR/SSG — well suited to a multi-page, SEO-driven site with per-service URLs) |
| Styling | Tailwind CSS |
| CMS (optional) | Sanity, Contentful, or a simple headless JSON config for pricing/testimonials |
| Booking | Calendly or Cal.com embed for the free-session booking widget, synced to counselor's calendar |
| Lead form/CRM | Form submissions → email (SendGrid) / simple CRM (Google Sheets, HubSpot, or Airtable) |
| Payments | None required in v1 — packages are paid offline/by call |
| Hosting | Vercel / Netlify (no fixed budget constraint — free tier is sufficient to start) |
| Analytics | GA4 + Meta Pixel (for the Instagram/Facebook ad campaigns referenced in the deck) |

---

## 6. Content Assets Needed (from the business)

- **Brand identity — to be created from scratch** for LittleLamp: logo, color palette, typography, and basic brand guidelines (voice/tone, logo usage). Recommend a short brand design phase before/alongside development (see Section 7).
- Real photos or illustrations for hero and each service card (deck currently uses placeholder graphics)
- Verified parent testimonials with permission to publish (name/photo optional)
- Finalized pricing (confirm ₹ amounts are current)
- Social media handles/links for footer
- Legal pages: Privacy Policy, Terms of Service (required since the site collects personal data via booking/lead forms)

---

## 7. Out of Scope (v1)

- Parent/student login portal or dashboard
- Online payment processing for packages (confirmed: payment is handled offline/by call)
- Learning management system (LMS) features
- Multi-language support (can be a phase 2 requirement, e.g., Hindi)

---

## 8. Stakeholder Decisions Log

| Question | Decision |
|---|---|
| Single-page or multi-page site? | **Multi-page**, with dedicated routes per section/service (see Section 2) |
| How is the free session booked? | **Directly bookable via an embedded calendar tool** — no manual callback step |
| Is payment collected online? | **No** — all paid packages are settled **offline/by phone call** |
| Brand guidelines? | **None exist yet — to be created.** Brand name confirmed as **LittleLamp** |
| Launch date / budget? | **Not fixed** — no hard constraint on timeline or hosting budget |

### Implications for next steps
- Since branding doesn't exist yet, plan a short **brand identity phase** (logo, color palette, fonts) before final UI design — this affects every page's visuals.
- Since launch date is flexible, the project can proceed in phases: (1) brand identity → (2) wireframes/UI design → (3) build core pages (Home, Services, Pricing, Book) → (4) build remaining pages (About, Testimonials, Blog) → (5) QA, SEO, launch.
- Recommend confirming a rough budget range even without a fixed number, since it affects tooling choices (e.g., free-tier Calendly vs. paid, CMS vs. static config).
