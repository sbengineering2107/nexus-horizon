# Milestone 1 — Site Up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A deployed Nexus Horizon Advisors site on Vercel with the monorepo, design system, global layout, home page, services hub, 4 service pages and the core SEO/AI-SEO plumbing.

**Architecture:** Turborepo + pnpm monorepo. `apps/web` is a statically generated Next.js 16 App Router site; content comes from MDX via Velite behind `lib/content`; SEO helpers live in `lib/seo`. Leads, DB, locations, blog, tools and legal pages are later milestones and are not in this plan.

**Tech Stack:** pnpm 10, Turborepo, Next.js 16.2.x, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, Velite, schema-dts, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-31-nexus-horizon-website-phase1-design.md`

## Global Constraints

- Node ≥ 20.9; Next.js pinned `~16.2`; TypeScript `strict: true`.
- Language `en-IN` (`<html lang="en-IN">`).
- Production URL comes from `NEXT_PUBLIC_SITE_URL`; canonical, sitemap and JSON-LD URLs must never use a preview/vercel.app host in production.
- Pages read content only through `apps/web/lib/content` (CMS seam).
- Service slugs exactly: `new-projects`, `ready-to-move`, `resale`, `commercial`.
- All business details (name, phone, WhatsApp, email, address, MahaRERA, socials) come from `apps/web/site.config.ts`; placeholders clearly marked `PLACEHOLDER`.
- `robots.txt` allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended; disallows `/admin`, `/api`, `/thank-you`.
- Lighthouse mobile: Performance ≥ 90; SEO, Accessibility, Best Practices ≥ 95 on `/` and a service page.

## Review Focus

1. Unknown service slug (`/services/foo`) → real 404 page, not a 500 or an empty page. Test in Task 5.
2. Phone/WhatsApp placeholders with spaces or `+91` prefixes → `tel:` and `wa.me` links are digits-only and valid. Test in Task 3.
3. Preview deployments → `noindex` so previews never get indexed; production → indexable. Test in Task 4.
4. Mobile sticky WhatsApp/Call bar → must not cover the footer's last line (body gets bottom padding on mobile). Test in Task 3.
5. A service MDX file missing a required frontmatter field → build fails with a clear Velite error rather than shipping a broken page. Test in Task 2.

---

### Task 1: Monorepo scaffold

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.gitignore`, `.nvmrc` (`22`), `README.md`
- Create: `packages/config/{package.json,tsconfig.base.json,eslint.config.mjs}`
- Create: `apps/web` via `create-next-app` (App Router, TS, Tailwind, ESLint, no `src/`), then pin `next@~16.2`
- Create: `apps/web/vitest.config.ts`, `apps/web/tests/smoke.test.ts`

**Interfaces:**
- Produces: root scripts `pnpm dev | build | lint | typecheck | test` (run through turbo); workspace package names `@nh/web`, `@nh/config`, `@nh/ui`.

- [ ] **Step 1:** Scaffold root workspace and `apps/web`; set `"name": "@nh/web"`; extend `@nh/config/tsconfig.base.json`.
- [ ] **Step 2:** Write `tests/smoke.test.ts`: `expect(1 + 1).toBe(2)` to prove Vitest is wired.
- [ ] **Step 3:** Run `pnpm install && pnpm lint && pnpm typecheck && pnpm test && pnpm build`. Expected: all succeed.
- [ ] **Step 4:** Commit `chore: scaffold turborepo with next.js app`.

### Task 2: Site config and content layer (services)

**Files:**
- Create: `apps/web/site.config.ts`
- Create: `apps/web/velite.config.ts`, `apps/web/content/services/{new-projects,ready-to-move,resale,commercial}.mdx`
- Create: `apps/web/lib/content/services.ts`
- Test: `apps/web/tests/content/services.test.ts`

**Interfaces:**
- Produces:
  - `siteConfig: { name: string; legalName: string; description: string; url: string; phone: string; whatsapp: string; email: string; address: { street: string; locality: string; city: "Pune"; region: "Maharashtra"; postalCode: string; country: "IN" }; geo: { lat: number; lng: number }; maharera: string; socials: string[] }`
  - `type Service = { slug: ServiceSlug; title: string; summary: string; seoTitle: string; seoDescription: string; faqs: { q: string; a: string }[]; order: number; updated: string; body: string /* compiled MDX */ }`
  - `type ServiceSlug = "new-projects" | "ready-to-move" | "resale" | "commercial"`
  - `getServices(): Service[]` (sorted by `order`), `getService(slug: string): Service | null`

