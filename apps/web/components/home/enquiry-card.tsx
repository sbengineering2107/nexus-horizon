"use client";

import { useState } from "react";
import { enquiryHref } from "@/lib/enquiry";

type Option = { slug: string; title: string };

/** Glass card over the hero: pick a service, continue on WhatsApp with it pre-filled. */
export function EnquiryCard({ services }: { services: Option[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = services.find((s) => s.slug === selected);
  return (
    <div className="hero-rise rounded-lg border border-paper/20 bg-paper/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl [animation-delay:150ms] sm:p-7">
      <h2 className="font-sans text-lg font-semibold text-paper">What are you looking for?</h2>
      <div role="group" aria-label="Choose a service" className="mt-4 flex flex-wrap gap-2">
        {services.map((s) => {
          const active = s.slug === selected;
          return (
            <button
              key={s.slug}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(active ? null : s.slug)}
              className={`rounded-full border px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                active
                  ? "border-marigold bg-marigold text-basalt"
                  : "border-paper/30 bg-paper/5 text-paper hover:border-paper/60 hover:bg-paper/15"
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>
      <a
        data-testid="hero-enquiry"
        href={enquiryHref({ service: chosen?.title, pagePath: "/" })}
        target="_blank"
        rel="noopener"
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-marigold px-5 font-semibold text-basalt transition-colors hover:bg-marigold-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
      >
        {chosen ? `Get advice on ${chosen.title.toLowerCase()}` : "Book a free consultation"}
      </a>
      <p className="mt-3 text-center text-sm text-mist/80">Opens WhatsApp with your choice filled in.</p>
    </div>
  );
}
