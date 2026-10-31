import { Container } from "@nh/ui";
import testimonials from "@/content/home/testimonials.json";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const items = testimonials.slice(0, 3);
  return (
    <section aria-labelledby="testimonials-heading" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container>
        <div className="reveal max-w-2xl">
          <h2 id="testimonials-heading" className="text-3xl sm:text-[2.6rem]">
            What clients say
          </h2>
        </div>
        <ul className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {items.map((t, i) => (
            <li key={i} className="reveal w-[85%] shrink-0 snap-start md:w-auto">
              <figure className="flex h-full flex-col justify-between rounded-lg border border-line bg-white p-7">
                <blockquote className="text-lg leading-relaxed text-basalt">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-sm font-semibold text-forest-deep">
                    {initials(t.name)}
                  </span>
                  <span className="text-sm text-slate">
                    <span className="block font-semibold text-basalt">{t.name}</span>
                    {t.detail}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
