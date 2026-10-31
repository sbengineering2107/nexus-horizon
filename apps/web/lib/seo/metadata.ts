import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { isProduction } from "./env";

export type MetadataInput = {
  title: string;
  description: string;
  /** Path beginning with "/". */
  path: string;
  /** Absolute or root-relative image URL; defaults to the route's generated OG image. */
  image?: string;
  noindex?: boolean;
};

export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export function buildMetadata({ title, description, path, image, noindex }: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const index = isProduction() && !noindex;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: index },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: "en_IN",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
