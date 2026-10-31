import { Container } from "@nh/ui";
import testimonials from "@/content/home/testimonials.json";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="border-t border-mist-strong py-16 sm:py-24">
      <Container>
        <h2 id="testimonials-heading" className="text-3xl sm:text-4xl">
          What clients say
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i}>
              <blockquote className="font-display text-xl leading-snug text-forest-deep">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-slate">
                <span className="font-semibold text-basalt">{t.name}</span>, {t.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
