/** Client-safe lead constants (lib/leads/submit pulls in the database layer). */

/** Bump when the consent wording changes, so each lead records what was agreed to. */
export const CONSENT_VERSION = "2026-11-v1";

export const CONSENT_TEXT =
  "I agree that Nexus Horizon Advisors may store these details and contact me by call, WhatsApp or email about my enquiry.";

export type FormType = "quick" | "consultation" | "calculator";
