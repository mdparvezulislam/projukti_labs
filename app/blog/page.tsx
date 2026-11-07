import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import { getAllCategories } from "@/modules/blog/data";
import { getCmsBlogPosts } from "@/lib/cms";

export const instant = false;

export const metadata = {
  title: "প্রযুক্তি ব্লগ ও টেকনোলজি ইনসাইটস | Projukti Labs",
  description:
    "বাংলাদেশি উদ্যোক্তা ও ব্যবসার জন্য আধুনিক ওয়েব আর্কিটেকচার, ই-কমার্স, মেটা পিক্সেল ট্র্যাকিং এবং ওয়েবসাইট পারফরম্যান্স বিষয়ক বিশ্লেষণধর্মী ব্লগ।",
  openGraph: {
    title: "প্রযুক্তি ব্লগ | Projukti Labs",
    description: "আধুনিক ওয়েব আর্কিটেকচার, ই-কমার্স ও পারফরম্যান্স গাইড।",
    locale: "bn_BD",
    type: "website",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const query = (params?.q || "").trim().toLowerCase();
  const selectedCategory = params?.category || "";

  const categories = getAllCategories();
  const allPosts = await getCmsBlogPosts("published");
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];

  let posts = allPosts;
  if (selectedCategory) {
    posts = allPosts.filter((p) => p.category === selectedCategory);
  } else if (query) {
    posts = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
      {/* 1. Editorial Hero */}
      <div className="max-w-3xl space-y-3.5">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">TECHNOLOGY &amp; ARCHITECTURE INSIGHTS</Badge>
          <span className="font-mono text-xs text-text-muted">Projukti Labs Editorial</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
          Engineering, Commerce &amp; Architecture Insights
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Technical deep-dives, e-commerce architectures, conversion tracking breakdowns, and web performance guides
          from the engineers at Projukti Labs.
        </p>
      </div>

      {/* 2. Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-5">
        <Link
          href="/blog"
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            !selectedCategory
              ? "bg-accent text-accent-foreground font-semibold shadow-xs"
              : "border border-border bg-card text-text-secondary hover:text-text-primary hover:border-border-hover shadow-2xs"
          }`}
        >
          All Articles ({allPosts.length})
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog/category/${cat.slug}`}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === cat.slug
                ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                : "border border-border bg-card text-text-secondary hover:text-text-primary hover:border-border-hover shadow-2xs"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* 3. Featured Article (When viewing all posts without search) */}
      {!selectedCategory && !query && featuredPost && (
        <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex items-center gap-3">
                <Badge variant="accent">বিশেষ ফিচার্ড প্রবন্ধ</Badge>
                <Badge variant="outline">{featuredPost.categoryName}</Badge>
                <span className="flex items-center gap-1 text-xs text-text-muted font-mono">
                  <Clock className="h-3.5 w-3.5 text-brand-orange-strong dark:text-accent" />
                  {featuredPost.readingTimeMinutes} মিনিট পড়ার সময়
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary hover:text-brand-orange-strong dark:hover:text-accent transition-colors leading-snug">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Button variant="primary" asChild className="shadow-xs">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    সম্পূর্ণ প্রবন্ধ পড়ুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="text-xs text-text-muted font-mono">
                  লেখক: {featuredPost.author.name}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full rounded-2xl border border-border bg-surface-muted/60 p-6 text-center space-y-3">
                <BookOpen className="h-12 w-12 text-brand-orange-strong dark:text-accent mx-auto" />
                <p className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Projukti Insights
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  গবেষণাধর্মী কারিগরি বিশ্লেষণ ও রিয়েল-ওয়ার্ল্ড সফটওয়্যার কেস স্টাডি।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Article Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-orange-strong dark:text-accent" />
            {selectedCategory ? `${categories.find((c) => c.slug === selectedCategory)?.name || "ক্যাটাগরি"} বিষয়ক প্রবন্ধ` : "সর্বশেষ প্রকাশিত প্রবন্ধসমূহ"}
          </h2>
          <span className="text-xs text-text-muted font-mono">
            {posts.length} টি প্রবন্ধ পাওয়া গেছে
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3 bg-card/60">
            <p className="text-base font-semibold text-text-primary">কোনো প্রবন্ধ পাওয়া যায়নি</p>
            <p className="text-xs text-text-secondary">অনুগ্রহ করে অন্য কোনো ক্যাটাগরি নির্বাচন করুন।</p>
            <Button variant="outline" size="sm" asChild className="mt-2 bg-card">
              <Link href="/blog">সব প্রবন্ধ দেখুন</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col justify-between"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[11px]">{post.categoryName}</Badge>
                    <span className="flex items-center gap-1 text-[11px] text-text-muted font-mono">
                      <Clock className="h-3 w-3 text-brand-orange-strong dark:text-accent" />
                      {post.readingTimeMinutes} মিনিট
                    </span>
                  </div>

                  <CardTitle className="text-lg font-bold text-text-primary leading-snug line-clamp-2 hover:text-brand-orange-strong dark:hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>

                  <CardDescription className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-surface-muted/60 px-2 py-0.5 text-[10px] text-text-secondary font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="text-[11px] text-text-muted font-mono flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-brand-orange-strong dark:text-accent hover:underline flex items-center gap-1"
                    >
                      Read Article <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 5. Consultation & Quote CTA Banner */}
      <div className="rounded-3xl border border-brand-orange/30 dark:border-accent/40 bg-card/95 dark:bg-surface/80 p-8 sm:p-12 text-center space-y-6 shadow-md backdrop-blur-xs">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Need a High-Performance Digital Solution for Your Business?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
          Discuss your technical specifications, timeline, and milestones with our software architects to receive a
          transparent Scope of Work (SOW) proposal.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild className="shadow-xs">
            <Link href="/get-a-quote">
              Request a Project Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="bg-card">
            <Link href="/services">Explore Our Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
