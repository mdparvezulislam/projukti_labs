import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getInquiries } from "@/lib/crm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { InquiryManager } from "./inquiry-manager";

export const metadata = {
  title: "ইনকোয়ারি ম্যানেজমেন্ট | Projukti Labs Admin",
};

export default async function AdminInquiriesPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const initialInquiries = await getInquiries({ limit: 100 });

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="ইনকোয়ারি ব্যবস্থাপনা"
      subtitle="ওয়েবসাইট ও ল্যান্ডিং পেজ থেকে জমা হওয়া প্রজেক্ট প্রস্তাবনা ও যোগাযোগ অনুরোধ"
    >
      <InquiryManager initialInquiries={initialInquiries} />
    </AdminLayoutShell>
  );
}

