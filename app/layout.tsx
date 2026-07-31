import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "./globals.css";
import { getContent, resolveSiteUrl } from "@/lib/content";
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

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const siteUrl = resolveSiteUrl(content);
  const { site, seo } = content;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.browserTitle,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: seo.keywords.map((keyword) => keyword.text),
    authors: [{ name: site.name }],
    alternates: {
      canonical: "./",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title: seo.shareTitle,
      description: site.description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.shareTitle,
      description: site.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const siteUrl = resolveSiteUrl(content);
  const { site } = content;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    url: siteUrl,
    // E.164-style format per Google structured-data guidance; the
    // human-readable form in content is used everywhere else on the site.
    telephone: `+1-${site.contact.phone}`,
    description: site.description,
    medicalSpecialty: "Psychiatry",
    areaServed: { "@type": "State", name: "North Carolina" },
    availableService: [
      { "@type": "MedicalTherapy", name: "Medication Management" },
      { "@type": "MedicalTherapy", name: "Psychotherapy" },
      { "@type": "MedicalTherapy", name: "Holistic Psychiatry" },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar
          nav={site.nav}
          ctaLabel={site.navbar.ctaLabel}
          brandName={site.name}
          logoSrc={site.logo.src}
        />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
