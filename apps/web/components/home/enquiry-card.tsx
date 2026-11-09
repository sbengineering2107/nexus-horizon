"use client";

import { useState } from "react";
import Link from "next/link";
import { enquiryHref } from "@/lib/enquiry";
import type { ServiceSlug } from "@/lib/content/services";

type Option = { slug: ServiceSlug; title: string };

const ctaClass =
  "mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-navy px-6 font-semibold text-paper transition-colors hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:w-auto";

/**
 * Inline service picker under the hero copy. With lead forms on it opens the contact form with
 * the service pre-selected; otherwise it continues on WhatsApp with the service pre-filled.
 */
export function EnquiryCard({ services, formsEnabled = false }: { services: Option[]; formsEnabled?: boolean }) {
  const [selected, setSelected] = useState<ServiceSlug | null>(null);
  const chosen = services.find((s) => s.slug === selected);
  const label = chosen ? `Get advice on ${chosen.title.toLowerCase()}` : "Book a free consultation";
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
      {formsEnabled ? (
        <Link data-testid="hero-enquiry" href={chosen ? `/contact?service=${chosen.slug}` : "/contact"} className={ctaClass}>
          {label}
        </Link>
      ) : (
        <a data-testid="hero-enquiry" href={enquiryHref(chosen?.slug)} target="_blank" rel="noopener" className={ctaClass}>
          {label}
        </a>
      )}
    </div>
  );
}
