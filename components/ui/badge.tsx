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
    accent: "bg-accent/10 text-accent border-accent/30 font-semibold",
    outline: "border-border text-text-secondary bg-transparent",
    success: "bg-success/10 text-success border-success/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    info: "bg-info/10 text-info border-info/30",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}
