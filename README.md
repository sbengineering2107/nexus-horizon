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
