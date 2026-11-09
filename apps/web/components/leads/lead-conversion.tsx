"use client";

import { useEffect } from "react";

const KEY = "nh_lead_sent";

/**
 * Records GA4 generate_lead once per browser session when the thank-you page loads.
 * Pushes to dataLayer directly so the event is kept even if gtag.js hasn't loaded yet.
 */
export function LeadConversion({ formType }: { formType: string }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked: still record the event */
    }
    const w = window as unknown as { dataLayer?: unknown[]; clarity?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    // gtag() pushes its `arguments` object; mirror that shape.
    const gtag: (...args: unknown[]) => void = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    gtag("event", "generate_lead", { form_type: formType });
    w.clarity?.("event", "generate_lead");
  }, [formType]);
  return null;
}
