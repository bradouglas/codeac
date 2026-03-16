import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oprix.co.uk"),
  title: {
    default: "Oprix | Business Automation for UK SMEs",
    template: "%s | Oprix",
  },
  description:
    "Oprix is a UK automation consultancy that builds AI-powered workflows for small and medium businesses. Save 10+ hours a week. No code, no contracts, just results.",
  keywords: [
    "business automation UK",
    "automation consultancy UK",
    "workflow automation SME",
    "AI automation small business",
    "Zapier Make automation London",
    "done for you automation",
    "UK SME automation",
  ],
  authors: [{ name: "Oprix", url: "https://oprix.co.uk" }],
  creator: "Oprix",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://oprix.co.uk",
    siteName: "Oprix",
    title: "Oprix | Business Automation for UK SMEs",
    description:
      "We build AI-powered automations that save UK businesses 10+ hours a week. No code, no hassle, just results.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oprix – Business Automation for UK SMEs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oprix | Business Automation for UK SMEs",
    description:
      "We build AI-powered automations that save UK businesses 10+ hours a week.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        {/* Organisation structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Oprix",
              url: "https://oprix.co.uk",
              logo: "https://oprix.co.uk/logo.png",
              description:
                "UK automation consultancy building AI-powered workflows for small and medium businesses.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "London",
                addressCountry: "GB",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@oprix.co.uk",
                contactType: "customer service",
              },
              sameAs: ["https://linkedin.com/company/oprix"],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />

        {/* Google Analytics / GA4 — uncomment and replace GA_MEASUREMENT_ID with your actual ID */}
        {/*
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}} />
        */}
      </body>
    </html>
  );
}
