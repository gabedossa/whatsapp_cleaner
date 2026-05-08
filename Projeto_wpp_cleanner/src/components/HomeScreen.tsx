"use client";

import type { Screen } from "@/types";
import { MOCK_CONVERSATIONS, TOTAL_STORAGE_MB } from "@/data/conversations";
import { formatSize, getStorageColor } from "@/utils/format";
import CircularProgress from "@/components/CircularProgress";
import Counter from "@/components/Counter";

// ─────────────────────────────────────────────
// Tela: Home / Dashboard
// Exibe o resumo de armazenamento e atalhos
// ─────────────────────────────────────────────

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  totalCleanedMB: number;
}

export default function HomeScreen({ onNavigate, totalCleanedMB }: HomeScreenProps) {
  // Calcula armazenamento usado descontando o que foi limpo
  const usedMB = Math.max(0, TOTAL_STORAGE_MB - totalCleanedMB);
  const usedPercent = Math.round((usedMB / TOTAL_STORAGE_MB) * 100);

  // Conversas elegíveis (mais de 30 dias)
  const oldConversations = MOCK_CONVERSATIONS.filter((c) => c.age >= 30);
  const oldSizeMB = oldConversations.reduce((sum, c) => sum + c.sizeMB, 0);

  return (
    <div style={{ padding: "0 20px 100px", animation: "fadeUp 0.4s ease" }}>
      {/* Cabeçalho */}
      <div style={{ paddingTop: 60, marginBottom: 32 }}>
        <p
          style={{
            color: "#00E5A0",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Bem-vindo de volta
        </p>
        <h1
          style={{
            color: "#fff",
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            margin: "4px 0 0",
          }}
        >
          Limpador WA
        </h1>
      </div>

      {/* Card do anel de armazenamento */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0,229,160,0.12), rgba(0,149,255,0.08))",
          border: "1px solid rgba(0,229,160,0.2)",
          borderRadius: 24,
          padding: "28px 24px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginBottom: 20,
        }}
      >
        <CircularProgress percent={usedPercent} color={getStorageColor(usedPercent)}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#fff",
                fontFamily: "'Syne', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              <Counter target={usedPercent} suffix="%" />
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>usado</div>
          </div>
        </CircularProgress>

        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 12,
            }}
          >
            Armazenamento WhatsApp
          </div>
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                color: "#fff",
                fontFamily: "'Syne', sans-serif",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              <Counter target={usedMB} /> MB
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
              de {TOTAL_STORAGE_MB} MB
            </div>
          </div>

          {/* Badge de espaço liberado (exibido após limpeza) */}
          {totalCleanedMB > 0 && (
            <div
              style={{
                background: "rgba(0,229,160,0.15)",
                borderRadius: 8,
                padding: "6px 10px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "#00E5A0", fontSize: 12, fontWeight: 600 }}>
                ↓ {formatSize(totalCleanedMB)} liberados
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Cards de estatísticas rápidas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[
          {
            label: "Conversas antigas",
            value: oldConversations.length,
            sub: "+30 dias",
            color: "#FFE66D",
            icon: "💬",
          },
          {
            label: "Liberável agora",
            value: formatSize(oldSizeMB),
            sub: "estimado",
            color: "#FF6B6B",
            icon: "🗑️",
          },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "20px 16px",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
            <div
              style={{
                color: stat.color,
                fontFamily: "'Syne', sans-serif",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {stat.value}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 2 }}>
              {stat.label}
            </div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Botão principal: Analisar */}
      <button
        onClick={() => onNavigate("scan")}
        onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)")}
        onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
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
          letterSpacing: 0.5,
          boxShadow: "0 8px 32px rgba(0,229,160,0.35)",
          transition: "transform 0.15s, box-shadow 0.15s",
          marginBottom: 12,
        }}
      >
        ⚡ Analisar Armazenamento
      </button>

      {/* Botão secundário: Configurações */}
      <button
        onClick={() => onNavigate("settings")}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: 0.3,
          transition: "background 0.2s",
        }}
      >
        ⚙️ Configurações de Limpeza
      </button>
    </div>
  );
}
