import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCmsPortfolio } from "@/lib/cms";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { PortfolioManager } from "./portfolio-manager";

export const metadata = {
  title: "পোর্টফোলিও সিএমএস | Projukti Labs Admin",
};

export default async function AdminPortfolioPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const initialProjects = await getCmsPortfolio();

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="পোর্টফোলিও ও কেস স্টাডি সিএমএস"
      subtitle="আর্কিটেকচারাল ব্লুপ্রিন্ট ও টেকনিক্যাল সিস্টেম ডেমোনস্ট্রেশন পরিচালনা"
    >
      <PortfolioManager initialProjects={initialProjects} />
    </AdminLayoutShell>
  );
}

