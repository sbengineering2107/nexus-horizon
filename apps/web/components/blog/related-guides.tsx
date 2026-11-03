import Link from "next/link";
import type { Post } from "@/lib/content/blog";

/** Compact list of guides for asides on service, area and calculator pages. */
export function RelatedGuides({ posts, className = "" }: { posts: Post[]; className?: string }) {
  if (posts.length === 0) return null;
  return (
    <nav aria-label="Related guides" className={className}>
      <h2 className="font-sans text-base font-semibold text-basalt">Related guides</h2>
      <ul className="mt-3 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="text-navy hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/blog" className="mt-4 inline-block text-sm font-semibold text-navy hover:underline">
        All guides
      </Link>
    </nav>
  );
}
