type Env = Record<string, string | undefined>;

/**
 * The site's canonical origin. Order: NEXT_PUBLIC_SITE_URL, then Vercel's production
 * URL, then localhost for local work. A production deployment may never resolve to
 * localhost: canonicals, sitemap and JSON-LD would point nowhere.
 */
export function resolveSiteUrl(env: Env): string {
  const raw =
    env.NEXT_PUBLIC_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  const url = raw.replace(/\/+$/, "");
  if (env.VERCEL_ENV === "production" && /\/\/(localhost|127\.0\.0\.1)(:|$)/.test(url)) {
    throw new Error("Production build has no site URL: set NEXT_PUBLIC_SITE_URL in the Vercel project.");
  }
  return url;
}
