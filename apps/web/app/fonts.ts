import localFont from "next/font/local";

/**
 * Google Sans Flex (OFL 1.1, open-sourced by Google in Nov 2025), weight + optical-size axes.
 * The Latin file has no ₹ glyph, so a separate 2 KB face supplies it; with unicode-range
 * the browser downloads it only on pages that show a rupee sign.
 */
export const googleSans = localFont({
  src: "./fonts/google-sans-flex.woff2",
  variable: "--font-google-sans",
  weight: "1 1000",
  display: "swap",
});

export const rupeeGlyph = localFont({
  src: "./fonts/google-sans-flex-rupee.woff2",
  variable: "--font-rupee",
  weight: "1 1000",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});
