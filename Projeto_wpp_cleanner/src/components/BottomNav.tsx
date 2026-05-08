"use client";

import type { Screen } from "@/types";

// ─────────────────────────────────────────────
// Componente: BottomNav
// Barra de navegação inferior com 3 abas.
// Exibida apenas nas telas home e settings.
// ─────────────────────────────────────────────

interface BottomNavProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
}

// Definição das abas de navegação
const TABS: { key: Screen; icon: string; label: string }[] = [
  { key: "home", icon: "🏠", label: "Início" },
  { key: "scan", icon: "🔍", label: "Analisar" },
  { key: "settings", icon: "⚙️", label: "Config" },
];

export default function BottomNav({ screen, onNavigate }: BottomNavProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(10,15,30,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        padding: "10px 0 20px",
        zIndex: 50,
      }}
    >
      {TABS.map((tab) => {
        const isActive = screen === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onNavigate(tab.key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            {/* Ícone com filtro de opacidade quando inativo */}
            <span
              style={{
                fontSize: 22,
                filter: isActive ? "none" : "grayscale(1) opacity(0.4)",
                transition: "filter 0.2s",
              }}
            >
              {tab.icon}
            </span>

            {/* Label */}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: isActive ? "#00E5A0" : "rgba(255,255,255,0.3)",
                transition: "color 0.2s",
              }}
            >
              {tab.label}
            </span>

            {/* Indicador de aba ativa */}
            {isActive && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 100,
                  background: "#00E5A0",
                  marginTop: 2,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
