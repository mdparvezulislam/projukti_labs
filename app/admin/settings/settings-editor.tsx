"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Save, Globe, Shield, Bell } from "lucide-react";

interface SettingsEditorProps {
  initialSettings: Record<string, Record<string, unknown>>;
}

export function SettingsEditor({ initialSettings }: SettingsEditorProps) {
  const general = initialSettings.general || {};
  const seo = initialSettings.seo || {};
  const notifications = initialSettings.notifications || {};

  const [activeTab, setActiveTab] = useState<"general" | "seo" | "notifications">("general");

  // General state
  const [siteName, setSiteName] = useState(String(general.siteName || "Projukti Labs"));
  const [tagline, setTagline] = useState(String(general.tagline || "Building Digital Solutions. Engineering the Future."));
  const [contactEmail, setContactEmail] = useState(String(general.contactEmail || "contact@projuktilabs.tech"));
  const [contactPhone, setContactPhone] = useState(String(general.contactPhone || "+880 1700-000000"));
  const [address, setAddress] = useState(String(general.address || "Dhaka, Bangladesh"));
  const [maintenanceMode, setMaintenanceMode] = useState(Boolean(general.maintenanceMode));

  // SEO state
  const [titleTemplate, setTitleTemplate] = useState(String(seo.titleTemplate || "%s | Projukti Labs"));
  const [defaultDescription, setDefaultDescription] = useState(
    String(seo.defaultDescription || "Building Digital Solutions. Engineering the Future.")
  );

  // Notification state
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(Boolean(notifications.emailAlertsEnabled));
  const [adminAlertEmail, setAdminAlertEmail] = useState(String(notifications.adminAlertEmail || "contact@projuktilabs.tech"));

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      if (activeTab === "general") {
        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
          }),
        });
      } else if (activeTab === "seo") {
        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: "seo",
            value: {
              titleTemplate,
              defaultDescription,
            },
          }),
        });
      } else if (activeTab === "notifications") {
        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: "notifications",
            value: {
              emailAlertsEnabled,
              adminAlertEmail,
            },
          }),
        });
      }

      setStatusMessage("সেটিংস সফলভাবে D1 ডাটাবেসে সংরক্ষিত হয়েছে।");
    } catch {
      setStatusMessage("সেটিংস সংরক্ষণ ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 max-w-3xl">
      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 min-h-[44px] ${
            activeTab === "general"
              ? "border-accent text-accent"
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span>সাধারণ সেটিংস</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 min-h-[44px] ${
            activeTab === "seo"
              ? "border-accent text-accent"
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <Shield className="h-4 w-4" aria-hidden="true" />
          <span>এসইও সেটিংস</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 min-h-[44px] ${
            activeTab === "notifications"
              ? "border-accent text-accent"
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span>নোটিফিকেশন ও অ্যালার্ট</span>
        </button>
      </div>

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
                <div className="text-[11px] text-text-muted">চালু করলে ভিজিটরদের কাছে সাময়িক রক্ষণাবেক্ষণ বার্তা প্রদর্শিত হবে</div>
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

            <div className="pt-2 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-text-primary">ইমেল ডেলিভারি অ্যালার্ট</div>
                <div className="text-[11px] text-text-muted">
                  ইনকোয়ারি আসলে ইমেল পাঠানোর সুবিধা (ইমেল সার্ভিস প্রোভাইডার কনফিগারেশন সাপেক্ষে)
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px]"
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
    </div>
  );
}

