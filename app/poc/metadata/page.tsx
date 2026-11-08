import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "POC Metadata Test | Projukti Labs",
  description: "Verifying dynamic and static metadata generation under vinext on Cloudflare Workers.",
  openGraph: {
    title: "POC Metadata Test",
    description: "Verifying dynamic metadata generation",
    url: "https://projuktilabs.tech/poc/metadata",
    siteName: "Projukti Labs",
  },
};

export default function PocMetadataPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-14 sm:px-6 lg:px-8 space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
        <Badge variant="accent">POC: METADATA &amp; SEO</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Metadata Verification
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          Inspect &lt;head&gt; tags to verify title, meta description, and OpenGraph headers rendered server-side.
        </p>
      </div>
    </div>
  );
}

