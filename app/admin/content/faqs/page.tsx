import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCmsFaqs } from "@/lib/cms";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { FaqsManager } from "./faqs-manager";

export const metadata = {
  title: "সাধারণ জিজ্ঞাসা (FAQ) সিএমএস | Projukti Labs Admin",
};

export default async function AdminFaqsPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const initialFaqs = await getCmsFaqs();

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="সাধারণ জিজ্ঞাসা (FAQ) সিএমএস"
      subtitle="ওয়েবসাইটের প্রশ্নোত্তর তৈরি, আপডেট ও প্রদর্শনের ক্রম নিয়ন্ত্রণ"
    >
      <FaqsManager initialFaqs={initialFaqs} />
    </AdminLayoutShell>
  );
}

