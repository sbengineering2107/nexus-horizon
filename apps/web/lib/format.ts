const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** ₹12,34,567 (Indian digit grouping). */
export function formatInr(value: number): string {
  return inr.format(Math.round(value));
}

/** Short form for slider labels: ₹45 L, ₹1.2 Cr. */
export function formatInrShort(value: number): string {
  if (value >= 1e7) return `₹${+(value / 1e7).toFixed(2)} Cr`;
  if (value >= 1e5) return `₹${+(value / 1e5).toFixed(1)} L`;
  return formatInr(value);
}
