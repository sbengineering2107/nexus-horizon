import { describe, expect, test } from "vitest";
import { isOfficialSource, officialSources } from "@/lib/content/official-sources";
import { getPosts } from "@/lib/content/blog";

describe("official sources", () => {
  test("accepts government, regulator and bank domains", () => {
    for (const url of [
      "https://maharera.maharashtra.gov.in/agents",
      "https://igrmaharashtra.gov.in/Home",
      "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=10063",
      "https://indiacode.nic.in/handle/123",
      "https://homeloans.sbi.bank.in/downloads/x.pdf",
      "https://www.punemetrorail.org/line3",
    ]) {
      expect(isOfficialSource(url), url).toBe(true);
    }
  });

  test("rejects news, portals, developers and look-alike hosts", () => {
    for (const url of [
      "https://www.freepressjournal.in/pune/x",
      "https://housing.com/news/x",
      "https://www.sobha.com/blog/x",
      "https://en.wikipedia.org/wiki/Baner",
      "https://gov.in.example.com/x",
      "https://notrbi.org.in/x",
    ]) {
      expect(isOfficialSource(url), url).toBe(false);
    }
  });

  test("keeps order and drops the rest", () => {
    expect(officialSources(["https://housing.com/a", "https://rbi.org.in/b", "https://pmc.gov.in/c"])).toEqual([
      "https://rbi.org.in/b",
      "https://pmc.gov.in/c",
    ]);
  });

  test("every guide shows at least two official sources", () => {
    for (const p of getPosts()) expect(officialSources(p.sources).length, p.slug).toBeGreaterThanOrEqual(2);
  });
});

test("names publishers readably", async () => {
  const { sourceName } = await import("@/lib/content/official-sources");
  expect(sourceName("https://maharera.maharashtra.gov.in/x")).toBe("MahaRERA");
  expect(sourceName("https://homeloans.sbi.bank.in/x")).toBe("State Bank of India");
  expect(sourceName("https://www.rbi.org.in/x")).toBe("Reserve Bank of India");
  expect(sourceName("https://example.gov.in/x")).toBe("example.gov.in");
});
