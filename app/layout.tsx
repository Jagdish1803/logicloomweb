import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

/* Headings — Poppins. SemiBold/Bold per the brand guidelines; Medium is
   carried for nav labels and small caps. Body face follows below. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "website development",
    "website design",
    "website bug fixing",
    "website maintenance",
    "technical SEO",
    "website speed optimization",
    "WordPress development",
    "Shopify development",
    "Next.js developer",
    "freelance web developer Mumbai",
    "web development agency India",
    "LLW",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#2d2b6b",
  width: "device-width",
  initialScale: 1,
};

/** Organisation schema so search engines can read the studio's details. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  logo: `${site.url}/logo-mark.svg`,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" },
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled JSON-LD — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        {/* Clears the floating nav island (top offset + bar height). */}
        <main id="main" className="pt-[88px] md:pt-[104px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
