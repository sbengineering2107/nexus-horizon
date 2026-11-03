import { siteConfig } from "@/site.config";
import { telHref } from "@/lib/contact-links";

/** Client-safe call link (lib/cta pulls in content, so client components import this instead). */
export const callHref = telHref(siteConfig.phone);
