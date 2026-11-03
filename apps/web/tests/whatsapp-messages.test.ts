import { describe, expect, test } from "vitest";
import { chatMessage, consultationMessage, enquiryMessage } from "@/lib/whatsapp-messages";
import { buildPageMessages, messagesFor } from "@/lib/page-messages";
import { consultationHref, whatsappChatHref } from "@/lib/cta";

const decoded = (href: string) => decodeURIComponent(href.split("?text=")[1]!);

describe("WhatsApp messages read like a person wrote them", () => {
  test("no message carries a technical (from /path) tag", () => {
    const all = Object.values(buildPageMessages()).flatMap((m) => [m.chat, m.consult]);
    expect(all.length).toBeGreaterThan(30);
    for (const text of all) expect(text).not.toMatch(/\(from \//);
  });

  test("a service page names what the buyer wants, not the page title", () => {
    expect(chatMessage({ kind: "service", slug: "new-projects" })).toBe(
      "Hi Nexus Horizon, I'm looking at new or under-construction projects in Pune and would like your advice.",
    );
    expect(consultationMessage({ kind: "service", slug: "resale" })).toContain("resale flat");
  });

  test("an area guide names the area", () => {
    expect(chatMessage({ kind: "area", name: "Baner" })).toBe(
      "Hi Nexus Horizon, I was reading your Baner guide and I'm interested in property in Baner.",
    );
  });

  test("a calculator page names the calculator", () => {
    expect(chatMessage({ kind: "calculator", title: "Home Loan EMI Calculator" })).toContain(
      "your Home Loan EMI Calculator",
    );
  });

  test("the home page enquiry names the chosen service in plain words", () => {
    expect(enquiryMessage("new-projects")).toBe(
      "Hi Nexus Horizon, I'm looking at new or under-construction projects in Pune and would like your advice.",
    );
    expect(enquiryMessage()).toContain("free consultation");
  });
});

describe("page message map", () => {
  test("covers every service, area and calculator route", () => {
    const map = buildPageMessages();
    expect(map["/pune/baner"]!.chat).toContain("Baner");
    expect(map["/services/commercial"]!.chat).toContain("commercial");
    expect(map["/calculators/stamp-duty-calculator"]!.chat).toContain("Stamp Duty Calculator");
    expect(map["/"]!.chat).toContain("Pune");
  });

  test("unknown paths fall back to a general message", () => {
    expect(messagesFor("/does-not-exist").chat).toBe("Hi Nexus Horizon, I'd like some advice on property in Pune.");
  });

  test("server CTA links use the page's message", () => {
    expect(decoded(whatsappChatHref("/pune/kharadi"))).toContain("Kharadi");
    expect(decoded(consultationHref("/services/ready-to-move"))).toContain("ready-to-move");
  });
});
