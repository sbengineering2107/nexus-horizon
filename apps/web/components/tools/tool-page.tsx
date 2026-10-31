import Link from "next/link";
import { Container } from "@nh/ui";
import type { Tool } from "@/lib/content/tools";
import { webApplicationJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { getTools } from "@/lib/content/tools";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Shared frame for calculator pages: heading, calculator, explainer, FAQs, related tools. */
export function ToolPage({ tool, children, explainer }: { tool: Tool; children: React.ReactNode; explainer: React.ReactNode }) {
  const path = `/tools/${tool.slug}`;
  const other = getTools().filter((t) => t.slug !== tool.slug);
  return (
    <>
      <JsonLd data={webApplicationJsonLd({ title: tool.title, short: tool.short, path })} />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/tools" },
            { name: tool.title, path },
          ]}
        />
        <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">{tool.title}</h1>
        <p className="mt-4 max-w-[62ch] text-lg text-slate">{tool.short}</p>
        <div className="mt-10">{children}</div>
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
                  <Link href={`/tools/${t.slug}`} className="text-forest hover:underline">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-sans text-base font-semibold text-basalt">Services</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/services/new-projects" className="text-forest hover:underline">
                  New Project Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/resale" className="text-forest hover:underline">
                  Resale &amp; Secondary Market
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
