"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// Hook: useCounter
// Anima um número de 0 até o valor alvo (target)
// ao longo de uma duração em milissegundos.
// ─────────────────────────────────────────────
export function useCounter(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reseta ao trocar de target
    setValue(0);
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
