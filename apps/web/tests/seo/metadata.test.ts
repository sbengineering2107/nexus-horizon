import { afterEach, describe, expect, test, vi } from "vitest";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/site.config";

afterEach(() => vi.unstubAllEnvs());

const robotsOf = (m: ReturnType<typeof buildMetadata>) => m.robots as { index: boolean; follow: boolean };

describe("buildMetadata", () => {
  test("sets an absolute canonical from the site URL", () => {
    const m = buildMetadata({ title: "X", description: "Y", path: "/services/resale" });
    expect(m.alternates?.canonical).toBe(`${siteConfig.url}/services/resale`);
  });

  test("is noindex on preview deployments", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(robotsOf(buildMetadata({ title: "X", description: "Y", path: "/" })).index).toBe(false);
  });

  test("is indexable in production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect(robotsOf(buildMetadata({ title: "X", description: "Y", path: "/" })).index).toBe(true);
  });

  test("honours noindex in production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect(robotsOf(buildMetadata({ title: "X", description: "Y", path: "/", noindex: true })).index).toBe(false);
  });

  test("sets Open Graph URL, title and en_IN locale", () => {
    const m = buildMetadata({ title: "Resale", description: "Y", path: "/services/resale" });
    expect(m.openGraph).toMatchObject({ url: `${siteConfig.url}/services/resale`, title: "Resale", locale: "en_IN" });
  });
});
