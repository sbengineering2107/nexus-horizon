import Link from "next/link";
import { Container } from "@nh/ui";
import type { Tool } from "@/lib/content/tools";
import { webApplicationJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { getTools, LOAN_JOURNEY } from "@/lib/content/tools";
import { LoanGuide } from "./loan-guide";
import { postsRelatedTo } from "@/lib/content/blog";
import { RelatedGuides } from "@/components/blog/related-guides";
import { CalcSummaryProvider } from "./calc-summary";
import { CalculatorLeadForm } from "@/components/leads/calculator-lead-form";
import { leadsEnabled } from "@/lib/leads/store";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Shared frame for calculator pages: heading, calculator, explainer, FAQs, related tools. */
export function ToolPage({ tool, children, explainer }: { tool: Tool; children: React.ReactNode; explainer: React.ReactNode }) {
  const path = `/calculators/${tool.slug}`;
  const other = getTools().filter((t) => t.slug !== tool.slug);
  return (
    <>
      <JsonLd data={webApplicationJsonLd({ title: tool.title, short: tool.short, path })} />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Home Loan Calculators", path: "/calculators" },
            { name: tool.title, path },
          ]}
        />
        <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">{tool.title}</h1>
        <p className="mt-4 max-w-[62ch] text-lg text-slate">{tool.short}</p>
        <CalcSummaryProvider formEnabled={leadsEnabled()}>
          <div className="mt-10">{children}</div>
          {leadsEnabled() && (
            <section
              id="calc-lead-section"
              aria-labelledby="calc-lead"
              className="mt-8 grid gap-6 rounded-lg border border-line bg-paper p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12"
            >
              <div>
                <h2 id="calc-lead" className="text-2xl">
                  Want an advisor to check these numbers?
                </h2>
                <p className="mt-2 text-slate">
                  Leave your number and we&apos;ll call you back. Your current result is sent along, so you won&apos;t have
                  to explain it again.
                </p>
              </div>
              <CalculatorLeadForm sourcePage={path} />
            </section>
          )}
        </CalcSummaryProvider>
        {LOAN_JOURNEY.includes(tool.slug) && (
          <div className="mt-10">
            <LoanGuide current={tool.slug} />
          </div>
        )}
        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_18rem]">
          <div>
            <div className="prose-nh">{explainer}</div>
            <p className="mt-6 text-sm text-slate">
              Last updated <time dateTime={tool.updated}>{dateFmt.format(new Date(tool.updated))}</time>
            </p>
            <div className="mt-14">
              <FaqList faqs={tool.faqs} />
            </div>
          </div>
          <aside>
            <h2 className="font-sans text-base font-semibold text-basalt">Other calculators</h2>
            <ul className="mt-3 space-y-2">
              {other.map((t) => (
                <li key={t.slug}>
                  <Link href={`/calculators/${t.slug}`} className="text-navy hover:underline">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-sans text-base font-semibold text-basalt">Services</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/services/new-projects" className="text-navy hover:underline">
                  New Project Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/resale" className="text-navy hover:underline">
                  Resale &amp; Secondary Market
                </Link>
              </li>
            </ul>
            <RelatedGuides posts={postsRelatedTo({ tool: tool.slug })} className="mt-8" />
          </aside>
        </div>
      </Container>
    </>
  );
}
