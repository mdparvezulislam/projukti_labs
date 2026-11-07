"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const currentYear = 2026;

  // Hide the public footer on all admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-surface text-text-secondary mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-text-primary text-lg group">
              <span className="text-brand-orange-strong dark:text-accent font-black">PL</span>
              <span>Projukti Labs</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Building Digital Solutions. Engineering the Future. A technology-focused digital solutions studio building modern websites, e-commerce platforms, and practical software solutions.
            </p>
            <p className="text-xs text-text-muted">
              Founded by <Link href="/founder" className="text-text-primary hover:text-brand-orange-strong dark:hover:text-accent font-semibold transition-colors">Md Parvezul Islam</Link>
              <br />
              <span className="text-text-muted/80">Founder &amp; Principal Software Architect</span>
            </p>
          </div>

          {/* Active Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/web-development" className="hover:text-accent transition-colors">
                  Web Development &amp; Design
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce" className="hover:text-accent transition-colors">
                  E-commerce &amp; Digital Commerce
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance-support" className="hover:text-accent transition-colors">
                  Maintenance &amp; Technical Support
                </Link>
              </li>
              <li>
                <Link href="/services/landing-page-meta-pixel" className="text-brand-orange-strong dark:text-accent hover:underline">
                  Landing Page with Meta Pixel
                </Link>
              </li>
              <li>
                <Link href="/services/complete-ecommerce-website" className="text-brand-orange-strong dark:text-accent hover:underline">
                  Complete E-commerce Website
                </Link>
              </li>
              <li>
                <Link href="/services/website-maintenance" className="text-brand-orange-strong dark:text-accent hover:underline">
                  Website Maintenance Retainer
                </Link>
              </li>
            </ul>
          </div>

          {/* Public Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">Studio</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-accent transition-colors">Founder Profile</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent transition-colors">Our Work (Portfolio)</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">Blog &amp; Insights</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Quick Inquiry */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">Start a Project</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              Have an idea or need an e-commerce platform? Request a customized project proposal and quotation.
            </p>
            <div className="pt-1">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center text-sm font-semibold text-brand-orange-strong dark:text-accent hover:underline underline-offset-4"
              >
                Request a Quote &rarr;
              </Link>
            </div>
            <p className="text-xs text-text-muted pt-2 font-mono">
              Email: <a href="mailto:contact@projuktilabs.tech" className="text-text-secondary hover:text-brand-orange-strong dark:hover:text-accent transition-colors">contact@projuktilabs.tech</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>&copy; {currentYear} Projukti Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/design-system" className="hover:text-text-secondary">Design Tokens</Link>
            <Link href="/contact" className="hover:text-text-secondary">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
