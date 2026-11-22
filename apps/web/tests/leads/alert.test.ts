import { describe, expect, test, vi } from "vitest";
import { alertConfig, buildLeadAlert, sendLeadAlert, type AlertLead } from "@/lib/leads/alert";

const lead: AlertLead = {
  name: "Asha <b>Kulkarni</b>",
  phone: "+919876543210",
  email: "asha@example.com",
  service: "resale",
  area: "Baner",
  budgetRange: "1cr-2cr",
  timeline: "3-months",
  message: "Looking for a 3 BHK near the metro.",
  formType: "consultation",
  sourcePage: "/services/resale",
  utmSource: "google",
  utmMedium: "cpc",
  referrer: "https://www.google.com",
};
const at = new Date("2026-11-22T12:30:00Z");

describe("alertConfig", () => {
  test("is off without an API key or recipient", () => {
    expect(alertConfig({})).toBeNull();
    expect(alertConfig({ RESEND_API_KEY: "re_x" })).toBeNull();
    expect(alertConfig({ LEAD_ALERT_TO: "a@b.com" })).toBeNull();
  });
  test("reads comma-separated recipients, ignores invalid ones and defaults the sender", () => {
    expect(alertConfig({ RESEND_API_KEY: "re_x", LEAD_ALERT_TO: " a@b.com, nope ,c@d.in " })).toEqual({
      apiKey: "re_x",
      to: ["a@b.com", "c@d.in"],
      from: "Nexus Horizon website <onboarding@resend.dev>",
    });
    expect(alertConfig({ RESEND_API_KEY: "re_x", LEAD_ALERT_TO: "nope" })).toBeNull();
  });
  test("uses LEAD_ALERT_FROM when set", () => {
    expect(alertConfig({ RESEND_API_KEY: "re_x", LEAD_ALERT_TO: "a@b.com", LEAD_ALERT_FROM: "Leads <leads@x.com>" })?.from).toBe(
      "Leads <leads@x.com>",
    );
  });
});

describe("buildLeadAlert", () => {
  const a = buildLeadAlert(lead, at);
  test("subject names the person, service and form", () => {
    expect(a.subject).toBe("New lead: Asha <b>Kulkarni</b> – Resale (consultation form)");
  });
  test("shows labels, India time and one-tap call and WhatsApp links", () => {
    for (const s of ["₹1 – 2 crore", "Within 3 months", "Baner", "22 Nov 2026, 6:00 pm", "tel:+919876543210", "https://wa.me/919876543210", "/services/resale", "google / cpc"]) {
      expect(a.html).toContain(s);
      expect(a.text).toContain(s);
    }
  });
  test("escapes visitor text in the HTML", () => {
    expect(a.html).toContain("Asha &lt;b&gt;Kulkarni&lt;/b&gt;");
    expect(a.html).not.toContain("<b>Kulkarni</b>");
  });
  test("leaves out fields the visitor didn't fill", () => {
    const b = buildLeadAlert({ name: "Ravi", phone: "+919000000000", formType: "quick", sourcePage: "/" }, at);
    expect(b.subject).toBe("New lead: Ravi (quick form)");
    expect(b.text).not.toMatch(/Budget|Timeline|Email|Message/);
  });
});

describe("sendLeadAlert", () => {
  const config = { apiKey: "re_x", to: ["owner@x.com"], from: "F <f@x.com>" };
  test("posts to Resend with reply-to set to the visitor", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 200 }));
    expect(await sendLeadAlert(lead, config, { fetchImpl, now: at })).toBe(true);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_x");
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ from: "F <f@x.com>", to: ["owner@x.com"], reply_to: "asha@example.com" });
  });
  test("returns false and logs no personal data when Resend fails", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => new Response("bad", { status: 422 }));
    expect(await sendLeadAlert(lead, config, { fetchImpl, now: at })).toBe(false);
    const logged = log.mock.calls.flat().join(" ");
    expect(logged).toContain("422");
    expect(logged).not.toMatch(/Asha|9876|example\.com/);
    log.mockRestore();
  });
  test("returns false when the network throws", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await sendLeadAlert(lead, config, { fetchImpl: vi.fn(async () => { throw new Error("down"); }), now: at })).toBe(false);
    log.mockRestore();
  });
});
