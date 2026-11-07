import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getPageSections } from "@/lib/cms";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { PageEditor } from "./page-editor";

export const instant = false;

export const metadata = {
  title: "পেজ ও সেকশন এডিটর | Projukti Labs Admin",
};

export default async function AdminPagesPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const initialSections = await getPageSections("home");

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="হোমপেজ ও সেকশন এডিটর"
      subtitle="ওয়েবসাইটের প্রধান হিরো টেক্সট, সাবটাইটেল এবং অ্যাকশন বাটন নিয়ন্ত্রণ"
    >
      <PageEditor initialSections={initialSections} />
    </AdminLayoutShell>
  );
}

