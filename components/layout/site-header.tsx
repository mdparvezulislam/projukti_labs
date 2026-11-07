"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/founder", label: "Founder" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Hide the public header on all admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-text-primary text-base sm:text-lg group">
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-surface border border-border/80 group-hover:border-brand-orange transition-colors shadow-2xs">
            <span className="text-brand-orange-strong dark:text-accent text-xs font-black tracking-tight">PL</span>
          </div>
          <span className="font-extrabold tracking-tight">Projukti Labs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                  isActive
                    ? "text-text-primary font-bold bg-surface-muted shadow-2xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-muted/60"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden lg:flex items-center gap-2.5">
          <ThemeToggle />
          <Link href="/get-a-quote">
            <Button size="sm" variant="primary" className="gap-1.5 rounded-full px-4 text-xs font-semibold shadow-xs">
              <span>Get a Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger & controls */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-text-secondary hover:text-text-primary hover:bg-surface-muted shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-border bg-card/98 backdrop-blur-md lg:hidden shadow-lg animate-in slide-in-from-top-2">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "text-text-primary bg-surface-muted font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link href="/get-a-quote" onClick={() => setMobileOpen(false)} className="block">
                <Button variant="primary" className="w-full justify-center rounded-xl text-sm font-semibold">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
