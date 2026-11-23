import { describe, expect, test } from "vitest";
import { CATEGORIES } from "@/lib/content/blog";

describe("blog categories", () => {
  test("each has a search description of 120–155 characters and a fuller intro", () => {
    for (const c of CATEGORIES) {
      expect(c.description.length, c.id).toBeGreaterThanOrEqual(120);
      expect(c.description.length, c.id).toBeLessThanOrEqual(155);
      expect(c.more.split(/(?<=\.)\s/).length, c.id).toBeGreaterThanOrEqual(2);
    }
  });
});
