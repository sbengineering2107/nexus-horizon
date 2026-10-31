import type { StaticImageData } from "next/image";
import hero from "@/assets/images/hero.jpg";
import newProjects from "@/assets/images/new-projects.jpg";
import readyToMove from "@/assets/images/ready-to-move.jpg";
import resale from "@/assets/images/resale.jpg";
import commercial from "@/assets/images/commercial.jpg";
import interior from "@/assets/images/interior.jpg";
import type { ServiceSlug } from "@/lib/content/services";

/** Illustrative images (AI-generated). They are not photos of specific projects. */
export type SiteImage = { src: StaticImageData; alt: string };

export const heroImage: SiteImage = {
  src: hero,
  alt: "Modern residential towers with balconies at sunset, with hills on the horizon",
};

export const interiorImage: SiteImage = {
  src: interior,
  alt: "Bright, furnished living room in a modern apartment",
};

export const serviceImages: Record<ServiceSlug, SiteImage> = {
  "new-projects": { src: newProjects, alt: "Residential tower under construction with cranes against the sky" },
  "ready-to-move": { src: readyToMove, alt: "Empty, newly finished apartment with a balcony view, ready to move into" },
  resale: { src: resale, alt: "Lived-in apartment with a balcony and plants overlooking the city" },
  commercial: { src: commercial, alt: "Open-plan modern office floor with desks and large windows" },
};
