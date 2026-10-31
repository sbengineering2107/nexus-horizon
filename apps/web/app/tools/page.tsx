import type { Metadata } from "next";
import { Container } from "@nh/ui";
import { getTools } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCard } from "@/components/tools/tool-card";

export const metadata: Metadata = buildMetadata({
  title: "Property Calculators for Pune Buyers",
  description: "Free home loan, EMI, eligibility, balance transfer, stamp duty and rental yield calculators to plan the full cost of buying property in Pune.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/tools" }]} />
      <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">Property calculators</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate">
        Plan the real cost of a purchase before you visit a site: what you can borrow, your monthly instalment, the
        stamp duty and registration due on the day, and what a property could earn in rent.
      </p>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {getTools().map((t) => (
          <li key={t.slug}>
            <ToolCard tool={t} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </Container>
  );
}
