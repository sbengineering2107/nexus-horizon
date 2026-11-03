import Link from "next/link";
import { Container } from "@nh/ui";
import { CATEGORIES, getPostsByCategory } from "@/lib/content/blog";
import { PostCard } from "@/components/blog/post-card";

/** Newest guide from each of the first three categories, so the home page shows range. */
export function LatestGuides() {
  const picks = CATEGORIES.map((c) => getPostsByCategory(c.id)[0]).filter((p) => p !== undefined).slice(0, 3);
  if (picks.length === 0) return null;
  return (
    <section id="guides" aria-labelledby="guides-heading" className="py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="guides-heading" className="text-3xl sm:text-[2.6rem]">
              Guides for buying in Pune
            </h2>
            <p className="mt-4 text-lg text-slate">
              Straight answers on checks, costs, loans and areas, sourced and dated.
            </p>
          </div>
          <Link href="/blog" className="font-semibold text-navy underline-offset-4 hover:underline">
            All guides
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {picks.map((p) => (
            <li key={p.slug} className="reveal">
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
