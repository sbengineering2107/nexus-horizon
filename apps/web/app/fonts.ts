import localFont from "next/font/local";

/** Body: Mukta (Ek Type, Mumbai). Latin + Devanagari family, ready for a Marathi edition. */
export const sans = localFont({
  src: [
    { path: "./fonts/mukta-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/mukta-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/mukta-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mukta",
  display: "swap",
});

/** Headings: Fraunces variable. */
export const display = localFont({
  src: "./fonts/fraunces-var.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});
