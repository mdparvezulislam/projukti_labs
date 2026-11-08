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

  const [homeSections, aboutSections, founderSections, contactSections] = await Promise.all([
    getPageSections("home"),
    getPageSections("about"),
    getPageSections("founder"),
    getPageSections("contact"),
  ]);

  const initialSections = [...homeSections, ...aboutSections, ...founderSections, ...contactSections];

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="ওয়েবসাইট পেজ ও সেকশন এডিটর"
      subtitle="হোমপেজ, অ্যাবাউট, ফাউন্ডার প্রোফাইল ও যোগাযোগ পেজের টেক্সট ও কন্টেন্ট নিয়ন্ত্রণ"
    >
      <PageEditor initialSections={initialSections} />
    </AdminLayoutShell>
  );
}

