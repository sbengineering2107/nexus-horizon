import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg text-slate">
        This page doesn’t exist or has moved. Start from the home page or pick a service below.
      </p>
      <Button asChild variant="secondary" className="mt-8">
        <Link href="/">Go to the home page</Link>
      </Button>
      <ul className="mt-10 space-y-2">
        {getServices().map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="text-forest hover:underline">
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
