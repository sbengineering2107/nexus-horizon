import { leadSchema, normalisePhone } from "./schema";

export type FieldName = keyof typeof leadSchema.shape;

/** First error message for one field, using the server's own schema; undefined when valid. */
export function validateField(name: FieldName, value: unknown): string | undefined {
  const field = leadSchema.shape[name];
  const r = field.safeParse(value);
  if (r.success) return undefined;
  return r.error.issues[0]?.message;
}

/** Errors for the given fields, keyed in the order given (for focusing the first one). */
export function validateFields(values: Record<string, unknown>, names: readonly FieldName[]): Partial<Record<FieldName, string>> {
  const out: Partial<Record<FieldName, string>> = {};
  for (const n of names) {
    const msg = validateField(n, values[n]);
    if (msg) out[n] = msg;
  }
  return out;
}

/** "+91 98765 43210" for a valid Indian mobile, else null. */
export function formatPhone(raw: string): string | null {
  const p = normalisePhone(raw);
  return p ? `+91 ${p.slice(3, 8)} ${p.slice(8)}` : null;
}
