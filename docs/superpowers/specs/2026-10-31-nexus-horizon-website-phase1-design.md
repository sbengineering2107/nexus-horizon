# Nexus Horizon Advisors — Website Phase 1 Design

**Date:** 2026-10-31
**Status:** Draft — awaiting review
**Scope:** Phase 1 (launch) only. Later phases are listed under "Out of scope".

## 1. Intent

Nexus Horizon Advisors is a Pune-based real estate advisory firm (channel partner / property consultant). The website must:

1. **Generate leads** — every page converts (forms, WhatsApp, call).
2. **Build content authority** — rank on Google and get cited by AI answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews).
3. **Establish credibility** — MahaRERA number, testimonials, track record on every page.

**Success criteria for Phase 1**
- Site live on the production domain, all pages below published with placeholder content.
- Lead forms store submissions in Postgres; nothing is lost on failure (WhatsApp/call fallback).
- Lighthouse mobile: Performance ≥ 90; SEO, Accessibility, Best Practices ≥ 95 on core templates.
- Valid JSON-LD on every page; sitemap, robots.txt and llms.txt generated from content.

**Constraints**
- Pune only; URLs city-first so other cities can be added.
- English only; `en-IN`; structure allows Marathi later.
- All content is placeholder until the owner supplies real copy; replacing it requires content edits only, no code changes.
- No property listings in Phase 1.

## 2. Services (4)

| Slug | Name | Notes |
|---|---|---|
| `new-projects` | New Project Advisory | Under-construction developer projects (core CP work) |
| `ready-to-move` | Ready-to-Move Properties | Completed developer inventory |
| `resale` | Resale & Secondary Market | Buying from existing owners |
| `commercial` | Commercial & Office Spaces | Lease and purchase for businesses |

## 3. Sitemap

**Core**
- `/` — hero, services, why us, featured areas, process, testimonials, latest guides, CTA
- `/services` and `/services/[service]` (4 pages)
- `/about` — story, team, MahaRERA, track record
- `/how-we-work` — advisory process, why free for buyers, transparency
- `/contact` — consultation form, WhatsApp, call, map
- `/thank-you` — post-submit, conversion tracking (noindex)

**Locations**
- `/pune` — city hub
- `/pune/[area]` — area guide (overview, connectivity, who it suits, FAQs)
- `/pune/[area]/[service]` — generated **only** when an MDX file exists for that combination (no templated duplicates). Launch set: 3 areas × 4 services = 12 pages.
- Placeholder areas: Baner, Hinjewadi, Kharadi.

**Content**
- `/blog`, `/blog/[slug]`, `/blog/category/[category]`
- `/faq` — grouped FAQs

**Tools**
- `/tools` — hub
- `/tools/emi-calculator`
- `/tools/stamp-duty-calculator` — Maharashtra stamp duty + registration; rates in one config file with source URL and "last verified" date

**Legal**
- `/privacy-policy` (DPDP Act aligned), `/terms`, `/disclaimer` (RERA disclaimer, advisory not seller)

**Machine-readable**
- `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `rss.xml`, per-page Open Graph images

**Global UI**
- Header with "Book a free consultation" CTA
- Sticky mobile bar: WhatsApp + Call
- Footer with MahaRERA number, NAP (name, address, phone), legal links

## 4. Architecture

Turborepo + pnpm workspaces. No separate backend.

```
nexus-horizon/
├── apps/
│   └── web/                 Next.js 16 (App Router)
│       ├── app/             routes
│       ├── content/         MDX: services/, areas/, area-services/, blog/, faq/, legal/
│       ├── lib/
│       │   ├── content/     content-access layer (getService, getArea, getPosts…) ← CMS seam
│       │   ├── seo/         metadata builders, JSON-LD builders
│       │   ├── leads/       schema, server action, attribution
│       │   └── calculators/ emi.ts, stamp-duty.ts (pure functions)
│       └── site.config.ts   firm name, phone, WhatsApp, address, MahaRERA, socials (placeholders)
├── packages/
│   ├── db/                  Drizzle schema, client, migrations
│   ├── ui/                  shadcn/ui-based components, design tokens
│   └── config/              tsconfig, eslint, shared Tailwind preset
└── docs/
```

**Rule:** pages never read MDX files directly; they call `lib/content`. Moving to Payload CMS later replaces that module only, with URLs unchanged.

## 5. Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (pinned to 16.2.x Active LTS), React 19, TypeScript strict, Turbopack |
| Styling | Tailwind CSS v4, shadcn/ui, Framer Motion (respects reduced motion) |
| Content | MDX via Velite (typed frontmatter schemas) |
| Forms | React Hook Form + Zod (shared client/server schema), server actions |
| Database | Neon Postgres + Drizzle ORM |
| SEO | Next.js Metadata API, `sitemap.ts`, `robots.ts`, `opengraph-image`, `schema-dts` |
| Analytics | GA4, Google Search Console, Bing Webmaster Tools, Microsoft Clarity, Vercel Speed Insights |
| Testing | Vitest, Playwright, Lighthouse CI |
| CI | GitHub Actions |
| Hosting | **Open decision:** Vercel Pro (recommended) or Cloudflare via OpenNext |
| DNS | Cloudflare |

## 6. SEO and AI SEO

**Technical**
- All content pages statically generated; targets LCP < 2.5s, INP < 200ms, CLS < 0.1 (mobile).
- Unique title, description, canonical, OG tags and generated OG image per page.
- Sitemap generated from content. Breadcrumbs on all non-home pages.
- Internal linking: area ↔ service ↔ related guides ↔ calculators.
- Custom 404, redirects file, `lang="en-IN"`.

**Local**
- Consistent NAP across site and Google Business Profile.
- Map embed on `/contact`; `areaServed` and `geo` in JSON-LD.

**Structured data**
- Site-wide: `RealEstateAgent` + `Organization` (MahaRERA identifier, `sameAs`), `WebSite`.
- Per page: `Service`, `Place`, `BlogPosting` + author `Person`, `FAQPage`, `BreadcrumbList`, `WebApplication` (calculators).

**AI SEO**
1. `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended. Cloudflare AI-crawler blocking verified off at launch.
2. Answer-first content: question-style H2s, 40–60 word direct answer, key facts in tables, visible "Last updated" date, named author with credentials.
3. Cite authoritative sources (MahaRERA, IGR Maharashtra).
4. `llms.txt` and `llms-full.txt` generated at build time (low-cost, unconfirmed benefit).
5. IndexNow ping to Bing on production deploy.
6. Consistent entity: same name, description and `sameAs` everywhere.
7. GA4 segment for AI referrers (chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com).

