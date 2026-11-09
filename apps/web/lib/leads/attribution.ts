/** First-touch attribution, kept in a first-party cookie for 30 days and attached to each lead. */

export const ATTRIBUTION_COOKIE = "nh_attr";
export const ATTRIBUTION_MAX_AGE = 60 * 60 * 24 * 30;

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "referrer", "landing_page"] as const;
export type AttributionKey = (typeof KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

/** Keeps the cookie well under the 4 KB browser limit. */
const MAX = 200;

/** What to remember about a visit's first page view. */
export function captureAttribution(href: string, referrer: string): Attribution {
  const url = new URL(href);
  const out: Attribution = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const) {
    const v = url.searchParams.get(k);
    if (v) out[k] = v.slice(0, MAX);
  }
  if (referrer) {
    try {
      // Origin only: a referrer's path or query can carry search terms or personal data.
      const ref = new URL(referrer);
      if (ref.host !== url.host) out.referrer = ref.origin;
    } catch {
      /* not a URL; ignore */
    }
  }
  out.landing_page = url.pathname.slice(0, MAX);
  return out;
}

/** Read the cookie back, keeping only known keys with short string values. */
export function parseAttribution(cookie: string | undefined): Attribution {
  if (!cookie) return {};
  let data: unknown;
  try {
    data = JSON.parse(decodeURIComponent(cookie));
  } catch {
    return {};
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};
  const out: Attribution = {};
  for (const k of KEYS) {
    const v = (data as Record<string, unknown>)[k];
    if (typeof v === "string" && v) out[k] = v.slice(0, MAX);
  }
  return out;
}
