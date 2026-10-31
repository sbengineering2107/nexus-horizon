import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/home/hero";
import { ServicesList } from "@/components/home/services-list";
import { WhyUs } from "@/components/home/why-us";
import { Process } from "@/components/home/process";
import { Testimonials } from "@/components/home/testimonials";
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
      <ServicesList />
      <WhyUs />
      <Process />
      <Testimonials />
      <CtaBand
        pagePath="/"
        heading="Start with a 20-minute call"
        text="Tell us what you're looking for. We'll tell you honestly whether we can help, and what to look at first."
      />
    </>
  );
}
