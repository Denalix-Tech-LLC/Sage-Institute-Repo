import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

import { IntakeForm } from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "New Client Intake",
  description:
    "Start your care at The Sage Institute. Complete our secure new client intake form — it takes about 7 minutes.",
  robots: { index: false, follow: false },
};

export default function IntakePage() {
  return (
    <>
      {/* Page header band */}
      <section className="bg-forest">
        <div className="container py-24 md:py-28">
          <nav className="text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-cream/60 transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="mx-1 inline h-4 w-4 text-cream/40" aria-hidden="true" />
            <span className="text-cream">New Client Intake</span>
          </nav>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            New Client Intake
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/80">
            We&rsquo;re glad you&rsquo;re here. Tell us a little about yourself
            and what you&rsquo;re looking for, and our team will review your
            information and reach out with next steps.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-cream/70">
            <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
            This form takes about 7 minutes.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <IntakeForm />
            <p className="mt-6 text-center text-sm leading-relaxed text-gray-500">
              Your information is sent securely and reviewed only by our
              clinical team.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
