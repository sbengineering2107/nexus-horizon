import localFont from "next/font/local";

export const sans = localFont({
  src: "./fonts/inter-var.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

export const display = localFont({
  src: "./fonts/fraunces-var.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});
