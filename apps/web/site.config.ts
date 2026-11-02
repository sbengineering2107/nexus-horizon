import { resolveSiteUrl } from "./lib/seo/site-url";

/**
 * Single source of truth for business details.
 * Optional fields left empty are simply not shown or published.
 */
export const siteConfig = {
  name: "Nexus Horizon Advisors",
  legalName: "Nexus Horizon Advisors", // PLACEHOLDER: registered firm name
  description:
    "Independent real estate advisors in Pune helping buyers choose new projects, ready-to-move homes, resale flats and commercial spaces with clarity.",
  url: resolveSiteUrl(process.env),
  phone: "+91 87884 32367",
  whatsapp: "+91 87884 32367",
  /** Add a business email when available; hidden while empty. */
  email: "",
  address: {
    street: "Near M-Connect, Bavdhan",
    locality: "Bavdhan",
    city: "Pune",
    region: "Maharashtra",
    /** Bavdhan uses 411021 and the newer 411071; set the office's PIN when confirmed. */
    postalCode: "",
    country: "IN",
  },
  /** Exact office coordinates (from a Google Maps pin); omitted from structured data while null. */
  geo: null as { lat: number; lng: number } | null,
  maharera: "A031262605250", // MahaRERA agent registration no.
  /** Official social profile URLs; published as sameAs once added. */
  socials: [] as string[],
  hours: "Mo-Sa 10:00-19:00",
} as const satisfies {
  name: string;
  legalName: string;
  description: string;
  url: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    locality: string;
    city: "Pune";
    region: "Maharashtra";
    postalCode: string;
    country: "IN";
  };
  geo: { lat: number; lng: number } | null;
  maharera: string;
  socials: readonly string[];
  hours: string;
};

export type SiteConfig = typeof siteConfig;
