import Link from "next/link";
import { getTool, LOAN_JOURNEY, type ToolSlug } from "@/lib/content/tools";

/** Cross-links the three loan calculators in the order a buyer should use them. */
export function LoanGuide({ current }: { current: ToolSlug }) {
  return (
    <section aria-labelledby="loan-guide-heading" className="rounded-lg border border-line bg-white p-6 sm:p-8">
      <h2 id="loan-guide-heading" className="text-2xl">
        Which loan calculator do I need?
      </h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {LOAN_JOURNEY.map((slug, i) => {
          const t = getTool(slug)!;
          const here = slug === current;
          const body = (
            <>
              <span className="text-sm font-semibold text-navy">Step {i + 1}</span>
              <span className="mt-1 block font-semibold text-basalt">{t.question}</span>
              <span className={`mt-2 block text-sm ${here ? "text-slate" : "text-navy group-hover:underline"}`}>
                {here ? "You are on this calculator" : t.title}
              </span>
            </>
          );
          return (
            <li key={slug}>
              {here ? (
                <div aria-current="page" className="h-full rounded-md border-2 border-navy bg-mist/50 p-5">
                  {body}
                </div>
              ) : (
                <Link href={`/calculators/${slug}`} className="group block h-full rounded-md border border-line p-5 transition-colors hover:border-navy/50">
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
