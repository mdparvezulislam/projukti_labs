import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Hind_Siliguri, Caveat, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AmbientBackground } from "@/components/ui/ambient-background";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projuktilabs.tech"),
  title: {
    default: "Projukti Labs | Building Digital Solutions. Engineering the Future.",
    template: "%s | Projukti Labs",
  },
  description:
    "Projukti Labs is a technology-focused digital solutions studio building modern websites, e-commerce platforms, business applications and practical software solutions.",
  openGraph: {
    title: "Projukti Labs | Building Digital Solutions. Engineering the Future.",
    description:
      "Technology-focused digital solutions studio building modern websites, e-commerce platforms, business applications and practical software solutions.",
    url: "https://projuktilabs.tech",
    siteName: "Projukti Labs",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projukti Labs | Building Digital Solutions. Engineering the Future.",
    description:
      "Technology-focused digital solutions studio building modern websites, e-commerce platforms, business applications and practical software solutions.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://projuktilabs.tech/#organization",
      name: "Projukti Labs",
      url: "https://projuktilabs.tech",
      logo: "https://projuktilabs.tech/logo.png",
      description:
        "Technology-focused digital solutions studio building modern websites, e-commerce platforms, business applications and practical software solutions.",
      email: "contact@projuktilabs.tech",
      founder: {
        "@type": "Person",
        "@id": "https://projuktilabs.tech/#founder",
        name: "Md Parvezul Islam",
        jobTitle: "Founder & Principal Software Architect",
        url: "https://projuktilabs.tech/founder",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@projuktilabs.tech",
        contactType: "customer service",
      },
    },
    {
      "@type": "Person",
      "@id": "https://projuktilabs.tech/#founder",
      name: "Md Parvezul Islam",
      jobTitle: "Founder & Principal Software Architect",
      worksFor: {
        "@id": "https://projuktilabs.tech/#organization",
      },
      url: "https://projuktilabs.tech/founder",
    },
    {
      "@type": "WebSite",
      "@id": "https://projuktilabs.tech/#website",
      url: "https://projuktilabs.tech",
      name: "Projukti Labs",
      publisher: {
        "@id": "https://projuktilabs.tech/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hindSiliguri.variable} ${manrope.variable} ${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("projukti_theme");if(t==="dark"){document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.setAttribute("data-theme","light");}}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary relative selection:bg-brand-orange-soft selection:text-brand-orange-strong">
        <AmbientBackground />
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <main className="flex-1 relative z-10">{children}</main>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </body>
    </html>
  );
}
