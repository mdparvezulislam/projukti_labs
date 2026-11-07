import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";

export const instant = false;

export default async function AdminRootPage() {
  const auth = await getAdminSession();
  if (auth) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}

