import type { Metadata } from "next";
import { Container } from "@nh/ui";
import { getTools } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCard } from "@/components/tools/tool-card";

const GROUPS = [
  {
    id: "loan" as const,
    heading: "Home loan calculators",
    intro: "Start with eligibility, plan the loan for a specific property, then fine-tune the EMI or check a lower rate.",
  },
  {
    id: "property" as const,
    heading: "Property costs and rental returns",
    intro: "The stamp duty and registration due on the day, and what a property could earn if you rent it out.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Home Loan & Property Calculators for Pune Buyers",
  description: "Free home loan, EMI, eligibility, balance transfer, stamp duty and rental yield calculators to plan the full cost of buying property in Pune.",
  path: "/calculators",
});

export default function ToolsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Home Loan Calculators", path: "/calculators" }]} />
      <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">Home loan and property calculators</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate">
        Plan the real cost of a purchase before you visit a site: what you can borrow, your monthly instalment, the
        stamp duty and registration due on the day, and what a property could earn in rent.
      </p>
      {GROUPS.map((g) => (
        <section key={g.id} aria-labelledby={`group-${g.id}`} className="mt-14">
          <h2 id={`group-${g.id}`} className="text-2xl sm:text-3xl">
            {g.heading}
          </h2>
          <p className="mt-2 max-w-2xl text-slate">{g.intro}</p>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {getTools()
              .filter((t) => t.group === g.id)
              .map((t) => (
                <li key={t.slug}>
                  <ToolCard tool={t} />
                </li>
              ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}
