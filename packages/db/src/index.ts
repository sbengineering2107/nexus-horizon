import { leads, type NewLead } from "./schema";

export * from "./schema";

/** The only database operation the site needs in Phase 1. Injected so tests can fake failures. */
export type LeadStore = { insertLead(lead: NewLead): Promise<void> };

const PGLITE = "pglite:";

/**
 * Lead store for a DATABASE_URL: Neon over HTTP in production, or an embedded PGlite
 * database for local runs and tests (`pglite:./path` or `pglite:memory`). Migrations are
 * applied separately by scripts/migrate.mjs.
 */
export async function createLeadStore(url: string): Promise<LeadStore> {
  if (url.startsWith(PGLITE)) {
    const { PGlite } = await import("@electric-sql/pglite");
    const { drizzle } = await import("drizzle-orm/pglite");
    const target = url.slice(PGLITE.length);
    const db = drizzle(new PGlite(target === "memory" ? undefined : target));
    return { insertLead: async (lead) => void (await db.insert(leads).values(lead)) };
  }
  const { neon } = await import("@neondatabase/serverless");
  const { drizzle } = await import("drizzle-orm/neon-http");
  const db = drizzle(neon(url));
  return { insertLead: async (lead) => void (await db.insert(leads).values(lead)) };
}
