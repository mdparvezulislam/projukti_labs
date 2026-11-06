import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar, ChevronRight } from "lucide-react";
import {
  getCategoryBySlug,
  getPostsByCategory,
  getAllCategories,
} from "@/modules/blog/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি | Projukti Labs",
    };
  }

  return {
    title: `${category.name} বিষয়ক প্রবন্ধসমূহ | Projukti Labs Blog`,
    description: category.description,
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);
  const allCategories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
        <Link href="/" className="hover:text-accent transition-colors">
          হোম
        </Link>
        <ChevronRight className="h-3 w-3 text-border" />
        <Link href="/blog" className="hover:text-accent transition-colors">
          ব্লগ
        </Link>
        <ChevronRight className="h-3 w-3 text-border" />
        <span className="text-text-primary">{category.name}</span>
      </nav>

      {/* 2. Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">ব্লগ ক্যাটাগরি</Badge>
          <span className="font-mono text-xs text-text-muted">{posts.length} টি প্রবন্ধ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          {category.name}
        </h1>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* 3. Category Filter Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-6">
        <Link
          href="/blog"
          className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
        >
          সব প্রবন্ধ
        </Link>
        {allCategories.map((c) => (
          <Link
            key={c.id}
            href={`/blog/category/${c.slug}`}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              c.slug === slug
                ? "bg-accent text-accent-foreground font-semibold"
                : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* 4. Article Grid */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-3">
          <p className="text-base font-semibold text-text-primary">
            এই ক্যাটাগরিতে এখনো কোনো প্রবন্ধ প্রকাশিত হয়নি
          </p>
          <p className="text-xs text-text-muted">শীঘ্রই নতুন কারিগরি লেখা যুক্ত করা হবে।</p>
          <Button variant="outline" size="sm" asChild className="mt-2">
            <Link href="/blog">অন্যান্য প্রবন্ধ দেখুন</Link>
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
