import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

/**
 * Build Velite content before Next.js compiles (and watch it in dev).
 * Velite runs with `strict: true`, so a schema error fails the build.
 */
export default async function config(phase: string): Promise<NextConfig> {
  const isDev = phase === "phase-development-server";
  const isBuild = phase === "phase-production-build";
  if ((isDev || isBuild) && !process.env.VELITE_STARTED) {
    process.env.VELITE_STARTED = "1";
    const { build } = await import("velite");
    await build({ watch: isDev, clean: !isDev });
  }
  return nextConfig;
}
