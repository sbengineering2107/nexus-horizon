"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/site.config";
import { whatsappHref } from "@/lib/contact-links";
import { FALLBACK_MESSAGES, pickMessages, type PageMessageMap, type PageMessages } from "@/lib/whatsapp-messages";

const Ctx = createContext<PageMessageMap>({});

export function PageMessagesProvider({ map, children }: { map: PageMessageMap; children: React.ReactNode }) {
  return <Ctx.Provider value={map}>{children}</Ctx.Provider>;
}

/** WhatsApp links written for the page the visitor is currently on. */
export function usePageWhatsApp(): { chat: string; consult: string } {
  const map = useContext(Ctx);
  const path = usePathname() ?? "/";
  const m: PageMessages = path ? pickMessages(path, map) : FALLBACK_MESSAGES;
  return { chat: whatsappHref(siteConfig.whatsapp, m.chat), consult: whatsappHref(siteConfig.whatsapp, m.consult) };
}
