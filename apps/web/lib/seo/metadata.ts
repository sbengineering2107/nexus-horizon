import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { isIndexable } from "./env";

export type MetadataInput = {
  title: string;
  description: string;
  /** Path beginning with "/". */
  path: string;
  /** Absolute or root-relative image URL; defaults to the brand kit share image (1200x630). */
  image?: string;
  noindex?: boolean;
};

export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export function buildMetadata({ title, description, path, image, noindex }: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const index = isIndexable() && !noindex;
  const images = [{ url: image ?? "/og-image.png", width: 1200, height: 630, alt: title }];
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
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}
