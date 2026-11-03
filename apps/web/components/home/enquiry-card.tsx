"use client";

import { useState } from "react";
import { enquiryHref } from "@/lib/enquiry";

type Option = { slug: string; title: string };

/** Inline service picker under the hero copy: choose a service, continue on WhatsApp with it pre-filled. */
export function EnquiryCard({ services }: { services: Option[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = services.find((s) => s.slug === selected);
  return (
    <div>
      <p id="enquiry-label" className="font-semibold text-basalt">
        What are you looking for?
      </p>
      <div role="group" aria-labelledby="enquiry-label" className="mt-3 flex flex-wrap gap-2">
        {services.map((s) => {
          const active = s.slug === selected;
          return (
            <button
              key={s.slug}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(active ? null : s.slug)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                active ? "border-navy bg-navy text-paper" : "border-line bg-white text-basalt hover:border-navy/50"
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
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-navy px-6 sm:w-auto font-semibold text-paper transition-colors hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        {chosen ? `Get advice on ${chosen.title.toLowerCase()}` : "Book a free consultation"}
      </a>
    </div>
  );
}
