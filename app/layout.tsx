import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
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
    "প্রযুক্তি ল্যাবস — আধুনিক প্রযুক্তি স্টুডিও এবং সফটওয়্যার ইঞ্জিনিয়ারিং কনসালটেন্সি। আমরা তৈরি করি হাই-স্পিড ওয়েবসাইট, স্কেলেবল ই-কমার্স প্ল্যাটফর্ম এবং কনভার্সন অপটিমাইজড ডিজিটাল সল্যুশন।",
  openGraph: {
    title: "Projukti Labs | প্রযুক্তি ল্যাবস",
    description: "Building Digital Solutions. Engineering the Future.",
    url: "https://projuktilabs.tech",
    siteName: "Projukti Labs",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projukti Labs | প্রযুক্তি ল্যাবস",
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
      lang="bn-BD"
      className={`${hindSiliguri.variable} ${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
