import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import {
  getAllPosts,
  getFeaturedPost,
  getAllCategories,
  searchPosts,
  getPostsByCategory,
} from "@/modules/blog/data";

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
  const query = params?.q || "";
  const selectedCategory = params?.category || "";

  const categories = getAllCategories();
  const featuredPost = getFeaturedPost();

  let posts = getAllPosts();
  if (selectedCategory) {
    posts = getPostsByCategory(selectedCategory);
  } else if (query) {
    posts = searchPosts(query);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* 1. Editorial Hero */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">প্রযুক্তি ব্লগ ও নলেজ হাব</Badge>
          <span className="font-mono text-xs text-text-muted">Projukti Labs Editorial</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
          প্রযুক্তি, ব্যবসা ও সফটওয়্যার আর্কিটেকচার ইনসাইটস
        </h1>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed">
          বাংলাদেশি ব্যবসা প্রতিষ্ঠান, স্টার্টআপ উদ্যোক্তা এবং টেক লিডারদের জন্য আধুনিক ওয়েব প্রযুক্তি, ই-কমার্স স্কেলিং, মেটা পিক্সেল ট্র্যাকিং এবং পারফরম্যান্স অপটিমাইজেশন নিয়ে আমাদের কারিগরি বিশ্লেষণ।
        </p>
      </div>

      {/* 2. Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-6">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            !selectedCategory
              ? "bg-accent text-accent-foreground font-semibold"
              : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong"
          }`}
        >
          সব প্রবন্ধ ({getAllPosts().length})
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog/category/${cat.slug}`}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === cat.slug
                ? "bg-accent text-accent-foreground font-semibold"
                : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* 3. Featured Article (When viewing all posts without search) */}
      {!selectedCategory && !query && featuredPost && (
        <div className="rounded-2xl border border-accent/40 bg-surface/60 p-6 sm:p-10 transition-all hover:border-accent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="accent">বিশেষ ফিচার্ড প্রবন্ধ</Badge>
                <Badge variant="outline">{featuredPost.categoryName}</Badge>
                <span className="flex items-center gap-1 text-xs text-text-muted font-mono">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  {featuredPost.readingTimeMinutes} মিনিট পড়ার সময়
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary hover:text-accent transition-colors leading-snug">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Button variant="primary" asChild>
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
              <div className="w-full rounded-xl border border-border/80 bg-background/80 p-6 text-center space-y-3">
                <BookOpen className="h-12 w-12 text-accent mx-auto" />
                <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                  Projukti Insights
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  গবেষণাধর্মী কারিগরি বিশ্লেষণ ও রিয়েল-ওয়ার্ল্ড সফটওয়্যার কেস স্টাডি।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Article Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            {selectedCategory ? `${categories.find((c) => c.slug === selectedCategory)?.name || "ক্যাটাগরি"} বিষয়ক প্রবন্ধ` : "সর্বশেষ প্রকাশিত প্রবন্ধসমূহ"}
          </h2>
          <span className="text-xs text-text-muted font-mono">
            {posts.length} টি প্রবন্ধ পাওয়া গেছে
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-3">
            <p className="text-base font-semibold text-text-primary">কোনো প্রবন্ধ পাওয়া যায়নি</p>
            <p className="text-xs text-text-muted">অনুগ্রহ করে অন্য কোনো ক্যাটাগরি নির্বাচন করুন।</p>
            <Button variant="outline" size="sm" asChild className="mt-2">
              <Link href="/blog">সব প্রবন্ধ দেখুন</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col justify-between border-border bg-surface/40 hover:border-accent/40 transition-all hover:-translate-y-0.5"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[11px]">{post.categoryName}</Badge>
                    <span className="flex items-center gap-1 text-[11px] text-text-muted font-mono">
                      <Clock className="h-3 w-3 text-accent" />
                      {post.readingTimeMinutes} মিনিট
                    </span>
                  </div>

                  <CardTitle className="text-lg font-bold text-text-primary leading-snug line-clamp-2 hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>

                  <CardDescription className="text-xs text-text-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-background/80 px-2 py-0.5 text-[10px] text-text-muted font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-3 flex items-center justify-between">
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
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      পড়ুন <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 5. Consultation & Quote CTA Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার ব্যবসার জন্য কি একটি হাই-পারফরম্যান্স ওয়েবসাইট প্রয়োজন?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          আমাদের সফটওয়্যার আর্কিটেক্টদের সঙ্গে আপনার প্রজেক্টের কারিগরি পরিকল্পনা আলোচনা করুন এবং একটি স্বচ্ছ কোটেশন গ্রহণ করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              কোটেশন রিকোয়েস্ট করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services">আমাদের সেবাসমূহ দেখুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
