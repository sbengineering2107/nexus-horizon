/**
 * Maharashtra stamp duty and registration for property in Pune municipal areas (PMC / PCMC).
 * Rates change by government notification: update PUNE_RATES and its lastVerified date together.
 */
export const PUNE_RATES = {
  lastVerified: "2026-10-31",
  sources: [
    "https://www.godrejcapital.com/media-blog/knowledge-centre/stamp-duty-and-registration-charges-in-maharashtra",
    "https://www.bajajfinserv.in/stamp-duty-and-property-registration-charges-pune",
  ],
  official: "https://igrmaharashtra.gov.in",
  /** Percent of the dutiable value. Women buying in their sole name get 1% off the base rate. */
  duty: {
    "man-or-joint": { base: 5, metroCess: 1, localBodyTax: 1 },
    "woman-sole": { base: 4, metroCess: 1, localBodyTax: 1 },
  },
  registration: { ratePct: 1, capRupees: 30_000 },
} as const;

export type Buyer = keyof typeof PUNE_RATES.duty;

export type StampDutyInput = { agreementValue: number; readyReckonerValue?: number; buyer: Buyer };

export type StampDutyResult = {
  dutiableValue: number;
  stampDutyRatePct: number;
  stampDuty: number;
  registrationFee: number;
  total: number;
  breakdown: { label: string; ratePct: number; amount: number }[];
};

const pct = (value: number, ratePct: number) => Math.round((value * ratePct) / 100);

export function calculateStampDuty({ agreementValue, readyReckonerValue, buyer }: StampDutyInput): StampDutyResult | null {
  if (!(agreementValue > 0)) return null;
  const rr = readyReckonerValue && readyReckonerValue > 0 ? readyReckonerValue : 0;
  const dutiableValue = Math.max(agreementValue, rr);
  const r = PUNE_RATES.duty[buyer];
  const breakdown = [
    { label: "Base stamp duty", ratePct: r.base, amount: pct(dutiableValue, r.base) },
    { label: "Metro cess", ratePct: r.metroCess, amount: pct(dutiableValue, r.metroCess) },
    { label: "Local body tax", ratePct: r.localBodyTax, amount: pct(dutiableValue, r.localBodyTax) },
  ];
  const stampDuty = breakdown.reduce((sum, b) => sum + b.amount, 0);
  const registrationFee = Math.min(pct(dutiableValue, PUNE_RATES.registration.ratePct), PUNE_RATES.registration.capRupees);
  return {
    dutiableValue,
    stampDutyRatePct: r.base + r.metroCess + r.localBodyTax,
    stampDuty,
    registrationFee,
    total: stampDuty + registrationFee,
    breakdown,
  };
}
