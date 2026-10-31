import { describe, expect, test } from "vitest";
import { resolveSiteUrl } from "@/lib/seo/site-url";

describe("resolveSiteUrl", () => {
  test("prefers NEXT_PUBLIC_SITE_URL and strips a trailing slash", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://nexushorizon.in/", VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" })).toBe(
      "https://nexushorizon.in",
    );
  });
  test("falls back to the Vercel production URL when the site URL is unset", () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "nexus-horizon.vercel.app" })).toBe("https://nexus-horizon.vercel.app");
  });
  test("uses localhost only when nothing else is set", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });
  test("refuses localhost for a production deployment", () => {
    expect(() => resolveSiteUrl({ VERCEL_ENV: "production" })).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });
});
