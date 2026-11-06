import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: "BDT" | "USD" = "BDT"): string {
  if (currency === "BDT") {
    return `৳${amount.toLocaleString("en-BD")}`;
  }
  return `$${amount.toLocaleString("en-US")}`;
}

