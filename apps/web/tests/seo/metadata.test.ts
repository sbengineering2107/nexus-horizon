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

  test("is not indexable in production until SITE_INDEXING is on", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect(robotsOf(buildMetadata({ title: "X", description: "Y", path: "/" })).index).toBe(false);
  });

  test("is indexable in production with SITE_INDEXING=on", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_INDEXING", "on");
    expect(robotsOf(buildMetadata({ title: "X", description: "Y", path: "/" })).index).toBe(true);
  });

  test("honours noindex in production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_INDEXING", "on");
    expect(robotsOf(buildMetadata({ title: "X", description: "Y", path: "/", noindex: true })).index).toBe(false);
  });

  test("leaves the share image to the route's opengraph-image unless one is passed", () => {
    expect(JSON.stringify(buildMetadata({ title: "R", description: "Y", path: "/x" }).openGraph)).not.toContain("images");
    const m = buildMetadata({ title: "Resale", description: "Y", path: "/", image: "/og-image.png" });
    expect(JSON.stringify(m.openGraph)).toContain("/og-image.png");
    expect(m.twitter).toMatchObject({ card: "summary_large_image" });
    expect(JSON.stringify(m.twitter)).not.toContain("images");
  });

  test("sets Open Graph URL, title and en_IN locale", () => {
    const m = buildMetadata({ title: "Resale", description: "Y", path: "/services/resale" });
    expect(m.openGraph).toMatchObject({ url: `${siteConfig.url}/services/resale`, title: "Resale", locale: "en_IN" });
  });

  test("adds the brand to titles that stay within 60 characters", () => {
    const m = buildMetadata({ title: "Resale Flats in Pune", description: "Y", path: "/x" });
    expect(m.title).toEqual({ absolute: "Resale Flats in Pune | Nexus Horizon Advisors" });
  });

  test("drops the brand when it would push the title past 60 characters", () => {
    const t = "Home Loan Eligibility Calculator: How Much Can I Borrow?";
    const m = buildMetadata({ title: t, description: "Y", path: "/x" });
    expect(m.title).toEqual({ absolute: t });
  });
});

describe("description", () => {
  test("clipDescription keeps short text and cuts long text at a word, under 156 characters", async () => {
    const { clipDescription } = await import("@/lib/seo/metadata");
    expect(clipDescription("Short and sweet.")).toBe("Short and sweet.");
    const long =
      "A residential area in south-west Pune at the end of Karve Road, beyond Kothrud, on the Mutha river where the Mumbai-Bengaluru bypass crosses it. Connectivity, water and schools.";
    const c = clipDescription(long);
    expect(c.length).toBeLessThanOrEqual(155);
    expect(c).toBe(
      "A residential area in south-west Pune at the end of Karve Road, beyond Kothrud, on the Mutha river where the Mumbai-Bengaluru bypass crosses it.",
    );
    const noStop = "word ".repeat(40).trim();
    expect(clipDescription(noStop)).toMatch(/word…$/);
    expect(clipDescription(noStop).length).toBeLessThanOrEqual(155);
  });

  test("clipDescription never returns more than 155 characters, even when a sentence ends just past it", async () => {
    const { clipDescription } = await import("@/lib/seo/metadata");
    const text = `${"a".repeat(120)} first ends here. ${"b".repeat(5)} second ends.`;
    expect(text.length).toBe(156);
    expect(clipDescription(text).length).toBeLessThanOrEqual(155);
    expect(clipDescription(text)).toBe(`${"a".repeat(120)} first ends here.`);
  });
});
