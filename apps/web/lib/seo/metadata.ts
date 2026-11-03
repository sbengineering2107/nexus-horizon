import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { isIndexable } from "./env";

export type MetadataInput = {
  title: string;
  description: string;
  /** Path beginning with "/". */
  path: string;
  /**
   * Share image (1200x630). Omit to use the route's generated opengraph-image file; an explicit
   * image here would override it. Only the home page passes the brand kit image.
   */
  image?: string;
  noindex?: boolean;
};

export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export function buildMetadata({ title, description, path, image, noindex }: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const index = isIndexable() && !noindex;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
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
      ...(images ? { images } : {}),
    },
    // No twitter images: X falls back to og:image, so per-page generated images apply there too.
    twitter: { card: "summary_large_image", title, description },
  };
}
