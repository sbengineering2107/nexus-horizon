import type { StepKind } from "@/components/home/step-illustrations";

/**
 * Copy for the About, How we work and FAQ pages. Kept in one place so the pages,
 * llms-full.txt and structured data say the same thing. No fees, team or track-record
 * claims until the owner supplies them.
 */

export type Faq = { q: string; a: string };

export const PRINCIPLES: { title: string; text: string }[] = [
  {
    title: "Verify before we recommend",
    text: "We check a project's MahaRERA registration, approvals and progress, or a resale flat's title papers, before it goes on your shortlist.",
  },
  {
    title: "Show the full cost",
    text: "Every option comes with a line-by-line cost sheet: stamp duty, registration, GST, parking, deposits and loan charges, not just the quoted price.",
  },
  {
    title: "Fit over inventory",
    text: "We shortlist what suits your budget, commute and timeline, and we tell you when the right answer is to wait or look elsewhere.",
  },
  {
    title: "No pressure to book",
    text: "Site visits and advice carry no obligation. You decide when, and whether, to go ahead.",
  },
];

export type Step = { title: string; summary: string; youGet: string[]; icon: StepKind };

export const STEPS: Step[] = [
  {
    title: "Tell us your brief",
    summary: "A short call or WhatsApp chat about what you need.",
    youGet: [
      "Questions on budget, preferred areas, configuration, purpose (living or investment) and move-in date",
      "A frank view of what that budget buys in the areas you like",
      "Your loan eligibility worked out early, so the shortlist is realistic",
    ],
    icon: "brief",
  },
  {
    title: "Get a shortlist",
    summary: "Three to five options that genuinely fit, not everything on the market.",
    youGet: [
      "Each option's MahaRERA status, possession date and approvals checked",
      "Honest pros and cons, side by side",
      "A cost sheet showing the full amount you would pay",
    ],
    icon: "shortlist",
  },
  {
    title: "Visit together",
    summary: "Accompanied site visits, planned as one route.",
    youGet: [
      "Visits grouped so you can see your shortlist in a day where possible",
      "What to look at and ask on site: carpet area, sample flat vs actual, amenities, access",
      "A debrief afterwards to narrow down",
    ],
    icon: "visit",
  },
  {
    title: "Decide and close",
    summary: "Support from negotiation to registration.",
    youGet: [
      "Help negotiating price, payment plan and inclusions",
      "Document review alongside your lawyer before you pay a token",
      "Coordination of the home loan, agreement, stamp duty and registration",
    ],
    icon: "close",
  },
];

export const GENERAL_FAQS: Faq[] = [
  {
    q: "Is the consultation really free?",
    a: "Yes. Consultations are always free, whether on WhatsApp, a call or in person, and there is no obligation to buy through us.",
  },
  {
    q: "Are you registered with MahaRERA?",
    a: "Yes. Our MahaRERA agent registration number is A031262605250. You can check it in the agent search on the MahaRERA website.",
  },
  {
    q: "How are fees agreed?",
    a: "There is nothing to pay for a consultation. If a fee applies to a transaction, we agree it with you in writing before we start work on it, so there are no surprises later.",
  },
  {
    q: "Which parts of Pune do you cover?",
    a: "We work across West Pune, from Baner and Bavdhan to Hinjewadi and Wakad, and East Pune, from Kharadi and Viman Nagar to Hadapsar and Wagholi. Our area guides cover 28 micro-markets.",
  },
  {
    q: "Can you help with the home loan?",
    a: "Yes. We help you work out eligibility early, compare offers and line up the loan before you sign the agreement. Our calculators let you check the numbers yourself first.",
  },
  {
    q: "What happens after I get in touch?",
    a: "We ask a few questions about your budget, areas, configuration and timeline, then come back with a shortlist that fits, each option with its checks and full cost.",
  },
];
