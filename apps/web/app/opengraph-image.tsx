import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

export const alt = `${siteConfig.name}: real estate advisory in Pune`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f4d47",
          color: "#f7f9f8",
          padding: "72px 80px",
        }}
      >
        <div style={{ fontSize: 34, opacity: 0.85 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 76, lineHeight: 1.08, maxWidth: 950 }}>
          Independent property advice for Pune homebuyers
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <svg width="1040" height="90" viewBox="0 0 1040 90">
            <path
              d="M0 80 L140 30 L230 55 L380 8 L520 50 L610 34 L760 70 L880 26 L1040 80"
              fill="none"
              stroke="#c9d8d1"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <line x1="0" y1="86" x2="1040" y2="86" stroke="#e9a23b" strokeWidth="6" />
          </svg>
          <div style={{ fontSize: 26, marginTop: 18, opacity: 0.8 }}>{`MahaRERA ${siteConfig.maharera}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
