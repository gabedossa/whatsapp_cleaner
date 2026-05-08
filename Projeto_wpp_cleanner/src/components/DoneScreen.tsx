"use client";

import { useEffect, useState } from "react";
import CircularProgress from "@/components/CircularProgress";
import Counter from "@/components/Counter";
import type { Screen } from "@/types";

interface DoneScreenProps {
  onNavigate: (screen: Screen) => void;
  totalCleanedMB: number;
}

const summaryItems = [
  "Mídias antigas removidas",
  "Cache de conversas limpo",
  "Arquivos temporários excluídos",
];

export default function DoneScreen({ onNavigate, totalCleanedMB }: DoneScreenProps) {
  const [ringPercent, setRingPercent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setRingPercent(100), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="screen-tight flex flex-1 items-center justify-center animate-fadeUp">
      <div className="w-full max-w-5xl text-center md:grid md:grid-cols-[minmax(240px,0.8fr)_minmax(300px,1fr)] md:items-center md:gap-8 md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <CircularProgress percent={ringPercent} size={154} stroke={12} color="#00E5A0">
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-mint/[0.12] font-display text-3xl font-extrabold text-mint">
              ✓
            </div>
          </CircularProgress>

          <h2 className="title-xl mt-7">Limpeza concluída</h2>
          <p className="muted-copy mt-2">Você liberou</p>

          <div className="my-5 font-display text-5xl font-extrabold leading-none text-mint drop-shadow-[0_0_26px_rgba(0,229,160,0.34)] md:text-6xl">
            <Counter target={totalCleanedMB} suffix=" MB" duration={1500} />
          </div>
        </div>

        <div>
          <section className="glass-card mb-6 w-full p-5 text-left md:p-6">
            <p className="mb-4 text-sm font-semibold text-white/[0.48]">O que foi feito</p>
            <div className="space-y-3">
              {summaryItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-mint/[0.18] text-xs font-black text-mint">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-white">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="primary-action focus-ring md:max-w-sm"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
