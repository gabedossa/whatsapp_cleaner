"use client";

import type { ToastProps } from "@/types";

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`pointer-events-none absolute bottom-[5.8rem] left-1/2 z-50 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-mint px-5 py-3 text-center text-sm font-extrabold text-ink-900 shadow-mint transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
