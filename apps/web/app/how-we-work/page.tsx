import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { STEPS, type Faq } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { CtaBand } from "@/components/shared/cta-band";
import { StepIllustration } from "@/components/home/step-illustrations";

export const metadata: Metadata = buildMetadata({
  title: "How We Work: From Brief to Registration",
  description:
    "How Nexus Horizon Advisors works with Pune property buyers: brief, verified shortlist, accompanied site visits, then negotiation, documents and registration.",
  path: "/how-we-work",
});

const FAQS: Faq[] = [
  {
    q: "Do I have to buy through you after a consultation?",
    a: "No. Consultations are always free and carry no obligation. Many people use the first conversation just to understand their budget and options.",
  },
  {
    q: "How are fees agreed?",
    a: "There is nothing to pay for a consultation. If a fee applies to a transaction, we agree it with you in writing before we start work on it.",
  },
  {
    q: "Do you replace my lawyer?",
    a: "No. We check the documents a buyer should see and flag what needs attention, but for title opinions and agreements you should use your own lawyer. We work alongside them.",
  },
  {
    q: "How long does it take to get a shortlist?",
    a: "It depends on how specific the brief is and how much is available in your areas. We share options as soon as they pass our checks rather than waiting to send a long list.",
  },
];

const CHECKS = [
  "MahaRERA registration, completion date and quarterly progress for new projects",
  "Occupancy and completion certificates for ready homes",
  "Title chain, society papers, dues and loan closure for resale flats",
  "Permitted commercial use, lease terms and fire compliance for offices",
  "The full cost: stamp duty, registration, GST, parking, deposits and loan charges",
];

export default function HowWeWorkPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <Container className="pt-10 pb-14 sm:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "How we work", path: "/how-we-work" }]} />
          <h1 className="mt-8 max-w-3xl text-4xl sm:text-[3.2rem]">How we work</h1>
          <p className="mt-5 max-w-[62ch] text-lg text-slate">
            Four steps from your first message to registration. Consultations are always free, and you decide at every
            step whether to go further.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <ol aria-label="Steps" className="space-y-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-6 rounded-lg border border-line bg-white p-6 sm:grid-cols-[11rem_1fr] sm:p-8">
              <div className="flex h-32 items-center justify-center rounded-md bg-paper sm:h-full">
                <StepIllustration kind={s.icon} className="h-28 w-36" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Step {i + 1}</p>
                <h2 className="mt-1 text-2xl sm:text-3xl">{s.title}</h2>
                <p className="mt-2 text-lg text-slate">{s.summary}</p>
                <ul className="mt-4 space-y-2 text-basalt">
                  {s.youGet.map((g) => (
                    <li key={g} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="checks" className="rounded-lg bg-mist/60 p-7">
            <h2 id="checks" className="text-2xl">
              What we check before recommending
            </h2>
            <ul className="mt-4 space-y-2.5 text-basalt">
              {CHECKS.map((c) => (
                <li key={c} className="flex gap-3">
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="cost" className="rounded-lg border border-line bg-white p-7">
            <h2 id="cost" className="text-2xl">
              What it costs you
            </h2>
            <p className="mt-4 text-basalt">
              Consultations are always free. If a fee applies to a transaction, we agree it with you in writing before we
              start work on it, so there are no surprises later.
            </p>
            <p className="mt-4 text-slate">
              Want the numbers first? Use our{" "}
              <Link href="/calculators" className="font-semibold text-navy underline-offset-4 hover:underline">
                home loan and stamp duty calculators
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 max-w-[68ch]">
          <FaqList faqs={FAQS} />
        </div>
      </Container>
      <CtaBand
        pagePath="/how-we-work"
        heading="Start with step one"
        text="Tell us your budget, areas and timeline. We'll come back with what fits."
      />
    </>
  );
}
