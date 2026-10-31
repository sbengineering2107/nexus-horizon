import { rawEmi } from "./emi";

export type TransferInput = {
  outstanding: number;
  currentRatePct: number;
  newRatePct: number;
  yearsLeft: number;
  /** Processing, legal and other one-time costs of switching. */
  transferCharges: number;
};
export type TransferResult = {
  currentEmi: number;
  newEmi: number;
  interestSaved: number;
  netSaving: number;
  worthIt: boolean;
};

/** Compares keeping the current loan with moving the outstanding balance to a new rate for the same remaining tenure. */
export function compareLoanTransfer({ outstanding, currentRatePct, newRatePct, yearsLeft, transferCharges }: TransferInput): TransferResult | null {
  if (!(outstanding > 0) || !(currentRatePct >= 0) || !(newRatePct >= 0) || !(yearsLeft > 0) || !(transferCharges >= 0)) {
    return null;
  }
  const n = Math.round(yearsLeft * 12);
  const current = rawEmi(outstanding, currentRatePct, n);
  const next = rawEmi(outstanding, newRatePct, n);
  const interestSaved = Math.round((current - next) * n);
  const netSaving = interestSaved - Math.round(transferCharges);
  return { currentEmi: Math.round(current), newEmi: Math.round(next), interestSaved, netSaving, worthIt: netSaving > 0 };
}
