#!/usr/bin/env node
/**
 * Post-build SEO gate. Scans prerendered HTML in .next/server/app and fails when an
 * indexable page is missing a <title>, meta description or canonical, does not have
 * exactly one <h1>, or contains JSON-LD that isn't valid JSON.
 * Usage: node scripts/check-seo.mjs [appDir]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? ".next/server/app";
const SKIP = new Set(["_global-error.html"]);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });
}

const count = (html, re) => (html.match(re) ?? []).length;
const problems = [];
const files = walk(root).filter((f) => !SKIP.has(relative(root, f)));

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const page = relative(root, file);
  const isNotFound = page === "_not-found.html";
  const fail = (msg) => problems.push(`${page}: ${msg}`);

  if (!/<title>[^<]+<\/title>/.test(html)) fail("missing <title>");
  if (!isNotFound) {
    if (!/<meta name="description" content="[^"]+"/.test(html)) fail("missing meta description");
    if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html)) fail("missing absolute canonical");
  }
  const h1s = count(html, /<h1[\s>]/g);
  if (h1s !== 1) fail(`expected exactly one <h1>, found ${h1s}`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      if (data["@context"] !== "https://schema.org") fail("JSON-LD missing schema.org @context");
    } catch {
      fail("JSON-LD is not valid JSON");
    }
  }
}

if (files.length === 0) problems.push(`no HTML found under ${root}; did the build run?`);

if (problems.length) {
  console.error(`SEO check failed (${problems.length} problem${problems.length > 1 ? "s" : ""}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`SEO check passed for ${files.length} pages.`);
