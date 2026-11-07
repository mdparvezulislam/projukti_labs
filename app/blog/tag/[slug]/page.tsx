import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { getPostsByTag } from "@/modules/blog/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let decodedTag = slug;
  try {
    decodedTag = decodeURIComponent(slug);
  } catch {
    // ignore
  }
  return {
    title: `#${decodedTag} বিষয়ক প্রবন্ধসমূহ | Projukti Labs Blog`,
    description: `#${decodedTag} ট্যাগ সম্পর্কিত সকল কারিগরি ও প্রযুক্তি প্রবন্ধ।`,
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedTag = decodeURIComponent(slug);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted overflow-x-auto no-scrollbar whitespace-nowrap py-0.5">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 font-semibold text-text-secondary hover:text-brand-orange-strong dark:hover:text-accent transition-colors shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ব্লগ</span>
        </Link>
        <span className="text-border/80 shrink-0">/</span>
        <span className="text-text-primary font-medium shrink-0">#{decodedTag}</span>
      </nav>

      {/* 2. Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">ট্যাগ ফিল্টার</Badge>
          <span className="font-mono text-xs text-text-muted">{posts.length} টি প্রবন্ধ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary flex items-center gap-3">
          <Tag className="h-8 w-8 text-accent" />
          #{decodedTag}
        </h1>
        <p className="text-base text-text-muted">
          এই ট্যাগের অধীনে প্রকাশিত সকল প্রযুক্তি ও সফটওয়্যার আর্টিকেল নিচে প্রদর্শিত হচ্ছে।
        </p>
      </div>

      {/* 3. Article Grid */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-3">
          <p className="text-base font-semibold text-text-primary">
            এই ট্যাগে কোনো প্রবন্ধ পাওয়া যায়নি
          </p>
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
  );
}

