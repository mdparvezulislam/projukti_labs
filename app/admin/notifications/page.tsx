import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getNotifications } from "@/lib/automation/processor";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { NotificationsView } from "./notifications-view";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "নোটিফিকেশন সেন্টার | Projukti Labs Admin",
};

export default async function AdminNotificationsPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const initialNotifications = await getNotifications(auth.user.id);

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="নোটিফিকেশন সেন্টার"
      subtitle="অ্যাডমিন অ্যালার্ট, ইনকোয়ারি ও ফলো-আপ নোটিফিকেশন"
      unreadCount={initialNotifications.filter((n) => !n.isRead).length}
    >
      <NotificationsView initialNotifications={initialNotifications} />
    </AdminLayoutShell>
  );
}

