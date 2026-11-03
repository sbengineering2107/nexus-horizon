import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

/** From the brand kit's 03_Favicons/site.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Nexus Horizon",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#1B2A41",
    icons: [
      { src: "/icons/icon_badge_192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon_badge_512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
