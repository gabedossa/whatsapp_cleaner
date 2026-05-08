"use client";

import type { Screen } from "@/types";

interface BottomNavProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
}

const tabs: { key: Screen; icon: string; label: string }[] = [
  { key: "home", icon: "⌂", label: "Início" },
  { key: "scan", icon: "⌕", label: "Analisar" },
  { key: "settings", icon: "⚙", label: "Config" },
];

export default function BottomNav({ screen, onNavigate }: BottomNavProps) {
  return (
    <nav className="relative z-20 shrink-0 border-t border-white/[0.07] bg-ink-900/95 px-3 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-2 backdrop-blur md:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-xl grid-cols-3 gap-1">
        {tabs.map((tab) => {
          const isActive = screen === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onNavigate(tab.key)}
              className={`focus-ring flex min-h-[3.25rem] flex-col items-center justify-center rounded-2xl px-2 py-1 transition ${
                isActive ? "bg-mint/10 text-mint" : "text-white/[0.36] hover:bg-white/[0.05]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="text-xl leading-none" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="mt-1 text-[0.7rem] font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
