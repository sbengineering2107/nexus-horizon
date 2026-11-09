import { z } from "zod";
import { FORM_TYPES, SERVICE_SLUGS } from "@nh/db/constants";
import { BUDGETS, TIMELINES } from "./options";

/** Indian mobile number → +91XXXXXXXXXX, or null if it isn't one. */
export function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("091")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

/** Empty or whitespace-only strings count as "not given". */
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : typeof v === "string" ? v.trim() : v), schema.optional());

const values = <T extends readonly { value: string }[]>(list: T) => list.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

/** Shared by every lead form; the server action re-validates with it. */
export const leadSchema = z.object({
  name: z
    .string({ error: "Please enter your name" })
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Please keep the name under 80 characters"),
  phone: z
    .string({ error: "Please enter a 10-digit mobile number" })
    .transform((v, ctx) => {
      const p = normalisePhone(v);
      if (!p) ctx.addIssue({ code: "custom", message: "Please enter a 10-digit Indian mobile number" });
      return p ?? "";
    }),
  email: optional(z.email("Please check the email address").max(120)),
  service: optional(z.enum(SERVICE_SLUGS, "Please choose a service from the list")),
  area: optional(z.string().max(60)),
  budgetRange: optional(z.enum(values(BUDGETS), "Please choose a budget from the list")),
  timeline: optional(z.enum(values(TIMELINES), "Please choose a timeline from the list")),
  message: optional(z.string().max(2000, "Please keep the message under 2,000 characters")),
  formType: z.enum(FORM_TYPES),
  sourcePage: z.string().regex(/^\/[\w\-/]*$/).max(200),
  consent: z.literal(["on", "true", true], { error: "Please agree so we can contact you" }),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
