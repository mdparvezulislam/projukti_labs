import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCustomers } from "@/lib/crm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { UserCheck, Mail, Phone, Building } from "lucide-react";

export const metadata = {
  title: "গ্রাহক ডিরেক্টরি | Projukti Labs Admin",
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
      title="গ্রাহক ডিরেক্টরি"
      subtitle="ভেরিফাইড ক্লায়েন্ট রেকর্ড ও যোগাযোগের বিবরণ"
    >
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-text-primary">মোট গ্রাহক ও ক্লায়েন্ট</h3>
            <p className="text-xs text-text-muted">ইনকোয়ারি ও সফল প্রজেক্ট থেকে সংগৃহীত ভেরিফাইড ডাটা</p>
          </div>
          <span className="text-base font-black text-accent-text tabular-nums px-3 py-1 rounded bg-accent/15 border border-accent/20">
            {customersList.length} জন
          </span>
        </div>

        <div className="space-y-2.5">
          {customersList.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center text-xs text-text-muted flex flex-col items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-accent shadow-xs">
                <UserCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-text-primary text-sm">কোনো ক্লায়েন্ট রেকর্ড নেই</p>
                <p className="text-text-muted text-xs max-w-sm">ইনকোয়ারি জমা পড়লে অথবা লিড কনভার্ট হলে স্বয়ংক্রিয়ভাবে ক্লায়েন্ট প্রোফাইল তৈরি হবে।</p>
              </div>
            </div>
          ) : (
            customersList.map((customer) => (
              <div
                key={customer.id}
                className="bg-card border border-border rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-border-hover transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-text-primary truncate">
                      {customer.fullName}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      {customer.status}
                    </span>
                  </div>

                  <div className="text-xs text-text-muted mt-1 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" aria-hidden="true" />
                      <span>{customer.email}</span>
                    </span>
                    {customer.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" aria-hidden="true" />
                        <span>{customer.phone}</span>
                      </span>
                    )}
                    {customer.companyName && (
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" aria-hidden="true" />
                        <span>{customer.companyName}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right text-[11px] text-text-muted shrink-0">
                  যুক্ত হয়েছেন: {new Date(customer.createdAt).toLocaleDateString("bn-BD")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayoutShell>
  );
}

