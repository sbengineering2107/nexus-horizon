"use client";

import { startTransition, useActionState, useEffect, useId, useRef } from "react";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { CONSENT_TEXT } from "@/lib/leads/submit-text";
import { BUDGETS, TIMELINES } from "@/lib/leads/options";
import { callHref } from "@/lib/contact-links-client";
import { usePageWhatsApp } from "@/components/contact/page-messages";
import type { FormType } from "@/lib/leads/submit-text";

type Option = { value: string; label: string };

type Props = {
  formType: FormType;
  sourcePage: string;
  /** Pre-selected service; when set, the service field is hidden. */
  service?: string;
  services?: Option[];
  areas?: Option[];
  /** Calculator summary sent as the message (calculator form). */
  message?: string;
  submitLabel?: string;
  /** Compact layout for asides. */
  compact?: boolean;
};

const inputClass =
  "mt-1.5 w-full rounded-md border border-mist-strong bg-white px-3.5 py-2.5 text-base text-basalt placeholder:text-slate/70 focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-navy aria-[invalid=true]:border-red-700";

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="text-[0.95rem] font-semibold text-basalt">
        {label}
        {optional && <span className="font-normal text-slate"> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? errId : undefined })}
      {error && (
        <p id={errId} data-field-error={name} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * One form for every lead entry point. Uses native validation first, then the server
 * re-validates; on a database problem it offers WhatsApp and call instead.
 */
export function LeadForm({ formType, sourcePage, service, services, areas, message, submitLabel, compact }: Props) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const { chat } = usePageWhatsApp();
  const errors = state.status === "invalid" ? state.errors : {};
  const full = formType === "consultation";
  const formRef = useRef<HTMLFormElement>(null);

  // After a server-side rejection, move focus to the first field with an error.
  useEffect(() => {
    if (state.status !== "invalid") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  // Submit through a transition instead of the form action, so React keeps what the visitor
  // typed when the server sends errors back. Without JavaScript the form posts normally.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };
  const errorCount = Object.keys(errors).length;

  if (state.status === "failed") {
    return (
      <div role="alert" data-testid="lead-failed" className="rounded-md border border-gold/50 bg-white p-5">
        <p className="font-semibold text-basalt">We couldn&apos;t submit the form just now.</p>
        <p className="mt-1 text-slate">Please reach us directly and we&apos;ll pick it up from there.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={chat} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-md bg-navy px-5 font-semibold text-paper hover:bg-navy-deep">
            WhatsApp us
          </a>
          <a href={callHref} className="inline-flex min-h-11 items-center rounded-md border border-navy px-5 font-semibold text-navy hover:bg-mist">
            Call us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={onSubmit}
      className={compact ? "space-y-4" : "space-y-5"}
      data-testid={`lead-form-${formType}`}
    >
      <p role="alert" className={errorCount ? "rounded-md bg-red-50 px-3 py-2 text-sm text-red-800" : "sr-only"}>
        {errorCount ? `Please check ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}.` : ""}
      </p>
      <input type="hidden" name="formType" value={formType} />
      <input type="hidden" name="sourcePage" value={sourcePage} />
      {service && <input type="hidden" name="service" value={service} />}
      {message !== undefined && <input type="hidden" name="message" value={message} />}
      {/* Honeypot: hidden from people and screen readers; bots fill it in. Name avoids autofill. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="nh_hp_extra" tabIndex={-1} autoComplete="new-password" defaultValue="" />
        </label>
      </div>

      <div className={full ? "grid gap-5 sm:grid-cols-2" : "space-y-4"}>
        <Field label="Your name" name="name" error={errors.name}>
          {(p) => <input {...p} name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" className={inputClass} />}
        </Field>
        <Field label="Mobile number" name="phone" error={errors.phone}>
          {(p) => (
            <input
              {...p}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="10-digit mobile"
              pattern="[\d\s+\-\(\)]{10,16}"
              className={inputClass}
            />
          )}
        </Field>
        {full && (
          <Field label="Email" name="email" error={errors.email} optional>
            {(p) => <input {...p} name="email" type="email" maxLength={120} autoComplete="email" className={inputClass} />}
          </Field>
        )}
        {!service && services && (
          <Field label="What are you looking for?" name="service" error={errors.service} optional>
            {(p) => (
              <select {...p} name="service" defaultValue="" className={inputClass}>
                <option value="">Not sure yet</option>
                {services.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        )}
        {full && areas && (
          <Field label="Preferred area" name="area" error={errors.area} optional>
            {(p) => (
              <select {...p} name="area" defaultValue="" className={inputClass}>
                <option value="">Open to suggestions</option>
                {areas.map((a) => (
                  <option key={a.value} value={a.label}>
                    {a.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        )}
        {full && (
          <Field label="Budget" name="budgetRange" error={errors.budgetRange} optional>
            {(p) => (
              <select {...p} name="budgetRange" defaultValue="" className={inputClass}>
                <option value="">Prefer to discuss</option>
                {BUDGETS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        )}
        {full && (
          <Field label="When do you plan to buy?" name="timeline" error={errors.timeline} optional>
            {(p) => (
              <select {...p} name="timeline" defaultValue="" className={inputClass}>
                <option value="">Not decided</option>
                {TIMELINES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        )}
      </div>

      {full && (
        <Field label="Anything else we should know?" name="message" error={errors.message} optional>
          {(p) => <textarea {...p} name="message" rows={4} maxLength={2000} className={inputClass} />}
        </Field>
      )}

      <div>
        <label className="flex items-start gap-3 text-sm text-slate">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${formType}-consent-err` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-navy"
          />
          <span>{CONSENT_TEXT}</span>
        </label>
        {errors.consent && (
          <p id={`${formType}-consent-err`} data-field-error="consent" className="mt-1 text-sm text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-navy px-6 text-base font-semibold text-paper transition-colors hover:bg-navy-deep disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Sending…" : (submitLabel ?? "Request a call back")}
      </button>
      <p className="text-sm text-slate">Consultations are always free. We&apos;ll get back to you by phone or WhatsApp.</p>
    </form>
  );
}
