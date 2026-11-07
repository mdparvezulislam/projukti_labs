import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCmsServices } from "@/lib/cms";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { ServicesManager } from "./services-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "সার্ভিস ও প্যাকেজ সিএমএস | Projukti Labs Admin",
};

export default async function AdminServicesPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const categories = await getCmsServices();

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="সার্ভিস ও প্যাকেজ সিএমএস"
      subtitle="সক্রিয় সার্ভিসসমূহ, টেকনিক্যাল ডেলিভারেবলস ও প্রাইসিং কনফিগারেশন"
    >
      <ServicesManager categories={categories} />
    </AdminLayoutShell>
  );
}

