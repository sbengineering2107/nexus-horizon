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

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 155;

/** Page title for search results: "<title> | <brand>" when that fits in 60 characters, else the title alone. */
function searchTitle(title: string): string {
  const branded = `${title} | ${siteConfig.name}`;
  return branded.length <= MAX_TITLE ? branded : title;
}

/**
 * Meta description within 155 characters: whole sentences when they fit (and keep at least
 * 100 characters), otherwise cut at a word boundary with an ellipsis. Never mid-word.
 */
export function clipDescription(text: string): string {
  const t = text.trim();
  if (t.length <= MAX_DESCRIPTION) return t;
  // Look one character past the limit so a sentence ending exactly at 155 is found by its trailing space.
  const head = t.slice(0, MAX_DESCRIPTION + 1);
  const stop = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "));
  if (stop >= 100) return head.slice(0, stop + 1);
  const cut = t.slice(0, MAX_DESCRIPTION).lastIndexOf(" ");
  return `${t.slice(0, cut).replace(/[,;:\s]+$/, "")}…`;
}

export function buildMetadata({ title, description, path, image, noindex }: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const index = isIndexable() && !noindex;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  description = clipDescription(description);
  return {
    title: { absolute: searchTitle(title) },
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
