import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServicesList } from "@/components/home/services-list";
import { AreaCards } from "@/components/home/area-cards";
import { WhyUs } from "@/components/home/why-us";
import { Process } from "@/components/home/process";
import { ToolsTeaser } from "@/components/home/tools-teaser";
import { Testimonials } from "@/components/home/testimonials";
import { LatestGuides } from "@/components/home/latest-guides";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} | Real Estate Advisors in Pune`,
    description:
      "Independent real estate advisors in Pune for new projects, ready-to-move homes, resale flats and commercial space. MahaRERA checks, site visits and booking support.",
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} | Real Estate Advisors in Pune` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesList />
      <AreaCards />
      <WhyUs />
      <Process />
      <ToolsTeaser />
      <LatestGuides />
      <Testimonials />
      <CtaBand
        pagePath="/"
        heading="Start with a 20-minute call"
        text="Tell us what you're looking for. We'll tell you honestly whether we can help, and what to look at first."
      />
    </>
  );
}
