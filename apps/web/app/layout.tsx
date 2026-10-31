import type { Metadata } from "next";
import { display, sans } from "./fonts";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Horizon Advisors",
  description: "Real estate advisory in Pune.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-16 md:pb-0">
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
