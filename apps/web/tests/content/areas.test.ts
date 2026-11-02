import { describe, expect, test } from "vitest";
import { areaFaqs, getArea, getAreas, getAreasByZone } from "@/lib/content/areas";

const WEST = ["baner", "balewadi", "aundh", "pashan", "sus", "bavdhan", "kothrud", "warje", "mahalunge", "hinjewadi", "wakad", "tathawade", "punawale", "ravet", "pimple-saudagar"];
const EAST = ["kharadi", "viman-nagar", "kalyani-nagar", "koregaon-park", "wadgaon-sheri", "wagholi", "lohegaon", "dhanori", "hadapsar", "magarpatta", "mundhwa", "keshav-nagar", "manjri"];

describe("Pune areas", () => {
  test("covers 15 West and 13 East micro-markets in display order", () => {
    expect(getAreasByZone("west").map((a) => a.slug)).toEqual(WEST);
    expect(getAreasByZone("east").map((a) => a.slug)).toEqual(EAST);
    expect(getAreas()).toHaveLength(28);
  });

  test("finds an area by slug and returns null for unknown", () => {
    expect(getArea("baner")?.name).toBe("Baner");
    expect(getArea("foo")).toBeNull();
  });

  test("every nearby link points to another listed area", () => {
    const slugs = new Set(getAreas().map((a) => a.slug));
    for (const a of getAreas()) {
      expect(a.nearby.length, a.slug).toBeGreaterThanOrEqual(2);
      for (const n of a.nearby) {
        expect(slugs.has(n), `${a.slug} → ${n}`).toBe(true);
        expect(n, a.slug).not.toBe(a.slug);
      }
    }
  });

  test("every area has enough sourced, unique content to stand as its own page", () => {
    const summaries = new Set<string>();
    for (const a of getAreas()) {
      expect(a.summary.length, a.slug).toBeLessThanOrEqual(240);
      expect(a.knownFor.length, a.slug).toBeGreaterThanOrEqual(2);
      expect(a.connectivity.length, a.slug).toBeGreaterThanOrEqual(1);
      expect(a.sources.length, a.slug).toBeGreaterThanOrEqual(1);
      expect(summaries.has(a.summary), a.slug).toBe(false);
      summaries.add(a.summary);
    }
  });

  test("FAQs are specific to the area and answer first", () => {
    const faqs = areaFaqs(getArea("kharadi")!);
    expect(faqs.length).toBeGreaterThanOrEqual(3);
    for (const f of faqs) expect(f.q).toContain("Kharadi");
  });
});
