"use client";

import { useCalcSummary } from "@/components/tools/calc-summary";
import { LeadForm } from "./lead-form";

/** Enquiry form under a calculator; sends the current result along as the message. */
export function CalculatorLeadForm({ sourcePage }: { sourcePage: string }) {
  const summary = useCalcSummary();
  return <LeadForm formType="calculator" sourcePage={sourcePage} message={summary} submitLabel="Ask an advisor to check this" />;
}
