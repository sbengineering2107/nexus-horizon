import { Container } from "@nh/ui";

const ICONS = {
  brief: (
    <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 4v-4h0A2 2 0 0 1 5 13Zm4 3h6M9 12h3.5" />
  ),
  shortlist: (
    <path d="M9 5h9M9 12h9M9 19h9M4.5 5.5l1 1 2-2M4.5 12.5l1 1 2-2M4.5 19.5l1 1 2-2" />
  ),
  visit: (
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  ),
  close: (
    <path d="M14.5 9.5a4.5 4.5 0 1 1-4.5-4.5 4.5 4.5 0 0 1 4.5 4.5Zm-1.3 3.2L20 19.5M17.5 17l2-2M15.5 15l1.5-1.5" />
  ),
};

const STEPS: { title: string; text: string; icon: keyof typeof ICONS }[] = [
  { title: "Tell us your brief", text: "Budget, preferred areas, configuration and when you want to move.", icon: "brief" },
  { title: "Get a shortlist", text: "Three to five options that genuinely fit, each with honest pros and cons.", icon: "shortlist" },
  { title: "Visit together", text: "Accompanied site visits, planned so you see your shortlist in one day.", icon: "visit" },
  { title: "Decide and close", text: "Negotiation, document checks, booking and registration support.", icon: "close" },
];

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container>
        <div className="reveal max-w-2xl">
          <h2 id="process-heading" className="text-3xl sm:text-[2.6rem]">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate">Four steps from first call to the keys in your hand.</p>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} data-testid="step-card" className="reveal relative">
              <div className="relative h-full overflow-hidden rounded-lg border border-line bg-white p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-3 text-[5.5rem] leading-none font-semibold tabular-nums text-forest/[0.07]"
                >
                  {i + 1}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-forest">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[step.icon]}
                  </svg>
                </span>
                <p className="mt-6 text-sm font-semibold text-forest">Step {i + 1}</p>
                <h3 className="mt-1 text-xl">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-slate">{step.text}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-[1.35rem] z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-forest lg:flex"
                >
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
