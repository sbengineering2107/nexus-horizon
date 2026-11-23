import { describe, expect, test } from "vitest";
import { GET } from "@/app/llms.txt/route";
import { siteConfig } from "@/site.config";

describe("llms.txt", () => {
  test("starts with the firm name and lists every service URL", async () => {
    const res = await GET();
    expect(res.headers.get("content-type")).toContain("text/plain");
    const body = await res.text();
    expect(body.startsWith("# Nexus Horizon Advisors")).toBe(true);
    for (const slug of ["new-projects", "ready-to-move", "resale", "commercial"]) {
      expect(body).toContain(`${siteConfig.url}/services/${slug}`);
    }
    for (const slug of ["baner", "kharadi"]) expect(body).toContain(`${siteConfig.url}/pune/${slug}`);
    for (const slug of ["emi-calculator", "stamp-duty-calculator", "home-loan-calculator", "loan-eligibility-calculator", "loan-transfer-calculator", "rental-yield-calculator"]) {
      expect(body).toContain(`${siteConfig.url}/calculators/${slug}`);
    }
  });

  test("states the firm's key facts plainly, for answers about the firm itself", async () => {
    const body = await (await GET()).text();
    const facts = body.slice(body.indexOf("## Key facts"), body.indexOf("## Services"));
    expect(facts).toContain("Consultations are always free");
    expect(facts).toContain("Monday to Saturday, 10:00 to 19:00");
    expect(facts).toContain("28 Pune areas");
    expect(facts).toContain("not a developer, bank or lender");
    expect(facts).toContain(siteConfig.maharera);
    for (const path of ["/contact", "/privacy-policy", "/terms"]) expect(body).toContain(`${siteConfig.url}${path}`);
  });
});
