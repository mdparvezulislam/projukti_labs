"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Save,
  Globe,
  Shield,
  Bell,
  Share2,
  BarChart3,
  Users,
  Check,
  ShieldCheck,
  Mail,
} from "lucide-react";

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SettingsEditorProps {
  initialSettings: Record<string, Record<string, unknown>>;
  adminUsers?: AdminUserItem[];
}

export function SettingsEditor({ initialSettings, adminUsers = [] }: SettingsEditorProps) {
  const general = initialSettings.general || {};
  const seo = initialSettings.seo || {};
  const social = initialSettings.social || {};
  const analytics = initialSettings.analytics || {};
  const notifications = initialSettings.notifications || {};

  const [activeTab, setActiveTab] = useState<
    "general" | "seo" | "social" | "analytics" | "notifications" | "team"
  >("general");

  // General state
  const [siteName, setSiteName] = useState(String(general.siteName || "Projukti Labs"));
  const [tagline, setTagline] = useState(
    String(general.tagline || "Building Digital Solutions. Engineering the Future.")
  );
  const [contactEmail, setContactEmail] = useState(
    String(general.contactEmail || "contact@projuktilabs.tech")
  );
  const [contactPhone, setContactPhone] = useState(
    String(general.contactPhone || "+880 1700-000000")
  );
  const [address, setAddress] = useState(String(general.address || "Dhaka, Bangladesh"));
  const [maintenanceMode, setMaintenanceMode] = useState(Boolean(general.maintenanceMode));

  // SEO state
  const [titleTemplate, setTitleTemplate] = useState(
    String(seo.titleTemplate || "%s | Projukti Labs")
  );
  const [defaultDescription, setDefaultDescription] = useState(
    String(seo.defaultDescription || "Building Digital Solutions. Engineering the Future.")
  );
  const [defaultKeywords, setDefaultKeywords] = useState(
    String(seo.defaultKeywords || "Next.js, Cloudflare D1, Full-stack Web, Software Studio, Bangladesh")
  );
  const [ogImageFallback, setOgImageFallback] = useState(
    String(seo.ogImageFallback || "/og-image.png")
  );

  // Social state
  const [facebookUrl, setFacebookUrl] = useState(
    String(social.facebook || "https://facebook.com/projuktilabs")
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    String(social.linkedin || "https://linkedin.com/company/projuktilabs")
  );
  const [githubUrl, setGithubUrl] = useState(
    String(social.github || "https://github.com/projuktilabs")
  );
  const [twitterUrl, setTwitterUrl] = useState(
    String(social.twitter || "https://twitter.com/projuktilabs")
  );
  const [youtubeUrl, setYoutubeUrl] = useState(
    String(social.youtube || "")
  );

  // Analytics state
  const [metaPixelId, setMetaPixelId] = useState(String(analytics.metaPixelId || ""));
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(
    String(analytics.googleAnalyticsId || "")
  );
  const [gtmId, setGtmId] = useState(String(analytics.gtmId || ""));

  // Notification state
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(
    Boolean(notifications.emailAlertsEnabled)
  );
  const [adminAlertEmail, setAdminAlertEmail] = useState(
    String(notifications.adminAlertEmail || "contact@projuktilabs.tech")
  );
  const [webhookUrl, setWebhookUrl] = useState(
    String(notifications.webhookUrl || "")
  );

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      let payload: { key: string; value: Record<string, unknown> } | null = null;

      if (activeTab === "general") {
        payload = {
          key: "general",
          value: {
            siteName,
            tagline,
            contactEmail,
            contactPhone,
            address,
            currency: "BDT",
            timezone: "Asia/Dhaka",
            maintenanceMode,
          },
        };
      } else if (activeTab === "seo") {
        payload = {
          key: "seo",
          value: {
            titleTemplate,
            defaultDescription,
            defaultKeywords,
            ogImageFallback,
          },
        };
      } else if (activeTab === "social") {
        payload = {
          key: "social",
          value: {
            facebook: facebookUrl,
            linkedin: linkedinUrl,
            github: githubUrl,
            twitter: twitterUrl,
            youtube: youtubeUrl,
          },
        };
      } else if (activeTab === "analytics") {
        payload = {
          key: "analytics",
          value: {
            metaPixelId,
            googleAnalyticsId,
            gtmId,
          },
        };
      } else if (activeTab === "notifications") {
        payload = {
          key: "notifications",
          value: {
            emailAlertsEnabled,
            adminAlertEmail,
            webhookUrl,
          },
        };
      }

      if (payload) {
        const res = await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to save settings");
        setStatusMessage("সেটিংস সফলভাবে Cloudflare D1 ডাটাবেসে সংরক্ষিত হয়েছে।");
      }
    } catch {
      setStatusMessage("সেটিংস সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general" as const, label: "সাধারণ সেটিংস", icon: Globe },
    { id: "seo" as const, label: "এসইও ও মেটাডাটা", icon: Shield },
    { id: "social" as const, label: "সোশ্যাল ও চ্যানেল", icon: Share2 },
    { id: "analytics" as const, label: "অ্যানালিটিক্স ও ট্যাগ", icon: BarChart3 },
    { id: "notifications" as const, label: "নোটিফিকেশন ও অ্যালার্ট", icon: Bell },
    { id: "team" as const, label: "টিম ও অ্যাক্সেস রোল", icon: Users },
  ];

  return (
    <div className="space-y-4 max-w-4xl">
      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-border pb-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setStatusMessage(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap min-h-[44px] ${
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === "team" ? (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-sm font-bold text-text-primary">নিবন্ধিত অ্যাডমিন অ্যাকাউন্টসমূহ</h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Cloudflare D1-এ সংরক্ষিত অনুমোদিত প্রশাসনিক ইউজারবৃন্দ
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                {adminUsers.length} জন সক্রিয় ইউজার
              </span>
            </div>

            <div className="space-y-3">
              {adminUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-3.5 sm:p-4 rounded-xl bg-surface-elevated border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold flex items-center justify-center shrink-0 text-sm">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-primary text-sm">{user.name}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            user.role === "owner"
                              ? "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20"
                              : user.role === "admin"
                              ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                              : "bg-surface text-text-muted border border-border"
                          }`}
                        >
                          {user.role}
                        </span>
                        {user.isActive && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            অ্যাক্টিভ
                          </span>
                        )}
                      </div>
                      <div className="text-text-muted text-[11px] flex items-center gap-2 mt-0.5">
                        <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-[11px] text-text-muted space-y-0.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                    <div>
                      সর্বশেষ লগইন:{" "}
                      <span className="text-text-primary font-medium">
                        {user.lastLoginAt
                          ? new Date(user.lastLoginAt).toLocaleString("bn-BD")
                          : "লগইন রেকর্ড নেই"}
                      </span>
                    </div>
                    <div>
                      যোগদান:{" "}
                      <span>{new Date(user.createdAt).toLocaleDateString("bn-BD")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role Permissions Matrix */}
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              <h3 className="text-sm font-bold text-text-primary">রোল ও এক্সেস পারমিশন পলিসি</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-surface-elevated border border-border space-y-1.5">
                <div className="font-bold text-text-primary flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span>Owner (মালিক)</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  সর্বময় নিয়ন্ত্রণ। ডাটাবেস মাইগ্রেশন, অ্যাডমিন পরিচালনা, কোট অনুমোদন, এবং সিস্টেম সিকিউরিটির সর্বোচ্চ এক্সেস।
                </p>
              </div>

              <div className="p-3 rounded-lg bg-surface-elevated border border-border space-y-1.5">
                <div className="font-bold text-text-primary flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Admin (প্রশাসক)</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  সিআরএম ইনকোয়ারি ও লিড পরিচালনা, কোটেশন তৈরি, পেজ কনটেন্ট, মিডিয়া লাইব্রেরি এবং বিজনেস কনফিগারেশন এক্সেস।
                </p>
              </div>

              <div className="p-3 rounded-lg bg-surface-elevated border border-border space-y-1.5">
                <div className="font-bold text-text-primary flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span>Editor (সম্পাদক)</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  ব্লগ আর্টিকল লেখা ও সম্পাদনা, মিডিয়া আপলোড এবং কনটেন্ট ড্রাফট তৈরি করার সীমিত এক্সেস।
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  ওয়েবসাইটের নাম
                </label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  অফিসিয়াল ট্যাগলাইন
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    যোগাযোগ ইমেল
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    যোগাযোগ ফোন / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  অফিস ঠিকানা
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-text-primary">মেইনটেন্যান্স মোড</div>
                  <div className="text-[11px] text-text-muted">
                    চালু করলে ভিজিটরদের কাছে সাময়িক রক্ষণাবেক্ষণ বার্তা প্রদর্শিত হবে
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="h-4 w-4 rounded accent-accent"
                />
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  গ্লোবাল টাইটেল টেমপ্লেট
                </label>
                <input
                  type="text"
                  required
                  value={titleTemplate}
                  onChange={(e) => setTitleTemplate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  ডিফল্ট মেটা বিবরণ (Meta Description)
                </label>
                <textarea
                  rows={3}
                  required
                  value={defaultDescription}
                  onChange={(e) => setDefaultDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  ডিফল্ট কিওয়ার্ডস (কমা দিয়ে পৃথককৃত)
                </label>
                <input
                  type="text"
                  value={defaultKeywords}
                  onChange={(e) => setDefaultKeywords(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  ডিফল্ট ওপেন গ্রাফ (OG) সোশ্যাল ইমেজ URL
                </label>
                <input
                  type="text"
                  value={ogImageFallback}
                  onChange={(e) => setOgImageFallback(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  Facebook পেজ URL
                </label>
                <input
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  LinkedIn কোম্পানি প্রোফাইল URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  GitHub সংস্থা / প্রোফাইল URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    X / Twitter প্রোফাইল URL
                  </label>
                  <input
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://x.com/..."
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    YouTube চ্যানেল URL
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/@..."
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-surface-elevated border border-border space-y-1">
                <div className="text-xs font-bold text-text-primary">কনভার্সন ও ট্র্যাফিক ট্র্যাকিং</div>
                <p className="text-[11px] text-text-muted">
                  আপনার মেটা পিক্সেল ও গুগল অ্যানালিটিক্স আইডি প্রদান করুন। আইডি সেট করা থাকলে ট্র্যাকিং ট্যাগ স্বয়ংক্রিয়ভাবে একটিভ হবে।
                </p>
              </div>

              {/* Meta Pixel */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-text-primary">
                    Meta / Facebook Pixel ID
                  </label>
                  {metaPixelId.trim() ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <Check className="h-3 w-3" /> কনফিগার করা হয়েছে
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-surface text-text-muted border border-border">
                      সেটআপ প্রয়োজন
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  placeholder="যেমন: 123456789012345"
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              {/* Google Analytics 4 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-text-primary">
                    Google Analytics 4 (GA4) Measurement ID
                  </label>
                  {googleAnalyticsId.trim() ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <Check className="h-3 w-3" /> কনফিগার করা হয়েছে
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-surface text-text-muted border border-border">
                      সেটআপ প্রয়োজন
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  placeholder="যেমন: G-ABC123XYZ"
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              {/* Google Tag Manager */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-text-primary">
                    Google Tag Manager (GTM) Container ID
                  </label>
                  {gtmId.trim() ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <Check className="h-3 w-3" /> কনফিগার করা হয়েছে
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-surface text-text-muted border border-border">
                      ঐচ্ছিক
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={gtmId}
                  onChange={(e) => setGtmId(e.target.value)}
                  placeholder="যেমন: GTM-XXXXXXX"
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  অ্যাডমিন অ্যালার্ট ইমেল
                </label>
                <input
                  type="email"
                  required
                  value={adminAlertEmail}
                  onChange={(e) => setAdminAlertEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  ওয়েবহুক URL (Slack / Discord / Telegram ইনটিগ্রেশন)
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-text-primary">ইমেল ডেলিভারি অ্যালার্ট</div>
                  <div className="text-[11px] text-text-muted">
                    নতুন ইনকোয়ারি বা কোট জমা হলে স্বয়ংক্রিয় নোটিফিকেশন ইমেল প্রেরিত হবে
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlertsEnabled}
                  onChange={(e) => setEmailAlertsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded accent-accent"
                />
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-border flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px] cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>সংরক্ষণ হচ্ছে…</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  <span>সেটিংস সেভ করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
