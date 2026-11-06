import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projuktilabs.tech"),
  title: {
    default: "Projukti Labs | Building Digital Solutions. Engineering the Future.",
    template: "%s | Projukti Labs",
  },
  description: "Premium Digital Technology Studio & Personal Portfolio of Md Parvezul Islam. Engineering websites, e-commerce stores, and high-performance technical solutions.",
  openGraph: {
    title: "Projukti Labs | Premium Digital Technology Studio",
    description: "Building Digital Solutions. Engineering the Future.",
    url: "https://projuktilabs.tech",
    siteName: "Projukti Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projukti Labs",
    description: "Building Digital Solutions. Engineering the Future.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
