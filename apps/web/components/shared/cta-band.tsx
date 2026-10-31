import { Button, Container } from "@nh/ui";
import { callHref, consultationHref } from "@/lib/cta";

export function CtaBand({ pagePath, heading, text }: { pagePath: string; heading: string; text: string }) {
  return (
    <section className="bg-forest text-paper">
      <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl text-paper sm:text-4xl">{heading}</h2>
          <p className="mt-3 text-mist/90">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <a href={consultationHref(pagePath)} target="_blank" rel="noopener">
              Book a free consultation
            </a>
          </Button>
          <Button asChild variant="ghost" className="text-paper">
            <a href={callHref}>Call us</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
