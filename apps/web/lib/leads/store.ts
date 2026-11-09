import "server-only";
import { createLeadStore, type LeadStore } from "@nh/db";

let store: Promise<LeadStore> | null = null;

/** Whether lead forms are switched on: they appear only once a database is connected. */
export function leadsEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** One store per server process; null when no DATABASE_URL is set. */
export function getLeadStore(): Promise<LeadStore> | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  // A failed open is not cached, so the next submission retries instead of failing until restart.
  store ??= createLeadStore(url).catch((err) => {
    store = null;
    throw err;
  });
  return store;
}
