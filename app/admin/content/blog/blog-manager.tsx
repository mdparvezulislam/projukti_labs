"use client";

import { useState } from "react";
import { BlogPostEntity } from "@/db/schema";
import { Plus, Search, Edit3, Trash2, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface BlogManagerProps {
  initialPosts: BlogPostEntity[];
}

export function BlogManager({ initialPosts }: BlogManagerProps) {
  const [postsList, setPostsList] = useState<BlogPostEntity[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostEntity | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("web-development");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled" | "archived">("published");
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const categories = [
    { slug: "web-development", name: "Web Development" },
    { slug: "ecommerce", name: "E-commerce" },
    { slug: "digital-marketing", name: "Digital Marketing & Tracking" },
    { slug: "website-performance", name: "Website Performance" },
    { slug: "business-tech", name: "Business Technology" },
  ];

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setCategory("web-development");
    setExcerpt("");
    setContent("");
    setTagsInput("");
    setStatus("published");
    setIsFeatured(false);
    setIsEditorOpen(true);
    setStatusMessage(null);
  };

  const handleOpenEdit = (post: BlogPostEntity) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setTagsInput((post.tags || []).join(", "));
    setStatus(post.status as "draft" | "published" | "scheduled" | "archived");
    setIsFeatured(Boolean(post.isFeatured));
    setIsEditorOpen(true);
    setStatusMessage(null);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const postId = editingPost ? editingPost.id : `post_${crypto.randomUUID().slice(0, 8)}`;

    try {
      const res = await fetch("/api/admin/content/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: postId,
          slug,
          title,
          excerpt,
          content,
          category,
          tags,
          status,
          isFeatured,
          readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 150))} মিনিট`,
          seoTitle: title,
          seoDescription: excerpt,
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatusMessage("ব্লগ পোস্ট সফলভাবে D1 ডাটাবেসে সেভ হয়েছে।");
        setIsEditorOpen(false);

        const updatedRecord: BlogPostEntity = {
          id: postId,
          slug,
          title,
          excerpt,
          content,
          category,
          tags,
          status,
          isFeatured: Boolean(isFeatured),
          readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 150))} মিনিট`,
          seoTitle: title,
          seoDescription: excerpt,
          coverImage: editingPost?.coverImage ?? null,
          scheduledAt: null,
          publishedAt: new Date(),
          createdAt: editingPost?.createdAt ?? new Date(),
          updatedAt: new Date(),
        };

        if (editingPost) {
          setPostsList((prev) => prev.map((p) => (p.id === postId ? updatedRecord : p)));
        } else {
          setPostsList([updatedRecord, ...postsList]);
        }
      } else {
        setStatusMessage("ব্লগ পোস্ট সংরক্ষণ ব্যর্থ হয়েছে।");
      }
    } catch {
      setStatusMessage("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই পোস্টটি মুছে ফেলতে চান?")) return;
    try {
      const res = await fetch(`/api/admin/content/blog?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPostsList((prev) => prev.filter((p) => p.id !== id));
        setStatusMessage("পোস্টটি মুছে ফেলা হয়েছে।");
      }
    } catch {
      // Ignored
    }
  };

  const filtered = postsList.filter(
    (p) =>
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-card border border-border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ব্লগ শিরোনাম বা স্ল্যাগ দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px] shrink-0"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>নতুন পোস্ট লিখুন</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted">
            কোনো ব্লগ পোস্ট পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-xl p-3.5 sm:p-4 hover:border-border-hover transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-text-primary truncate">
                    {post.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-accent/10 text-accent border-accent/20">
                    {post.category}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      post.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                    }`}
                  >
                    {post.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-xs text-text-muted mt-1 flex items-center gap-3">
                  <span>স্ল্যাগ: /blog/{post.slug}</span>
                  {post.readTime && <span>• {post.readTime}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 text-text-muted hover:text-text-primary rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="পাবলিক পেজ দেখুন"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 text-text-muted hover:text-accent rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="সম্পাদনা করুন"
                >
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 text-text-muted hover:text-red-400 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal / Drawer */}
      {isEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ব্লগ পোস্ট এডিটর"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 max-w-2xl w-full space-y-4 shadow-2xl my-8">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-text-primary">
                {editingPost ? "পোস্ট সম্পাদনা করুন" : "নতুন ব্লগ পোস্ট লিখুন"}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Markdown ফরম্যাটে সমৃদ্ধ প্রবন্ধ তৈরি করুন।
              </p>
            </div>

            <form onSubmit={handleSavePost} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  পোস্ট শিরোনাম
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingPost && !slug) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")
                      );
                    }
                  }}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    ইউআরএল স্ল্যাগ (Slug)
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  সংক্ষিপ্ত সারাংশ (Excerpt)
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  মূল কনটেন্ট (Markdown)
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="## বিষয়বস্তু...&#10;&#10;এখানে বিস্তারিত লিখুন..."
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Web Development, Next.js, SEO"
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    প্রকাশনার স্ট্যাটাস
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "draft" | "published" | "scheduled" | "archived")
                    }
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  >
                    <option value="published">লাইভ / প্রকাশিত (Published)</option>
                    <option value="draft">ড্রাফট (Draft)</option>
                    <option value="scheduled">শিডিউলড (Scheduled)</option>
                    <option value="archived">আর্কাইভড (Archived)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-3 py-2 rounded-lg bg-card-hover border border-border text-xs text-text-muted hover:text-text-primary min-h-[44px]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover min-h-[44px]"
                >
                  {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                  <span>সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
