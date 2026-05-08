"use client";

import { useCallback, useState } from "react";
import type { CleanerSettings, Screen } from "@/types";

import BottomNav from "@/components/BottomNav";
import DoneScreen from "@/components/DoneScreen";
import HomeScreen from "@/components/HomeScreen";
import ScanScreen from "@/components/ScanScreen";
import SettingsScreen from "@/components/SettingsScreen";
import Toast from "@/components/Toast";

const DEFAULT_SETTINGS: CleanerSettings = {
  days: "30 dias",
  autoScan: true,
  keepStarred: true,
  notification: true,
  backup: false,
};

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [cleanedCount, setCleanedCount] = useState(0);
  const [totalCleanedMB, setTotalCleanedMB] = useState(0);
  const [lastCleanedMB, setLastCleanedMB] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [settings, setSettings] = useState<CleanerSettings>(DEFAULT_SETTINGS);

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 2500);
  }, []);

  const handleClean = useCallback(
    (selected: Set<number>, totalMB: number) => {
      setCleanedCount((count) => count + selected.size);
      setTotalCleanedMB((total) => total + totalMB);
      setLastCleanedMB(totalMB);
      showToast(
        `${selected.size} conversa${selected.size > 1 ? "s" : ""} removida${
          selected.size > 1 ? "s" : ""
        }`
      );
    },
    [showToast]
  );

  const showBottomNav = screen === "home" || screen === "settings";

  return (
    <main className="grid min-h-dvh place-items-center overflow-hidden bg-[linear-gradient(135deg,#050914_0%,#08111b_45%,#0a0f1e_100%)] text-white sm:p-6">
      <div className="app-surface">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(0,229,160,0.08)_0%,transparent_34%),linear-gradient(140deg,rgba(0,180,216,0.07)_0%,transparent_26%),linear-gradient(0deg,rgba(255,255,255,0.025),rgba(255,255,255,0))]" />

        <div
          className={`relative z-10 flex min-h-0 flex-1 flex-col ${
            screen === "scan" ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {screen === "home" && (
            <HomeScreen
              onNavigate={setScreen}
              totalCleanedMB={totalCleanedMB}
              cleanedCount={cleanedCount}
            />
          )}
          {screen === "scan" && <ScanScreen onNavigate={setScreen} onClean={handleClean} />}
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

        {showBottomNav && <BottomNav screen={screen} onNavigate={setScreen} />}
        <Toast message={toast.message} visible={toast.visible} />
      </div>
    </main>
  );
}
