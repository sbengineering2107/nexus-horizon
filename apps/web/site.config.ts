import { resolveSiteUrl } from "./lib/seo/site-url";

/**
 * Single source of truth for business details.
 * Every value marked PLACEHOLDER must be replaced with real data before launch.
 */
export const siteConfig = {
  name: "Nexus Horizon Advisors",
  legalName: "Nexus Horizon Advisors", // PLACEHOLDER: registered firm name
  description:
    "Independent real estate advisors in Pune helping buyers choose new projects, ready-to-move homes, resale flats and commercial spaces with clarity.",
  url: resolveSiteUrl(process.env),
  phone: "+91 98765 43210", // PLACEHOLDER
  whatsapp: "+91 98765 43210", // PLACEHOLDER
  email: "hello@nexushorizon.in", // PLACEHOLDER
  address: {
    street: "Office 401, Placeholder Business Park, Baner Road", // PLACEHOLDER
    locality: "Baner",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411045", // PLACEHOLDER
    country: "IN",
  },
  geo: { lat: 18.559, lng: 73.7868 }, // PLACEHOLDER: office coordinates
  maharera: "A031262605250", // MahaRERA agent registration no.
  socials: [
    "https://www.linkedin.com/company/nexus-horizon-advisors", // PLACEHOLDER
    "https://www.instagram.com/nexushorizonadvisors", // PLACEHOLDER
  ],
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
  geo: { lat: number; lng: number };
  maharera: string;
  socials: readonly string[];
  hours: string;
};

export type SiteConfig = typeof siteConfig;
