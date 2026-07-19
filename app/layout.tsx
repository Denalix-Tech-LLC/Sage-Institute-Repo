import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const defaultTitle = `${siteConfig.name} — Psychiatric Care & Therapy in North Carolina`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "psychiatric care",
    "medication management",
    "psychotherapy",
    "telehealth psychiatry",
    "North Carolina",
    "psychiatric nurse practitioner",
    "PMHNP",
    "holistic psychiatry",
    "mental health",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: siteConfig.name,
  url: siteConfig.url,
  // E.164-style format per Google structured-data guidance; the
  // human-readable form in siteConfig is used everywhere else on the site.
  telephone: `+1-${siteConfig.contact.phone}`,
  description: siteConfig.description,
  medicalSpecialty: "Psychiatry",
  areaServed: { "@type": "State", name: "North Carolina" },
  availableService: [
    { "@type": "MedicalTherapy", name: "Medication Management" },
    { "@type": "MedicalTherapy", name: "Psychotherapy" },
    { "@type": "MedicalTherapy", name: "Holistic Psychiatry" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
