export type EligibilityInput = {
  monthlyIncome: number;
  existingEmis: number;
  /** Share of income lenders allow for all EMIs combined (FOIR), in percent. */
  foirPct: number;
  annualRatePct: number;
  years: number;
};
export type EligibilityResult = { affordableEmi: number; maxLoan: number };

/** Largest loan whose EMI fits in (income × FOIR − existing EMIs). An estimate: lenders also weigh age, credit score and employer. */
export function calculateEligibility({ monthlyIncome, existingEmis, foirPct, annualRatePct, years }: EligibilityInput): EligibilityResult | null {
  if (!(monthlyIncome > 0) || !(existingEmis >= 0) || !(foirPct > 0 && foirPct <= 100) || !(annualRatePct >= 0) || !(years > 0)) {
    return null;
  }
  const affordableEmi = Math.max(0, Math.round((monthlyIncome * foirPct) / 100 - existingEmis));
  if (affordableEmi === 0) return { affordableEmi: 0, maxLoan: 0 };
  const n = Math.round(years * 12);
  const r = annualRatePct / 12 / 100;
  const maxLoan = r === 0 ? affordableEmi * n : (affordableEmi * ((1 + r) ** n - 1)) / (r * (1 + r) ** n);
  return { affordableEmi, maxLoan: Math.round(maxLoan) };
}
