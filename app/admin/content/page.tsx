import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import Link from "next/link";
import {
  LayoutTemplate,
  Briefcase,
  BookOpen,
  FolderKanban,
  HelpCircle,
  Image as ImageIcon,
  ArrowRight,
  Database,
} from "lucide-react";

export const metadata = {
  title: "ওয়েবসাইট সিএমএস | Projukti Labs Admin",
};

export default async function AdminContentHubPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const cmsSections = [
    {
      title: "পেজ ও সেকশন কনটেন্ট",
      description: "হোমপেজের হিরো শিরোনাম, সাবটাইটেল, ইঞ্জিনিয়ারিং মেট্রিক্স ও কল-টু-অ্যাকশন টেক্সট পরিবর্তন করুন।",
      icon: LayoutTemplate,
      href: "/admin/content/pages",
      countLabel: "হোমপেজ ও ল্যান্ডিং সেকশন",
    },
    {
      title: "সার্ভিস ও প্যাকেজ",
      description: "৩টি সক্রিয় লঞ্চ ক্যাটাগরি, ফ্ল্যাগশিপ প্যাকেজ, BDT মূল্য ও ডেলিভারেবলস আপডেট করুন।",
      icon: Briefcase,
      href: "/admin/content/services",
      countLabel: "৬টি সার্ভিস, ১৪টি প্যাকেজ",
    },
    {
      title: "ব্লগ ও নলেজ আর্টিকেল",
      description: "নতুন কারিগরি প্রবন্ধ লিখুন, ড্রাফট সেভ করুন, ট্যাগ এবং শিডিউল প্রকাশনা পরিচালনা করুন।",
      icon: BookOpen,
      href: "/admin/content/blog",
      countLabel: "৫টি প্রকাশিত পোস্ট",
    },
    {
      title: "মিডিয়া লাইব্রেরি ও স্টোরেজ",
      description: "ব্লগ কাভার ইমেজ, পোর্টফোলিও স্ক্রিনশট এবং ডিজিটাল অ্যাসেট ফাইল আপলোড ও ম্যানেজমেন্ট।",
      icon: ImageIcon,
      href: "/admin/media",
      countLabel: "ইমেজ ও ফাইল রিপোজিটরি",
    },
    {
      title: "পোর্টফোলিও ও কেস স্টাডি",
      description: "আর্কিটেকচারাল কনসেপ্ট, ব্লুপ্রিন্ট ও প্রোডাকশন কেস স্টাডির টেকনিক্যাল মেট্রিক্স এডিট করুন।",
      icon: FolderKanban,
      href: "/admin/content/portfolio",
      countLabel: "৪টি ব্লুপ্রিন্ট কেস স্টাডি",
    },
    {
      title: "সাধারণ জিজ্ঞাসা (FAQ)",
      description: "বাজেট, কোড ওনারশিপ, পেমেন্ট পদ্ধতি ও সিকিউরিটি সম্পর্কিত প্রশ্নোত্তর তৈরি ও সাজান।",
      icon: HelpCircle,
      href: "/admin/content/faqs",
      countLabel: "৭টি প্রশ্নোত্তর",
    },
  ];

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="ওয়েবসাইট কনটেন্ট ম্যানেজমেন্ট (CMS)"
      subtitle="সরাসরি Cloudflare D1 ডাটাবেস থেকে চালিত—সোর্স কোড পরিবর্তন ছাড়া লাইভ কনটেন্ট আপডেট করুন"
    >
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
            <Database className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-text-primary">
              ডাটাবেস-ড্রাইভেন সিএমএস আর্কিটেকচার
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              অ্যাডমিন প্যানেল থেকে করা প্রতিটি সেভ রিয়েল-টাইমে Cloudflare D1-এ সংরক্ষিত হয় এবং পাবলিক সাইটে প্রদর্শিত হয়।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cmsSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              className="bg-card border border-border rounded-xl p-4 sm:p-5 hover:border-border-hover transition-all flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-surface-elevated border border-border text-accent-text">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-accent-text bg-accent/15 border border-accent/20 px-2 py-0.5 rounded">
                    {sec.countLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-accent-text transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-accent">
                <span>ম্যানেজ করুন</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </AdminLayoutShell>
  );
}

