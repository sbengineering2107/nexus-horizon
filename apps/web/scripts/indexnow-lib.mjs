/** Pure helpers for scripts/indexnow.mjs (kept separate so they can be unit tested). */

/** True when robots.txt blocks all crawlers from the whole site (indexing switched off). */
export function siteBlocked(robotsTxt) {
  const groups = robotsTxt.split(/\n(?=user-agent:)/i);
  return groups.some(
    (g) => /user-agent:\s*\*/i.test(g) && /^disallow:\s*\/\s*$/im.test(g) && !/^allow:\s*\/\s*$/im.test(g),
  );
}

/** All <loc> URLs in a sitemap. */
export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

/** IndexNow request body for a site and its key file. */
export function indexNowPayload(siteUrl, key, urls) {
  const { host, origin } = new URL(siteUrl);
  return { host, key, keyLocation: `${origin}/${key}.txt`, urlList: urls.filter((u) => new URL(u).host === host) };
}
