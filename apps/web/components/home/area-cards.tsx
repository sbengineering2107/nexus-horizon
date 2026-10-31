import { Container } from "@nh/ui";
import { AREAS, enquiryHref } from "@/lib/enquiry";

export function AreaCards() {
  return (
    <section id="areas" aria-labelledby="areas-heading" className="scroll-mt-20 border-t border-line bg-paper py-20 sm:py-28">
      <Container>
        <div className="reveal max-w-2xl">
          <h2 id="areas-heading" className="text-3xl sm:text-[2.6rem]">
            Where buyers are looking in Pune
          </h2>
          <p className="mt-4 text-lg text-slate">
            Ask about prices, upcoming projects and resale availability in any micro-market.
          </p>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area) => (
            <li key={area.name} className="reveal bg-white">
              <a
                href={enquiryHref({ area: area.name, pagePath: "/" })}
                target="_blank"
                rel="noopener"
                data-testid="area-card"
                className="group flex h-full flex-col justify-between gap-8 p-7 transition-colors hover:bg-paper"
              >
                <div>
                  <h3 className="text-2xl">{area.name}</h3>
                  <p className="mt-3 text-[0.95rem] text-slate">{area.note}</p>
                </div>
                <span className="text-sm font-semibold text-forest group-hover:underline">Ask about {area.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
