import type { Metadata } from "next";
import Link from "next/link";

import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="bg-cream">
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center md:py-24">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-forest text-balance md:text-5xl">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-gray-600">
          The page you were looking for may have moved, but you haven&rsquo;t
          lost your way &mdash; we&rsquo;re still right here whenever
          you&rsquo;re ready.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="gold">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
