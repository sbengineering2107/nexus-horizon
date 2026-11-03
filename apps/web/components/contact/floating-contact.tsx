"use client";

import { callHref } from "@/lib/contact-links-client";
import { usePageWhatsApp } from "./page-messages";

/** Round Call and WhatsApp buttons floating bottom-right on phones and small tablets. */
export function FloatingContact() {
  const { chat } = usePageWhatsApp();
  const base =
    "flex h-14 w-14 items-center justify-center rounded-full shadow-[0_6px_18px_rgb(17_28_45/0.28)] transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";
  return (
    <div
      data-testid="floating-contact"
      className="fixed right-4 z-40 flex flex-col gap-3 md:hidden"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <a href={callHref} aria-label="Call Nexus Horizon" className={`${base} border-2 border-white bg-navy text-paper`}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
        </svg>
      </a>
      <a href={chat} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className={`${base} bg-[#25d366] text-white`}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2m4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3" />
        </svg>
      </a>
    </div>
  );
}
