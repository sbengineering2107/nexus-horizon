import { afterEach, describe, expect, test } from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const SCRIPT = join(__dirname, "../../scripts/check-seo.mjs");
const dirs: string[] = [];
afterEach(() => dirs.splice(0).forEach((d) => rmSync(d, { recursive: true, force: true })));

function page(origin: string, { ogImage = true } = {}) {
  return `<html><head><title>T</title><meta name="description" content="D"/>
<link rel="canonical" href="${origin}/x"/><meta property="og:url" content="${origin}/x"/>
${ogImage ? `<meta property="og:image" content="${origin}/og-image.png"/>` : ""}
<script type="application/ld+json">{"@context":"https://schema.org","url":"${origin}"}</script></head>
<body><h1>H</h1></body></html>`;
}

function run(html: string, env: Record<string, string> = {}) {
  const dir = mkdtempSync(join(tmpdir(), "seo-"));
  dirs.push(dir);
  writeFileSync(join(dir, "index.html"), html);
  return spawnSync(process.execPath, [SCRIPT, dir], { env: { ...process.env, ...env }, encoding: "utf8" });
}

describe("check-seo", () => {
  test("passes a complete page", () => {
    expect(run(page("https://nexushorizon.in")).status).toBe(0);
  });

  test("fails a page without an og:image", () => {
    const r = run(page("https://nexushorizon.in", { ogImage: false }));
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("og:image");
  });

  test("fails localhost URLs in a production build", () => {
    const r = run(page("http://localhost:3000"), { VERCEL_ENV: "production" });
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("localhost");
  });

  test("allows localhost URLs in a local build", () => {
    expect(run(page("http://localhost:3000"), { VERCEL_ENV: "" }).status).toBe(0);
  });
});
