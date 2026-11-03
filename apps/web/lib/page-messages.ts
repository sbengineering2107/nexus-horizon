import { getServices } from "@/lib/content/services";
import { getAreas } from "@/lib/content/areas";
import { getTools } from "@/lib/content/tools";
import { CATEGORIES, getPosts } from "@/lib/content/blog";
import {
  chatMessage,
  consultationMessage,
  pickMessages,
  type PageInfo,
  type PageMessageMap,
  type PageMessages,
} from "@/lib/whatsapp-messages";

const pack = (p: PageInfo): PageMessages => ({ chat: chatMessage(p), consult: consultationMessage(p) });

let cache: PageMessageMap | null = null;

/** WhatsApp messages for every route, keyed by path. Small enough to hand to the client. */
export function buildPageMessages(): PageMessageMap {
  if (cache) return cache;
  const map: PageMessageMap = {
    "/": pack({ kind: "home" }),
    "/services": pack({ kind: "services" }),
    "/pune": pack({ kind: "areas" }),
    "/calculators": pack({ kind: "calculators" }),
  };
  for (const s of getServices()) map[`/services/${s.slug}`] = pack({ kind: "service", slug: s.slug });
  for (const a of getAreas()) map[`/pune/${a.slug}`] = pack({ kind: "area", name: a.name });
  for (const t of getTools()) map[`/calculators/${t.slug}`] = pack({ kind: "calculator", title: t.title });
  map["/blog"] = pack({ kind: "blog" });
  for (const c of CATEGORIES) map[`/blog/category/${c.id}`] = pack({ kind: "blog" });
  for (const p of getPosts()) map[`/blog/${p.slug}`] = pack({ kind: "post", title: p.title });
  cache = map;
  return map;
}

export function messagesFor(path: string): PageMessages {
  return pickMessages(path, buildPageMessages());
}