- [ ] **Step 1:** Write tests: `getServices()` returns 4 items in order `new-projects, ready-to-move, resale, commercial`; `getService("resale")?.title` is truthy; `getService("foo")` is `null`; every service has `faqs.length >= 3` and `seoDescription.length` between 70 and 160.
- [ ] **Step 2:** Run `pnpm --filter @nh/web test`. Expected: FAIL (module not found).
- [ ] **Step 3:** Define Velite `services` collection (all fields required; `updated` ISO date); write the 4 MDX files with placeholder, answer-first copy (question H2s, 40–60 word answers); implement `lib/content/services.ts`; wire Velite into `next.config.ts` build.
- [ ] **Step 4:** Run tests. Expected: PASS. Then temporarily delete `seoTitle` from one MDX and run `pnpm build`. Expected: build fails naming the field. Restore it.
- [ ] **Step 5:** Commit `feat: site config and services content layer`.

### Task 3: Design system and global layout

**Files:**
- Create: `packages/ui/{package.json,src/button.tsx,src/container.tsx,src/index.ts,src/styles/tokens.css}`
- Create: `apps/web/lib/contact-links.ts`
- Create: `apps/web/components/layout/{site-header.tsx,site-footer.tsx,mobile-cta-bar.tsx}`
- Modify: `apps/web/app/layout.tsx`, `apps/web/app/globals.css`
- Test: `apps/web/tests/contact-links.test.ts`, `apps/web/e2e/layout.spec.ts`

**Interfaces:**
- Produces:
  - `telHref(phone: string): string` → `"tel:+91XXXXXXXXXX"`
  - `whatsappHref(number: string, message?: string): string` → `"https://wa.me/91XXXXXXXXXX?text=<encoded>"`
  - `@nh/ui`: `Button` (variants `primary | secondary | ghost`, `asChild`), `Container`
- Consumes: `siteConfig` (Task 2), `getServices()` for header/footer nav.

- [ ] **Step 1:** Write unit tests: `telHref("+91 98765 43210") === "tel:+919876543210"`; `telHref("98765-43210") === "tel:+919876543210"`; `whatsappHref("+91 98765 43210", "Hi from /services/resale") === "https://wa.me/919876543210?text=Hi%20from%20%2Fservices%2Fresale"`; both throw on a number that isn't 10 digits after stripping `+91`/`91`/`0`.
- [ ] **Step 2:** Run tests. Expected: FAIL.
- [ ] **Step 3:** Implement `contact-links.ts`; brand tokens in `tokens.css` (deep navy primary, warm gold accent, neutral greys; one display serif + one sans via `next/font`); header with nav + "Book a free consultation" CTA linking `/contact`; footer with NAP, MahaRERA, service links, `© year`; `MobileCtaBar` fixed bottom, visible `< md`, with Call + WhatsApp; `body` gets `pb-16 md:pb-0`. `<html lang="en-IN">`.
- [ ] **Step 4:** Write Playwright test (viewport 390×844): mobile bar visible with 2 links whose `href`s start `tel:` and `https://wa.me/`; after scrolling to bottom, the footer's MahaRERA text is visible and not covered by the bar (bounding boxes don't intersect).
- [ ] **Step 5:** Run `pnpm --filter @nh/web test && pnpm --filter @nh/web e2e`. Expected: PASS.
- [ ] **Step 6:** Commit `feat: design system and global layout`.

### Task 4: SEO and AI-SEO plumbing

**Files:**
- Create: `apps/web/lib/seo/{metadata.ts,jsonld.ts,env.ts}`
- Create: `apps/web/app/{robots.ts,sitemap.ts,opengraph-image.tsx}`, `apps/web/app/llms.txt/route.ts`
- Create: `apps/web/components/seo/json-ld.tsx`
- Test: `apps/web/tests/seo/*.test.ts`

**Interfaces:**
- Produces:
  - `isProduction(): boolean` (true only when `VERCEL_ENV === "production"`)
  - `buildMetadata(input: { title: string; description: string; path: string; image?: string; noindex?: boolean }): Metadata` — absolute canonical from `siteConfig.url`; `robots.index = false` when `noindex` or `!isProduction()`.
  - `organizationJsonLd(): WithContext<RealEstateAgent>`, `websiteJsonLd(): WithContext<WebSite>`, `serviceJsonLd(s: Service): WithContext<SchemaService>`, `faqJsonLd(faqs: {q;a}[]): WithContext<FAQPage>`, `breadcrumbJsonLd(items: { name: string; path: string }[]): WithContext<BreadcrumbList>`
  - `<JsonLd data={...} />` renders `<script type="application/ld+json">`.

