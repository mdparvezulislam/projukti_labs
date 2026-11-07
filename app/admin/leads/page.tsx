import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getLeads } from "@/lib/crm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { LeadManager } from "./lead-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "লিড পাইপলাইন | Projukti Labs Admin",
};

export default async function AdminLeadsPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const initialLeads = await getLeads();

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="লিড পাইপলাইন"
      subtitle="সম্ভাব্য ক্লায়েন্টদের প্রজেক্ট অগ্রগতি, পর্যায়ক্রমিক স্টেজ ও বাজেট ট্র্যাকিং"
    >
      <LeadManager initialLeads={initialLeads} />
    </AdminLayoutShell>
  );
}

