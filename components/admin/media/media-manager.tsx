"use client";

import { useState } from "react";
import { MediaAsset } from "@/db/schema";
import {
  UploadCloud,
  Search,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Loader2,
  Image as ImageIcon,
  X,
  FileText,
} from "lucide-react";

interface MediaManagerProps {
  initialAssets: MediaAsset[];
  r2Configured?: boolean;
}

export function MediaManager({ initialAssets, r2Configured = false }: MediaManagerProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [inspectingAsset, setInspectingAsset] = useState<MediaAsset | null>(null);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadCategory, setUploadCategory] = useState("blog");
  const [uploading, setUploading] = useState(false);

  // External URL state
  const [externalUrl, setExternalUrl] = useState("");
  const [externalName, setExternalName] = useState("");
  const [externalAlt, setExternalAlt] = useState("");
  const [externalCategory, setExternalCategory] = useState("blog");
  const [savingUrl, setSavingUrl] = useState(false);

  // Status & Actions
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      asset.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.altText && asset.altText.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyUrl = async (id: string, url: string) => {
    try {
      const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignored
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("altText", uploadAlt);
    formData.append("category", uploadCategory);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; data?: { configured?: boolean; asset?: MediaAsset; message?: string } };

      if (res.ok && data.success && data.data?.asset) {
        setAssets([data.data.asset, ...assets]);
        setIsUploadOpen(false);
        setUploadFile(null);
        setUploadAlt("");
        setStatusMessage({ type: "success", text: "মিডিয়া ফাইল সফলভাবে আপলোড করা হয়েছে।" });
      } else {
        setStatusMessage({
          type: "error",
          text: data.data?.message || "আপলোড ব্যর্থ হয়েছে। সরাসরি ইমেজ ইউআরএল ব্যবহার করুন।",
        });
      }
    } catch {
      setStatusMessage({ type: "error", text: "সার্ভারে ফাইল পাঠানো সম্ভব হয়নি।" });
    } finally {
      setUploading(false);
    }
  };

  const handleRegisterUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalUrl.trim()) return;

    setSavingUrl(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: externalUrl.trim(),
          fileName: externalName.trim() || externalUrl.split("/").pop() || "image.jpg",
          altText: externalAlt.trim(),
          category: externalCategory,
          fileSize: 0,
          mimeType: "image/jpeg",
        }),
      });

      const data = (await res.json()) as { success?: boolean; data?: { asset?: MediaAsset } };
      if (res.ok && data.success && data.data?.asset) {
        setAssets([data.data.asset, ...assets]);
        setIsUrlModalOpen(false);
        setExternalUrl("");
        setExternalName("");
        setExternalAlt("");
        setStatusMessage({ type: "success", text: "ইমেজ ইউআরএল সফলভাবে যুক্ত করা হয়েছে।" });
      } else {
        setStatusMessage({ type: "error", text: "ইমেজ ইউআরএল সংরক্ষণ করা যায়নি।" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "সার্ভার ত্রুটি হয়েছে।" });
    } finally {
      setSavingUrl(false);
    }
  };

  const handleDelete = async (id: string, force = false) => {
    if (!confirm(force ? "সতর্কতা: এটি জোরপূর্বক মুছে ফেলা হবে। নিশ্চিত?" : "আপনি কি এই মিডিয়া ফাইলটি মুছে ফেলতে চান?")) return;

    setDeletingId(id);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/admin/media?id=${id}${force ? "&force=true" : ""}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as { success?: boolean; error?: { message?: string } };

      if (res.ok && data.success) {
        setAssets(assets.filter((a) => a.id !== id));
        if (inspectingAsset?.id === id) setInspectingAsset(null);
        setStatusMessage({ type: "success", text: "মিডিয়া ফাইল সফলভাবে ডিলিট হয়েছে।" });
      } else if (res.status === 409) {
        const confirmForce = confirm(`${data.error?.message}\n\nআপনি কি তবুও এটি মুছে ফেলতে চান?`);
        if (confirmForce) {
          handleDelete(id, true);
        }
      } else {
        setStatusMessage({ type: "error", text: data.error?.message || "ডিলিট করা যায়নি।" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "ডিলিট করার সময় সমস্যা হয়েছে।" });
    } finally {
      setDeletingId(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "External URL";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-warm-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ফাইলের নাম বা Alt টেক্সট দিয়ে সার্চ করুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {r2Configured ? (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold min-h-[44px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              R2 স্টোরেজ সংযুক্ত
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-xl bg-surface-muted border border-border text-text-muted min-h-[44px]">
              D1 মিডিয়া রেজিস্ট্রি
            </span>
          )}

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
          >
            <option value="all">সকল ক্যাটাগরি</option>
            <option value="blog">ব্লগ কভার (Blog)</option>
            <option value="portfolio">পোর্টফোলিও (Portfolio)</option>
            <option value="general">জেনারেল মিডিয়া (General)</option>
          </select>

          <button
            type="button"
            onClick={() => setIsUrlModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-text-primary hover:border-border-hover min-h-[44px]"
          >
            <Plus className="h-4 w-4 text-accent-text" />
            <span>ইউআরএল যোগ</span>
          </button>

          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover min-h-[44px]"
          >
            <UploadCloud className="h-4 w-4" />
            <span>ফাইল আপলোড</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300"
              : "bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-300"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button type="button" onClick={() => setStatusMessage(null)} className="p-1 text-text-muted hover:text-text-primary">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredAssets.length === 0 ? (
          <div className="col-span-full bg-card border border-border rounded-2xl p-12 text-center text-xs text-text-muted flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-surface-muted border border-border flex items-center justify-center text-accent">
              <ImageIcon className="h-6 w-6 text-brand-orange-strong dark:text-accent" />
            </div>
            <p className="font-semibold text-text-primary text-sm">কোনো মিডিয়া ফাইল পাওয়া যায়নি</p>
            <p className="text-text-muted max-w-sm text-xs">
              ব্লগ প্রবন্ধ, পোর্টফোলিও বা পেজ ব্যানার হিসেবে ব্যবহারের জন্য ইমেজ আপলোড করুন অথবা এক্সটারনাল ইউআরএল যুক্ত করুন।
            </p>
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setInspectingAsset(asset)}
              className="group bg-card border border-border hover:border-accent rounded-xl overflow-hidden cursor-pointer transition-all flex flex-col shadow-warm-xs hover:shadow-warm-md"
            >
              {/* Thumbnail Container */}
              <div className="aspect-video bg-surface-muted relative overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.url}
                  alt={asset.altText || asset.fileName}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60'%3E%3Crect width='100' height='60' fill='%23eee'/%3E%3Ctext x='50' y='35' font-size='10' text-anchor='middle' fill='%23aaa'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-black/60 text-white backdrop-blur-xs uppercase">
                  {asset.category || "media"}
                </span>
              </div>

              {/* Metadata Info */}
              <div className="p-2.5 space-y-1">
                <div className="font-semibold text-xs text-text-primary truncate" title={asset.fileName}>
                  {asset.fileName}
                </div>
                <div className="text-[10px] text-text-muted flex items-center justify-between">
                  <span>{formatFileSize(asset.fileSize)}</span>
                  <span>{asset.createdAt ? new Date(asset.createdAt).toLocaleDateString("bn-BD") : "আজ"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Inspecting & Detail Modal */}
      {inspectingAsset && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full overflow-hidden shadow-warm-xl space-y-4 p-5 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-text-primary truncate flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand-orange-strong dark:text-accent" />
                <span className="truncate">{inspectingAsset.fileName}</span>
              </h3>
              <button
                type="button"
                onClick={() => setInspectingAsset(null)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="aspect-video rounded-xl bg-surface-muted border border-border overflow-hidden relative flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={inspectingAsset.url}
                alt={inspectingAsset.altText || inspectingAsset.fileName}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-2.5 text-xs flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 p-3 bg-surface-muted/50 rounded-xl border border-border">
                <div>
                  <span className="text-[10px] text-text-muted block">সাইজ</span>
                  <span className="font-semibold text-text-primary">{formatFileSize(inspectingAsset.fileSize)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">MIME Type</span>
                  <span className="font-semibold text-text-primary font-mono text-[11px]">{inspectingAsset.mimeType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">ক্যাটাগরি</span>
                  <span className="font-semibold text-text-primary uppercase text-[10px]">{inspectingAsset.category}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">আপলোড করেছেন</span>
                  <span className="font-semibold text-text-primary truncate">{inspectingAsset.uploadedBy || "Owner"}</span>
                </div>
              </div>

              {inspectingAsset.altText && (
                <div className="space-y-1">
                  <span className="text-[10px] text-text-muted">Alt Text (এসইও বিবরণ)</span>
                  <p className="p-2 rounded-lg bg-surface-muted/40 border border-border text-text-secondary text-xs">
                    {inspectingAsset.altText}
                  </p>
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-[10px] text-text-muted">পাবলিক ইউআরএল</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={inspectingAsset.url}
                    className="flex-1 px-3 py-1.5 text-xs bg-surface-muted/80 border border-border rounded-lg font-mono text-text-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(inspectingAsset.id, inspectingAsset.url)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover min-h-[36px]"
                  >
                    {copiedId === inspectingAsset.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedId === inspectingAsset.id ? "কপিকৃত!" : "কপি ইউআরএল"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <a
                href={inspectingAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-orange-strong dark:text-accent hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>নতুন ট্যাবে দেখুন</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <button
                type="button"
                disabled={deletingId === inspectingAsset.id}
                onClick={() => handleDelete(inspectingAsset.id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold hover:bg-red-500/20 disabled:opacity-50 min-h-[36px]"
              >
                {deletingId === inspectingAsset.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                <span>ফাইল মুছুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload File Modal */}
      {isUploadOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-5 space-y-4 shadow-warm-xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-text-primary">নতুন ইমেজ ফাইল আপলোড</h3>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-3.5">
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent transition-colors bg-surface-muted/30">
                <input
                  type="file"
                  id="media-file-input"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="media-file-input" className="cursor-pointer space-y-2 block">
                  <UploadCloud className="h-8 w-8 text-brand-orange-strong dark:text-accent mx-auto" />
                  <div className="text-xs font-semibold text-text-primary">
                    {uploadFile ? uploadFile.name : "ফাইল নির্বাচন করুন অথবা টেনে আনুন"}
                  </div>
                  <div className="text-[10px] text-text-muted">
                    সমর্থিত ফরম্যাট: PNG, JPEG, WEBP, SVG, GIF (সর্বোচ্চ ৫ মেগাবাইট)
                  </div>
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  Alt Text (এসইও বিবরণ)
                </label>
                <input
                  type="text"
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  placeholder="যেমন: Projukti Labs E-commerce Dashboard Blueprint"
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <option value="blog">ব্লগ কভার ও ইমেজ (Blog)</option>
                  <option value="portfolio">পোর্টফোলিও কেস স্টাডি (Portfolio)</option>
                  <option value="general">সাধারণ মিডিয়া (General)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-text-muted hover:text-text-primary"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={uploading || !uploadFile}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover disabled:opacity-50"
                >
                  {uploading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{uploading ? "আপলোড হচ্ছে…" : "আপলোড করুন"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* External URL Modal */}
      {isUrlModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-5 space-y-4 shadow-warm-xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-text-primary">এক্সটারনাল ইমেজ ইউআরএল যুক্ত করুন</h3>
              <button
                type="button"
                onClick={() => setIsUrlModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterUrl} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  ইমেজ লিঙ্ক / URL *
                </label>
                <input
                  type="url"
                  required
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  ফাইলের শিরোনাম
                </label>
                <input
                  type="text"
                  value={externalName}
                  onChange={(e) => setExternalName(e.target.value)}
                  placeholder="e.g. Modern Web Architecture Diagram"
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={externalAlt}
                  onChange={(e) => setExternalAlt(e.target.value)}
                  placeholder="ইমেজের এসইও বিবরণ"
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={externalCategory}
                  onChange={(e) => setExternalCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <option value="blog">ব্লগ কভার ও ইমেজ (Blog)</option>
                  <option value="portfolio">পোর্টফোলিও কেস স্টাডি (Portfolio)</option>
                  <option value="general">সাধারণ মিডিয়া (General)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsUrlModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-text-muted hover:text-text-primary"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={savingUrl || !externalUrl.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover disabled:opacity-50"
                >
                  {savingUrl && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
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
