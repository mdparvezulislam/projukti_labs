"use client";

import { useState } from "react";
import { PortfolioProjectEntity } from "@/db/schema";
import { Plus, Search, Edit3, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PortfolioManagerProps {
  initialProjects: PortfolioProjectEntity[];
}

export function PortfolioManager({ initialProjects }: PortfolioManagerProps) {
  const [projectsList, setProjectsList] = useState<PortfolioProjectEntity[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProjectEntity | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("এজ সিস্টেম ও ওয়েব আর্কিটেকচার");
  const [badge, setBadge] = useState("আর্কিটেকচারাল ব্লুপ্রিন্ট");
  const [projectType, setProjectType] = useState("কনসেপ্ট ও ব্লুপ্রিন্ট");
  const [overview, setOverview] = useState("");
  const [linkUrl, setLinkUrl] = useState("/");
  const [linkText, setLinkText] = useState("ব্লুপ্রিন্ট দেখুন");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setCategory("এজ সিস্টেম ও ওয়েব আর্কিটেকচার");
    setBadge("আর্কিটেকচারাল ব্লুপ্রিন্ট");
    setProjectType("কনসেপ্ট ও ব্লুপ্রিন্ট");
    setOverview("");
    setLinkUrl("/");
    setLinkText("ব্লুপ্রিন্ট দেখুন");
    setIsModalOpen(true);
    setStatusMessage(null);
  };

  const handleOpenEdit = (p: PortfolioProjectEntity) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setBadge(p.badge);
    setProjectType(p.projectType);
    setOverview(p.overview);
    setLinkUrl(p.linkUrl || "/");
    setLinkText(p.linkText || "ব্লুপ্রিন্ট দেখুন");
    setIsModalOpen(true);
    setStatusMessage(null);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const projectId = editingProject ? editingProject.id : `prj_${crypto.randomUUID().slice(0, 8)}`;

    try {
      const res = await fetch("/api/admin/content/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectId,
          slug,
          title,
          category,
          badge,
          projectType,
          overview,
          linkUrl,
          linkText,
          isFeatured: true,
          sortOrder: editingProject?.sortOrder ?? projectsList.length + 1,
          isPublished: true,
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatusMessage("পোর্টফোলিও ব্লুপ্রিন্ট সফলভাবে D1 ডাটাবেসে সেভ হয়েছে।");
        setIsModalOpen(false);

        const updated: PortfolioProjectEntity = {
          id: projectId,
          slug,
          title,
          category,
          badge,
          projectType,
          overview,
          metrics: editingProject?.metrics ?? [],
          stack: editingProject?.stack ?? [],
          deliverables: editingProject?.deliverables ?? [],
          linkUrl,
          linkText,
          isFeatured: true,
          sortOrder: editingProject?.sortOrder ?? projectsList.length + 1,
          isPublished: true,
          createdAt: editingProject?.createdAt ?? new Date(),
          updatedAt: new Date(),
        };

        if (editingProject) {
          setProjectsList((prev) => prev.map((item) => (item.id === projectId ? updated : item)));
        } else {
          setProjectsList([...projectsList, updated]);
        }
      } else {
        setStatusMessage("সংরক্ষণ ব্যর্থ হয়েছে।");
      }
    } catch {
      setStatusMessage("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const filtered = projectsList.filter(
    (p) =>
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="প্রজেক্ট শিরোনাম বা ক্যাটাগরি দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-bg-primary text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px] shrink-0"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>নতুন কেস স্টাডি</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted">
            কোনো পোর্টফোলিও রেকর্ড পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-card border border-border rounded-xl p-3.5 sm:p-4 hover:border-border-hover transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-text-primary truncate">
                    {proj.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                    {proj.badge}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">
                    {proj.category}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-2">
                  {proj.overview}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/portfolio"
                  target="_blank"
                  className="p-2 text-text-muted hover:text-text-primary rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="পাবলিক পেজে দেখুন"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(proj)}
                  className="p-2 text-text-muted hover:text-accent rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="সম্পাদনা করুন"
                >
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="পোর্টফোলিও এডিটর"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-2xl my-8">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-text-primary">
                {editingProject ? "কেস স্টাডি সম্পাদনা করুন" : "নতুন কেস স্টাডি যোগ করুন"}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                আর্কিটেকচারাল ব্লুপ্রিন্ট ও টেকনিক্যাল স্পেসিফিকেশন
              </p>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  প্রজেক্ট শিরোনাম
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingProject && !slug) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")
                      );
                    }
                  }}
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    স্ল্যাগ (Slug)
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    ক্যাটাগরি
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    ব্যাজ লেবেল
                  </label>
                  <input
                    type="text"
                    required
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    প্রজেক্টের ধরন
                  </label>
                  <input
                    type="text"
                    required
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  ওভারভিউ ও সারাংশ
                </label>
                <textarea
                  rows={4}
                  required
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-card-hover border border-border text-xs text-text-muted hover:text-text-primary min-h-[44px]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-bg-primary text-xs font-bold hover:bg-accent-hover min-h-[44px]"
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
