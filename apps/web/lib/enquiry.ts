import { siteConfig } from "@/site.config";
import { whatsappHref } from "@/lib/contact-links";
import type { ServiceSlug } from "@/lib/content/services";
import { enquiryMessage } from "@/lib/whatsapp-messages";

/** WhatsApp link for the home page picker, saying in plain words what the visitor is after. */
export function enquiryHref(service?: ServiceSlug): string {
  return whatsappHref(siteConfig.whatsapp, enquiryMessage(service));
}
