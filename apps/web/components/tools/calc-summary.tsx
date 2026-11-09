"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { summary: string; setSummary: (s: string) => void };
const SummaryContext = createContext<Ctx | null>(null);

/** Lets a calculator share its current result text with the enquiry form below it. */
export function CalcSummaryProvider({ children }: { children: React.ReactNode }) {
  const [summary, setSummary] = useState("");
  return <SummaryContext.Provider value={{ summary, setSummary }}>{children}</SummaryContext.Provider>;
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
