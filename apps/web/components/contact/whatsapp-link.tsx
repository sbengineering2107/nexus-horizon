"use client";

import { usePageWhatsApp } from "./page-messages";

/** WhatsApp link with the current page's message. Forwards props like className. */
export function WhatsAppLink(props: Omit<React.ComponentProps<"a">, "href">) {
  const { chat } = usePageWhatsApp();
  return <a {...props} href={chat} target="_blank" rel="noopener" />;
}
