import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGradientBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  chevron?: boolean;
}

export function AnimatedGradientBadge({
  children,
  icon,
  chevron = false,
  className,
  ...props
}: AnimatedGradientBadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-full group cursor-default transition-transform duration-200 hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {/* Rotating gradient background border layer */}
      <span
        className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#FF7D0C_0%,#FE9332_25%,transparent_50%,#FF7D0C_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#FFDF20_0%,#F59E0B_25%,transparent_50%,#FFDF20_100%)] opacity-75 group-hover:opacity-100 transition-opacity motion-reduce:hidden"
        aria-hidden="true"
      />

      {/* Reduced-motion static border fallback */}
      <span
        className="absolute inset-0 rounded-full border border-brand-orange/40 dark:border-accent/40 hidden motion-reduce:block"
        aria-hidden="true"
      />

      {/* Inner surface badge */}
      <span className="relative inline-flex items-center gap-2 rounded-full bg-surface-elevated/95 px-3.5 py-1 text-xs font-medium text-text-primary backdrop-blur-md transition-colors group-hover:bg-surface-elevated">
        {icon && <span className="inline-flex items-center text-brand-orange-strong dark:text-accent">{icon}</span>}
        <span className="font-semibold tracking-wide text-[11px] sm:text-xs">
          {children}
        </span>
        {chevron && (
          <svg
            className="h-3 w-3 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </span>
    </div>
  );
}

