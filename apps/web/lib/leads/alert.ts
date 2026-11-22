import { BUDGETS, TIMELINES } from "./options";

/*
 * Email alert to the team for each new lead, sent through Resend's HTTP API (no SDK).
 * Settings (Vercel → Environment Variables, Production):
 *   RESEND_API_KEY   from resend.com → API Keys
 *   LEAD_ALERT_TO    one or more addresses, comma-separated
 *   LEAD_ALERT_FROM  optional; until the domain is verified in Resend, the default
 *                    onboarding@resend.dev sender can only mail the Resend account's own address.
 * Missing settings turn alerts off; leads are still saved.
 */

export type AlertLead = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  area?: string;
  budgetRange?: string;
  timeline?: string;
  message?: string;
  formType: string;
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  landingPage?: string;
};

export type AlertConfig = { apiKey: string; to: string[]; from: string };

const EMAIL = /^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/;
const DEFAULT_FROM = "Nexus Horizon website <onboarding@resend.dev>";

export function alertConfig(env: Record<string, string | undefined>): AlertConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = (env.LEAD_ALERT_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => EMAIL.test(s));
  if (!apiKey || to.length === 0) return null;
  return { apiKey, to, from: env.LEAD_ALERT_FROM?.trim() || DEFAULT_FROM };
}

const SERVICE_LABELS: Record<string, string> = {
  "new-projects": "New projects",
  "ready-to-move": "Ready to move",
  resale: "Resale",
  commercial: "Commercial",
};
const label = (list: readonly { value: string; label: string }[], v?: string) => list.find((o) => o.value === v)?.label ?? v;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** e.g. "22 Nov 2026, 6:00 pm" in India time (UTC+5:30, no daylight saving). */
function indiaTime(d: Date): string {
  const t = new Date(d.getTime() + 330 * 60_000);
  const h = t.getUTCHours();
  const m = String(t.getUTCMinutes()).padStart(2, "0");
  return `${t.getUTCDate()} ${MONTHS[t.getUTCMonth()]} ${t.getUTCFullYear()}, ${h % 12 || 12}:${m} ${h < 12 ? "am" : "pm"}`;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildLeadAlert(lead: AlertLead, receivedAt: Date) {
  const service = lead.service ? SERVICE_LABELS[lead.service] ?? lead.service : undefined;
  const digits = lead.phone.replace(/\D/g, "");
  const call = `tel:${lead.phone}`;
  const whatsapp = `https://wa.me/${digits}`;
  const source = [lead.utmSource, lead.utmMedium].filter(Boolean).join(" / ") || undefined;

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Service", service],
    ["Area", lead.area],
    ["Budget", label(BUDGETS, lead.budgetRange)],
    ["Timeline", label(TIMELINES, lead.timeline)],
    ["Message", lead.message],
    ["Form", `${lead.formType} form on ${lead.sourcePage}`],
    ["Campaign", [source, lead.utmCampaign].filter(Boolean).join(", ") || undefined],
    ["Came from", lead.referrer],
    ["First page", lead.landingPage],
    ["Received", indiaTime(receivedAt)],
  ];
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]));

  const subject = `New lead: ${lead.name}${service ? ` – ${service}` : ""} (${lead.formType} form)`;
  const text = [
    subject,
    "",
    ...filled.map(([k, v]) => `${k}: ${v}`),
    "",
    `Call: ${call}`,
    `WhatsApp: ${whatsapp}`,
    "",
    "Please reply within one working day.",
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1b2333;max-width:560px">
<h2 style="margin:0 0 16px;font-size:20px">New lead from the website</h2>
<p style="margin:0 0 20px">
<a href="${esc(call)}" style="display:inline-block;background:#14213d;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;margin-right:8px">Call ${esc(lead.phone)}</a>
<a href="${esc(whatsapp)}" style="display:inline-block;background:#1f8f4e;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">WhatsApp</a>
</p>
<table style="border-collapse:collapse;width:100%">
${filled
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#5a6478;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:20px 0 0;color:#5a6478;font-size:13px">Please reply within one working day.</p>
</div>`;

  return { subject, text, html };
}

type SendDeps = { fetchImpl?: typeof fetch; now?: Date };

/** Sends the alert. Never throws; logs only the status, never the lead's details. */
export async function sendLeadAlert(lead: AlertLead, config: AlertConfig, { fetchImpl = fetch, now = new Date() }: SendDeps = {}) {
  const { subject, text, html } = buildLeadAlert(lead, now);
  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject,
        text,
        html,
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[leads] alert email failed (HTTP ${res.status})`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[leads] alert email failed (${(err as Error).name ?? "Error"})`);
    return false;
  }
}
