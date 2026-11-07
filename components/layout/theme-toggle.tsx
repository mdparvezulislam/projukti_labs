"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === "data-theme") {
        callback();
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    window.removeEventListener("storage", callback);
    observer.disconnect();
  };
}

function getSnapshot(): "dark" | "light" {
  if (typeof document === "undefined") return "light";
  const active = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
  if (active) return active;
  try {
    const stored = localStorage.getItem("projukti_theme") as "dark" | "light" | null;
    if (stored) return stored;
  } catch {
    // restricted storage fallback
  }
  return "light";
}

function getServerSnapshot(): "dark" | "light" {
  return "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("projukti_theme", next);
    } catch {
      // safe fallback if storage is restricted
    }
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex h-9.5 w-9.5 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-text-secondary hover:text-text-primary hover:bg-surface-muted shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      aria-label={`Switch to ${isMounted && theme === "dark" ? "light" : "dark"} theme`}
    >
      {isMounted && theme === "light" ? (
        <Moon className="h-4 w-4 text-text-primary transition-transform duration-300 hover:-rotate-12" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4 text-accent transition-transform duration-300 hover:rotate-45" aria-hidden="true" />
      )}
    </button>
  );
}
