import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getQuotes } from "@/lib/crm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { QuoteManager } from "./quote-manager";

export const metadata = {
  title: "কোটেশন ম্যানেজমেন্ট | Projukti Labs Admin",
};

export default async function AdminQuotesPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const initialQuotes = await getQuotes();

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="কোটেশন ব্যবস্থাপনা"
      subtitle="ক্লায়েন্টদের জন্য প্রজেক্ট প্রাইসিং, মাইলফলক ও প্রপোজাল কোট জেনারেশন"
    >
      <QuoteManager initialQuotes={initialQuotes} />
    </AdminLayoutShell>
  );
}

