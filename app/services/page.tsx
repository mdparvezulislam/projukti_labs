import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getFutureCategories } from "@/modules/services/data";
import { getCmsServices } from "@/lib/cms";

export const metadata = {
  title: "সেবাসমূহ ও সলিউশন | Projukti Labs",
  description:
    "আমাদের সুনির্দিষ্ট ৩টি সক্রিয় সেবা: ওয়েব ডেভেলপমেন্ট ও ডিজাইন, ই-কমার্স ও ডিজিটাল কমার্স, এবং প্রোঅ্যাক্টিভ মেইনটেন্যান্স ও টেকনিক্যাল সাপোর্ট।",
};

export default async function ServicesPage() {
  const allCategories = await getCmsServices();
  const activeCategories = allCategories.filter((c) => c.status === "active");
  const futureCategories = getFutureCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">লঞ্চ সার্ভিস ক্যাটালগ</Badge>
          <Badge variant="outline">৩টি সক্রিয় ক্যাটাগরি</Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-tight">
          প্রোডাক্টাইজড ইঞ্জিনিয়ারিং সার্ভিস ও স্বচ্ছ সমাধান
        </h1>
        <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
          আমরা সুনির্দিষ্ট স্কোপ এবং মাইলফলক-ভিত্তিক সফটওয়্যার সেবা প্রদান করি—কোনো লুকানো বা অপ্রত্যাশিত খরচ ছাড়াই। প্রতিটি প্যাকেজে রয়েছে স্পষ্ট ডেলিভারেবলস, টেকনিক্যাল স্পেসিফিকেশন এবং লঞ্চ-পরবর্তী সাপোর্ট।
        </p>
      </div>

      {/* Active Service Categories Deep-Dive */}
      <div className="space-y-20">
        {activeCategories.map((cat, catIdx) => (
          <div
            key={cat.id}
            id={cat.slug}
            className="rounded-2xl border border-border bg-surface/30 p-6 sm:p-10 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-accent">সার্ভিস ক্যাটাগরি ০{catIdx + 1}</span>
                  <Badge variant="accent">সক্রিয় সেবা</Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">{cat.name}</h2>
                <p className="text-sm text-text-muted max-w-2xl">{cat.description}</p>
              </div>

              <Button variant="outline" asChild className="self-start sm:self-center">
                <Link href={`/get-a-quote?service=${cat.services[0]?.slug || cat.slug}`}>
                  এই ক্যাটাগরির কোটেশন চান
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Services inside this category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cat.services.map((srv) => (
                <Card
                  key={srv.id}
                  className={`flex flex-col justify-between border-border bg-surface/50 ${
                    srv.isFlagship ? "ring-1 ring-accent/30" : ""
                  }`}
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      {srv.isFlagship ? (
                        <Badge variant="accent">★ ফ্ল্যাগশিপ সলিউশন</Badge>
                      ) : (
                        <Badge variant="outline">স্ট্যান্ডার্ড প্যাকেজ</Badge>
                      )}
                      <span className="font-mono text-xs text-text-muted">{srv.packages.length}টি প্যাকেজ অপশন</span>
                    </div>

                    <CardTitle className="text-xl sm:text-2xl text-text-primary">{srv.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-text-muted">
                      {srv.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Technical Highlights */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                        কারিগরি বৈশিষ্ট্য:
                      </p>
                      <ul className="space-y-1.5 text-xs text-text-muted">
                        {srv.technicalHighlights.slice(0, 3).map((th, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{th}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Tiers Preview */}
                    <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted">
                        <span>প্যাকেজসমূহ</span>
                        <span>শুরুর বাজেট</span>
                      </div>
                      <div className="space-y-2">
                        {srv.packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="flex items-center justify-between text-xs border-b border-border/40 pb-1.5 last:border-none last:pb-0"
                          >
                            <span className="font-medium text-text-primary">
                              {pkg.name} {pkg.popular ? "★" : ""}
                            </span>
                            <span className="font-mono font-semibold text-accent">
                              {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "কাস্টম স্কোপ"}
                              {pkg.billingPeriod === "monthly" ? " / মাস" : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      {srv.isFlagship ? (
                        <Button variant="primary" asChild className="w-full">
                          <Link href={`/services/${srv.slug}`}>
                            বিস্তারিত আর্কিটেকচার ও প্যাকেজ দেখুন
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" asChild className="w-full">
                          <Link href={`/get-a-quote?service=${srv.slug}`}>
                            এই সার্ভিসের কোটেশন চান
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Future Categories (Coming Soon / Pipeline) */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="max-w-3xl space-y-3">
          <Badge variant="outline">ভবিষ্যৎ রোডম্যাপ</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            ভবিষ্যৎ সম্প্রসারণ ও গবেষণা পাইপলাইন
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            ইঞ্জিনিয়ারিং শ্রেষ্ঠত্ব ও মানের প্রতি দায়বদ্ধ থেকে নিচের প্রযুক্তি খাতগুলো বর্তমানে আমাদের কৌশলগত গবেষণা ও সম্প্রসারণ প্রক্রিয়ায় রয়েছে। প্রাথমিক লঞ্চে এগুলো সক্রিয় সেলস সার্ভিস হিসেবে রাখা হয়নি।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureCategories.map((future) => (
            <div
              key={future.id}
              className="rounded-xl border border-dashed border-border/80 bg-surface/20 p-6 space-y-3 opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted uppercase">গবেষণাধীন</span>
                <Badge variant="outline" className="text-[10px] text-text-muted">শীঘ্রই আসছে</Badge>
              </div>
              <h3 className="text-lg font-bold text-text-primary">{future.name}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{future.tagline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার প্রজেক্টের জন্য কাস্টম ইঞ্জিনিয়ারিং স্কোপ প্রয়োজন?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          আপনার প্রজেক্টের প্রয়োজনীয়তা যদি একাধিক প্রযুক্তি খাত জুড়ে বিস্তৃত হয় বা বিশেষ আর্কিটেকচার দাবি করে, আমরা আপনার স্পেসিফিকেশন পর্যালোচনা করতে প্রস্তুত।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              কাস্টম কোটেশন রিকোয়েস্ট করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">একটি টেকনিক্যাল আলোচনার সময় নির্ধারণ করুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
