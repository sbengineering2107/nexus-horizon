#!/usr/bin/env node
/**
 * Build Velite content and exit non-zero on any schema error.
 * (The `velite build` CLI prints errors but exits 0, which would let CI pass on broken content.)
 */
import { build } from "velite";

try {
  await build({ clean: true });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
