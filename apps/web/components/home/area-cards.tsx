import Link from "next/link";
import { Container } from "@nh/ui";
import { getAreasByZone, ZONES } from "@/lib/content/areas";
import { AreaLinks } from "@/components/areas/area-links";

export function AreaCards() {
  return (
    <section id="areas" aria-labelledby="areas-heading" className="scroll-mt-20 border-t border-line bg-paper py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="areas-heading" className="text-3xl sm:text-[2.6rem]">
              Where buyers are looking in Pune
            </h2>
            <p className="mt-4 text-lg text-slate">
              Area guides for 28 micro-markets across West and East Pune: what each is known for, how it connects, and
              who it suits.
            </p>
          </div>
          <Link href="/pune" className="font-semibold text-navy underline-offset-4 hover:underline">
            All area guides
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {ZONES.map((z) => {
            const list = getAreasByZone(z.id);
            return (
              <div key={z.id} className="reveal rounded-xl border border-line bg-white p-7 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl">{z.name}</h3>
                  <span className="text-sm text-slate">{list.length} areas</span>
                </div>
                <p className="mt-2 text-[0.95rem] text-slate">{z.intro}</p>
                <div className="mt-6">
                  <AreaLinks zone={z.id} areas={list} />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
