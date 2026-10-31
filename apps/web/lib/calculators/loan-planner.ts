import { rawEmi } from "./emi";

export type LoanPlanInput = { propertyPrice: number; downPaymentPct: number; annualRatePct: number; years: number };
export type LoanYear = { year: number; interest: number; principal: number; balance: number };
export type LoanPlan = { downPayment: number; loanAmount: number; emi: number; totalInterest: number; schedule: LoanYear[] };

/** Property price → down payment, loan, EMI and a year-by-year amortisation schedule. */
export function planHomeLoan({ propertyPrice, downPaymentPct, annualRatePct, years }: LoanPlanInput): LoanPlan | null {
  if (!(propertyPrice > 0) || !(downPaymentPct >= 0 && downPaymentPct < 100) || !(annualRatePct >= 0) || !(years > 0)) {
    return null;
  }
  const downPayment = Math.round((propertyPrice * downPaymentPct) / 100);
  const loanAmount = propertyPrice - downPayment;
  const months = Math.round(years * 12);
  const emi = rawEmi(loanAmount, annualRatePct, months);
  const r = annualRatePct / 12 / 100;

  const schedule: LoanYear[] = [];
  let balance = loanAmount;
  let totalInterest = 0;
  for (let y = 0; y * 12 < months; y++) {
    let interest = 0;
    let principal = 0;
    for (let m = 0; m < 12 && y * 12 + m < months; m++) {
      const i = balance * r;
      interest += i;
      principal += emi - i;
      balance -= emi - i;
    }
    totalInterest += interest;
    schedule.push({
      year: y + 1,
      interest: Math.round(interest),
      principal: Math.round(principal),
      balance: Math.max(0, Math.round(balance)),
    });
  }
  return { downPayment, loanAmount, emi: Math.round(emi), totalInterest: Math.round(totalInterest), schedule };
}
