"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PocClientComponentPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-14 sm:px-6 lg:px-8 space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
        <Badge variant="accent">POC: CLIENT COMPONENT</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Client Component Island
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          Interactive state verification on client hydration within Cloudflare Workers edge architecture.
        </p>
        <div className="pt-2">
          <Button
            type="button"
            variant="primary"
            onClick={() => setCount((c) => c + 1)}
            className="rounded-xl px-5 shadow-sm"
          >
            Clicks: {count}
          </Button>
        </div>
      </div>
    </div>
  );
}

