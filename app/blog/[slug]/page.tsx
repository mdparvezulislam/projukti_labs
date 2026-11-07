import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  Tag,
  Share2,
  ListTree,
} from "lucide-react";
import { getPostsByCategory } from "@/modules/blog/data";
import { getCmsBlogPostBySlug } from "@/lib/cms";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    // ignore
  }
  const post = await getCmsBlogPostBySlug(decodedSlug);

  if (!post || post.status === "draft" || post.status === "archived") {
    return {
      title: "প্রবন্ধটি পাওয়া যায়নি | Projukti Labs",
      robots: { index: false, follow: false },
    };
  }

  const canonical = post.canonicalUrl || `https://projuktilabs.tech/blog/${post.slug}`;
  const ogImg = post.ogImage || post.coverImage || "https://projuktilabs.tech/og-image.jpg";

  return {
    title: post.seoTitle || `${post.title} | Projukti Labs Blog`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical,
    },
    robots: {
      index: post.robotsIndex ?? true,
      follow: post.robotsFollow ?? true,
    },
    openGraph: {
      title: post.ogTitle || post.seoTitle || post.title,
      description: post.ogDescription || post.seoDescription || post.excerpt,
      url: canonical,
      siteName: "Projukti Labs",
      locale: "bn_BD",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.twitterTitle || post.seoTitle || post.title,
      description: post.twitterDescription || post.seoDescription || post.excerpt,
      images: [ogImg],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    // ignore
  }
  const post = await getCmsBlogPostBySlug(decodedSlug);

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

  const canonicalUrl = post.canonicalUrl || `https://projuktilabs.tech/blog/${post.slug}`;
  const coverImg = post.coverImage || "https://projuktilabs.tech/og-image.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": post.structuredDataType || "Article",
    headline: post.title,
    description: post.excerpt,
    image: coverImg,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Projukti Labs",
      url: "https://projuktilabs.tech",
      logo: {
        "@type": "ImageObject",
        url: "https://projuktilabs.tech/favicon.ico",
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    inLanguage: "bn-BD",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-8 sm:pb-16 space-y-6 sm:space-y-8">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <Link
          href={`/blog/category/${post.category}`}
          className="hover:text-brand-orange-strong dark:hover:text-accent transition-colors shrink-0 font-medium"
        >
          {post.categoryName}
        </Link>
        <span className="text-border/80 shrink-0 hidden sm:inline">/</span>
        <span className="text-text-secondary truncate max-w-[280px] hidden sm:inline font-normal">
          {post.title}
        </span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-4 border-b border-border/70 pb-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[11px] font-bold text-brand-orange-strong dark:text-accent border border-brand-orange/20">
            {post.categoryName}
          </span>
          <span className="text-border/60 shrink-0">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted shrink-0">
            <Clock className="h-3 w-3 text-brand-orange-strong dark:text-accent" />
            {post.readingTimeMinutes} মিনিট
          </span>
          <span className="text-border/60 shrink-0">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted shrink-0">
            <Calendar className="h-3 w-3 text-brand-orange-strong dark:text-accent" />
            {formattedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight sm:leading-tight">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="text-base sm:text-xl font-medium text-text-secondary leading-relaxed">
            {post.subtitle}
          </p>
        )}

        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author Byline & Social Share */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/10 font-bold text-xs text-brand-orange-strong dark:text-accent shrink-0 shadow-2xs">
              PI
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">{post.author.name}</p>
              <p className="text-[11px] text-text-muted truncate">{post.author.role}</p>
            </div>
          </div>

          {/* Social Share links */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="h-8.5 w-8.5 rounded-full border border-border/80 bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary shadow-2xs inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              title="Share on Facebook"
            >
              <Share2 className="h-3.5 w-3.5" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="h-8.5 w-8.5 rounded-full border border-border/80 bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary shadow-2xs inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              title="Share on X"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {post.coverImage && (
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.imageAlt || post.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
          {(post.imageCaption || post.imageCredit) && (
            <figcaption className="text-center text-xs text-text-muted">
              {post.imageCaption}
              {post.imageCredit && <span className="opacity-75"> (ছবি: {post.imageCredit})</span>}
            </figcaption>
          )}
        </figure>
      )}

      {/* Table of Contents (if present) */}
      {post.tableOfContents && post.tableOfContents.length > 0 && (
        <div className="rounded-2xl border border-border/80 bg-surface/60 p-6 space-y-3">
          <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <ListTree className="h-4 w-4 text-accent" />
            সূচিপত্র (Table of Contents)
          </h2>
          <nav aria-label="Table of contents" className="space-y-1.5 text-xs">
            {post.tableOfContents.map((toc) => (
              <a
                key={toc.id}
                href={`#${toc.id}`}
                style={{ paddingLeft: `${(toc.level - 2) * 16}px` }}
                className="block text-text-muted hover:text-accent transition-colors truncate"
              >
                {toc.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* 3. Article Content (HTML & Markdown dual support) */}
      <main className="prose prose-invert max-w-none">
        <MarkdownRenderer content={post.content} format={post.contentFormat} />
      </main>

      {/* 4. Tags Footer */}
      {post.tags && post.tags.length > 0 && (
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
      )}

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
