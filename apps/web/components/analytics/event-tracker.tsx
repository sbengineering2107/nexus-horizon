"use client";

import { useEffect } from "react";
import { aiSource, classifyLink } from "@/lib/analytics/config";

type Params = Record<string, string>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params: Params) => void;
    clarity?: (command: "event", name: string) => void;
  }
}

function send(name: string, params: Params) {
  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
}

/** Where on the page a link sits, so reports can compare header, floating buttons and in-page CTAs. */
function locationOf(el: Element): string {
  if (el.closest('[data-testid="floating-contact"]')) return "floating_button";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest('[data-testid="hero-enquiry"]') || el.matches('[data-testid="hero-enquiry"]')) return "hero";
  return "page";
}

/**
 * Sends GA4 events for WhatsApp, call and email clicks (mark whatsapp_click and call_click as
 * key events in GA4), and an ai_referral event when a visit starts from an AI assistant.
 */
export function EventTracker() {
  useEffect(() => {
    const source = aiSource(document.referrer);
    if (source) send("ai_referral", { ai_source: source, landing_page: location.pathname });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const name = classifyLink(a.getAttribute("href") ?? "");
      if (!name) return;
      send(name, {
        page_path: location.pathname,
        link_location: locationOf(a),
        link_text: (a.textContent ?? a.getAttribute("aria-label") ?? "").trim().slice(0, 60),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
