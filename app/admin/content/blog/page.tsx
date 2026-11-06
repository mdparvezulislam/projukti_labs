import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCmsBlogPosts } from "@/lib/cms";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { BlogManager } from "./blog-manager";
import { BlogPostEntity } from "@/db/schema";

export const metadata = {
  title: "ব্লগ ইঞ্জিন সিএমএস | Projukti Labs Admin",
};

export default async function AdminBlogPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const posts = (await getCmsBlogPosts()) as unknown as BlogPostEntity[];

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="ব্লগ ইঞ্জিন ও নলেজ প্ল্যাটফর্ম সিএমএস"
      subtitle="প্রবন্ধ লেখা, ড্রাফট সংরক্ষণ, শিডিউলিং ও এসইও মেটাডাটা ব্যবস্থাপনা"
    >
      <BlogManager initialPosts={posts} />
    </AdminLayoutShell>
  );
}

