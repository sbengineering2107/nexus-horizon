import Link from "next/link";
import { Container } from "@nh/ui";
import { getTools } from "@/lib/content/tools";
import { ToolCard } from "@/components/tools/tool-card";

export function ToolsTeaser() {
  return (
    <section aria-labelledby="tools-heading" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="tools-heading" className="text-3xl sm:text-[2.6rem]">
              Know the full cost before you visit
            </h2>
            <p className="mt-4 text-lg text-slate">
              Free calculators for what you can borrow, what you will pay each month and on the day, and what a property
              could earn.
            </p>
          </div>
          <Link href="/calculators" className="font-semibold text-forest underline-offset-4 hover:underline">
            All calculators
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {getTools().map((t) => (
            <li key={t.slug} className="reveal">
              <ToolCard tool={t} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
