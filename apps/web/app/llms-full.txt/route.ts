import { llmsFull } from "@/lib/seo/llms-full";

export const dynamic = "force-static";

/** llms-full.txt (https://llmstxt.org): the site's full text in one Markdown file. */
export function GET(): Response {
  return new Response(llmsFull(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
