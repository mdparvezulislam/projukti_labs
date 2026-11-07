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
  const [category, setCategory] = useState("E-commerce Platform");
  const [badge, setBadge] = useState("Live Platform");
  const [projectType, setProjectType] = useState("Founder-owned Product");
  const [overview, setOverview] = useState("");
  const [stackInput, setStackInput] = useState("");
  const [linkUrl, setLinkUrl] = useState("/");
  const [linkText, setLinkText] = useState("View Project");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setCategory("E-commerce Platform");
    setBadge("Live Platform");
    setProjectType("Founder-owned Product");
    setOverview("");
    setStackInput("Next.js 16, React 19, TypeScript, Drizzle ORM, Cloudflare D1");
    setLinkUrl("/");
    setLinkText("View Project");
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
    setStackInput((p.stack || []).join(", "));
    setLinkUrl(p.linkUrl || "/");
    setLinkText(p.linkText || "View Project");
    setIsModalOpen(true);
    setStatusMessage(null);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const projectId = editingProject ? editingProject.id : `prj_${crypto.randomUUID().slice(0, 8)}`;
    const stack = stackInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

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
          stack,
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
          stack,
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
      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-warm-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="প্রজেক্টের নাম বা ক্যাটাগরি দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm shrink-0 min-h-[44px]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>নতুন প্রজেক্ট যোগ করুন</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="md:col-span-2 bg-card border border-border rounded-2xl p-12 text-center text-xs text-text-muted">
            কোনো পোর্টফোলিও রেকর্ড পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-border-hover transition-all duration-200 flex flex-col justify-between space-y-4 shadow-warm-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono bg-accent/15 text-accent-text border border-accent/20">
                    {project.badge}
                  </span>
                  <span className="text-[11px] text-text-muted font-medium">
                    {project.projectType}
                  </span>
                </div>

                <h3 className="font-bold text-base text-text-primary">
                  {project.title}
                </h3>
                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>

                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded bg-surface-muted border border-border text-text-muted font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-text-muted">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-text-muted font-mono">
                  /portfolio#{project.slug}
                </span>

                <div className="flex items-center gap-1">
                  {project.linkUrl && (
                    <Link
                      href={project.linkUrl}
                      target="_blank"
                      className="p-2 text-text-muted hover:text-text-primary rounded-lg"
                      title="লাইভ সাইট দেখুন"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(project)}
                    className="p-2 text-text-muted hover:text-accent-text rounded-lg"
                    title="সম্পাদনা করুন"
                  >
                    <Edit3 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Editor Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="পোর্টফোলিও প্রজেক্ট এডিটর"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 max-w-xl w-full space-y-4 shadow-2xl my-8">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-text-primary">
                {editingProject ? "প্রজেক্ট ব্লুপ্রিন্ট সম্পাদনা" : "নতুন পোর্টফোলিও প্রজেক্ট"}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                ভেরিফাইড সফটওয়্যার ব্লুপ্রিন্ট ও টেকনোলজি স্ট্যাক D1 ডাটাবেসে সেভ করুন।
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
                  className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
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
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px] font-mono"
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
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
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
                    placeholder="Live Platform, In Development"
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    প্রজেক্টের ধরন (Ownership)
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                  >
                    <option value="Founder-owned Product">Founder-owned Product</option>
                    <option value="Client Project">Client Project</option>
                    <option value="Software Tool / Search Engine">Software Tool / Search Engine</option>
                    <option value="Founder-owned Platform">Founder-owned Platform</option>
                    <option value="Internal Tool">Internal Tool</option>
                    <option value="Prototype">Prototype</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  টেকনোলজি স্ট্যাক (কমা দিয়ে আলাদা করুন)
                </label>
                <input
                  type="text"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="Next.js 16, TypeScript, Drizzle ORM, Cloudflare D1"
                  className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  ওভারভিউ ও সারাংশ
                </label>
                <textarea
                  rows={3}
                  required
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    প্রজেক্ট লিংক URL
                  </label>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://... অথবা /portfolio"
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    লিংক বাটন টেক্সট
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="View Project"
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-card border border-border text-xs text-text-muted hover:text-text-primary min-h-[44px]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
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
