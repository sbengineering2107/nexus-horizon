import type { Metadata, Viewport } from "next";
import { googleSans, rupeeGlyph } from "./fonts";
import { siteConfig } from "@/site.config";
import { isIndexable } from "@/lib/seo/env";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingContact } from "@/components/contact/floating-contact";
import { PageMessagesProvider } from "@/components/contact/page-messages";
import { buildPageMessages } from "@/lib/page-messages";
import { Analytics } from "@/components/analytics/analytics";
import { AttributionCapture } from "@/components/leads/attribution-capture";
import { leadsEnabled } from "@/lib/leads/store";
import { verificationMeta } from "@/lib/analytics/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Real Estate Advisors in Pune`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: { index: isIndexable(), follow: isIndexable() },
  openGraph: { siteName: siteConfig.name, locale: "en_IN", type: "website" },
  formatDetection: { telephone: false },
  verification: verificationMeta(process.env),
};

export const viewport: Viewport = { themeColor: "#1B2A41" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${googleSans.variable} ${rupeeGlyph.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <PageMessagesProvider map={buildPageMessages()}>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <FloatingContact />
        </PageMessagesProvider>
        <Analytics />
        {leadsEnabled() && <AttributionCapture />}
      </body>
    </html>
  );
}
