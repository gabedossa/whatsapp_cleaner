"use client";

import { useState, useCallback } from "react";
import type { Screen, CleanerSettings } from "@/types";

// Componentes de tela
import HomeScreen from "@/components/HomeScreen";
import ScanScreen from "@/components/ScanScreen";
import DoneScreen from "@/components/DoneScreen";
import SettingsScreen from "@/components/SettingsScreen";

// Componentes de UI
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";

// ─────────────────────────────────────────────
// Configurações padrão do usuário
// ─────────────────────────────────────────────
const DEFAULT_SETTINGS: CleanerSettings = {
  days: "30 dias",
  autoScan: true,
  keepStarred: true,
  notification: true,
  backup: false,
};

// ─────────────────────────────────────────────
// Página principal — gerencia estado global e
// orquestra a navegação entre telas
// ─────────────────────────────────────────────
export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [cleanedCount, setCleanedCount] = useState(0);
  const [totalCleanedMB, setTotalCleanedMB] = useState(0);
  const [lastCleanedMB, setLastCleanedMB] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [settings, setSettings] = useState<CleanerSettings>(DEFAULT_SETTINGS);

  // Exibe o toast por 2.5 segundos
  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  }, []);

  // Callback ao concluir a limpeza — atualiza contadores
  const handleClean = useCallback(
    (selected: Set<number>, totalMB: number) => {
      setCleanedCount((c) => c + selected.size);
      setTotalCleanedMB((t) => t + totalMB);
      setLastCleanedMB(totalMB);
      showToast(`${selected.size} conversa${selected.size > 1 ? "s" : ""} excluída${selected.size > 1 ? "s" : ""} com sucesso`);
    },
    [showToast]
  );

  // A barra de navegação aparece apenas em home e settings
  const showBottomNav = screen === "home" || screen === "settings";

  return (
    <>
      {/* Shell do celular — centralizado, máx 390px */}
      <div
        style={{
          maxWidth: 390,
          margin: "0 auto",
          height: "100vh",
          background: "#0A0F1E",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Glow ambiente — decorativo */}
        <div
          style={{
            position: "fixed",
            top: -100,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: 100,
            left: -100,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Barra de status (simulada) */}
        <div
          style={{
            position: "relative",
            zIndex: 100,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            background: "rgba(10,15,30,0.8)",
            backdropFilter: "blur(10px)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            9:41
          </span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["▋▋▋", "📶", "🔋"].map((icon, idx) => (
              <span key={idx} style={{ fontSize: 12, opacity: 0.7 }}>
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* Conteúdo da tela — ocupa o espaço restante */}
        <div
          style={{
            flex: 1,
            overflow: screen === "scan" ? "hidden" : "auto",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {screen === "home" && (
            <HomeScreen onNavigate={setScreen} totalCleanedMB={totalCleanedMB} />
          )}
          {screen === "scan" && (
            <ScanScreen onNavigate={setScreen} onClean={handleClean} />
          )}
          {screen === "done" && (
            <DoneScreen onNavigate={setScreen} totalCleanedMB={lastCleanedMB} />
          )}
          {screen === "settings" && (
            <SettingsScreen
              onNavigate={setScreen}
              settings={settings}
              setSettings={setSettings}
            />
          )}
        </div>

        {/* Barra de navegação inferior */}
        {showBottomNav && <BottomNav screen={screen} onNavigate={setScreen} />}

        {/* Toast de confirmação */}
        <Toast message={toast.message} visible={toast.visible} />
      </div>
    </>
  );
}
