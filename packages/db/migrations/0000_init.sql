CREATE TYPE "public"."form_type" AS ENUM('quick', 'consultation', 'calculator');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."service" AS ENUM('new-projects', 'ready-to-move', 'resale', 'commercial');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"service" "service",
	"area" text,
	"budget_range" text,
	"timeline" text,
	"message" text,
	"form_type" "form_type" NOT NULL,
	"source_page" text NOT NULL,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_term" text,
	"utm_content" text,
	"gclid" text,
	"referrer" text,
	"landing_page" text,
	"consent_given" boolean NOT NULL,
	"consent_version" text NOT NULL,
	"consent_at" timestamp with time zone NOT NULL,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"notes" text
);
