import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCustomers } from "@/lib/crm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { CustomerManager } from "@/components/admin/customers/customer-manager";

export const instant = false;

export const metadata = {
  title: "গ্রাহক ডিরেক্টরি | Projukti Labs Admin",
  description: "ক্লায়েন্ট প্রোফাইল, ইনকোয়ারি ও কোটেশন হিস্ট্রি এবং সিআরএম ডাটাবেস",
};

export default async function AdminCustomersPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const customersList = await getCustomers();

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="গ্রাহক ডিরেক্টরি ও সিআরএম"
      subtitle="ভেরিফাইড ক্লায়েন্ট রেকর্ড, ইনকোয়ারি হিস্ট্রি, কোটেশন ও কাস্টমার টাইমলাইন"
    >
      <CustomerManager initialCustomers={customersList} />
    </AdminLayoutShell>
  );
}
