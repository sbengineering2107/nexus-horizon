import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/site.config";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

let assets: Promise<[Buffer, Buffer, Buffer, string]> | null = null;

function loadAssets() {
  assets ??= Promise.all([
    readFile(join(process.cwd(), "assets/og/google-sans-regular.ttf")),
    readFile(join(process.cwd(), "assets/og/google-sans-semibold.ttf")),
    readFile(join(process.cwd(), "assets/og/rupee.ttf")),
    readFile(join(process.cwd(), "assets/brand/logo-horizontal.png")).then((b) => `data:image/png;base64,${b.toString("base64")}`),
  ]);
  return assets;
}

/** Title size steps down for longer titles so three lines always fit. */
function titleSize(title: string): number {
  if (title.length <= 34) return 76;
  if (title.length <= 60) return 64;
  return 54;
}

/**
 * Branded 1200x630 share image: logo, a kicker naming the section, the page title,
 * then the domain and MahaRERA number. Light paper background to match the site.
 */
export async function ogImage({ kicker, title }: { kicker: string; title: string }): Promise<ImageResponse> {
  const [regular, semibold, rupee, logo] = await loadAssets();
  const host = new URL(siteConfig.url).hostname.replace(/^www\./, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f8f7f3",
          padding: "64px 80px 56px",
          fontFamily: "Google Sans",
          color: "#111c2d",
          borderTop: "14px solid #1b2a41",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" height={84} style={{ height: 84, width: 269 }} />
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 600, color: "#836812" }}>
            <div style={{ width: 48, height: 4, background: "#c9a227" }} />
            {kicker}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: titleSize(title),
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 1000,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #e5e3dc",
            paddingTop: 24,
            fontSize: 26,
            color: "#4b5565",
          }}
        >
          <span>{host}</span>
          <span>MahaRERA {siteConfig.maharera}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Google Sans", data: regular, weight: 400, style: "normal" },
        { name: "Google Sans", data: semibold, weight: 600, style: "normal" },
        { name: "Google Sans", data: rupee, weight: 600, style: "normal" },
      ],
    },
  );
}
