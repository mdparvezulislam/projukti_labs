export default async function PocServerComponentPage() {
  const serverTime = new Date().toISOString();
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#09090B", color: "#FAFAFA", minHeight: "100vh" }}>
      <h1 style={{ color: "#FFDF20" }}>POC: Server Component (RSC)</h1>
      <p>Rendered at server timestamp: <code>{serverTime}</code></p>
      <p>Runtime verification: React Server Component evaluated cleanly on Cloudflare Workers / vinext.</p>
    </div>
  );
}

