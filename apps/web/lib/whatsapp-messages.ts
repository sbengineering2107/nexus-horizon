import type { ServiceSlug } from "@/lib/content/services";

/** The kind of page a visitor is on, which decides what their WhatsApp message says. */
export type PageInfo =
  | { kind: "home" }
  | { kind: "services" }
  | { kind: "service"; slug: ServiceSlug }
  | { kind: "areas" }
  | { kind: "area"; name: string }
  | { kind: "calculators" }
  | { kind: "calculator"; title: string }
  | { kind: "other" };

const HI = "Hi Nexus Horizon,";

/** What a buyer interested in each service is looking for, in their own words. */
const INTEREST: Record<ServiceSlug, string> = {
  "new-projects": "new or under-construction projects",
  "ready-to-move": "ready-to-move homes",
  resale: "buying a resale flat",
  commercial: "commercial or office space",
};

export function chatMessage(p: PageInfo): string {
  switch (p.kind) {
    case "home":
      return `${HI} I'm looking for property in Pune and would like some advice.`;
    case "services":
      return `${HI} I'd like to know which of your services fits what I'm looking for in Pune.`;
    case "service":
      return `${HI} I'm looking at ${INTEREST[p.slug]} in Pune and would like your advice.`;
    case "areas":
      return `${HI} I'm comparing areas in Pune and would like advice on where to buy.`;
    case "area":
      return `${HI} I was reading your ${p.name} guide and I'm interested in property in ${p.name}.`;
    case "calculators":
      return `${HI} I'd like help planning my home loan and property budget.`;
    case "calculator":
      return `${HI} I was using your ${p.title} and have a question.`;
    case "other":
      return `${HI} I'd like some advice on property in Pune.`;
  }
}

export function consultationMessage(p: PageInfo): string {
  const ask = `${HI} I'd like to book a free consultation`;
  switch (p.kind) {
    case "service":
      return `${ask} about ${INTEREST[p.slug]} in Pune.`;
    case "area":
      return `${ask} about property in ${p.name}.`;
    case "calculator":
      return `${ask}. I've been using your ${p.title}.`;
    case "calculators":
      return `${ask} about my home loan and property budget.`;
    default:
      return `${ask} about property in Pune.`;
  }
}

/** Message for the home page "What are you looking for?" picker. */
export function enquiryMessage(slug?: ServiceSlug): string {
  return slug ? chatMessage({ kind: "service", slug }) : consultationMessage({ kind: "home" });
}

export type PageMessages = { chat: string; consult: string };
export type PageMessageMap = Record<string, PageMessages>;

export const FALLBACK_MESSAGES: PageMessages = {
  chat: chatMessage({ kind: "other" }),
  consult: consultationMessage({ kind: "other" }),
};

/** Look up a path's messages, ignoring a trailing slash; unknown paths get the general message. */
export function pickMessages(path: string, map: PageMessageMap): PageMessages {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return map[clean] ?? FALLBACK_MESSAGES;
}
