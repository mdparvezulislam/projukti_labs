"use client";

import { useState, useRef } from "react";
import { BlogPostEntity } from "@/db/schema";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  ExternalLink,
  ChevronLeft,
  Save,
  Send,
  Eye,
  Sparkles,
  FileText,
  Calendar,
  Tag,
  Check,
  AlertCircle,
  Copy,
  History,
  RefreshCw,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/blog/rich-text-editor";
import { ContentExtractionModal } from "@/components/admin/blog/content-extraction-modal";
import { SeoPanel } from "@/components/admin/blog/seo-panel";
import { FeaturedImagePicker } from "@/components/admin/blog/featured-image-picker";
import {
  extractArticleMetadata,
  ExtractedMetadata,
  generateCleanSlug,
} from "@/lib/cms/blog-extractor";

interface BlogManagerProps {
  initialPosts: BlogPostEntity[];
}

export function BlogManager({ initialPosts }: BlogManagerProps) {
  const [postsList, setPostsList] = useState<BlogPostEntity[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Mode: "list" or "studio"
  const [mode, setMode] = useState<"list" | "studio">("list");
  const [editingPost, setEditingPost] = useState<BlogPostEntity | null>(null);

  // Studio Form State
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("web-development");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [contentFormat, setContentFormat] = useState<"html" | "markdown">("html");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled" | "archived">("draft");
  const [scheduledAt, setScheduledAt] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Featured Image
  const [coverImage, setCoverImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageCredit, setImageCredit] = useState("");

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  // Metrics
  const [wordCount, setWordCount] = useState(0);
  const [readingTimeMinutes, setReadingTimeMinutes] = useState(5);
  const [tableOfContents, setTableOfContents] = useState<{ id: string; text: string; level: number }[]>([]);

  // Studio UI states
  const [saving, setSaving] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<"saved" | "saving" | "unsaved" | "error">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Collapsible sidebar panels
  const [openPanels, setOpenPanels] = useState({
    publishing: true,
    category: true,
    featuredImage: true,
    seo: true,
    metrics: false,
    revisions: false,
  });

  // Extraction Modal State
  const [isExtractionOpen, setIsExtractionOpen] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedMetadata | null>(null);

  // Preview Modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Revisions Modal / List
  const [revisions, setRevisions] = useState<{ id: string; title: string; createdAt: string; revisionNote: string }[]>([]);

  // Delete Confirm Dialog
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Autosave Debounce Ref
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDirtyRef = useRef(false);

  const categories = [
    { slug: "web-development", name: "Web Development" },
    { slug: "ecommerce", name: "E-commerce" },
    { slug: "digital-marketing", name: "Digital Marketing & Tracking" },
    { slug: "website-performance", name: "Website Performance" },
    { slug: "business-tech", name: "Business Technology" },
  ];

  const togglePanel = (panel: keyof typeof openPanels) => {
    setOpenPanels((prev) => ({ ...prev, [panel]: !prev[panel] }));
  };

  // Open Studio for Create
  const handleOpenCreate = () => {
    const newId = `post_${Date.now()}`;
    setEditingPost(null);
    setId(newId);
    setTitle("");
    setSubtitle("");
    setSlug("");
    setCategory("web-development");
    setExcerpt("");
    setContent("");
    setContentFormat("html");
    setTags([]);
    setTagInput("");
    setStatus("draft");
    setScheduledAt("");
    setIsFeatured(false);
    setIsPinned(false);
    setCoverImage("");
    setImageAlt("");
    setImageTitle("");
    setImageCaption("");
    setImageCredit("");
    setSeoTitle("");
    setSeoDescription("");
    setCanonicalUrl("");
    setFocusKeyword("");
    setRobotsIndex(true);
    setRobotsFollow(true);
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setWordCount(0);
    setReadingTimeMinutes(1);
    setTableOfContents([]);
    setAutosaveStatus("saved");
    setLastSavedTime(null);
    setStatusMessage(null);
    isDirtyRef.current = false;
    setMode("studio");
  };

  // Open Studio for Edit
  const handleOpenEdit = (post: BlogPostEntity) => {
    setEditingPost(post);
    setId(post.id);
    setTitle(post.title);
    setSubtitle(post.subtitle || "");
    setSlug(post.slug);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setContentFormat((post.contentFormat as "html" | "markdown") || "markdown");
    setTags(post.tags || []);
    setTagInput("");
    setStatus((post.status as "draft" | "published" | "scheduled" | "archived") || "published");
    setScheduledAt(post.scheduledAt ? new Date(post.scheduledAt).toISOString().slice(0, 16) : "");
    setIsFeatured(Boolean(post.isFeatured));
    setIsPinned(Boolean(post.isPinned));
    setCoverImage(post.coverImage || "");
    setImageAlt(post.imageAlt || "");
    setImageTitle(post.imageTitle || "");
    setImageCaption(post.imageCaption || "");
    setImageCredit(post.imageCredit || "");
    setSeoTitle(post.seoTitle || post.title);
    setSeoDescription(post.seoDescription || post.excerpt);
    setCanonicalUrl(post.canonicalUrl || `https://projuktilabs.tech/blog/${post.slug}`);
    setFocusKeyword(post.focusKeyword || "");
    setRobotsIndex(post.robotsIndex ?? true);
    setRobotsFollow(post.robotsFollow ?? true);
    setOgTitle(post.ogTitle || "");
    setOgDescription(post.ogDescription || "");
    setOgImage(post.ogImage || "");
    setWordCount(post.wordCount || 0);
    setReadingTimeMinutes(post.readingTimeMinutes || 5);
    setTableOfContents(post.tableOfContents || []);
    setAutosaveStatus("saved");
    setLastSavedTime(post.updatedAt ? new Date(post.updatedAt) : null);
    setStatusMessage(null);
    isDirtyRef.current = false;
    setMode("studio");
    loadRevisions(post.id);
  };

  // Load Revisions for Post
  const loadRevisions = async (postId: string) => {
    try {
      const res = await fetch(`/api/admin/content/blog?revisionsFor=${postId}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await res.json()) as any;
      if (data.success && data.data?.revisions) {
        setRevisions(data.data.revisions);
      }
    } catch (err) {
      console.warn("Failed to load revisions:", err);
    }
  };

  // Editor Content Change Handler
  const handleEditorContentChange = (newVal: string, plain: string) => {
    setContent(newVal);
    isDirtyRef.current = true;
    setAutosaveStatus("unsaved");

    // Recalculate basic word count and reading time
    const words = plain.trim().split(/\s+/).filter(Boolean);
    const count = words.length;
    setWordCount(count);
    setReadingTimeMinutes(Math.max(1, Math.ceil(count / 180)));

    // Debounced autosave (3 seconds) if post has title and id
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }
    autosaveTimerRef.current = setTimeout(() => {
      if (isDirtyRef.current && title.trim().length >= 3) {
        handleSave(status, true);
      }
    }, 3000);
  };

  // Run Content Extraction
  const handleAnalyzeContent = () => {
    if (!content.trim()) {
      setStatusMessage({ type: "error", text: "অ্যানালাইসিস করার জন্য প্রথমে নিবন্ধ লিখুন বা পেস্ট করুন।" });
      return;
    }
    const existingSlugs = postsList.filter((p) => p.id !== id).map((p) => p.slug);
    const result = extractArticleMetadata(content, contentFormat, { existingSlugs });
    setExtractedData(result);
    setIsExtractionOpen(true);
  };

  // Apply Extracted Metadata to Studio State
  const handleApplyExtracted = (meta: Partial<ExtractedMetadata>) => {
    if (meta.title && (!title || title.trim() === "")) setTitle(meta.title);
    if (meta.slug && (!slug || slug.trim() === "")) setSlug(meta.slug);
    if (meta.excerpt && (!excerpt || excerpt.trim() === "")) setExcerpt(meta.excerpt);
    if (meta.subtitle) setSubtitle(meta.subtitle);
    if (meta.suggestedCategory?.slug) setCategory(meta.suggestedCategory.slug);
    if (meta.suggestedTags && meta.suggestedTags.length > 0) {
      setTags((prev) => Array.from(new Set([...prev, ...meta.suggestedTags!])));
    }
    if (meta.focusKeyword) setFocusKeyword(meta.focusKeyword);
    if (meta.seoTitle) setSeoTitle(meta.seoTitle);
    if (meta.seoDescription) setSeoDescription(meta.seoDescription);
    if (meta.tableOfContents) setTableOfContents(meta.tableOfContents);
    if (meta.readingTimeMinutes) setReadingTimeMinutes(meta.readingTimeMinutes);
    if (meta.wordCount) setWordCount(meta.wordCount);
    setStatusMessage({ type: "success", text: "স্মার্ট মেটাডাটা নিবন্ধ ফর্মে প্রয়োগ করা হয়েছে।" });
    isDirtyRef.current = true;
    setAutosaveStatus("unsaved");
  };

  // Add Tag
  const handleAddTag = () => {
    const val = tagInput.trim();
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
      setTagInput("");
      isDirtyRef.current = true;
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
    isDirtyRef.current = true;
  };

  // Save / Publish Post
  const handleSave = async (targetStatus: "draft" | "published" | "scheduled" | "archived", isAutosave = false) => {
    if (!isAutosave) {
      setSaving(true);
      setStatusMessage(null);
    } else {
      setAutosaveStatus("saving");
    }

    // Validation
    if (!title.trim()) {
      setStatusMessage({ type: "error", text: "পোস্টের শিরোনাম আবশ্যক।" });
      setSaving(false);
      setAutosaveStatus("error");
      return;
    }

    const currentSlug = slug.trim() || generateCleanSlug(title, postsList.filter((p) => p.id !== id).map((p) => p.slug));
    const currentExcerpt = excerpt.trim() || title;

    const payload = {
      id,
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      slug: currentSlug,
      category,
      excerpt: currentExcerpt,
      content,
      contentFormat,
      tags,
      coverImage: coverImage.trim() || null,
      imageAlt: imageAlt.trim() || null,
      imageTitle: imageTitle.trim() || null,
      imageCaption: imageCaption.trim() || null,
      imageCredit: imageCredit.trim() || null,
      status: targetStatus,
      isFeatured,
      isPinned,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || currentExcerpt,
      canonicalUrl: canonicalUrl.trim() || `https://projuktilabs.tech/blog/${currentSlug}`,
      focusKeyword: focusKeyword.trim() || null,
      robotsIndex,
      robotsFollow,
      ogTitle: ogTitle.trim() || null,
      ogDescription: ogDescription.trim() || null,
      ogImage: ogImage.trim() || null,
      scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      revisionNote: isAutosave ? "Autosave" : `Updated status to ${targetStatus}`,
    };

    try {
      const res = await fetch("/api/admin/content/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json = (await res.json()) as any;
      if (!res.ok) {
        throw new Error(json.error?.message || "পোস্ট সংরক্ষণ ব্যর্থ হয়েছে।");
      }

      setStatus(targetStatus);
      setSlug(currentSlug);
      setAutosaveStatus("saved");
      setLastSavedTime(new Date());
      isDirtyRef.current = false;

      // Update local posts list
      const savedRecord: BlogPostEntity = {
        ...payload,
        contentPlainText: null,
        categoryId: null,
        authorId: null,
        authorName: "Md Parvezul Islam",
        authorRole: "Principal Software Architect & Founder",
        imageWidth: null,
        imageHeight: null,
        imageMimeType: null,
        allowComments: false,
        editorialNotes: null,
        language: "bn",
        version: 1,
        readTime: `${readingTimeMinutes} min read`,
        readingTimeMinutes,
        wordCount,
        characterCount: content.length,
        headingCount: tableOfContents.length,
        paragraphCount: 0,
        tableOfContents,
        lastContentAnalysisAt: new Date(),
        lastSavedAt: new Date(),
        secondaryKeywords: null,
        twitterTitle: null,
        twitterDescription: null,
        twitterImage: null,
        structuredDataType: "Article",
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        publishedAt: targetStatus === "published" ? new Date() : null,
        createdAt: editingPost ? editingPost.createdAt : new Date(),
        updatedAt: new Date(),
      };

      setPostsList((prev) => {
        const idx = prev.findIndex((p) => p.id === id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = savedRecord;
          return updated;
        }
        return [savedRecord, ...prev];
      });

      if (!isAutosave) {
        setStatusMessage({
          type: "success",
          text: targetStatus === "published"
            ? "নিবন্ধ সফলভাবে প্রকাশিত হয়েছে।"
            : "ড্রাফট সফলভাবে সংরক্ষণ করা হয়েছে।",
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "সংরক্ষণ করা যায়নি।";
      setStatusMessage({ type: "error", text: msg });
      setAutosaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  // Delete Post Handler
  const handleDeletePost = async (postId: string) => {
    try {
      const res = await fetch(`/api/admin/content/blog?id=${postId}`, { method: "DELETE" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json.error?.message || "মুছে ফেলা যায়নি");

      setPostsList(postsList.filter((p) => p.id !== postId));
      setDeleteTargetId(null);
      if (mode === "studio" && id === postId) {
        setMode("list");
      }
    } catch (err) {
      alert("ত্রুটি: " + (err instanceof Error ? err.message : "মুছে ফেলা যায়নি"));
    }
  };

  // Duplicate as Draft
  const handleDuplicatePost = (post: BlogPostEntity) => {
    const newId = `post_${Date.now()}`;
    const newTitle = `${post.title} (কপি)`;
    const newSlug = `${post.slug}-copy`;

    setId(newId);
    setTitle(newTitle);
    setSubtitle(post.subtitle || "");
    setSlug(newSlug);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setContentFormat((post.contentFormat as "html" | "markdown") || "markdown");
    setTags(post.tags || []);
    setStatus("draft");
    setCoverImage(post.coverImage || "");
    setImageAlt(post.imageAlt || "");
    setSeoTitle(newTitle);
    setSeoDescription(post.seoDescription || post.excerpt);
    setCanonicalUrl(`https://projuktilabs.tech/blog/${newSlug}`);
    setFocusKeyword(post.focusKeyword || "");
    setEditingPost(null);
    setMode("studio");
  };

  // Filtered List
  const filteredPosts = postsList.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* 1. LIST VIEW                                              */}
      {/* ======================================================== */}
      {mode === "list" && (
        <div className="space-y-6">
          {/* Top Bar: Search, Filters & Create Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="শিরোনাম বা স্লাগ দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 rounded-xl border border-border bg-surface pl-9 pr-4 text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-hidden"
                />
              </div>

              {/* Status Filter */}
              <select
                aria-label="স্ট্যাটাস ফিল্টার"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-xl border border-border bg-surface px-3 text-xs text-text-primary focus:border-accent focus:outline-hidden"
              >
                <option value="all">সকল স্ট্যাটাস</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>

              {/* Category Filter */}
              <select
                aria-label="ক্যাটাগরি ফিল্টার"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 rounded-xl border border-border bg-surface px-3 text-xs text-text-primary focus:border-accent focus:outline-hidden"
              >
                <option value="all">সকল ক্যাটাগরি</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Create Post Button */}
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-background transition-all hover:bg-accent/90 shadow-sm shrink-0"
            >
              <Plus className="h-4 w-4" />
              নতুন পোস্ট লিখুন (Publishing Studio)
            </button>
          </div>

          {/* Posts Table / Cards */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="border-b border-border bg-surface-elevated/60 text-[11px] font-mono uppercase tracking-wider text-text-muted">
                    <th className="py-3 px-3 w-4/12 min-w-[170px]">প্রবন্ধ</th>
                    <th className="py-3 px-3 whitespace-nowrap">ক্যাটাগরি</th>
                    <th className="py-3 px-3 whitespace-nowrap">স্ট্যাটাস</th>
                    <th className="py-3 px-3 whitespace-nowrap">শব্দ / সময়</th>
                    <th className="py-3 px-3 whitespace-nowrap">সর্বশেষ আপডেট</th>
                    <th className="py-3 px-3 text-right whitespace-nowrap">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs">
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-text-muted">
                        কোনো ব্লগ পোস্ট পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-surface-elevated/30 transition-colors">
                        <td className="py-3 px-3 max-w-[190px] xl:max-w-[230px]">
                          <div className="flex items-start gap-2.5 min-w-0">
                            {post.coverImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={post.coverImage}
                                alt=""
                                className="h-9 w-12 rounded object-cover border border-border shrink-0 mt-0.5"
                              />
                            ) : (
                              <div className="h-9 w-12 rounded bg-surface-elevated border border-border shrink-0 flex items-center justify-center text-text-muted">
                                <FileText className="h-4 w-4" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-text-primary truncate">{post.title}</p>
                              <p className="font-mono text-[11px] text-text-muted truncate mt-0.5">
                                /blog/{post.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 text-[11px] font-mono text-text-secondary inline-block">
                            {categories.find((c) => c.slug === post.category)?.name || post.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                              post.status === "published"
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : post.status === "scheduled"
                                ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                : post.status === "archived"
                                ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {post.status || "published"}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-text-muted whitespace-nowrap">
                          {post.wordCount ? `${post.wordCount} words` : "—"}
                          <span className="block text-[10px] opacity-80">{post.readTime || "5 min"}</span>
                        </td>
                        <td className="py-3 px-3 text-text-muted font-mono text-[11px] whitespace-nowrap">
                          {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString("bn-BD") : "—"}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(post)}
                              className="p-1.5 rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-accent transition-colors"
                              title="Edit in Studio"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicatePost(post)}
                              className="p-1.5 rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-accent transition-colors"
                              title="Duplicate as Draft"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            {post.status === "published" && (
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-accent transition-colors"
                                title="View Public Post"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            )}
                            <button
                              onClick={() => setDeleteTargetId(post.id)}
                              className="p-1.5 rounded-lg border border-border bg-surface hover:bg-rose-500/10 hover:border-rose-500/40 text-rose-500 transition-colors"
                              title="Delete Post"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ADVANCED PUBLISHING STUDIO VIEW                         */}
      {/* ======================================================== */}
      {mode === "studio" && (
        <div className="space-y-6">
          {/* Top Bar: Back, Autosave Status, Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-surface shadow-sm">
            {/* Left: Back & Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMode("list")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface-elevated text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                পোস্ট লিস্ট
              </button>
              <div className="h-5 w-px bg-border hidden sm:block" />
              <div>
                <span className="text-text-muted text-[11px] block">
                  {editingPost ? "পোস্ট সম্পাদনা" : "নতুন নিবন্ধ তৈরি"}
                </span>
                <span className="font-bold text-text-primary text-xs line-clamp-1 max-w-[200px] sm:max-w-xs">
                  {title || "শিরোনামহীন ড্রাফট..."}
                </span>
              </div>
            </div>

            {/* Middle: Autosave Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono">
              {autosaveStatus === "saving" && (
                <span className="flex items-center gap-1 text-accent">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  সংরক্ষিত হচ্ছে...
                </span>
              )}
              {autosaveStatus === "saved" && (
                <span className="flex items-center gap-1 text-emerald-500">
                  <Check className="h-3.5 w-3.5" />
                  সংরক্ষিত {lastSavedTime ? `(${lastSavedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})` : ""}
                </span>
              )}
              {autosaveStatus === "unsaved" && (
                <span className="flex items-center gap-1 text-amber-500">
                  <AlertCircle className="h-3.5 w-3.5" />
                  অসংরক্ষিত পরিবর্তন
                </span>
              )}
              {autosaveStatus === "error" && (
                <button
                  onClick={() => handleSave(status, false)}
                  className="flex items-center gap-1 text-rose-500 hover:underline"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  পুনরায় চেষ্টা করুন
                </button>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-text-secondary text-xs font-semibold transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                প্রিভিউ
              </button>
              <button
                type="button"
                onClick={() => handleSave("draft", false)}
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-text-primary text-xs font-semibold transition-colors disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                ড্রাফট সংরক্ষণ
              </button>
              <button
                type="button"
                onClick={() => handleSave("published", false)}
                disabled={saving}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-accent text-background text-xs font-bold hover:bg-accent/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                {status === "published" ? "আপডেট করুন" : "প্রকাশ করুন (Publish)"}
              </button>
            </div>
          </div>

          {/* Status Message Banner */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                statusMessage.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-500"
              }`}
            >
              <span>{statusMessage.text}</span>
              <button onClick={() => setStatusMessage(null)}>
                <Check className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Two-Column Writing Studio Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Writing Canvas */}
            <div className="lg:col-span-8 space-y-6">
              {/* Title & Subtitle Card */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1">
                    নিবন্ধের প্রধান শিরোনাম (Title) *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      isDirtyRef.current = true;
                      setAutosaveStatus("unsaved");
                    }}
                    placeholder="আকর্ষণীয় ও তথ্যবহুল শিরোনাম লিখুন..."
                    className="w-full text-xl sm:text-2xl font-extrabold text-text-primary bg-transparent border-b border-border/80 pb-2 focus:border-accent focus:outline-hidden placeholder:text-text-muted/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1">
                    সাব-টাইটেল / সারসংক্ষেপ (Subtitle / Deck)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => {
                      setSubtitle(e.target.value);
                      isDirtyRef.current = true;
                      setAutosaveStatus("unsaved");
                    }}
                    placeholder="নিবন্ধের মূল বার্তা এক লাইনে তুলে ধরুন..."
                    className="w-full text-sm text-text-secondary bg-transparent border-b border-border/60 pb-1.5 focus:border-accent focus:outline-hidden placeholder:text-text-muted/60"
                  />
                </div>
              </div>

              {/* Advanced Rich Text Editor Component */}
              <RichTextEditor
                value={content}
                format={contentFormat}
                onChange={handleEditorContentChange}
                onAnalyze={handleAnalyzeContent}
                minHeight="540px"
              />
            </div>

            {/* Right 4 Cols: Publishing Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              {/* Panel 1: Publishing Settings */}
              <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => togglePanel("publishing")}
                  className="flex items-center justify-between w-full p-4 text-left bg-surface-elevated/60 hover:bg-surface-elevated transition-colors border-b border-border"
                >
                  <span className="font-bold text-text-primary text-xs flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    পাবলিশিং সেটিংস (Publishing)
                  </span>
                  {openPanels.publishing ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openPanels.publishing && (
                  <div className="p-4 space-y-4 text-xs">
                    <div>
                      <label className="block text-text-muted text-[11px] mb-1">স্ট্যাটাস (Publication Status)</label>
                      <select
                        aria-label="পাবলিকেশন স্ট্যাটাস"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value as "draft" | "published" | "scheduled" | "archived");
                          isDirtyRef.current = true;
                        }}
                        className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                      >
                        <option value="draft">Draft (খসড়া)</option>
                        <option value="published">Published (প্রকাশিত)</option>
                        <option value="scheduled">Scheduled (শিডিউল)</option>
                        <option value="archived">Archived (আর্কাইভ)</option>
                      </select>
                    </div>

                    {status === "scheduled" && (
                      <div className="space-y-2 p-3 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
                        <label className="block text-text-primary font-semibold text-[11px]">শিডিউল তারিখ ও সময়</label>
                        <input
                          type="datetime-local"
                          value={scheduledAt}
                          onChange={(e) => setScheduledAt(e.target.value)}
                          className="w-full h-9 rounded-md border border-border bg-surface px-2.5 text-text-primary focus:outline-hidden"
                        />
                        <p className="text-[10px] text-text-muted mt-1 leading-relaxed">
                          Note: Cloudflare Workers Cron ট্রিগার কনফিগারেশনের ভিত্তিতে নির্ধারিত সময়ে পোস্ট স্বয়ংক্রিয়ভাবে লাইভ হবে।
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-text-primary font-medium">ফিচার্ড আর্টিকেল (Homepage Pin)</span>
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => {
                          setIsFeatured(e.target.checked);
                          isDirtyRef.current = true;
                        }}
                        className="rounded accent-accent h-4 w-4"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Panel 2: Categories & Tags */}
              <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => togglePanel("category")}
                  className="flex items-center justify-between w-full p-4 text-left bg-surface-elevated/60 hover:bg-surface-elevated transition-colors border-b border-border"
                >
                  <span className="font-bold text-text-primary text-xs flex items-center gap-2">
                    <Tag className="h-4 w-4 text-accent" />
                    ক্যাটাগরি ও ট্যাগ (Taxonomy)
                  </span>
                  {openPanels.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openPanels.category && (
                  <div className="p-4 space-y-4 text-xs">
                    <div>
                      <label className="block text-text-muted text-[11px] mb-1">ক্যাটাগরি *</label>
                      <select
                        aria-label="ক্যাটাগরি নির্বাচন"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          isDirtyRef.current = true;
                        }}
                        className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-text-muted text-[11px] mb-1">ট্যাগসমূহ</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          placeholder="ট্যাগ লিখে Enter চাপুন..."
                          className="flex-1 h-8 rounded-md border border-border bg-surface-elevated px-2.5 text-text-primary focus:border-accent focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="px-3 h-8 rounded-md border border-border bg-surface text-text-secondary hover:text-accent font-semibold text-xs"
                        >
                          যোগ
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border bg-surface-elevated text-[11px] text-text-secondary font-mono"
                          >
                            #{t}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(t)}
                              className="text-text-muted hover:text-rose-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel 3: Featured Image */}
              <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => togglePanel("featuredImage")}
                  className="flex items-center justify-between w-full p-4 text-left bg-surface-elevated/60 hover:bg-surface-elevated transition-colors border-b border-border"
                >
                  <span className="font-bold text-text-primary text-xs flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    ফিচার্ড ইমেজ (Cover Image)
                  </span>
                  {openPanels.featuredImage ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openPanels.featuredImage && (
                  <div className="p-4">
                    <FeaturedImagePicker
                      coverImage={coverImage}
                      onChangeCoverImage={(url) => {
                        setCoverImage(url);
                        isDirtyRef.current = true;
                      }}
                      imageAlt={imageAlt}
                      onChangeImageAlt={(alt) => {
                        setImageAlt(alt);
                        isDirtyRef.current = true;
                      }}
                      imageCaption={imageCaption}
                      onChangeImageCaption={(c) => {
                        setImageCaption(c);
                        isDirtyRef.current = true;
                      }}
                      imageCredit={imageCredit}
                      onChangeImageCredit={(cr) => {
                        setImageCredit(cr);
                        isDirtyRef.current = true;
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Panel 4: Advanced SEO Control Center */}
              <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => togglePanel("seo")}
                  className="flex items-center justify-between w-full p-4 text-left bg-surface-elevated/60 hover:bg-surface-elevated transition-colors border-b border-border"
                >
                  <span className="font-bold text-text-primary text-xs flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    এসইও ও সোশ্যাল প্রিভিউ (SEO Center)
                  </span>
                  {openPanels.seo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openPanels.seo && (
                  <div className="p-4">
                    <SeoPanel
                      seoTitle={seoTitle}
                      onChangeSeoTitle={(v) => {
                        setSeoTitle(v);
                        isDirtyRef.current = true;
                      }}
                      seoDescription={seoDescription}
                      onChangeSeoDescription={(v) => {
                        setSeoDescription(v);
                        isDirtyRef.current = true;
                      }}
                      focusKeyword={focusKeyword}
                      onChangeFocusKeyword={(v) => {
                        setFocusKeyword(v);
                        isDirtyRef.current = true;
                      }}
                      canonicalUrl={canonicalUrl}
                      onChangeCanonicalUrl={(v) => {
                        setCanonicalUrl(v);
                        isDirtyRef.current = true;
                      }}
                      robotsIndex={robotsIndex}
                      onChangeRobotsIndex={(v) => {
                        setRobotsIndex(v);
                        isDirtyRef.current = true;
                      }}
                      robotsFollow={robotsFollow}
                      onChangeRobotsFollow={(v) => {
                        setRobotsFollow(v);
                        isDirtyRef.current = true;
                      }}
                      ogTitle={ogTitle}
                      onChangeOgTitle={(v) => {
                        setOgTitle(v);
                        isDirtyRef.current = true;
                      }}
                      ogDescription={ogDescription}
                      onChangeOgDescription={(v) => {
                        setOgDescription(v);
                        isDirtyRef.current = true;
                      }}
                      ogImage={ogImage}
                      onChangeOgImage={(v) => {
                        setOgImage(v);
                        isDirtyRef.current = true;
                      }}
                      coverImage={coverImage}
                      slug={slug}
                      wordCount={wordCount}
                    />
                  </div>
                )}
              </div>

              {/* Panel 5: Content Metrics & TOC */}
              <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => togglePanel("metrics")}
                  className="flex items-center justify-between w-full p-4 text-left bg-surface-elevated/60 hover:bg-surface-elevated transition-colors border-b border-border"
                >
                  <span className="font-bold text-text-primary text-xs flex items-center gap-2">
                    <Layers className="h-4 w-4 text-accent" />
                    কনটেন্ট মেট্রিক্স ও সূচিপত্র (Outline)
                  </span>
                  {openPanels.metrics ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openPanels.metrics && (
                  <div className="p-4 space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-xl border border-border bg-surface-elevated">
                        <span className="text-[11px] text-text-muted block">শব্দ সংখ্যা</span>
                        <span className="font-mono text-base font-bold text-text-primary">{wordCount}</span>
                      </div>
                      <div className="p-3 rounded-xl border border-border bg-surface-elevated">
                        <span className="text-[11px] text-text-muted block">পড়ার সময়</span>
                        <span className="font-mono text-base font-bold text-accent">{readingTimeMinutes} মিনিট</span>
                      </div>
                    </div>

                    {tableOfContents.length > 0 ? (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-text-primary block">
                          আর্টিকেল হেডিং রূপরেখা ({tableOfContents.length} Headings)
                        </span>
                        <div className="max-h-40 overflow-y-auto space-y-1 p-2 rounded-lg border border-border bg-surface-elevated">
                          {tableOfContents.map((h, i) => (
                            <div
                              key={i}
                              style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
                              className="text-[11px] text-text-secondary flex items-center gap-1 truncate"
                            >
                              <span className="font-mono text-[9px] text-accent">H{h.level}</span>
                              <span className="truncate">{h.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-text-muted text-center py-2">
                        কোনো হেডিং পাওয়া যায়নি। নিবন্ধে H2/H3 হেডিং ব্যবহার করুন।
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Panel 6: Revision History */}
              {revisions.length > 0 && (
                <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => togglePanel("revisions")}
                    className="flex items-center justify-between w-full p-4 text-left bg-surface-elevated/60 hover:bg-surface-elevated transition-colors border-b border-border"
                  >
                    <span className="font-bold text-text-primary text-xs flex items-center gap-2">
                      <History className="h-4 w-4 text-accent" />
                      রিভিশন হিস্ট্রি ({revisions.length})
                    </span>
                    {openPanels.revisions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {openPanels.revisions && (
                    <div className="p-4 space-y-2 text-xs">
                      {revisions.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-2.5 rounded-lg border border-border bg-surface-elevated flex items-center justify-between"
                        >
                          <div>
                            <span className="font-mono text-[10px] text-text-muted block">
                              {new Date(rev.createdAt).toLocaleString("bn-BD")}
                            </span>
                            <span className="font-medium text-text-primary text-[11px] line-clamp-1">
                              {rev.revisionNote}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. MODALS                                                 */}
      {/* ======================================================== */}

      {/* Smart Content Extraction Modal */}
      <ContentExtractionModal
        isOpen={isExtractionOpen}
        onClose={() => setIsExtractionOpen(false)}
        metadata={extractedData}
        onApply={handleApplyExtracted}
      />

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-6 py-3">
              <span className="font-bold text-xs text-text-primary flex items-center gap-2">
                <Eye className="h-4 w-4 text-accent" />
                পাবলিক আর্টিকেল প্রিভিউ (Live Preview)
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-surface border border-border text-text-secondary hover:text-text-primary"
              >
                বন্ধ করুন
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
              <span className="px-2.5 py-1 rounded bg-accent/10 border border-accent/30 text-accent font-mono text-xs">
                {categories.find((c) => c.slug === category)?.name || category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
                {title || "শিরোনামহীন..."}
              </h1>
              {subtitle && <p className="text-lg text-text-muted leading-relaxed">{subtitle}</p>}
              {coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImage} alt={imageAlt || ""} className="w-full max-h-96 object-cover rounded-xl border border-border" />
              )}
              <div
                className="prose prose-invert max-w-none text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-rose-500" />
              পোস্ট মুছে ফেলার নিশ্চয়তা
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              আপনি কি নিশ্চিত যে এই পোস্টটি মুছে ফেলতে চান? এটি ডাটাবেজ থেকে স্থায়ীভাবে অপসারিত হবে।
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-elevated text-xs transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => handleDeletePost(deleteTargetId)}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-sm"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
