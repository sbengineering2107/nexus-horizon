import type { LeadStore } from "@nh/db";
import { leadSchema } from "./schema";
import { CONSENT_VERSION, type FormType } from "./submit-text";
import type { Attribution } from "./attribution";

export { CONSENT_TEXT, CONSENT_VERSION, type FormType } from "./submit-text";

export type LeadResult =
  | { status: "ok"; formType: FormType }
  | { status: "invalid"; errors: Partial<Record<string, string>> }
  | { status: "failed" };

type Deps = { store: LeadStore | null; now: Date; attribution: Attribution };

/**
 * Validate and store one enquiry. A filled honeypot ("nh_hp_extra") pretends to succeed.
 * Database problems return "failed" so the form can offer WhatsApp and call instead.
 */
export async function processLead(fields: Record<string, unknown>, { store, now, attribution }: Deps): Promise<LeadResult> {
  const formType = (["quick", "consultation", "calculator"] as const).find((t) => t === fields.formType) ?? "quick";
  if (typeof fields.nh_hp_extra === "string" && fields.nh_hp_extra.trim() !== "") return { status: "ok", formType };

  const parsed = leadSchema.safeParse(fields);
  if (!parsed.success) {
    const errors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { status: "invalid", errors };
  }
  if (!store) {
    console.error("[leads] no database configured");
    return { status: "failed" };
  }
  const d = parsed.data;
  try {
    await store.insertLead({
      name: d.name,
      phone: d.phone,
      email: d.email,
      service: d.service,
      area: d.area,
      budgetRange: d.budgetRange,
      timeline: d.timeline,
      message: d.message,
      formType: d.formType,
      sourcePage: d.sourcePage,
      utmSource: attribution.utm_source,
      utmMedium: attribution.utm_medium,
      utmCampaign: attribution.utm_campaign,
      utmTerm: attribution.utm_term,
      utmContent: attribution.utm_content,
      gclid: attribution.gclid,
      referrer: attribution.referrer,
      landingPage: attribution.landing_page,
      consentGiven: true,
      consentVersion: CONSENT_VERSION,
      consentAt: now,
    });
  } catch (err) {
    // Error class and code only: driver messages can echo the values we sent.
    const code = (err as { code?: string }).code ?? "unknown";
    console.error(`[leads] insert failed (${(err as Error).name ?? "Error"}, code ${code})`);
    return { status: "failed" };
  }
  return { status: "ok", formType: d.formType };
}
