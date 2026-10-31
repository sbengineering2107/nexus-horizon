import { siteConfig } from "@/site.config";
import { whatsappHref } from "@/lib/contact-links";

/** Pune micro-markets shown on the home page until area pages ship. */
export const AREAS = [
  { name: "Baner", note: "Established residential hub on the Mumbai–Bengaluru highway, next to Balewadi." },
  { name: "Hinjewadi", note: "Home to the Rajiv Gandhi Infotech Park and Pune's largest IT workforce." },
  { name: "Kharadi", note: "East Pune business district around EON IT Park, close to the airport." },
  { name: "Wakad", note: "Popular with families working in Hinjewadi, with quick access to the expressway." },
] as const;

export type Enquiry = { service?: string; area?: string; pagePath: string };

/** WhatsApp link with a message naming what the visitor picked and the page they came from. */
export function enquiryHref({ service, area, pagePath }: Enquiry): string {
  const about = [service && `${service} properties`, area && `in ${area}`].filter(Boolean).join(" ");
  const ask = about ? `I'd like advice on ${about}.` : "I'd like to book a free consultation.";
  return whatsappHref(siteConfig.whatsapp, `Hi Nexus Horizon, ${ask} (from ${pagePath})`);
}
