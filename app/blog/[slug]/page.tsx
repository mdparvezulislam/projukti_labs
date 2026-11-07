import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  Calendar,
  ChevronRight,
  BookOpen,
  Tag,
} from "lucide-react";
import {
  getPostsByCategory,
} from "@/modules/blog/data";
import { getCmsBlogPostBySlug } from "@/lib/cms";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getCmsBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "প্রবন্ধটি পাওয়া যায়নি | Projukti Labs",
    };
  }

  return {
    title: `${post.title} | Projukti Labs Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://projuktilabs.tech/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://projuktilabs.tech/blog/${post.slug}`,
      siteName: "Projukti Labs",
      locale: "bn_BD",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getCmsBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Related posts in same category, excluding current post
  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Projukti Labs",
      url: "https://projuktilabs.tech",
    },
    datePublished: post.publishedAt,
    inLanguage: "bn-BD",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://projuktilabs.tech/blog/${post.slug}`,
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <Link
          href={`/blog/category/${post.category}`}
          className="hover:text-accent transition-colors"
        >
          {post.categoryName}
        </Link>
        <ChevronRight className="h-3 w-3 text-border" />
        <span className="text-text-primary truncate max-w-[200px]">{post.title}</span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-6 border-b border-border/80 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent">{post.categoryName}</Badge>
          <span className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {post.readingTimeMinutes} মিনিট পড়ার সময়
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            {formattedDate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-text-muted leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
              PI
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">{post.author.name}</p>
              <p className="text-xs text-text-muted">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-mono">ভাষা: বাংলা (bn-BD)</span>
          </div>
        </div>
      </header>

      {/* 3. Article Content */}
      <main className="prose prose-invert max-w-none">
        <MarkdownRenderer content={post.content} />
      </main>

      {/* 4. Tags Footer */}
      <div className="border-t border-border/80 pt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-primary flex items-center gap-1">
            <Tag className="h-3.5 w-3.5 text-accent" />
            ট্যাগসমূহ:
          </span>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-muted hover:border-accent hover:text-accent transition-colors font-mono"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 5. Author Profile Spotlight */}
      <div className="rounded-xl border border-border bg-surface/50 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-base font-bold text-accent">
            PI
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">{post.author.name}</h3>
            <p className="text-xs text-accent font-medium">{post.author.role}</p>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              প্রযুক্তি ল্যাবসের প্রতিষ্ঠাতা ও প্রিন্সিপাল সফটওয়্যার আর্কিটেক্ট। তিনি উচ্চ-গতিশীল ক্লাউড এজ সিস্টেম, ই-কমার্স আর্কিটেকচার এবং ফুল-স্ট্যাক ওয়েব সল্যুশন নিয়ে কাজ করেন।
            </p>
          </div>
        </div>
      </div>

      {/* 6. Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-border pt-10 space-y-6">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            সম্পর্কিত অন্যান্য প্রবন্ধ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Card key={rel.id} className="border-border bg-surface/40 hover:border-accent/40 transition-colors">
                <CardHeader className="space-y-2">
                  <Badge variant="outline" className="w-fit text-[10px]">{rel.categoryName}</Badge>
                  <CardTitle className="text-base font-bold text-text-primary leading-snug line-clamp-2 hover:text-accent transition-colors">
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                  >
                    প্রবন্ধ পড়ুন <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার ব্যবসার জন্য কি একটি নির্ভরযোগ্য ডিজিটাল সমাধান খুঁজছেন?
        </h2>
        <p className="text-text-muted text-sm max-w-lg mx-auto">
          আমাদের সফটওয়্যার ইঞ্জিনিয়ারিং দলের সঙ্গে আপনার চাহিদা শেয়ার করুন এবং একটি পূর্ণাঙ্গ কোটেশন গ্রহণ করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              কোটেশন রিকোয়েস্ট করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">যোগাযোগ করুন</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
