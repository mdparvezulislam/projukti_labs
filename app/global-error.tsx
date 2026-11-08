"use client";

import * as React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex items-center justify-center p-6 bg-amber-50/20 text-neutral-900 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-200 p-8 text-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold mb-2">একটি অপ্রত্যাশিত ত্রুটি ঘটেছে</h2>
          <p className="text-sm text-neutral-600 mb-6">
            সিস্টেমে সাময়িক সমস্যা দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            পুনরায় লোড করুন
          </button>
        </div>
      </body>
    </html>
  );
}
