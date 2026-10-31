import { siteConfig } from "@/site.config";
import { telHref, whatsappHref } from "@/lib/contact-links";

/**
 * Where "Book a free consultation" points. Until /contact ships (milestone 2)
 * it opens WhatsApp with a pre-filled request; switch this to "/contact" then.
 */
export function consultationHref(pagePath = "/"): string {
  return whatsappHref(
    siteConfig.whatsapp,
    `Hi Nexus Horizon, I'd like to book a free consultation. (from ${pagePath})`,
  );
}

export const callHref = telHref(siteConfig.phone);

export function whatsappChatHref(pagePath = "/"): string {
  return whatsappHref(siteConfig.whatsapp, `Hi Nexus Horizon, I have a question. (from ${pagePath})`);
}
