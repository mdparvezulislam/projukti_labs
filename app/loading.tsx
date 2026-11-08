export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-border/80 border-t-accent animate-spin" />
          <div className="h-5 w-5 rounded-lg bg-surface border border-border flex items-center justify-center text-[10px] font-black font-mono text-accent">
            PL
          </div>
        </div>
        <p className="text-xs font-mono text-text-muted animate-pulse">
          লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}

