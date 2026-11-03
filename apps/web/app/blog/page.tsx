import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { CATEGORIES, getPostsByCategory } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { PostCard } from "@/components/blog/post-card";

export const metadata: Metadata = buildMetadata({
  title: "Pune Property Guides for Home Buyers and Investors",
  description:
    "Practical guides to buying property in Pune: MahaRERA checks, resale documents, the full cost of buying, home loans, area comparisons and rental yields.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }]} />
        <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">Pune property guides</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate">
          Plain answers to the questions buyers ask us most, checked against official sources and dated so you know how
          current they are.
        </p>
        <nav aria-label="Guide categories" className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/blog/category/${c.id}`}
              className="rounded-full border border-line bg-white px-4 py-1.5 text-[0.95rem] text-basalt transition-colors hover:border-navy hover:text-navy"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {CATEGORIES.map((c) => {
            const list = getPostsByCategory(c.id);
            if (list.length === 0) return null;
            return (
              <section key={c.id} aria-labelledby={`cat-${c.id}`}>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <h2 id={`cat-${c.id}`} className="text-3xl">
                      {c.name}
                    </h2>
                    <p className="mt-2 max-w-2xl text-slate">{c.intro}</p>
                  </div>
                  <Link href={`/blog/category/${c.id}`} className="text-sm font-semibold text-navy hover:underline">
                    All {c.name.toLowerCase()}
                  </Link>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {list.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
      <CtaBand
        pagePath="/blog"
        heading="Have a question the guides don't answer?"
        text="Ask us on WhatsApp or call. Consultations are always free, and we'll tell you plainly what applies to your purchase."
      />
    </>
  );
}
