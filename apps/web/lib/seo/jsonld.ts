import type {
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  Place,
  RealEstateAgent,
  Service as SchemaService,
  WebApplication,
  WebSite,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/site.config";
import type { Service } from "@/lib/content/services";
import { absoluteUrl } from "./metadata";

const orgId = () => `${siteConfig.url}/#organization`;

export function organizationJsonLd(): WithContext<RealEstateAgent> {
  const { address, geo } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": orgId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-square-512.png`,
    image: `${siteConfig.url}/og-image.png`,
    telephone: siteConfig.phone,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressCountry: address.country,
    },
    ...(geo ? { geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } } : {}),
    areaServed: { "@type": "City", name: "Pune" },
    openingHours: siteConfig.hours,
    identifier: { "@type": "PropertyValue", propertyID: "MahaRERA", value: siteConfig.maharera },
    ...(siteConfig.socials.length ? { sameAs: [...siteConfig.socials] } : {}),
  };
}

export function websiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en-IN",
    publisher: { "@id": orgId() },
  };
}

export function serviceJsonLd(s: Service): WithContext<SchemaService> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary,
    url: absoluteUrl(`/services/${s.slug}`),
    serviceType: s.title,
    areaServed: { "@type": "City", name: "Pune" },
    provider: { "@id": orgId() },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webApplicationJsonLd(t: { title: string; short: string; path: string }): WithContext<WebApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t.title,
    description: t.short,
    url: absoluteUrl(t.path),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@id": orgId() },
  };
}

export function placeJsonLd(a: { name: string; summary: string; path: string }): WithContext<Place> {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${a.name}, Pune`,
    description: a.summary,
    url: absoluteUrl(a.path),
    address: { "@type": "PostalAddress", addressLocality: a.name, addressRegion: "Maharashtra", addressCountry: "IN" },
    containedInPlace: { "@type": "City", name: "Pune" },
  };
}

export function blogPostingJsonLd(p: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
  section: string;
  wordCount: number;
}): WithContext<BlogPosting> {
  const url = absoluteUrl(p.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: url,
    datePublished: p.published,
    dateModified: p.updated,
    articleSection: p.section,
    wordCount: p.wordCount,
    inLanguage: "en-IN",
    image: `${siteConfig.url}/og-image.png`,
    author: { "@type": "Organization", name: `${siteConfig.name} team`, url: siteConfig.url },
    publisher: { "@id": orgId() },
  };
}
