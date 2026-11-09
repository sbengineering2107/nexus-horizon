/** Fixed choices for the consultation form. Values are stored; labels are shown. */
export const BUDGETS = [
  { value: "under-50l", label: "Under ₹50 lakh" },
  { value: "50l-1cr", label: "₹50 lakh – ₹1 crore" },
  { value: "1cr-2cr", label: "₹1 – 2 crore" },
  { value: "above-2cr", label: "Above ₹2 crore" },
] as const;

export const TIMELINES = [
  { value: "now", label: "Ready to buy now" },
  { value: "3-months", label: "Within 3 months" },
  { value: "6-months", label: "Within 6 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export type BudgetValue = (typeof BUDGETS)[number]["value"];
export type TimelineValue = (typeof TIMELINES)[number]["value"];
