import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { getTools } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Property Calculators for Pune Buyers",
  description: "Free home loan EMI and Maharashtra stamp duty calculators to plan the full cost of buying property in Pune.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/tools" }]} />
      <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">Property calculators</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate">
        Plan the real cost of a purchase before you visit a site: your monthly instalment, and the stamp duty and
        registration you will pay on the day.
      </p>
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {getTools().map((t) => (
          <li key={t.slug}>
            <Link
              href={`/tools/${t.slug}`}
              className="group block h-full rounded-lg border border-mist-strong bg-white p-7 transition-colors hover:border-forest"
            >
              <h2 className="text-2xl group-hover:text-forest">{t.title}</h2>
              <p className="mt-3 text-slate">{t.short}</p>
              <span className="mt-5 inline-block font-semibold text-forest">Open calculator</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
