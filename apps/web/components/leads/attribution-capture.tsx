"use client";

import { useEffect } from "react";
import { ATTRIBUTION_COOKIE, ATTRIBUTION_MAX_AGE, captureAttribution } from "@/lib/leads/attribution";

/** On the first page of a visit with no stored attribution, remember where the visitor came from. */
export function AttributionCapture() {
  useEffect(() => {
    try {
      if (document.cookie.split("; ").some((c) => c.startsWith(`${ATTRIBUTION_COOKIE}=`))) return;
      const value = encodeURIComponent(JSON.stringify(captureAttribution(location.href, document.referrer)));
      const secure = location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${ATTRIBUTION_COOKIE}=${value}; Max-Age=${ATTRIBUTION_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    } catch {
      /* cookies blocked: leads still work, just without attribution */
    }
  }, []);
  return null;
}
