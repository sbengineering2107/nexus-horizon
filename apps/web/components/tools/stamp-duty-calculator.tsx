"use client";

import { useState } from "react";
import { calculateStampDuty, type Buyer } from "@/lib/calculators/stamp-duty";
import { formatInr, formatInrShort } from "@/lib/format";
import { whatsappHref } from "@/lib/contact-links";
import { siteConfig } from "@/site.config";
import { NumberField } from "./number-field";

const BUYERS: { value: Buyer; label: string }[] = [
  { value: "man-or-joint", label: "Man, or joint owners" },
  { value: "woman-sole", label: "Woman, sole owner" },
];

export function StampDutyCalculator() {
  const [agreement, setAgreement] = useState(8_000_000);
  const [readyReckoner, setReadyReckoner] = useState(0);
  const [buyer, setBuyer] = useState<Buyer>("man-or-joint");
  const result = calculateStampDuty({ agreementValue: agreement, readyReckonerValue: readyReckoner, buyer });

  const message = result
    ? `Hi Nexus Horizon, I used your stamp duty calculator for a ${formatInr(result.dutiableValue)} property in Pune: estimated stamp duty and registration ${formatInr(result.total)}. I'd like help with the purchase.`
    : "Hi Nexus Horizon, I have a question about stamp duty in Pune.";

  return (
    <div className="grid gap-8 rounded-lg border border-mist-strong bg-white p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div className="space-y-7">
        <NumberField label="Agreement value (₹)" value={agreement} onChange={setAgreement} min={1_000_000} max={50_000_000} step={100_000} display={formatInrShort(agreement)} />
        <NumberField
          label="Ready reckoner value (₹, optional)"
          value={readyReckoner}
          onChange={setReadyReckoner}
          min={0}
          max={50_000_000}
          step={100_000}
          slider={false}
          optional
        />
        <fieldset>
          <legend className="font-semibold text-basalt">Buyer</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {BUYERS.map((b) => (
              <label
                key={b.value}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-mist-strong px-4 py-3 has-[:checked]:border-navy has-[:checked]:bg-mist/60"
              >
                <input
                  type="radio"
                  name="buyer"
                  value={b.value}
                  checked={buyer === b.value}
                  onChange={() => setBuyer(b.value)}
                  className="accent-[var(--color-navy)]"
                />
                {b.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div aria-live="polite" className="flex flex-col justify-between rounded-md bg-paper p-6">
        {result ? (
          <>
            <div>
              <p className="text-sm text-slate">Stamp duty + registration</p>
              <p data-testid="duty-total" className="mt-1 font-display text-4xl tabular-nums text-navy-deep sm:text-5xl">
                {formatInr(result.total)}
              </p>
              <p className="mt-2 text-sm text-slate">
                Calculated on {formatInr(result.dutiableValue)}
                {readyReckoner > agreement ? " (ready reckoner value, as it is higher)" : ""}
              </p>
            </div>
            <dl className="mt-6 space-y-3 border-t border-mist-strong pt-5 text-[0.95rem]">
              {result.breakdown.map((b) => (
                <div key={b.label} className="flex justify-between gap-4">
                  <dt className="text-slate">
                    {b.label} ({b.ratePct}%)
                  </dt>
                  <dd className="tabular-nums">{formatInr(b.amount)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 font-semibold">
                <dt>Stamp duty ({result.stampDutyRatePct}%)</dt>
                <dd data-testid="duty-stamp" className="tabular-nums">{formatInr(result.stampDuty)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate">Registration fee (1%, max ₹30,000)</dt>
                <dd className="tabular-nums">{formatInr(result.registrationFee)}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="text-slate">Enter the agreement value to see the estimate.</p>
        )}
        <a
          href={whatsappHref(siteConfig.whatsapp, message)}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 font-semibold text-paper transition-colors hover:bg-navy-deep"
        >
          Talk to an expert
        </a>
      </div>
    </div>
  );
}
