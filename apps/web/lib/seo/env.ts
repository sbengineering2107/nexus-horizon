/** True only for Vercel production deployments; previews and local builds are not indexable. */
export function isProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}
