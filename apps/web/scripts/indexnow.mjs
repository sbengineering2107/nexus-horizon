#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex and others) about every URL in the live sitemap.
 * Run after a production deploy: node scripts/indexnow.mjs https://www.example.com
 * Does nothing while robots.txt blocks the site (indexing off).
 */
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { indexNowPayload, siteBlocked, sitemapUrls } from "./indexnow-lib.mjs";

const site = (process.argv[2] ?? process.env.SITE_URL ?? "").replace(/\/$/, "");
if (!site) {
  console.error("Usage: node scripts/indexnow.mjs <site-url>");
  process.exit(1);
}
const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const key = readdirSync(publicDir).find((f) => /^[a-f0-9]{32}\.txt$/.test(f))?.replace(/\.txt$/, "");
if (!key) throw new Error("No IndexNow key file in public/");

const robots = await (await fetch(`${site}/robots.txt`)).text();
if (siteBlocked(robots)) {
  console.log("robots.txt blocks the site (indexing off); skipping IndexNow.");
  process.exit(0);
}
const urls = sitemapUrls(await (await fetch(`${site}/sitemap.xml`)).text());
const body = indexNowPayload(site, key, urls);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
console.log(`IndexNow: submitted ${body.urlList.length} URLs, HTTP ${res.status}`);
if (res.status >= 400) process.exit(1);
