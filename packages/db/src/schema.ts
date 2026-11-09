import { boolean, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const SERVICE_SLUGS = ["new-projects", "ready-to-move", "resale", "commercial"] as const;
export const FORM_TYPES = ["quick", "consultation", "calculator"] as const;
export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;

export const serviceEnum = pgEnum("service", SERVICE_SLUGS);
export const formTypeEnum = pgEnum("form_type", FORM_TYPES);
export const leadStatusEnum = pgEnum("lead_status", LEAD_STATUSES);

/** One row per enquiry. Viewed and exported from the Neon console in Phase 1. */
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  name: text("name").notNull(),
  /** Normalised to +91XXXXXXXXXX. */
  phone: text("phone").notNull(),
  email: text("email"),
  service: serviceEnum("service"),
  area: text("area"),
  budgetRange: text("budget_range"),
  timeline: text("timeline"),
  message: text("message"),
  formType: formTypeEnum("form_type").notNull(),
  sourcePage: text("source_page").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  gclid: text("gclid"),
  referrer: text("referrer"),
  landingPage: text("landing_page"),
  consentGiven: boolean("consent_given").notNull(),
  consentVersion: text("consent_version").notNull(),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
  status: leadStatusEnum("status").notNull().default("new"),
  notes: text("notes"),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
