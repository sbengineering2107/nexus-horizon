"use client";

import { usePageWhatsApp } from "./page-messages";

/** "Book a consultation" link whose WhatsApp message matches the current page. Forwards Slot props (className etc.). */
export function ConsultLink(props: Omit<React.ComponentProps<"a">, "href">) {
  const { consult } = usePageWhatsApp();
  return <a {...props} href={consult} target="_blank" rel="noopener" />;
}
