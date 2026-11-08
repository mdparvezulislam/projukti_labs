"use client";

import { useState, useEffect } from "react";
import { Customer, Inquiry, Quote, InternalNote } from "@/db/schema";
import {
  UserCheck,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Building,
  Calendar,
  Loader2,
  CheckCircle2,
  X,
  Send,
  User,
} from "lucide-react";
import Link from "next/link";

interface CustomerManagerProps {
  initialCustomers: Customer[];
}

interface CustomerDetailsResponse {
  customer: Customer;
  inquiries: Inquiry[];
  quotes: Quote[];
  notes: InternalNote[];
}

export function CustomerManager({ initialCustomers }: CustomerManagerProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Active customer selection & details
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsResponse | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "inquiries" | "quotes" | "notes">("overview");

  // New Customer Form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newStatus, setNewStatus] = useState<"lead" | "client" | "inactive">("client");
  const [newNotes, setNewNotes] = useState("");
  const [savingCustomer, setSavingCustomer] = useState(false);

  // Note addition state
  const [newNoteContent, setNewNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  // Status updating state
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch detailed history when a customer is selected
  useEffect(() => {
    if (!activeCustomer) return;

    let isMounted = true;
    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        const res = await fetch(`/api/admin/customers?id=${activeCustomer.id}`);
        const data = (await res.json()) as { success?: boolean; data?: CustomerDetailsResponse };
        if (isMounted && res.ok && data.success && data.data) {
          setCustomerDetails(data.data);
        }
      } catch {
        if (isMounted) setCustomerDetails(null);
      } finally {
        if (isMounted) setLoadingDetails(false);
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [activeCustomer]);

  const filteredCustomers = customers.filter((c) => {
    const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      c.fullName.toLowerCase().includes(s) ||
      c.email.toLowerCase().includes(s) ||
      (c.companyName && c.companyName.toLowerCase().includes(s));
    return matchesStatus && matchesSearch;
  });

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCustomer(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newName.trim(),
          email: newEmail.trim().toLowerCase(),
          phone: newPhone.trim() || null,
          companyName: newCompany.trim() || null,
          status: newStatus,
          notes: newNotes.trim() || null,
        }),
      });

      const data = (await res.json()) as { success?: boolean; data?: { customer?: Customer } };
      if (res.ok && data.success && data.data?.customer) {
        setCustomers([data.data.customer, ...customers]);
        setIsAddModalOpen(false);
        setNewName("");
        setNewEmail("");
        setNewPhone("");
        setNewCompany("");
        setNewNotes("");
        setStatusMessage("নতুন গ্রাহক প্রোফাইল সফলভাবে তৈরি হয়েছে।");
      } else {
        setStatusMessage("গ্রাহক তৈরি করা যায়নি। ইমেল ভেরিফিকেশন চেক করুন।");
      }
    } catch {
      setStatusMessage("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSavingCustomer(false);
    }
  };

  const handleStatusChange = async (newStat: "lead" | "client" | "inactive") => {
    if (!activeCustomer) return;
    setUpdatingStatus(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeCustomer.id, status: newStat }),
      });

      const data = (await res.json()) as { success?: boolean; data?: { customer?: Customer } };
      if (res.ok && data.success && data.data?.customer) {
        const updated = data.data.customer;
        setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setActiveCustomer(updated);
        setStatusMessage("গ্রাহক স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।");
      }
    } catch {
      setStatusMessage("স্ট্যাটাস আপডেট ব্যর্থ হয়েছে।");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCustomer || !newNoteContent.trim()) return;

    setAddingNote(true);
    try {
      const res = await fetch("/api/admin/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityType: "customer",
          entityId: activeCustomer.id,
          content: newNoteContent.trim(),
        }),
      });

      const data = (await res.json()) as { success?: boolean; data?: { note?: InternalNote } };
      if (res.ok && data.success && data.data?.note) {
        if (customerDetails) {
          setCustomerDetails({
            ...customerDetails,
            notes: [data.data.note, ...customerDetails.notes],
          });
        }
        setNewNoteContent("");
      }
    } catch {
      // Ignored
    } finally {
      setAddingNote(false);
    }
  };

  const statusBadge = (st: string) => {
    if (st === "client") {
      return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
          ক্লায়েন্ট (Client)
        </span>
      );
    }
    if (st === "lead") {
      return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-brand-orange-soft text-brand-orange-strong border border-brand-orange/30">
          লিড (Lead)
        </span>
      );
    }
    return (
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border border-zinc-500/30">
        নিষ্ক্রিয় (Inactive)
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Search & Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-warm-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, ইমেল বা কোম্পানি দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-text-muted shrink-0 hidden sm:block" aria-hidden="true" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
          >
            <option value="all">সকল গ্রাহক</option>
            <option value="client">ক্লায়েন্ট (Clients)</option>
            <option value="lead">লিড (Prospects)</option>
            <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
          </select>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover min-h-[44px]"
          >
            <Plus className="h-4 w-4" />
            <span>নতুন গ্রাহক</span>
          </button>
        </div>
      </div>

      {/* Status Message Alert */}
      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
          <button type="button" onClick={() => setStatusMessage(null)} className="p-1 text-text-muted hover:text-text-primary">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Grid: Customer Cards + Customer Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Customer List (7 cols) */}
        <div className="lg:col-span-7 space-y-2.5">
          {filteredCustomers.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-xs text-text-muted shadow-warm-sm flex flex-col items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-surface-muted border border-border flex items-center justify-center text-accent">
                <UserCheck className="h-6 w-6 text-brand-orange-strong dark:text-accent" />
              </div>
              <p className="font-semibold text-text-primary text-sm">কোনো গ্রাহক রেকর্ড পাওয়া যায়নি</p>
              <p className="text-text-muted max-w-sm text-xs">
                ইনকোয়ারি সাবমিট হলে অথবা নতুন গ্রাহক যোগ করলে তা এখানে স্বয়ংক্রিয়ভাবে তালিকাভুক্ত হবে।
              </p>
            </div>
          ) : (
            filteredCustomers.map((customer) => {
              const isSelected = activeCustomer?.id === customer.id;
              return (
                <div
                  key={customer.id}
                  onClick={() => {
                    setActiveCustomer(customer);
                    setCustomerDetails(null);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2 shadow-warm-sm ${
                    isSelected
                      ? "bg-accent/10 border-accent shadow-warm-md ring-1 ring-accent/30"
                      : "bg-card border-border hover:border-border-hover"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-text-primary">
                        {customer.fullName}
                      </span>
                      {statusBadge(customer.status)}
                    </div>
                    <span className="text-[11px] text-text-muted">
                      {new Date(customer.createdAt).toLocaleDateString("bn-BD")}
                    </span>
                  </div>

                  <div className="text-xs text-text-muted flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-accent shrink-0" />
                      <span className="truncate max-w-[200px]">{customer.email}</span>
                    </span>
                    {customer.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-accent shrink-0" />
                        <span>{customer.phone}</span>
                      </span>
                    )}
                    {customer.companyName && (
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-accent shrink-0" />
                        <span>{customer.companyName}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Customer Unified Detail Panel (5 cols) */}
        <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-5 space-y-4 shadow-warm-sm self-start">
          {activeCustomer ? (
            <div className="space-y-4">
              {/* Header Profile */}
              <div className="border-b border-border pb-3 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-text-primary">
                      {activeCustomer.fullName}
                    </h3>
                    {statusBadge(activeCustomer.status)}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {activeCustomer.companyName || "ব্যক্তিগত ক্লায়েন্ট"} • {activeCustomer.country}
                  </div>
                </div>

                <select
                  disabled={updatingStatus}
                  value={activeCustomer.status}
                  onChange={(e) => handleStatusChange(e.target.value as "lead" | "client" | "inactive")}
                  className="px-2.5 py-1 text-xs bg-surface-muted/80 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <option value="client">ক্লায়েন্ট (Client)</option>
                  <option value="lead">লিড (Lead)</option>
                  <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="space-y-1.5 text-xs text-text-muted bg-surface-muted/40 p-3 rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
                  <a href={`mailto:${activeCustomer.email}`} className="text-text-primary hover:underline truncate">
                    {activeCustomer.email}
                  </a>
                </div>
                {activeCustomer.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                    <a
                      href={`https://wa.me/${activeCustomer.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      className="text-text-primary hover:underline"
                    >
                      {activeCustomer.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>যুক্ত হয়েছেন: {new Date(activeCustomer.createdAt).toLocaleDateString("bn-BD")}</span>
                </div>
              </div>

              {/* Sub-Tabs: Inquiries, Quotes, Internal Notes */}
              <div className="flex items-center gap-1 border-b border-border pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "overview"
                      ? "bg-accent/15 text-brand-orange-strong dark:text-accent font-bold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  সারসংক্ষেপ
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("inquiries")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === "inquiries"
                      ? "bg-accent/15 text-brand-orange-strong dark:text-accent font-bold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <span>ইনকোয়ারি</span>
                  <span className="text-[10px] tabular-nums font-mono px-1 py-0.2 rounded bg-surface-muted">
                    {customerDetails?.inquiries.length ?? 0}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("quotes")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === "quotes"
                      ? "bg-accent/15 text-brand-orange-strong dark:text-accent font-bold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <span>কোটেশন</span>
                  <span className="text-[10px] tabular-nums font-mono px-1 py-0.2 rounded bg-surface-muted">
                    {customerDetails?.quotes.length ?? 0}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("notes")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === "notes"
                      ? "bg-accent/15 text-brand-orange-strong dark:text-accent font-bold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <span>নোটস</span>
                  <span className="text-[10px] tabular-nums font-mono px-1 py-0.2 rounded bg-surface-muted">
                    {customerDetails?.notes.length ?? 0}
                  </span>
                </button>
              </div>

              {/* Tab Contents */}
              {loadingDetails ? (
                <div className="py-8 text-center text-xs text-text-muted flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <span>গ্রাহক বিবরণ লোড হচ্ছে…</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 rounded-xl bg-surface-muted/40 border border-border">
                          <span className="text-[10px] text-text-muted block">মোট ইনকোয়ারি</span>
                          <span className="text-base font-bold text-text-primary tabular-nums">
                            {customerDetails?.inquiries.length ?? 0} টি
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-muted/40 border border-border">
                          <span className="text-[10px] text-text-muted block">মোট কোটেশন</span>
                          <span className="text-base font-bold text-text-primary tabular-nums">
                            {customerDetails?.quotes.length ?? 0} টি
                          </span>
                        </div>
                      </div>

                      {activeCustomer.notes && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-muted">গ্রাহক প্রোফাইল নোট</span>
                          <p className="p-3 bg-surface-muted/50 rounded-xl border border-border text-text-secondary leading-relaxed whitespace-pre-wrap">
                            {activeCustomer.notes}
                          </p>
                        </div>
                      )}

                      <div className="pt-2">
                        <Link
                          href={`/admin/quotes?clientName=${encodeURIComponent(activeCustomer.fullName)}&clientEmail=${encodeURIComponent(activeCustomer.email)}&clientPhone=${encodeURIComponent(activeCustomer.phone || "")}&clientCompany=${encodeURIComponent(activeCustomer.companyName || "")}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover min-h-[40px]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>এই গ্রাহকের জন্য কোটেশন তৈরি করুন</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Inquiries Tab */}
                  {activeTab === "inquiries" && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {customerDetails?.inquiries.length === 0 ? (
                        <div className="text-xs text-text-muted text-center py-6">
                          এই গ্রাহকের কোনো ইনকোয়ারি নেই।
                        </div>
                      ) : (
                        customerDetails?.inquiries.map((inq) => (
                          <div
                            key={inq.id}
                            className="p-3 rounded-xl bg-surface-muted/50 border border-border text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-brand-orange-strong dark:text-accent">
                                {inq.referenceCode}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border uppercase">
                                {inq.status}
                              </span>
                            </div>
                            <p className="text-text-secondary line-clamp-2 text-[11px] leading-relaxed">
                              {inq.projectBrief}
                            </p>
                            <div className="text-[10px] text-text-muted flex items-center justify-between pt-1">
                              <span>বাজেট: ৳{inq.budgetRange || "সাশ্রয়ী"}</span>
                              <span>{new Date(inq.createdAt).toLocaleDateString("bn-BD")}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Quotes Tab */}
                  {activeTab === "quotes" && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {customerDetails?.quotes.length === 0 ? (
                        <div className="text-xs text-text-muted text-center py-6">
                          এই গ্রাহককে কোনো কোটেশন পাঠানো হয়নি।
                        </div>
                      ) : (
                        customerDetails?.quotes.map((q) => (
                          <div
                            key={q.id}
                            className="p-3 rounded-xl bg-surface-muted/50 border border-border text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-text-primary">
                                {q.quoteNumber}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border uppercase">
                                {q.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] pt-1">
                              <span className="font-bold text-brand-orange-strong dark:text-accent tabular-nums">
                                ৳{q.totalBdt.toLocaleString("bn-BD")}
                              </span>
                              <span className="text-text-muted">
                                মেয়াদ: {new Date(q.validUntil).toLocaleDateString("bn-BD")}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Notes Tab */}
                  {activeTab === "notes" && (
                    <div className="space-y-3">
                      <form onSubmit={handleAddNote} className="space-y-2">
                        <textarea
                          rows={2}
                          value={newNoteContent}
                          onChange={(e) => setNewNoteContent(e.target.value)}
                          placeholder="গ্রাহক সম্পর্কিত ইন্টারনাল নোট লিখুন..."
                          className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                        />
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={addingNote || !newNoteContent.trim()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover disabled:opacity-50 min-h-[36px]"
                          >
                            {addingNote ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                            <span>নোট যোগ করুন</span>
                          </button>
                        </div>
                      </form>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {customerDetails?.notes.length === 0 ? (
                          <div className="text-[11px] text-text-muted text-center py-4">
                            এখনো কোনো নোট যুক্ত করা হয়নি।
                          </div>
                        ) : (
                          customerDetails?.notes.map((note) => (
                            <div
                              key={note.id}
                              className="p-2.5 rounded-xl bg-surface-muted/50 border border-border text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between text-[10px] text-text-muted">
                                <span className="font-semibold text-text-primary flex items-center gap-1">
                                  <User className="h-2.5 w-2.5" />
                                  {note.authorName}
                                </span>
                                <span>{new Date(note.createdAt).toLocaleDateString("bn-BD")}</span>
                              </div>
                              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap text-[11px]">
                                {note.content}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-text-muted flex flex-col items-center justify-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-surface-muted border border-border flex items-center justify-center text-accent/80 shadow-warm-sm">
                <UserCheck className="h-7 w-7 text-brand-orange-strong dark:text-accent" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-primary text-sm">গ্রাহক বিস্তারিত বিবরণ</p>
                <p className="text-text-muted text-xs max-w-[200px] leading-relaxed">
                  ইনকোয়ারি হিস্ট্রি, কোটেশন তালিকা ও ইন্টারনাল নোট দেখতে বাম পাশের তালিকা থেকে যেকোনো গ্রাহকে ক্লিক করুন।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-5 space-y-4 shadow-warm-xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-text-primary">নতুন গ্রাহক প্রোফাইল তৈরি</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  পুরো নাম *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. তানভীর আহমেদ"
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  ইমেল ঠিকানা *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-text-primary block mb-1">
                    ফোন / হোয়াটসঅ্যাপ
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+880 1700-000000"
                    className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-primary block mb-1">
                    স্ট্যাটাস
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as "lead" | "client" | "inactive")}
                    className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  >
                    <option value="client">ক্লায়েন্ট (Client)</option>
                    <option value="lead">লিড (Lead)</option>
                    <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  কোম্পানি / প্রতিষ্ঠান
                </label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. TechCorp Bangladesh"
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">
                  অভ্যন্তরীণ নোট
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="গ্রাহকের প্রয়োজন বা স্পেসিফিক রিকোয়ারমেন্ট..."
                  className="w-full px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-text-muted hover:text-text-primary"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={savingCustomer || !newName.trim() || !newEmail.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover disabled:opacity-50"
                >
                  {savingCustomer && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>যুক্ত করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
