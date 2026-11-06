interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PocDynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#09090B", color: "#FAFAFA", minHeight: "100vh" }}>
      <h1 style={{ color: "#FFDF20" }}>POC: Dynamic Route (Next.js 16 Async Params)</h1>
      <p>
        Resolved Slug parameter: <strong>{slug}</strong>
      </p>
      <p>Verification: Next.js 16 async params successfully resolved.</p>
    </div>
  );
}

