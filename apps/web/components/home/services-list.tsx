import Link from "next/link";
import { Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";

export function ServicesList() {
  const services = getServices();
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <h2 id="services-heading" className="max-w-2xl text-3xl sm:text-4xl">
          Four ways we help you buy, sell or lease
        </h2>
        <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="border-t border-mist-strong py-7">
              <h3 className="text-2xl">
                <Link href={`/services/${s.slug}`} className="hover:text-forest hover:underline">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-[60ch] text-slate">{s.summary}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