## 7. Lead capture

**Entry points**
1. Quick form (service and area pages): name, phone, service (pre-filled).
2. Consultation form (`/contact`): + area, budget range, timeline, message.
3. Calculator form: + calculator inputs serialised into `message`.
4. WhatsApp (`wa.me` with page-specific pre-filled text) and `tel:` links — tracked as GA4 events.

All forms include a DPDP consent checkbox (required) and a hidden honeypot field.

**Flow**
Client Zod validation → server action re-validates → honeypot filled ⇒ return fake success, store nothing → insert into `leads` → redirect `/thank-you` → GA4 `generate_lead`.

**Attribution**
First visit stores `utm_*`, `gclid`, referrer and landing page in a first-party cookie (30 days); attached to every submission.

**Failure handling**
DB insert error → form shows "Couldn't submit — reach us on WhatsApp or call" with buttons; error logged server-side. No PII in logs.

**`leads` table**

| Column | Type | Notes |
|---|---|---|
| id | uuid pk | |
| created_at | timestamptz | default now() |
| name | text | required, 2–80 chars |
| phone | text | required, normalised to `+91XXXXXXXXXX` |
| email | text | optional |
| service | enum | one of 4 slugs, nullable for general enquiries |
| area | text | optional |
| budget_range | text | optional, fixed options |
| timeline | text | optional, fixed options |
| message | text | optional, ≤ 2000 chars |
| form_type | enum | quick, consultation, calculator |
| source_page | text | path |
| utm_source / medium / campaign / term / content | text | optional |
| gclid, referrer, landing_page | text | optional |
| consent_given | boolean | must be true |
| consent_version | text | e.g. `2026-10-v1` |
| consent_at | timestamptz | |
| status | enum | new (default), contacted, closed |
| notes | text | optional |

In Phase 1 leads are viewed and exported from the Neon console.

## 8. Testing

- **Vitest:** EMI, stamp duty, lead schema, phone normalisation, attribution parsing, content-access layer, JSON-LD builders.
- **Playwright (mobile viewport):** submit → `/thank-you`; honeypot rejection; DB-failure fallback; both calculators; nav and 404.
- **Build-output SEO check script:** every HTML page has title, description, canonical, exactly one H1, valid JSON-LD; sitemap matches routes; no broken internal links.
- **Lighthouse CI:** home, service, area, blog post, calculator — thresholds from §1.

## 9. Delivery

**First milestone — "site up":** monorepo scaffold, design system, layout (header/footer/mobile bar), home page and core SEO plumbing, deployed to a production URL. Remaining pages ship incrementally to the same deployment.

**CI/CD:** GitHub Actions (lint, typecheck, test, build) gates merges; preview deploy per PR with a Neon branch database; `main` → production after Drizzle migrations.

**Launch checklist:** domain + SSL; Search Console and Bing verified with sitemap submitted; Google Business Profile linked; GA4 and Clarity live; AI crawlers allowed; redirects and robots verified.

## 10. Needed from the owner (placeholders until supplied)

- **Accounts:** domain, GitHub, hosting (Vercel or Cloudflare), Neon, Google (Search Console, GA4, Business Profile), Bing Webmaster Tools, Microsoft Clarity.
- **Content:** logo, brand colours, MahaRERA number, service copy, Pune areas, about story, team photos, testimonials, phone/WhatsApp/email/address, social links.
- **Legal:** CA/lawyer review of drafted privacy policy and disclaimer.

## 11. Out of scope (later phases)

- 1.1: admin login (username/password, Argon2id, lockout) and `/admin/leads` with status and CSV export.
- Later: instant alerts (email/Telegram/WhatsApp API), Turnstile and rate limiting, Payload CMS, property listings and project pages, more cities and areas, Marathi, CRM sync, CP platform.
