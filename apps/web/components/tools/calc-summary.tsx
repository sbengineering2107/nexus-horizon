"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { whatsappHref } from "@/lib/contact-links";
import { siteConfig } from "@/site.config";

type Ctx = { summary: string; setSummary: (s: string) => void; formEnabled: boolean };
const SummaryContext = createContext<Ctx | null>(null);

/** Lets a calculator share its current result text with the enquiry form below it. */
export function CalcSummaryProvider({ children, formEnabled = false }: { children: React.ReactNode; formEnabled?: boolean }) {
  const [summary, setSummary] = useState("");
  return <SummaryContext.Provider value={{ summary, setSummary, formEnabled }}>{children}</SummaryContext.Provider>;
}

/** Called by calculators with the same text they send to WhatsApp. No-op without a provider. */
export function usePublishSummary(text: string) {
  const ctx = useContext(SummaryContext);
  const set = ctx?.setSummary;
  useEffect(() => {
    set?.(text);
  }, [set, text]);
}

export function useCalcSummary(): string {
  return useContext(SummaryContext)?.summary ?? "";
}

const ctaClass =
  "mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 font-semibold text-paper transition-colors hover:bg-navy-deep";

/**
 * "Talk to an expert" under a calculator result: jumps to the enquiry form below when lead
 * forms are on (focusing its first field), otherwise opens WhatsApp with the result.
 */
export function ExpertLink({ message }: { message: string }) {
  const formEnabled = useContext(SummaryContext)?.formEnabled ?? false;
  if (!formEnabled) {
    return (
      <a href={whatsappHref(siteConfig.whatsapp, message)} target="_blank" rel="noopener" className={ctaClass}>
        Talk to an expert
      </a>
    );
  }
  return (
    <a
      href="#calc-lead"
      className={ctaClass}
      onClick={(e) => {
        const section = document.getElementById("calc-lead-section");
        if (!section) return;
        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        section.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
        history.replaceState(null, "", "#calc-lead");
      }}
    >
      Talk to an expert
    </a>
  );
}
