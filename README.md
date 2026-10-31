# Nexus Horizon Advisors — website

Turborepo + pnpm monorepo.

| Path | What |
|---|---|
| `apps/web` | Next.js 16 site (`@nh/web`) |
| `packages/ui` | Shared UI components and design tokens (`@nh/ui`) |
| `packages/config` | Shared TypeScript config (`@nh/config`) |
| `docs/superpowers` | Design spec and implementation plans |

## Getting started

```bash
nvm use            # Node 22
corepack enable    # provides pnpm 10
pnpm install
pnpm dev           # http://localhost:3000
```

## Scripts

`pnpm build` · `pnpm lint` · `pnpm typecheck` · `pnpm test` (Vitest) · `pnpm e2e` (Playwright)

## Environment variables

| Name | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel (Production) | Canonical site URL, e.g. `https://nexushorizon.in`. Used for canonical tags, sitemap, JSON-LD and `llms.txt`. |
| `SITE_INDEXING` | Vercel (Production) | Set to `on` **only after** replacing every `PLACEHOLDER` in `site.config.ts` (real MahaRERA number, phone, address). Until then the live site is `noindex` and `robots.txt` disallows all. |
| `VERCEL_ENV` | Set by Vercel | Search engines may index only when this is `production` **and** `SITE_INDEXING=on`. Previews and local builds are always `noindex`. |
| `VERCEL_PROJECT_PRODUCTION_URL` | Set by Vercel | Fallback site URL when `NEXT_PUBLIC_SITE_URL` is unset. A production build that would resolve to localhost fails. |

## Editing content

- Business details (phone, WhatsApp, address, MahaRERA no.): `apps/web/site.config.ts`. Every `PLACEHOLDER` must be replaced before launch.
- Service pages: `apps/web/content/services/*.mdx`. The build fails if required frontmatter is missing.
- Testimonials: `apps/web/content/home/testimonials.json`.

## Deployment (Vercel)

- Root directory: `apps/web`. Keep "Include files outside the root directory" enabled (the app imports `packages/ui` and `packages/config`). Framework: Next.js. Install and build commands are the defaults (pnpm is detected from the lockfile).
- Set `NEXT_PUBLIC_SITE_URL` for the Production environment.
- The build runs `scripts/check-seo.mjs` after `next build` and fails if any page is missing a title, description, canonical, single H1 or valid JSON-LD.

## Testing locally

```bash
pnpm test                                    # unit tests
pnpm build && pnpm --filter @nh/web e2e      # end-to-end (mobile viewport)
```
