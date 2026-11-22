import { siteConfig } from "@/site.config";

type Social = { name: string; match: RegExp; hover: string; icon: React.ReactNode };

/** Brand colours on hover, keyboard focus and tap (Instagram magenta, LinkedIn blue, Google blue). */
const SOCIALS: Social[] = [
  {
    name: "Instagram",
    match: /instagram\.com/,
    hover: "hover:bg-[#E1306C] focus-visible:bg-[#E1306C] active:bg-[#E1306C]",
    icon: (
      <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 5.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM21.9 8a6.4 6.4 0 0 0-1.7-4.4A6.4 6.4 0 0 0 15.8 2c-1.7-.1-6.9-.1-8.6 0a6.4 6.4 0 0 0-4.4 1.7A6.4 6.4 0 0 0 1.1 8c-.1 1.7-.1 6.9 0 8.6a6.4 6.4 0 0 0 1.7 4.4 6.4 6.4 0 0 0 4.4 1.7c1.7.1 6.9.1 8.6 0a6.4 6.4 0 0 0 4.4-1.7 6.4 6.4 0 0 0 1.7-4.4c.1-1.7.1-6.9 0-8.6zm-2.1 10.4a3.5 3.5 0 0 1-2 2c-1.4.5-4.6.4-6.1.4s-4.7.1-6.1-.4a3.5 3.5 0 0 1-2-2c-.5-1.4-.4-4.6-.4-6.1s-.1-4.7.4-6.1a3.5 3.5 0 0 1 2-2c1.4-.5 4.6-.4 6.1-.4s4.7-.1 6.1.4a3.5 3.5 0 0 1 2 2c.5 1.4.4 4.6.4 6.1s.1 4.7-.4 6.1z" />
    ),
  },
  {
    name: "LinkedIn",
    match: /linkedin\.com/,
    hover: "hover:bg-[#0A66C2] focus-visible:bg-[#0A66C2] active:bg-[#0A66C2]",
    icon: (
      <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8 19H5V9.5h3zM6.5 8.2a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3a3.2 3.2 0 0 1 2.8-1.6c3 0 3.6 2 3.6 4.6z" />
    ),
  },
  {
    name: "Google",
    match: /google\.|goo\.gl/,
    hover: "hover:bg-[#4285F4] focus-visible:bg-[#4285F4] active:bg-[#4285F4]",
    icon: (
      <path d="M21.8 10.2H12v3.9h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.7 0-.6 0-1.3-.2-1.9zM12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6a6.2 6.2 0 0 1-9.3-3.3H2.7v2.7A10 10 0 0 0 12 22zM6.2 13.6a6 6 0 0 1 0-3.9V7H2.7a10 10 0 0 0 0 9.3zM12 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-9.3 5l3.5 2.7A6 6 0 0 1 12 6z" />
    ),
  },
];

/** Round social buttons for the footer; each fills with its brand colour on hover or focus. */
export function SocialLinks() {
  const items = siteConfig.socials
    .map((href) => ({ href, social: SOCIALS.find((s) => s.match.test(href)) }))
    .filter((x): x is { href: string; social: Social } => Boolean(x.social));
  if (items.length === 0) return null;
  return (
    <div className="mt-7">
      <p className="text-sm text-mist/70">Follow us</p>
      <ul aria-label="Follow us" className="mt-3 flex gap-3">
        {items.map(({ href, social }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener me"
              aria-label={`${social.name === "Google" ? "Google reviews and map" : social.name} (opens in a new tab)`}
              title={social.name === "Google" ? "Google reviews and map" : social.name}
              className={`flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper transition-colors duration-200 hover:border-transparent focus-visible:border-transparent active:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${social.hover}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                {social.icon}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
