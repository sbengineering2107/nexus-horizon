import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { whatsappChatHref } from "@/lib/cta";
import { LeadConversion } from "@/components/leads/lead-conversion";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

const FORMS = ["quick", "consultation", "calculator"] as const;

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ form?: string }> }) {
  const raw = (await searchParams).form;
  const form = FORMS.find((f) => f === raw) ?? "quick";
  return (
    <Container className="py-20 sm:py-28">
      <LeadConversion formType={form} />
      <div className="mx-auto max-w-2xl text-center">
        <svg viewBox="0 0 48 48" aria-hidden="true" className="mx-auto h-14 w-14">
          <circle cx="24" cy="24" r="22" fill="var(--color-navy)" />
          <path d="M14 24.5l7 7 13-14" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="mt-6 text-4xl sm:text-5xl">Thank you. We&apos;ve got your enquiry.</h1>
        <p className="mt-4 text-lg text-slate">
          An advisor will call you on the number you gave us. If it&apos;s urgent, message us on WhatsApp and we&apos;ll pick
          it up there.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappChatHref("/contact")}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-12 items-center rounded-md bg-navy px-6 font-semibold text-paper hover:bg-navy-deep"
          >
            WhatsApp us
          </a>
          <Link href="/blog" className="inline-flex min-h-12 items-center rounded-md border border-navy px-6 font-semibold text-navy hover:bg-mist">
            Read our property guides
          </Link>
        </div>
      </div>
    </Container>
  );
}
