import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getSiteSettings } from "@/lib/cms";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { SettingsEditor } from "./settings-editor";

export const metadata = {
  title: "বিজনেস সেটিংস | Projukti Labs Admin",
};

export default async function AdminSettingsPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const settings = await getSiteSettings();

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="বিজনেস ও ওয়েবসাইট সেটিংস"
      subtitle="স্টুডিওর সাধারণ তথ্য, এসইও পলিসি এবং নোটিফিকেশন কনফিগারেশন"
    >
      <SettingsEditor initialSettings={settings} />
    </AdminLayoutShell>
  );
}

