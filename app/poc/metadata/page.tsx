import type { Metadata } from "next";

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
    <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#09090B", color: "#FAFAFA", minHeight: "100vh" }}>
      <h1 style={{ color: "#FFDF20" }}>POC: Metadata Verification</h1>
      <p>Inspect &lt;head&gt; tags to verify title, meta description, and OpenGraph headers rendered server-side.</p>
    </div>
  );
}

