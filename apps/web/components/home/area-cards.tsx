import { Container } from "@nh/ui";
import { AREAS, enquiryHref } from "@/lib/enquiry";

export function AreaCards() {
  return (
    <section aria-labelledby="areas-heading" className="bg-forest-deep py-16 text-paper sm:py-24">
      <Container>
        <div className="reveal max-w-2xl">
          <h2 id="areas-heading" className="text-3xl text-paper sm:text-5xl">
            Where buyers are looking in Pune
          </h2>
          <p className="mt-4 text-lg text-mist/85">
            Ask us about prices, upcoming projects and resale availability in any micro-market.
          </p>
        </div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] lg:grid lg:grid-cols-4 lg:overflow-visible">
          {AREAS.map((area) => (
            <li key={area.name} className="reveal w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <a
                href={enquiryHref({ area: area.name, pagePath: "/" })}
                target="_blank"
                rel="noopener"
                data-testid="area-card"
                className="group flex h-full flex-col justify-between gap-8 rounded-lg border border-paper/15 bg-paper/5 p-6 transition-colors hover:border-marigold/70 hover:bg-paper/10"
              >
                <div>
                  <h3 className="text-3xl text-paper">{area.name}</h3>
                  <p className="mt-3 text-mist/85">{area.note}</p>
                </div>
                <span className="font-semibold text-marigold group-hover:underline">Ask about {area.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
