import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@nh/ui";
import { CATEGORIES, getCategory, getPostsByCategory } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { PostCard } from "@/components/blog/post-card";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return buildMetadata({
    title: `${c.name}: Pune Property Guides`,
    description: c.intro,
    path: `/blog/category/${c.id}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const path = `/blog/category/${c.id}`;
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Guides", path: "/blog" },
            { name: c.name, path },
          ]}
        />
        <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">{c.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate">{c.intro}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {getPostsByCategory(c.id).map((p) => (
            <PostCard key={p.slug} post={p} headingLevel={2} />
          ))}
        </div>
        <nav aria-label="Other categories" className="mt-14 border-t border-line pt-8">
          <h2 className="font-sans text-base font-semibold text-basalt">Other guide categories</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {CATEGORIES.filter((o) => o.id !== c.id).map((o) => (
              <li key={o.id}>
                <Link href={`/blog/category/${o.id}`} className="text-navy hover:underline">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <CtaBand
        pagePath={path}
        heading="Talk it through with an advisor"
        text="Consultations are always free, on WhatsApp, a call or in person."
      />
    </>
  );
}
