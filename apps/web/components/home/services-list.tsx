import Image from "next/image";
import Link from "next/link";
import { Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";
import { serviceImages } from "@/lib/images";

export function ServicesList() {
  const services = getServices();
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="services-heading" className="text-3xl sm:text-[2.8rem]">
              Advice for every way of buying in Pune
            </h2>
            <p className="mt-4 text-lg text-slate">
              New launches, homes you can move into now, resale flats and space for your business, each with its own
              checks and negotiations.
            </p>
          </div>
          <Link href="/services" className="font-semibold text-forest underline-offset-4 hover:underline">
            Compare all services
          </Link>
        </div>
        <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {services.map((s) => {
            const img = serviceImages[s.slug];
            return (
              <li key={s.slug} className="reveal">
                <Link href={`/services/${s.slug}`} className="group block focus-visible:outline-offset-4">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-mist">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      quality={75}
                      placeholder="blur"
                      className="fx-card-parallax object-cover"
                      data-fx="card-parallax"
                    />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl group-hover:text-forest sm:text-[1.75rem]">{s.title}</h3>
                      <p className="mt-3 max-w-[52ch] text-slate">{s.summary}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-forest transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-white"
                    >
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
