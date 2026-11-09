import { Button, Container } from "@nh/ui";
import Link from "next/link";
import { callHref, consultationHref } from "@/lib/cta";
import { leadsEnabled } from "@/lib/leads/store";

export function CtaBand({ pagePath, heading, text }: { pagePath: string; heading: string; text: string }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 rounded-lg border border-line bg-mist/50 px-7 py-10 sm:px-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl">{heading}</h2>
            <p className="mt-3 text-slate">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              {leadsEnabled() ? (
                <Link href="/contact">Book a free consultation</Link>
              ) : (
                <a href={consultationHref(pagePath)} target="_blank" rel="noopener">
                  Book a free consultation
                </a>
              )}
            </Button>
            <Button asChild variant="secondary">
              <a href={callHref}>Call us</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
