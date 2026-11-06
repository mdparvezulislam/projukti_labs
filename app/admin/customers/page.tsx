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
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-text-primary">মোট গ্রাহক ও ক্লায়েন্ট</h3>
            <p className="text-xs text-text-muted">ইনকোয়ারি ও সফল প্রজেক্ট থেকে সংগৃহীত ভেরিফাইড ডাটা</p>
          </div>
          <span className="text-base font-black text-accent tabular-nums px-3 py-1 rounded bg-accent/10 border border-accent/20">
            {customersList.length} জন
          </span>
        </div>

        <div className="space-y-2.5">
          {customersList.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted flex flex-col items-center gap-2">
              <UserCheck className="h-8 w-8 text-text-muted/40" aria-hidden="true" />
              <span>এখনো কোনো ক্লায়েন্ট রেকর্ড নেই। ইনকোয়ারি জমা পড়লে স্বয়ংক্রিয়ভাবে ক্লায়েন্ট প্রোফাইল তৈরি হবে।</span>
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
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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

