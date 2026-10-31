import Link from "next/link";
import { Container } from "@nh/ui";
import { getTools } from "@/lib/content/tools";

export function ToolsTeaser() {
  return (
    <section aria-labelledby="tools-heading" className="bg-white py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="reveal">
          <h2 id="tools-heading" className="text-3xl sm:text-[2.6rem]">
            Know the full cost before you visit
          </h2>
          <p className="mt-4 text-lg text-slate">Your monthly instalment, and the stamp duty and registration due on the day.</p>
        </div>
        <ul className="reveal divide-y divide-line border-y border-line">
          {getTools().map((t) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}`} className="group flex items-center justify-between gap-6 py-7">
                <div>
                  <h3 className="text-2xl group-hover:text-forest">{t.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-slate">{t.short}</p>
                </div>
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 shrink-0 text-forest transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
