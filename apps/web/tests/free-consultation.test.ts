import { globSync, readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

// Consultations are always free, so no copy may suggest only the first one is.
describe("consultation copy", () => {
  test("never says only the first consultation is free", () => {
    const files = globSync("{app,components,lib,content}/**/*.{ts,tsx,mdx,json}", { cwd: process.cwd() });
    expect(files.length).toBeGreaterThan(20);
    const offenders = files.filter((f) => /first (free )?consultation|free first consultation/i.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
