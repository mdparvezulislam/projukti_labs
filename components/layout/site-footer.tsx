import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface text-text-secondary mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-text-primary text-lg">
              <span className="text-accent font-black">PL</span>
              <span>Projukti Labs</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Building Digital Solutions. Engineering the Future. বাংলাদেশের আধুনিক প্রযুক্তি স্টুডিও ও সফটওয়্যার ইঞ্জিনিয়ারিং কনসালটেন্সি।
            </p>
            <p className="text-xs text-text-muted">
              ফাউন্ডার: <Link href="/founder" className="text-text-secondary hover:text-accent underline-offset-2 hover:underline">Md Parvezul Islam</Link>
            </p>
          </div>

          {/* Active Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">লঞ্চ সেবাসমূহ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/web-development" className="hover:text-accent transition-colors">
                  Web Development &amp; Design
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce" className="hover:text-accent transition-colors">
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance-support" className="hover:text-accent transition-colors">
                  Maintenance &amp; Support Retainers
                </Link>
              </li>
              <li>
                <Link href="/services/landing-page-meta-pixel" className="text-accent hover:underline">
                  Landing Page + Meta Pixel
                </Link>
              </li>
              <li>
                <Link href="/services/complete-ecommerce-website" className="text-accent hover:underline">
                  Complete E-commerce Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Public Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">স্টুডিও</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">আমাদের সম্পর্কে</Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-accent transition-colors">ফাউন্ডার প্রোফাইল</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent transition-colors">আর্কিটেকচারাল পোর্টফোলিও</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">প্রযুক্তি ব্লগ</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">প্রশ্নোত্তর (FAQ)</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">যোগাযোগ</Link>
              </li>
            </ul>
          </div>

          {/* Quick Inquiry */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">ক্লায়েন্ট ইনকোয়ারি</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              নতুন প্রজেক্ট বা ই-কমার্স ওয়েবসাইট তৈরির জন্য একটি প্রফেশনাল টেকনিক্যাল ব্রিফ তৈরি করুন।
            </p>
            <div className="pt-1">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center text-sm font-semibold text-accent hover:underline underline-offset-4"
              >
                Project শুরু করুন &rarr;
              </Link>
            </div>
            <p className="text-xs text-text-muted pt-2 font-mono">
              ডোমেইন: <code className="text-text-secondary">projuktilabs.tech</code>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>&copy; {currentYear} Projukti Labs. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6">
            <Link href="/design-system" className="hover:text-text-secondary">Design Tokens</Link>
            <Link href="/contact" className="hover:text-text-secondary">সাপোর্ট</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
