import type { Metadata } from "next";

type Env = Record<string, string | undefined>;

export type AnalyticsConfig = { gaId: string | null; clarityId: string | null; speedInsights: boolean };

const GA_ID = /^G-[A-Z0-9]{4,20}$/;
const CLARITY_ID = /^[a-z0-9]{6,20}$/;

/** Analytics run only on the production deployment, and only for tools whose ID is set and well-formed. */
export function analyticsConfig(env: Env): AnalyticsConfig {
  const prod = env.VERCEL_ENV === "production";
  const ga = env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
  const clarity = env.NEXT_PUBLIC_CLARITY_ID?.trim() ?? "";
  return {
    gaId: prod && GA_ID.test(ga) ? ga : null,
    clarityId: prod && CLARITY_ID.test(clarity) ? clarity : null,
    speedInsights: prod && env.VERCEL === "1",
  };
}

/** GA4 event name for a contact link, or null for ordinary links. */
export function classifyLink(href: string): "whatsapp_click" | "call_click" | "email_click" | null {
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp_click";
  if (href.startsWith("tel:")) return "call_click";
  if (href.startsWith("mailto:")) return "email_click";
  return null;
}

const AI_HOSTS: [RegExp, string][] = [
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)claude\.ai$/, "claude"],
  [/^gemini\.google\.com$/, "gemini"],
  [/^copilot\.microsoft\.com$/, "copilot"],
];

/** Which AI assistant sent the visitor, from document.referrer. */
export function aiSource(referrer: string): string | null {
  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  return AI_HOSTS.find(([re]) => re.test(host))?.[1] ?? null;
}

/** Search Console / Bing Webmaster verification meta tags from env. */
export function verificationMeta(env: Env): Metadata["verification"] {
  const google = env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = env.BING_SITE_VERIFICATION?.trim();
  if (!google && !bing) return undefined;
  return { ...(google ? { google } : {}), ...(bing ? { other: { "msvalidate.01": bing } } : {}) };
}
