import * as z from "zod/mini";
import { FORM_TYPES, SERVICE_SLUGS } from "@nh/db/constants";
import { BUDGETS, TIMELINES } from "./options";

/*
 * Lead form rules, shared by the browser (live checks) and the server (final check).
 * Uses zod/mini: same rules and messages as full zod at a fraction of the bundle size.
 */

/** Indian mobile number → +91XXXXXXXXXX, or null if it isn't one. */
export function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("091")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

/** Empty or whitespace-only strings count as "not given"; other strings are trimmed. */
const optional = <T extends z.ZodMiniType>(schema: T) =>
  z.pipe(
    z.transform((v: unknown) => (typeof v === "string" ? (v.trim() === "" ? undefined : v.trim()) : v)),
    z.optional(schema),
  );

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const NAME = "Please enter your name";
const PHONE = "Please enter a 10-digit Indian mobile number";

export const leadSchema = z.object({
  name: z
    .string({ error: NAME })
    .check(z.trim(), z.minLength(2, NAME), z.maxLength(80, "Please keep the name under 80 characters")),
  phone: z.pipe(
    z.string({ error: PHONE }),
    z.transform((v, ctx) => {
      const p = normalisePhone(v);
      if (!p) ctx.issues.push({ code: "custom", message: PHONE, input: v });
      return p ?? "";
    }),
  ),
  email: optional(z.email("Please check the email address").check(z.maxLength(120))),
  service: optional(z.enum(SERVICE_SLUGS, "Please choose a service from the list")),
  area: optional(z.string().check(z.maxLength(60))),
  budgetRange: optional(z.enum(values(BUDGETS), "Please choose a budget from the list")),
  timeline: optional(z.enum(values(TIMELINES), "Please choose a timeline from the list")),
  message: optional(z.string().check(z.maxLength(2000, "Please keep the message under 2,000 characters"))),
  formType: z.enum(FORM_TYPES),
  sourcePage: z.string().check(z.regex(/^\/[\w\-/]*$/), z.maxLength(200)),
  consent: z.literal(["on", "true", true], { error: "Please agree so we can contact you" }),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
