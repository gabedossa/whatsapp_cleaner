"use client";

import { useState, useEffect } from "react";
import type { Screen } from "@/types";
import CircularProgress from "@/components/CircularProgress";
import Counter from "@/components/Counter";

// ─────────────────────────────────────────────
// Tela: Conclusão
// Exibe o resumo do espaço liberado após a limpeza
// ─────────────────────────────────────────────

interface DoneScreenProps {
  onNavigate: (screen: Screen) => void;
  totalCleanedMB: number;
}

// Itens do resumo de ações realizadas
const SUMMARY_ITEMS = [
  "Mídias antigas removidas",
  "Cache de conversas limpo",
  "Arquivos temporários excluídos",
];

export default function DoneScreen({ onNavigate, totalCleanedMB }: DoneScreenProps) {
  // Anima o anel de progresso ao montar a tela
  const [ringPercent, setRingPercent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setRingPercent(100), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        animation: "fadeUp 0.4s ease",
        textAlign: "center",
      }}
    >
      {/* Anel de conclusão */}
      <CircularProgress percent={ringPercent} size={160} stroke={12} color="#00E5A0">
        <span style={{ fontSize: 48 }}>✨</span>
      </CircularProgress>

      <h2
        style={{
          color: "#fff",
          fontFamily: "'Syne', sans-serif",
          fontSize: 28,
          fontWeight: 800,
          margin: "28px 0 8px",
        }}
      >
        Limpeza Concluída!
      </h2>

      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          margin: "0 0 8px",
        }}
      >
        Você liberou
      </p>

      {/* Contador animado do espaço liberado */}
      <div
        style={{
          color: "#00E5A0",
          fontFamily: "'Syne', sans-serif",
          fontSize: 48,
          fontWeight: 900,
          margin: "4px 0 32px",
          textShadow: "0 0 40px rgba(0,229,160,0.5)",
        }}
      >
        <Counter target={totalCleanedMB} suffix=" MB" duration={1500} />
      </div>

      {/* Card: resumo das ações realizadas */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "20px 24px",
          width: "100%",
          marginBottom: 32,
          textAlign: "left",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
          }}
        >
          O que foi feito
        </div>

        {SUMMARY_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: i < SUMMARY_ITEMS.length - 1 ? 12 : 0,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                background: "rgba(0,229,160,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#00E5A0",
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            <span
              style={{
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Botão voltar ao início */}
      <button
        onClick={() => onNavigate("home")}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: 18,
          background: "linear-gradient(135deg, #00E5A0, #00B4D8)",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Syne', sans-serif",
          fontSize: 16,
          fontWeight: 800,
          color: "#0A0F1E",
          boxShadow: "0 8px 32px rgba(0,229,160,0.35)",
        }}
      >
        Voltar ao Início
      </button>
    </div>
  );
}
