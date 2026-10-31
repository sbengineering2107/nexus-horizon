import { afterEach, describe, expect, test } from "vitest";
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const APP = join(__dirname, "../..");
const dirs: string[] = [];
afterEach(() => dirs.splice(0).forEach((d) => rmSync(d, { recursive: true, force: true })));

/** Copy the content pipeline into a scratch dir, optionally breaking one MDX file. */
function runContentBuild(mutate?: (dir: string) => void) {
  const dir = mkdtempSync(join(tmpdir(), "content-"));
  dirs.push(dir);
  cpSync(join(APP, "content"), join(dir, "content"), { recursive: true });
  cpSync(join(APP, "velite.config.ts"), join(dir, "velite.config.ts"));
  cpSync(join(APP, "scripts/content.mjs"), join(dir, "content.mjs"));
  symlinkSync(join(APP, "node_modules"), join(dir, "node_modules"));
  mutate?.(dir);
  return spawnSync(process.execPath, ["content.mjs"], { cwd: dir, encoding: "utf8" });
}

describe("content build", () => {
  test("succeeds on valid content", () => {
    expect(runContentBuild().status).toBe(0);
  }, 30_000);

  test("exits non-zero when required frontmatter is missing", () => {
    const r = runContentBuild((dir) => {
      const f = join(dir, "content/services/resale.mdx");
      writeFileSync(f, readFileSync(f, "utf8").replace(/^seoDescription:.*\n/m, ""));
    });
    expect(r.status).not.toBe(0);
    expect(r.stdout + r.stderr).toContain("seoDescription");
  }, 30_000);
});
