import { Container } from "@nh/ui";
import testimonials from "@/content/home/testimonials.json";
import { CarouselControls } from "./carousel-controls";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-mist py-16 sm:py-24">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <h2 id="testimonials-heading" className="text-3xl sm:text-5xl">
            What clients say
          </h2>
          <CarouselControls target="testimonial-track" />
        </div>
        <ul
          id="testimonial-track"
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <li key={i} className="w-[88%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-2.5rem)/3)]">
              <figure className="flex h-full flex-col justify-between rounded-lg bg-paper p-7 shadow-sm">
                <blockquote className="font-display text-xl leading-snug text-forest-deep">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-forest font-semibold text-paper">
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
