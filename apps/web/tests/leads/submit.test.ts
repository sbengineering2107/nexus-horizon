import { describe, expect, test, vi } from "vitest";
import { createLeadStore, type NewLead } from "@nh/db";
import { processLead, CONSENT_VERSION } from "@/lib/leads/submit";

const now = new Date("2026-11-09T10:00:00Z");
const form = {
  name: "Asha Kulkarni",
  phone: "9876543210",
  service: "resale",
  formType: "quick",
  sourcePage: "/services/resale",
  consent: "on",
  nh_hp_extra: "",
};

describe("processLead", () => {
  test("stores a valid lead with consent and attribution", async () => {
    const insertLead = vi.fn<(l: NewLead) => Promise<void>>(async () => {});
    const r = await processLead(form, { store: { insertLead }, now, attribution: { utm_source: "google", landing_page: "/" } });
    expect(r).toEqual({ status: "ok", formType: "quick" });
    expect(insertLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Asha Kulkarni",
        phone: "+919876543210",
        service: "resale",
        formType: "quick",
        sourcePage: "/services/resale",
        utmSource: "google",
        landingPage: "/",
        consentGiven: true,
        consentVersion: CONSENT_VERSION,
        consentAt: now,
      }),
    );
  });

  test("filled honeypot looks like success but stores nothing", async () => {
    const insertLead = vi.fn();
    const r = await processLead({ ...form, nh_hp_extra: "http://spam" }, { store: { insertLead }, now, attribution: {} });
    expect(r).toEqual({ status: "ok", formType: "quick" });
    expect(insertLead).not.toHaveBeenCalled();
  });

  test("returns field errors without storing", async () => {
    const insertLead = vi.fn();
    const r = await processLead({ ...form, phone: "12" }, { store: { insertLead }, now, attribution: {} });
    expect(r.status).toBe("invalid");
    expect(r.status === "invalid" && r.errors.phone).toBeTruthy();
    expect(insertLead).not.toHaveBeenCalled();
  });

  test("database failure returns the fallback state and logs no personal data", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const r = await processLead(form, {
      store: { insertLead: async () => Promise.reject(new Error("connect ECONNREFUSED 9876543210")) },
      now,
      attribution: {},
    });
    expect(r).toEqual({ status: "failed" });
    const logged = JSON.stringify(log.mock.calls);
    expect(logged).not.toContain("9876543210");
    expect(logged).not.toContain("Asha");
    log.mockRestore();
  });

  test("no database configured returns the fallback state", async () => {
    const r = await processLead(form, { store: null, now, attribution: {} });
    expect(r).toEqual({ status: "failed" });
  });

  test("writes to a real Postgres (PGlite)", async () => {
    const { execSync } = await import("node:child_process");
    const dir = `/tmp/nh-lead-test-${Date.now()}`;
    execSync("node ../../packages/db/scripts/migrate.mjs", { env: { ...process.env, DATABASE_URL: `pglite:${dir}` } });
    const store = await createLeadStore(`pglite:${dir}`);
    const r = await processLead({ ...form, formType: "consultation", budgetRange: "50l-1cr", timeline: "3-months" }, { store, now, attribution: {} });
    expect(r).toEqual({ status: "ok", formType: "consultation" });
  }, 30_000);
});
