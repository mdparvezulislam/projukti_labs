"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  FolderOpen,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface MediaAssetItem {
  id: string;
  url: string;
  fileName: string;
  altText?: string | null;
}

interface FeaturedImagePickerProps {
  coverImage: string;
  onChangeCoverImage: (url: string) => void;
  imageAlt: string;
  onChangeImageAlt: (alt: string) => void;
  imageCaption?: string;
  onChangeImageCaption?: (caption: string) => void;
  imageCredit?: string;
  onChangeImageCredit?: (credit: string) => void;
}

export function FeaturedImagePicker({
  coverImage,
  onChangeCoverImage,
  imageAlt,
  onChangeImageAlt,
  imageCaption = "",
  onChangeImageCaption,
  imageCredit = "",
  onChangeImageCredit,
}: FeaturedImagePickerProps) {
  const [tab, setTab] = useState<"url" | "upload" | "library">("url");
  const [urlInput, setUrlInput] = useState(coverImage);
  const [prevCover, setPrevCover] = useState(coverImage);
  const [uploading, setUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<MediaAssetItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  // Synchronize state during render when coverImage prop changes
  if (coverImage !== prevCover) {
    setPrevCover(coverImage);
    setUrlInput(coverImage);
  }

  // Load media library assets on demand
  const loadMediaLibrary = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/admin/media");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json = (await res.json()) as any;
      if (json.success && json.data?.assets) {
        setMediaList(json.data.assets);
      }
    } catch (err) {
      console.warn("Failed to load media library:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleApplyUrl = () => {
    onChangeCoverImage(urlInput.trim());
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation: MIME type
    if (!file.type.startsWith("image/")) {
      setUploadNotice("শুধু ইমেজ ফাইল (JPEG, PNG, WebP) আপলোড করা যাবে।");
      return;
    }

    // File size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadNotice("ফাইলের আকার সর্বোচ্চ ৫ মেগাবাইট হতে পারে।");
      return;
    }

    setUploading(true);
    setUploadNotice(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", imageAlt || file.name);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await res.json()) as any;

      if (data.data?.configured === false) {
        setUploadNotice("Setup Required: " + data.data.message);
      } else if (data.data?.asset?.url) {
        onChangeCoverImage(data.data.asset.url);
        setUrlInput(data.data.asset.url);
        setUploadNotice("ছবি সফলভাবে আপলোড হয়েছে।");
      } else {
        setUploadNotice(data.error?.message || "আপলোড সম্পন্ন করা যায়নি।");
      }
    } catch {
      setUploadNotice("আপলোড প্রসেসিং ব্যর্থ হয়েছে। দয়া করে 'Image URL' ব্যবহার করুন।");
    } finally {
      setUploading(false);
    }
  };

  const handleSelectFromLibrary = (item: MediaAssetItem) => {
    onChangeCoverImage(item.url);
    setUrlInput(item.url);
    if (item.altText && !imageAlt) {
      onChangeImageAlt(item.altText);
    }
  };

  const handleRemoveImage = () => {
    onChangeCoverImage("");
    setUrlInput("");
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Header with Mode Tabs */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <label className="font-bold text-text-primary flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4 text-accent" />
          ফিচার্ড ইমেজ (Featured Image)
        </label>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-0.5">
          <button
            type="button"
            onClick={() => setTab("url")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              tab === "url"
                ? "bg-accent text-background font-bold shadow-2xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <LinkIcon className="h-3 w-3" />
            Image URL
          </button>
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              tab === "upload"
                ? "bg-accent text-background font-bold shadow-2xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Upload className="h-3 w-3" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("library");
              loadMediaLibrary();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              tab === "library"
                ? "bg-accent text-background font-bold shadow-2xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <FolderOpen className="h-3 w-3" />
            Media Library
          </button>
        </div>
      </div>

      {/* 2. Tab Content */}
      {tab === "url" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/... বা CDN ইমেজ লিঙ্ক"
              className="flex-1 h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary font-mono text-xs focus:border-accent focus:outline-hidden"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-1.5 rounded-md bg-accent text-background font-bold text-xs hover:bg-accent/90 transition-colors"
            >
              প্রয়োগ করুন
            </button>
          </div>
          <p className="text-[11px] text-text-muted">
            Unsplash, Cloudinary বা যেকোনো সুরক্ষিত HTTPS ইমেজ ইউআরএল পেস্ট করুন।
          </p>
        </div>
      )}

      {tab === "upload" && (
        <div className="space-y-3">
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border hover:border-accent/60 rounded-xl bg-surface-elevated/50 cursor-pointer transition-colors text-center">
            <Upload className="h-7 w-7 text-accent mb-2" />
            <span className="font-semibold text-text-primary">ফাইল নির্বাচন করুন বা ড্র্যাগ করুন</span>
            <span className="text-[11px] text-text-muted mt-1">JPEG, PNG, WebP (সর্বোচ্চ ৫ মেগাবাইট)</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {uploading && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-elevated border border-border text-accent">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>আপলোড হচ্ছে...</span>
            </div>
          )}

          {uploadNotice && (
            <div className="flex items-start gap-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-relaxed">{uploadNotice}</span>
            </div>
          )}
        </div>
      )}

      {tab === "library" && (
        <div className="space-y-2">
          {loadingMedia ? (
            <div className="p-6 text-center text-text-muted">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-accent" />
              <span>মিডিয়া অ্যাসেট লোড হচ্ছে...</span>
            </div>
          ) : mediaList.length === 0 ? (
            <div className="p-6 text-center text-text-muted border border-border rounded-xl bg-surface-elevated">
              <span>মিডিয়া লাইব্রেরিতে কোনো ছবি পাওয়া যায়নি।</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
              {mediaList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectFromLibrary(item)}
                  className={`group relative aspect-video rounded-lg overflow-hidden border transition-all ${
                    coverImage === item.url
                      ? "border-accent ring-2 ring-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.altText || ""} className="h-full w-full object-cover" />
                  {coverImage === item.url && (
                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-background bg-accent rounded-full p-0.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Image Preview & Metadata Inputs */}
      {coverImage && (
        <div className="space-y-3 pt-2">
          <div className="relative rounded-xl border border-border bg-surface-elevated overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={imageAlt || "ফিচার্ড ইমেজ প্রিভিউ"}
              className="w-full max-h-44 object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-rose-600 transition-colors shadow-sm"
              title="Remove image"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Metadata Inputs */}
          <div className="space-y-2">
            <div>
              <label className="block text-text-muted text-[11px] mb-1">Alt Text (অ্যাক্সেসিবিলিটি ও এসইও) *</label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => onChangeImageAlt(e.target.value)}
                placeholder="ছবির বিষয়বস্তুর সংক্ষিপ্ত বর্ণনা..."
                className="w-full h-8 rounded-md border border-border bg-surface-elevated px-2.5 text-text-primary focus:border-accent focus:outline-hidden"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-text-muted text-[11px] mb-1">ক্যাপশন (Caption)</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => onChangeImageCaption?.(e.target.value)}
                  placeholder="ছবির নিচে ক্যাপশন..."
                  className="w-full h-8 rounded-md border border-border bg-surface-elevated px-2.5 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-text-muted text-[11px] mb-1">ক্রেডিট / সোর্স (Credit)</label>
                <input
                  type="text"
                  value={imageCredit}
                  onChange={(e) => onChangeImageCredit?.(e.target.value)}
                  placeholder="e.g. Unsplash / Projukti Labs"
                  className="w-full h-8 rounded-md border border-border bg-surface-elevated px-2.5 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
