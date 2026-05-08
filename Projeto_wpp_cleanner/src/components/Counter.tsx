"use client";

import { useCounter } from "@/hooks/useCounter";
import type { CounterProps } from "@/types";

// ─────────────────────────────────────────────
// Componente: Counter
// Exibe um número que anima de 0 até `target`.
// ─────────────────────────────────────────────
export default function Counter({ target, suffix = "", duration = 1200 }: CounterProps) {
  const value = useCounter(target, duration);
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
