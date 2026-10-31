import { afterEach, describe, expect, test, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/site.config";

afterEach(() => vi.unstubAllEnvs());

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended"];

type Rule = { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };
const asArray = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const rulesFor = (agent: string) =>
  (robots().rules as Rule[]).filter((r) => asArray(r.userAgent).includes(agent));

describe("robots", () => {
  test.each(AI_BOTS)("production allows %s on the whole site except private paths", (bot) => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_INDEXING", "on");
    const [rule] = rulesFor(bot);
    expect(asArray(rule?.allow)).toContain("/");
    expect(asArray(rule?.disallow)).toEqual(expect.arrayContaining(["/admin", "/api", "/thank-you"]));
  });

  test("production disallows private paths for all agents and points to the sitemap", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_INDEXING", "on");
    const [rule] = rulesFor("*");
    expect(asArray(rule?.disallow)).toEqual(expect.arrayContaining(["/admin", "/api", "/thank-you"]));
    expect(robots().sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });

  test("production without SITE_INDEXING disallows everything", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect(robots().rules).toEqual([{ userAgent: "*", disallow: "/" }]);
  });

  test("preview disallows everything", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(robots().rules).toEqual([{ userAgent: "*", disallow: "/" }]);
  });
});

describe("sitemap", () => {
  test("lists home, services hub and all service pages as absolute URLs", () => {
    const urls = sitemap().map((e) => e.url);
    for (const path of ["", "/services", "/services/new-projects", "/services/ready-to-move", "/services/resale", "/services/commercial", "/tools", "/tools/emi-calculator", "/tools/stamp-duty-calculator", "/tools/home-loan-calculator", "/tools/loan-eligibility-calculator", "/tools/loan-transfer-calculator", "/tools/rental-yield-calculator"]) {
      expect(urls).toContain(`${siteConfig.url}${path}`);
    }
    expect(urls.every((u) => u.startsWith("http"))).toBe(true);
  });
});
