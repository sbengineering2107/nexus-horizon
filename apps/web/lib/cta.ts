import { siteConfig } from "@/site.config";
import { telHref, whatsappHref } from "@/lib/contact-links";
import { messagesFor } from "@/lib/page-messages";

/**
 * Where "Book a free consultation" points. Until /contact ships (milestone 2)
 * it opens WhatsApp with a request written for the page the visitor is on.
 */
export function consultationHref(pagePath = "/"): string {
  return whatsappHref(siteConfig.whatsapp, messagesFor(pagePath).consult);
}

export const callHref = telHref(siteConfig.phone);

export function whatsappChatHref(pagePath = "/"): string {
  return whatsappHref(siteConfig.whatsapp, messagesFor(pagePath).chat);
}
