# Adult Family Home — Dual-Design Build Plan

Two complete websites built side-by-side from your Website_plan.pdf, each using a different visual direction but sharing the same backend, content, and admin. You'll be able to compare them live and pick the winner (or keep both).

## Structure

Both sites live in the same project under separate route trees so they're truly independent visually but share data:

```
/                       → Landing chooser (pick a design to preview)
/heritage/*             → Design v2 — Warm Heritage Editorial (Fraunces + Inter, sage green)
/heirloom/*             → Design v3 — Editorial Heirloom (Lora + Inter + JetBrains Mono, warm cream)
/admin/*                → Shared owner dashboard (login-gated)
```

Each design tree contains the full page set from your plan:
`home, about, rooms, rooms/$roomId, services, admissions, resources, contact, tour`

Partners is rendered as a "Coming Soon" page in both, per the plan's Phase 2 note.

## Shared backend (Lovable Cloud)

One database, one admin, both sites read from it. Tables:

- `rooms` — 6 rows, fields: name, slug, photos[], sqft, amenities, status (`available` / `waitlist` / `occupied`), notes
- `inquiries` — contact/admissions/tour form submissions, with source page + which design they came from
- `testimonials` — family quotes (FTC-safe, no medical-outcome claims)
- `blog_posts` — title, slug, body, hero, published_at (seeded with 3 SEO articles from your topic list)
- `site_settings` — business name, DSHS license #, phone, email, address, social links (single source of truth so both designs always show identical info)

Admin pages (Supabase Auth, owner-only):

- `/admin` — dashboard overview (room status, recent inquiries)
- `/admin/rooms` — toggle availability per room
- `/admin/inquiries` — table view of leads
- `/admin/settings` — edit business info, license, contact details
- `/admin/blog` — basic post CRUD

## Page-by-page coverage (built in BOTH designs)

- **Home** — hero, why-choose-us (3 col), services snapshot (4 icons), live rooms-at-a-glance strip pulling from DB, owner blurb, 3 testimonials, licensing/compliance strip with DSHS link, local service-area + Google Map (load-on-click), footer
- **About** — owner bio, caregivers (no last names), mission, community, credentials, history timeline, tour CTA
- **Rooms** — gallery grid of 6 rooms with live availability badges + filter; each room has its own page with photo gallery, amenities checklist, "Ask about this room" form, adjacent-rooms strip
- **Services** — full list aligned to DSHS license scope, with compliance note
- **Admissions** — process steps, RCW 70.128.280 disclosures, payment options, what-to-bring checklist, contact form
- **Resources** — Families guide, tour checklist, DSHS inspection lookup link, FAQ, blog list
- **Contact** — form (React Hook Form + Zod), phone, email, address, map
- **Tour** — booking form (custom date picker writing to `inquiries`, Calendly-ready slot for later), 3-step what-to-expect, pre-tour checklist download

## Compliance & quality (applied to both)

- **WCAG 2.1 AA**: 18px+ body, 4.5:1 contrast, full keyboard nav, alt text everywhere, labeled forms, no color-only meaning
- **SEO**: separate route per page with unique `head()` (title, description, og:title, og:description), JSON-LD `LocalBusiness` + `BreadcrumbList`, `sitemap.xml`, `robots.txt` disallowing `/admin`, canonicals
- **Legal pages**: `/privacy`, `/terms`, `/accessibility` with the required Washington/ADA language
- **Mobile**: sticky bottom "Call" + "Book a Tour" bar, 44px touch targets, click-to-call links
- **Placeholders**: all owner-supplied content uses `[BUSINESS_NAME]`, `[DSHS_LICENSE]`, `[PHONE]`, etc., plus generated stand-in images that you can swap in admin

## Design tokens (locked verbatim from chosen prototypes)

**Heritage (v2)** — Fraunces display / Inter body; sage `#3f6212`, stone-100 surfaces, cream `#fafaf9` background, soft rounded cards, sticky blurred nav.

**Heirloom (v3)** — Lora serif / Inter / JetBrains Mono accents; sage `#5B6351`, cream `#F9F7F2` background, dark `#2D2A26` ink, mono labels and numbered service cards.

Each tree gets its own scoped CSS variables under a wrapper class so they coexist without leaking into each other.

## Build order

1. Enable Lovable Cloud → schema + RLS + seed data
2. Shared layer: route tree skeleton, shared data hooks, shared form/admin logic, SEO + legal pages
3. Heritage design system + all pages
4. Heirloom design system + all pages
5. Admin dashboard
6. Sitemap, robots, JSON-LD, accessibility pass, mobile sticky bar
7. Landing chooser at `/`

## Technical notes

- TanStack Start file-based routing; one route file per page per design tree
- Shared components live in `src/components/shared/`; design-specific in `src/components/heritage/` and `src/components/heirloom/`
- Forms via React Hook Form + Zod, submitting through a server function that writes to `inquiries` and (later) emails the owner
- Images: generated placeholders in `src/assets/` for hero/rooms/people, with owner-replaceable URLs stored in DB where it matters (rooms, testimonials, blog)
- Calendly slot left as a config field in `site_settings` so owner can paste a URL later without code changes

## Out of scope for this first pass

- Real Calendly integration (form-based booking works immediately; Calendly is one paste away)
- Resend/SendGrid email (inquiries land in admin; email wiring is a follow-up)
- Partner directory beyond "Coming Soon"
- Google Reviews live widget (uses seeded testimonials table; widget can swap in later)
- Cookie consent banner library (basic notice included; full CMP if you want one later)

Approve and I'll build both sites end-to-end.
