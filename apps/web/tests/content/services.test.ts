import { describe, expect, test } from "vitest";
import { getService, getServices } from "@/lib/content/services";

describe("services content", () => {
  test("returns the four services in display order", () => {
    expect(getServices().map((s) => s.slug)).toEqual([
      "new-projects",
      "ready-to-move",
      "resale",
      "commercial",
    ]);
  });

  test("finds a service by slug", () => {
    expect(getService("resale")?.title).toBeTruthy();
  });

  test("returns null for an unknown slug", () => {
    expect(getService("foo")).toBeNull();
  });

  test.each(["new-projects", "ready-to-move", "resale", "commercial"])(
    "%s has at least 3 FAQs and an SEO description of 70-160 chars",
    (slug) => {
      const s = getService(slug)!;
      expect(s.faqs.length).toBeGreaterThanOrEqual(3);
      expect(s.seoDescription.length).toBeGreaterThanOrEqual(70);
      expect(s.seoDescription.length).toBeLessThanOrEqual(160);
    },
  );
});
