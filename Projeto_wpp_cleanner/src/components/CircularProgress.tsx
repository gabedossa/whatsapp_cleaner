"use client";

import type { CircularProgressProps } from "@/types";

// ─────────────────────────────────────────────
// Componente: CircularProgress
// Anel SVG animado que exibe um percentual.
// Aceita children para renderizar conteúdo central.
// ─────────────────────────────────────────────
export default function CircularProgress({
  percent,
  size = 140,
  stroke = 10,
  color = "#00E5A0",
  children,
}: CircularProgressProps) {
  // Raio interno e circunferência para o cálculo do dashoffset
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG rotacionado -90° para iniciar no topo */}
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      >
        {/* Trilha (fundo) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
        />
        {/* Preenchimento animado */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>

      {/* Conteúdo central (children) */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
