#!/usr/bin/env node
/**
 * Apply Drizzle migrations to DATABASE_URL (Neon, or `pglite:./dir` for local runs).
 * Safe to run on every deploy: applied migrations are skipped.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("DATABASE_URL not set; skipping migrations.");
  process.exit(0);
}
// On Vercel, only production builds change the schema. Preview builds must not migrate a
// shared database before their code ships (and should use a separate Neon branch anyway).
if (process.env.VERCEL === "1" && process.env.VERCEL_ENV !== "production") {
  console.log(`Skipping migrations on Vercel ${process.env.VERCEL_ENV ?? "unknown"} build.`);
  process.exit(0);
}
const migrationsFolder = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");

if (url.startsWith("pglite:")) {
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const target = url.slice("pglite:".length);
  const client = new PGlite(target === "memory" ? undefined : target);
  await migrate(drizzle(client), { migrationsFolder });
  await client.close();
} else {
  const { neon } = await import("@neondatabase/serverless");
  const { drizzle } = await import("drizzle-orm/neon-http");
  const { migrate } = await import("drizzle-orm/neon-http/migrator");
  await migrate(drizzle(neon(url)), { migrationsFolder });
}
console.log("Migrations applied.");
