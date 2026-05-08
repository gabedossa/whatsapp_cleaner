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
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#060b14] text-white sm:p-6 md:p-8">
      {/* Glows decorativos visíveis apenas no desktop, atrás do frame */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,229,160,0.09)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/4 rounded-full bg-[radial-gradient(ellipse,rgba(0,180,216,0.07)_0%,transparent_65%)]" />
        <div className="absolute bottom-1/3 left-0 h-60 w-60 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,229,160,0.05)_0%,transparent_65%)]" />
      </div>
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
