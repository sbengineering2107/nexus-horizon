import type { Metadata, Viewport } from "next";
import { googleSans, rupeeGlyph } from "./fonts";
import { siteConfig } from "@/site.config";
import { isIndexable } from "@/lib/seo/env";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Real Estate Advisors in Pune`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: { index: isIndexable(), follow: isIndexable() },
  openGraph: { siteName: siteConfig.name, locale: "en_IN", type: "website" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0f4d47" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${googleSans.variable} ${rupeeGlyph.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-16 md:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}
