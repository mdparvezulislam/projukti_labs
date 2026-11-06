import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "success" | "warning" | "info";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors border";

  const variants = {
    default: "bg-surface-elevated text-text-secondary border-border",
    accent: "bg-accent/15 text-accent-text border-accent/30 font-semibold",
    outline: "border-border text-text-secondary bg-transparent",
    success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-medium",
    warning: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 font-medium",
    info: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 font-medium",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}

