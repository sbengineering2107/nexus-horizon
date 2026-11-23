/* eslint-disable @typescript-eslint/no-explicit-any -- tests inspect loosely-typed JSON-LD output */
import { describe, expect, test } from "vitest";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, serviceJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { getService } from "@/lib/content/services";
import { siteConfig } from "@/site.config";

describe("JSON-LD builders", () => {
  test("organization is a Pune RealEstateAgent carrying the MahaRERA number", () => {
    const o = organizationJsonLd() as Record<string, any>;
    expect(o["@context"]).toBe("https://schema.org");
    expect(o["@type"]).toBe("RealEstateAgent");
    expect(o.address.addressLocality).toBe("Pune");
    expect(JSON.stringify(o.areaServed)).toContain("Pune");
    expect(o.identifier).toMatchObject({ value: siteConfig.maharera });
    if (siteConfig.socials.length) expect(o.sameAs).toEqual(siteConfig.socials);
    else expect(o).not.toHaveProperty("sameAs");
    if (!siteConfig.email) expect(o).not.toHaveProperty("email");
    if (!siteConfig.geo) expect(o).not.toHaveProperty("geo");
  });

  test("organization names the Pune areas it serves, its map and its topics", () => {
    const o = organizationJsonLd() as Record<string, any>;
    const served = (o.areaServed as any[]).map((a) => a.name);
    expect(served).toContain("Pune");
    expect(served).toContain("Baner, Pune");
    expect(served).toContain("Bavdhan, Pune");
    expect(served.length).toBe(29);
    expect(o.hasMap).toBe(siteConfig.mapsUrl);
    expect(o.knowsAbout).toEqual(expect.arrayContaining(["MahaRERA", "Resale flats", "Stamp duty in Maharashtra"]));
  });

  test("website points at the site URL", () => {
    expect((websiteJsonLd() as Record<string, any>).url).toBe(siteConfig.url);
  });

  test("service references the organization as provider", () => {
    const s = serviceJsonLd(getService("resale")!) as Record<string, any>;
    expect(s["@type"]).toBe("Service");
    expect(s.url).toBe(`${siteConfig.url}/services/resale`);
    expect(s.provider["@id"]).toBe(`${siteConfig.url}/#organization`);
  });

  test("FAQ maps questions to accepted answers", () => {
    const f = faqJsonLd([{ q: "a", a: "b" }]) as Record<string, any>;
    expect(f["@type"]).toBe("FAQPage");
    expect(f.mainEntity[0].acceptedAnswer.text).toBe("b");
  });

  test("breadcrumbs are positioned from 1 with absolute URLs", () => {
    const b = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]) as Record<string, any>;
    expect(b.itemListElement[1]).toMatchObject({ position: 2, name: "Services", item: `${siteConfig.url}/services` });
  });
});
