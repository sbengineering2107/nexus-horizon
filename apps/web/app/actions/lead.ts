"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { alertConfig, sendLeadAlert } from "@/lib/leads/alert";
import { getLeadStore } from "@/lib/leads/store";
import { processLead, type LeadResult } from "@/lib/leads/submit";
import { ATTRIBUTION_COOKIE, parseAttribution } from "@/lib/leads/attribution";

export type LeadState = { status: "idle" } | Exclude<LeadResult, { status: "ok" }>;

/** Server action behind every lead form. On success it redirects to /thank-you. */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const fields: Record<string, string> = {};
  for (const [k, v] of formData.entries()) if (typeof v === "string") fields[k] = v;

  const jar = await cookies();
  const pending = getLeadStore();
  let store = null;
  try {
    store = pending ? await pending : null;
  } catch {
    console.error("[leads] could not open the database");
  }
  const result = await processLead(fields, {
    store,
    now: new Date(),
    attribution: parseAttribution(jar.get(ATTRIBUTION_COOKIE)?.value),
    // Email the team after the visitor has been sent to the thank-you page.
    onStored: (lead) => {
      const config = alertConfig(process.env);
      if (config) after(() => sendLeadAlert(lead, config).then(() => undefined));
    },
  });
  if (result.status === "ok") redirect(`/thank-you?form=${result.formType}`);
  return result;
}
