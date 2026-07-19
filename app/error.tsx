"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/Eyebrow";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-cream">
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center md:py-24">
        <Eyebrow>Unexpected error</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-forest text-balance md:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-gray-600">
          We ran into an unexpected hiccup on our end. Take a breath and try
          again in a moment &mdash; we&rsquo;re still here for you.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="gold" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
