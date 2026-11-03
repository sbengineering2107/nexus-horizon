import Image from "next/image";
import logoHorizontal from "@/assets/brand/logo-horizontal.png";
import iconBadge from "@/assets/brand/icon-badge.png";

/**
 * Official logo from the approved brand kit (02_Logos/primary_horizontal_transparent.png).
 * Used as-is: no recolouring, cropping or redrawing. Aspect ratio is preserved.
 */
export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src={logoHorizontal}
      alt="Nexus Horizon Advisors"
      priority={priority}
      sizes="160px"
      className="h-11 w-auto lg:h-[3.25rem]"
    />
  );
}

/** Badge icon for dark backgrounds (03_Favicons/icon_badge_512.png), per the kit's usage rule 5. */
export function LogoBadge({ className = "h-12 w-12" }: { className?: string }) {
  return <Image src={iconBadge} alt="" data-brand="badge" sizes="48px" className={className} />;
}
