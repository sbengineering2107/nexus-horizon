/**
 * Search engines may index the site only on a Vercel production deployment AND once
 * the owner turns indexing on (SITE_INDEXING=on) after replacing placeholder details.
 * Previews, local builds and placeholder launches are noindex.
 */
export function isIndexable(): boolean {
  return process.env.VERCEL_ENV === "production" && process.env.SITE_INDEXING === "on";
}
