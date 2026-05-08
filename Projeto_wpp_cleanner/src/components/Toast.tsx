"use client";

import type { ToastProps } from "@/types";

// ─────────────────────────────────────────────
// Componente: Toast
// Notificação flutuante que aparece na parte
// inferior da tela ao concluir uma ação.
// ─────────────────────────────────────────────
export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 90,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
        background: "#00E5A0",
        color: "#0A0F1E",
        padding: "12px 24px",
        borderRadius: 100,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        zIndex: 999,
        boxShadow: "0 8px 32px rgba(0,229,160,0.4)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      ✓ {message}
    </div>
  );
}
