"use client";

import { useId } from "react";

type Props = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  /** Text shown under the slider for its current value. */
  display?: string;
  /** Hide the slider (e.g. for optional fields where the range is open). */
  slider?: boolean;
  optional?: boolean;
};

/** A labelled number input with a matching range slider. Both stay in sync. */
export function NumberField({ label, value, onChange, min, max, step, display, slider = true, optional }: Props) {
  const id = useId();
  const parse = (raw: string) => (raw === "" ? 0 : Number(raw));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-semibold text-basalt">
          {label}
        </label>
        {display && <span className="text-sm text-slate">{display}</span>}
      </div>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={value === 0 && optional ? "" : value}
        placeholder={optional ? "Leave blank if unknown" : undefined}
        onChange={(e) => onChange(parse(e.target.value))}
        className="mt-2 w-full rounded-md border border-mist-strong bg-white px-4 py-3 text-lg tabular-nums text-basalt focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-navy"
      />
      {slider && (
        <input
          type="range"
          aria-hidden="true"
          tabIndex={-1}
          min={min}
          max={max}
          step={step}
          value={Math.min(Math.max(value, min), max)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="nh-range mt-3 w-full"
        />
      )}
    </div>
  );
}
