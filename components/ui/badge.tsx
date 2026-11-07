import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "success" | "warning" | "info" | "brand";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors border";

  const variants = {
    default: "bg-surface-muted text-text-secondary border-border",
    accent: "bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/15 dark:text-accent-text border-brand-orange/30 dark:border-accent/30 font-semibold",
    brand: "bg-brand-orange text-white border-transparent font-semibold shadow-xs",
    outline: "border-border text-text-secondary bg-surface/50",
    success: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25 font-medium",
    warning: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25 font-medium",
    info: "bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/25 font-medium",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}
