import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Container } from "@nh/ui";
import { getCategory, getPost, getPosts, morePosts } from "@/lib/content/blog";
import { getService } from "@/lib/content/services";
import { getArea } from "@/lib/content/areas";
import { getTool } from "@/lib/content/tools";
import { MdxContent } from "@/lib/content/mdx-content";
import { officialSources, shortUrl, sourceName } from "@/lib/content/official-sources";
import { absoluteUrl, buildMetadata } from "@/lib/seo/metadata";
import { blogPostingJsonLd } from "@/lib/seo/jsonld";
import { consultationHref, whatsappChatHref } from "@/lib/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { CtaBand } from "@/components/shared/cta-band";
import { PostCard, dateFmt } from "@/components/blog/post-card";
import { CallBackBox } from "@/components/leads/call-back-box";
import { leadsEnabled } from "@/lib/leads/store";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  const base = buildMetadata({ title: p.seoTitle, description: p.description, path: `/blog/${p.slug}` });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: p.published,
      modifiedTime: p.updated,
      section: getCategory(p.category)?.name,
    },
    alternates: { ...base.alternates, types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") } },
  };
}

const linkClass = "text-navy hover:underline";

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const category = getCategory(p.category)!;
  const tools = p.related.tools.map(getTool).filter((x) => x !== null);
  const services = p.related.services.map(getService).filter((x) => x !== null);
  const areas = p.related.areas.map(getArea).filter((x) => x !== null);
  const updated = p.updated !== p.published;
  const sources = officialSources(p.sources);

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          title: p.title,
          description: p.description,
          path,
          published: p.published,
          updated: p.updated,
          section: category.name,
          wordCount: p.metadata.wordCount,
        })}
      />
      <section className="border-b border-line bg-white">
        <Container className="pt-10 pb-12 sm:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Guides", path: "/blog" },
              { name: category.name, path: `/blog/category/${category.id}` },
            ]}
          />
          <h1 className="mt-8 max-w-4xl text-4xl leading-[1.1] sm:text-[3.1rem]">{p.title}</h1>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] text-slate">
            <span>By Nexus Horizon team</span>
            <span>
              {updated ? "Updated " : "Published "}
              <time dateTime={updated ? p.updated : p.published}>
                {dateFmt.format(new Date(updated ? p.updated : p.published))}
              </time>
            </span>
            <span>{p.metadata.readingTime} min read</span>
          </p>
          <div className="mt-8 max-w-[68ch] rounded-lg border-l-4 border-gold bg-mist/50 px-6 py-5">
            <p className="text-sm font-semibold text-navy-deep">The short answer</p>
            <p data-testid="post-summary" className="mt-1.5 text-lg text-basalt">
              {p.summary}
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article>
            <div className="prose-nh">
              <MdxContent code={p.body} />
            </div>
            <div className="mt-14 max-w-[68ch]">
              <FaqList faqs={p.faqs} />
            </div>
            <div className="mt-10 max-w-[68ch] text-sm text-slate">
              {sources.length > 0 && (
                <details data-testid="post-sources" className="group rounded-md border border-line bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-semibold text-basalt">
                    Official sources ({sources.length})
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-navy transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <ol className="list-decimal space-y-1.5 border-t border-line px-4 py-3 pl-9">
                    {sources.map((src) => (
                      <li key={src}>
                        <a href={src} title={src} className="underline underline-offset-2" rel="noopener nofollow" target="_blank">
                          {sourceName(src)}
                        </a>
                        <span className="block truncate text-xs text-slate/80">{shortUrl(src)}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
              <p className="mt-4">
                This guide is general information as of {dateFmt.format(new Date(p.updated))}, not legal, tax or
                financial advice. Rules and rates change; confirm the figures for your own purchase before you commit.
              </p>
            </div>
          </article>

          <aside className={`space-y-8 ${leadsEnabled() ? "" : "lg:sticky lg:top-24 lg:self-start"}`}>
            {leadsEnabled() ? (
              <CallBackBox path={path} intro="Questions about this guide or your own purchase? Consultations are always free." />
            ) : (
            <div className="rounded-lg border border-line bg-paper p-6">
              <h2 className="text-xl">Talk to an advisor</h2>
              <p className="mt-2 text-slate">Consultations are always free, on WhatsApp or a call.</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild variant="primary">
                  <a href={consultationHref(path)} target="_blank" rel="noopener">
                    Book a free consultation
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={whatsappChatHref(path)} target="_blank" rel="noopener">
                    Ask on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            )}
            {tools.length + services.length + areas.length > 0 && (
              <nav aria-label="Useful next steps">
                <h2 className="font-sans text-base font-semibold text-basalt">Useful next</h2>
                <ul className="mt-3 space-y-2">
                  {tools.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/calculators/${t.slug}`} className={linkClass}>
                        {t.title}
                      </Link>
                    </li>
                  ))}
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className={linkClass}>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                  {areas.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/pune/${a.slug}`} className={linkClass}>
                        {a.name} area guide
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>

        <section aria-labelledby="more-guides" className="mt-20 border-t border-line pt-12">
          <h2 id="more-guides" className="text-2xl sm:text-3xl">
            More guides
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {morePosts(p).map((m) => (
              <PostCard key={m.slug} post={m} />
            ))}
          </div>
        </section>
      </Container>
      <CtaBand
        pagePath={path}
        heading="Buying in Pune? Start with a conversation"
        text="Tell us what you're looking for. Consultations are always free, and we'll point you to what matters for your purchase."
      />
    </>
  );
}
