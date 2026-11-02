import { siteConfig } from "@/site.config";
import { whatsappHref } from "@/lib/contact-links";

export type Enquiry = { service?: string; area?: string; pagePath: string };

/** WhatsApp link with a message naming what the visitor picked and the page they came from. */
export function enquiryHref({ service, area, pagePath }: Enquiry): string {
  const about = [service && `${service} properties`, area && `in ${area}`].filter(Boolean).join(" ");
  const ask = about ? `I'd like advice on ${about}.` : "I'd like to book a free consultation.";
  return whatsappHref(siteConfig.whatsapp, `Hi Nexus Horizon, ${ask} (from ${pagePath})`);
}