- [ ] **Step 1:** Write tests:
  - `buildMetadata({title:"X",description:"Y",path:"/services/resale"}).alternates.canonical === siteConfig.url + "/services/resale"`
  - with `VERCEL_ENV="preview"` → `robots.index === false`; with `"production"` → `true`; with `noindex:true` in production → `false`
  - `robots()` rules include each of the 7 AI user agents with `allow: "/"`, and `disallow` contains `/admin`, `/api`, `/thank-you`; in preview, `*` is disallowed `/`
  - `sitemap()` contains `/`, `/services` and all 4 service URLs, all absolute
  - `organizationJsonLd()` has `@type: "RealEstateAgent"`, `address.addressLocality === "Pune"`, `areaServed` includes `"Pune"`, and `identifier` equals `siteConfig.maharera`
  - `faqJsonLd([{q:"a",a:"b"}]).mainEntity[0].acceptedAnswer.text === "b"`
  - GET `/llms.txt` body starts with `# Nexus Horizon Advisors` and lists each service URL
- [ ] **Step 2:** Run tests. Expected: FAIL.
- [ ] **Step 3:** Implement; root layout renders organization + website JSON-LD and default metadata (`metadataBase`, title template `%s | Nexus Horizon Advisors`).
- [ ] **Step 4:** Run tests. Expected: PASS.
- [ ] **Step 5:** Commit `feat: seo metadata, json-ld, robots, sitemap, llms.txt`.

### Task 5: Home, services hub, service pages, 404

**Files:**
- Create: `apps/web/app/page.tsx`, `apps/web/components/home/{hero.tsx,services-grid.tsx,why-us.tsx,process.tsx,testimonials.tsx,cta-band.tsx}`
- Create: `apps/web/app/services/page.tsx`, `apps/web/app/services/[service]/page.tsx`, `apps/web/app/not-found.tsx`
- Create: `apps/web/content/home/testimonials.json` (3 placeholder testimonials)
- Create: `apps/web/scripts/check-seo.mjs`
- Test: `apps/web/e2e/pages.spec.ts`

**Interfaces:**
- Consumes: `getServices`, `getService`, `buildMetadata`, JSON-LD builders, `Button`, `Container`, `telHref`, `whatsappHref`.
- Produces: `generateStaticParams()` for `[service]` returning the 4 slugs, `dynamicParams = false`.

- [ ] **Step 1:** Write Playwright tests: `/` has exactly one `h1` and links to all 4 service pages; each `/services/<slug>` returns 200, has one `h1` equal to the service title, an FAQ section and a `<script type="application/ld+json">` containing `"FAQPage"`; `/services/foo` returns 404 and shows the not-found page with a link home.
- [ ] **Step 2:** Run e2e. Expected: FAIL.
- [ ] **Step 3:** Build pages per spec §3 (home sections: hero, services, why us, process, testimonials, CTA; service page: summary, MDX body, FAQs, CTA with WhatsApp pre-filled with the page path, breadcrumbs + JSON-LD). Write `check-seo.mjs`: scans `.next/server/app/**/*.html`; fails if any page lacks `<title>`, meta description, canonical, has ≠ 1 `<h1>`, or has unparseable JSON-LD. Add `"postbuild": "node scripts/check-seo.mjs"`.
- [ ] **Step 4:** Run `pnpm build && pnpm --filter @nh/web e2e`. Expected: build passes the SEO check; e2e PASS.
- [ ] **Step 5:** Run Lighthouse (mobile) against `pnpm start` on `/` and `/services/new-projects`. Expected: thresholds in Global Constraints met; fix and re-run if not.
- [ ] **Step 6:** Commit `feat: home, services hub and service pages`.

### Task 6: CI and Vercel deployment

**Files:**
- Create: `.github/workflows/ci.yml` (install → lint → typecheck → test → build; Playwright on PRs)
- Modify: `README.md` (setup, scripts, env vars, deploy notes)

**Interfaces:**
- Consumes: GitHub repo `sbengineering2107/nexus-horizon`; Vercel project root directory `apps/web`, framework Next.js, install `pnpm install`, build `turbo run build --filter=@nh/web`.
- Env: `NEXT_PUBLIC_SITE_URL` (production = Vercel production URL until the domain is connected).

- [ ] **Step 1:** Push repo to GitHub; confirm the CI workflow passes on `main`.
- [ ] **Step 2:** Create the Vercel project linked to the repo; set env var; deploy production.
- [ ] **Step 3:** Verify on the live URL: `/` returns 200; `/robots.txt` contains `GPTBot`; `/sitemap.xml` lists 6 URLs; `/llms.txt` returns 200; a preview deployment serves `X-Robots-Tag`/meta `noindex`.
- [ ] **Step 4:** Commit `ci: github actions and deployment docs`.

---

**Next milestones (separate plans):** 2 — lead capture + Neon/Drizzle + `/contact` + `/thank-you`; 3 — Pune locations; 4 — blog, FAQ, RSS, llms-full; 5 — calculators; 6 — about, how-we-work, legal, analytics, launch checklist.
