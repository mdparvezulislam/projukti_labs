"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface AccordionItemProps {
  title?: string;
  question?: string;
  answer?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isOpenDefault?: boolean;
}

export function AccordionItem({
  title,
  question,
  answer,
  children,
  defaultOpen = false,
  isOpenDefault = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || isOpenDefault);
  const headingText = question || title;
  const content = children || answer;

  return (
    <div className="rounded-lg border border-border/80 bg-surface/30 px-5 py-4 transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-medium text-text-primary hover:text-accent transition-colors gap-4 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold">{headingText}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-text-muted transition-transform duration-200",
            isOpen && "rotate-180 text-accent"
          )}
        />
      </button>
      {isOpen && (
        <div className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-border/50 pt-3">
          {content}
        </div>
      )}
    </div>
  );
}
