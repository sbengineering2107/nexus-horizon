import Link from "next/link";
import { getCategory, type Post } from "@/lib/content/blog";

export const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** One guide in a list: category, title, the short answer and reading time. */
export function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-navy/60">
      <p className="text-sm font-semibold text-gold-deep">{getCategory(post.category)?.name}</p>
      <H className="mt-2 text-xl leading-snug sm:text-[1.35rem]">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </H>
      <p className="mt-3 line-clamp-3 text-slate">{post.summary}</p>
      <p className="mt-auto pt-5 text-sm text-slate">
        <time dateTime={post.published}>{dateFmt.format(new Date(post.published))}</time>
        <span className="mx-2 text-mist-strong" aria-hidden="true">
          |
        </span>
        {post.metadata.readingTime} min read
      </p>
    </article>
  );
}
