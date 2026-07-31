import type { Metadata } from "next";
import Link from "next/link";

import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getContent();
  return {
    title: pages.notFound.seoTitle,
  };
}

export default async function NotFound() {
  const { pages } = await getContent();
  const notFound = pages.notFound;

  return (
    <section className="bg-cream">
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center md:py-24">
        <Eyebrow>{notFound.eyebrow}</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-forest text-balance md:text-5xl">
          {notFound.heading}
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-gray-600">
          {notFound.body}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="gold">
            <Link href="/">{notFound.homeLabel}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">{notFound.contactLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
