"use client";

import { startTransition, useActionState, useEffect, useId, useRef, useState } from "react";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { CONSENT_TEXT } from "@/lib/leads/submit-text";
import { BUDGETS, TIMELINES } from "@/lib/leads/options";
import { formatPhone, validateField, validateFields, type FieldName } from "@/lib/leads/validate";
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

type Errors = Partial<Record<FieldName, string>>;

const inputClass =
  "mt-1.5 w-full rounded-md border border-mist-strong bg-white px-3.5 py-2.5 text-base text-basalt placeholder:text-slate/70 transition-colors focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-navy aria-[invalid=true]:border-red-700 aria-[invalid=true]:bg-red-50/40 data-[valid=true]:border-emerald-700";

function Field({
  label,
  name,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  name: FieldName;
  error?: string;
  /** Shown under a valid field, e.g. the number we will call. */
  hint?: string | null;
  optional?: boolean;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const id = useId();
  const msgId = `${id}-msg`;
  const describe = error || hint ? msgId : undefined;
  return (
    <div>
      <label htmlFor={id} className="text-[0.95rem] font-semibold text-basalt">
        {label}
        {optional && <span className="font-normal text-slate"> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describe })}
      {error ? (
        <p id={msgId} data-field-error={name} className="mt-1 flex items-start gap-1.5 text-sm text-red-700">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="currentColor">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.5h1.5v5h-1.5zm0 6.25h1.5v1.5h-1.5z" />
          </svg>
          {error}
        </p>
      ) : hint ? (
        <p id={msgId} data-field-hint={name} className="mt-1 text-sm text-emerald-800">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/**
 * One form for every lead entry point. Each field is checked as the visitor leaves it and
 * re-checked live while they fix it, using the server's own rules and wording; the server
 * validates again on submit. On a database problem it offers WhatsApp and call instead.
 */
export function LeadForm({ formType, sourcePage, service, services, areas, message, submitLabel, compact }: Props) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const { chat } = usePageWhatsApp();
  const full = formType === "consultation";
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [phoneHint, setPhoneHint] = useState<string | null>(null);
  /** Fields that have a value which passed the check (shown with a green border). */
  const [ok, setOk] = useState<Partial<Record<FieldName, boolean>>>({});
  /** Counts rejected submit attempts; focus moves to the first error only when it changes. */
  const [attempts, setAttempts] = useState(0);

  // Fields this form actually shows, in screen order (for "focus the first problem").
  const checked: FieldName[] = full
    ? ["name", "phone", "email", "service", "area", "budgetRange", "timeline", "message", "consent"]
    : ["name", "phone", "consent"];

  // Arriving from the home page picker (/contact?service=resale) pre-selects that service.
  useEffect(() => {
    if (service || !services) return;
    const wanted = new URLSearchParams(window.location.search).get("service");
    const select = formRef.current?.querySelector<HTMLSelectElement>('select[name="service"]');
    if (wanted && select && services.some((s) => s.value === wanted)) select.value = wanted;
  }, [service, services]);

  // Server-side rejections use the same inline messages (adjusting state during render,
  // React's recommended pattern for deriving from a changed prop/state).
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "invalid") {
      setErrors(state.errors as Errors);
      setAttempts((n) => n + 1);
    }
  }

  useEffect(() => {
    if (attempts) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempts]);

  const valueOf = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) =>
    el instanceof HTMLInputElement && el.type === "checkbox" ? (el.checked ? "on" : undefined) : el.value;

  const check = (name: FieldName, value: unknown) => {
    const msg = validateField(name, value);
    setErrors((e) => ({ ...e, [name]: msg }));
    setOk((o) => ({ ...o, [name]: !msg && typeof value === "string" && value.trim() !== "" }));
    if (name === "phone") setPhoneHint(msg ? null : formatPhone(String(value ?? "")));
    return msg;
  };

  // Validate when a field loses focus...
  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const el = e.target as unknown as HTMLInputElement;
    const name = el.name as FieldName;
    if (!checked.includes(name) || el.type === "checkbox") return;
    // Leaving an untouched field empty isn't an error yet; empty required fields are flagged on submit.
    if (!touched[name] && el.value === "") return;
    setTouched((t) => ({ ...t, [name]: true }));
    check(name, valueOf(el));
  };

  // ...and live while typing once it has been visited or flagged, so errors clear as soon as fixed.
  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const el = e.target as unknown as HTMLInputElement;
    const name = el.name as FieldName;
    if (!checked.includes(name)) return;
    if (el.type === "checkbox" || el.tagName === "SELECT" || touched[name] || errors[name]) check(name, valueOf(el));
    else if (name === "phone") setPhoneHint(formatPhone(el.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(checked.map((n) => [n, data.get(n) ?? undefined]));
    const found = validateFields(values, checked);
    setTouched(Object.fromEntries(checked.map((n) => [n, true])));
    setErrors(found);
    setOk(Object.fromEntries(checked.map((n) => [n, !found[n] && typeof values[n] === "string" && String(values[n]).trim() !== ""])));
    if (Object.keys(found).length) {
      setAttempts((n) => n + 1);
      return;
    }
    startTransition(() => action(data));
  };

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

  const errorCount = Object.values(errors).filter(Boolean).length;
  const valid = (n: FieldName) => Boolean(ok[n] && !errors[n]);

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onChange={onChange}
      noValidate
      className={compact ? "space-y-4" : "space-y-5"}
      data-testid={`lead-form-${formType}`}
    >
      <p role="alert" className={attempts && errorCount ? "rounded-md bg-red-50 px-3 py-2 text-sm text-red-800" : "sr-only"}>
        {attempts && errorCount
          ? `Please check ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}.`
          : ""}
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
          {(p) => (
            <input {...p} name="name" type="text" required maxLength={80} autoComplete="name" data-valid={valid("name")} className={inputClass} />
          )}
        </Field>
        <Field label="Mobile number" name="phone" error={errors.phone} hint={!errors.phone && phoneHint ? `We'll call ${phoneHint}` : null}>
          {(p) => (
            <input
              {...p}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="10-digit mobile"
              maxLength={16}
              data-valid={valid("phone")}
              className={inputClass}
            />
          )}
        </Field>
        {full && (
          <Field label="Email" name="email" error={errors.email} optional>
            {(p) => <input {...p} name="email" type="email" maxLength={120} autoComplete="email" data-valid={valid("email")} className={inputClass} />}
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
            className="mt-0.5 h-5 w-5 shrink-0 accent-navy aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-offset-2 aria-[invalid=true]:outline-red-700"
          />
          <span>{CONSENT_TEXT}</span>
        </label>
        {errors.consent && (
          <p id={`${formType}-consent-err`} data-field-error="consent" className="mt-1 flex items-start gap-1.5 text-sm text-red-700">
            <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.5h1.5v5h-1.5zm0 6.25h1.5v1.5h-1.5z" />
            </svg>
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
