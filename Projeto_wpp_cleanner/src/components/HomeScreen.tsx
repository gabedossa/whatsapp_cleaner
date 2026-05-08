"use client";

import CircularProgress from "@/components/CircularProgress";
import Counter from "@/components/Counter";
import { MOCK_CONVERSATIONS, TOTAL_STORAGE_MB } from "@/data/conversations";
import type { Screen } from "@/types";
import { formatSize, getStorageColor } from "@/utils/format";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  totalCleanedMB: number;
  cleanedCount: number;
}

const stats = [
  {
    key: "old",
    label: "Conversas antigas",
    sub: "+30 dias",
    accent: "text-amber",
  },
  {
    key: "space",
    label: "Liberável agora",
    sub: "estimado",
    accent: "text-coral",
  },
] as const;

export default function HomeScreen({
  onNavigate,
  totalCleanedMB,
  cleanedCount,
}: HomeScreenProps) {
  const usedMB = Math.max(0, TOTAL_STORAGE_MB - totalCleanedMB);
  const usedPercent = Math.round((usedMB / TOTAL_STORAGE_MB) * 100);
  const oldConversations = MOCK_CONVERSATIONS.filter((conversation) => conversation.age >= 30);
  const oldSizeMB = oldConversations.reduce((sum, conversation) => sum + conversation.sizeMB, 0);

  return (
    <div className="screen animate-fadeUp">
      <header className="mb-7 pt-5">
        <p className="eyebrow">Bem-vindo de volta</p>
        <h1 className="title-xl mt-1">Limpador WA</h1>
        <p className="muted-copy mt-2 max-w-[19rem]">
          Encontre conversas antigas, revise o que ocupa espaço e limpe em poucos toques.
        </p>
      </header>

      <section className="mb-4 rounded-[28px] border border-mint/20 bg-[linear-gradient(135deg,rgba(0,229,160,0.14),rgba(0,180,216,0.08))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
        <div className="flex items-center gap-5 max-[360px]:flex-col max-[360px]:items-start">
          <CircularProgress percent={usedPercent} color={getStorageColor(usedPercent)} size={128}>
            <div className="text-center">
              <div className="font-display text-2xl font-extrabold leading-none text-white">
                <Counter target={usedPercent} suffix="%" />
              </div>
              <div className="mt-1 text-[0.7rem] font-semibold text-white/45">usado</div>
            </div>
          </CircularProgress>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white/[0.58]">Armazenamento WhatsApp</p>
            <div className="mt-3">
              <div className="font-display text-2xl font-bold leading-none text-white">
                <Counter target={usedMB} /> MB
              </div>
              <p className="mt-1 text-xs font-medium text-white/40">de {TOTAL_STORAGE_MB} MB</p>
            </div>

            {totalCleanedMB > 0 && (
              <div className="mt-4 inline-flex max-w-full items-center rounded-xl bg-mint/[0.14] px-3 py-2 text-xs font-bold text-mint">
                {formatSize(totalCleanedMB)} liberados
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mb-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
        {stats.map((stat) => {
          const value = stat.key === "old" ? oldConversations.length : formatSize(oldSizeMB);

          return (
            <article key={stat.key} className="glass-card p-4">
              <div className={`font-display text-2xl font-extrabold ${stat.accent}`}>{value}</div>
              <p className="mt-1 text-sm font-semibold text-white/[0.64]">{stat.label}</p>
              <p className="mt-0.5 text-xs text-white/35">{stat.sub}</p>
            </article>
          );
        })}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <article className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Limpas</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-white">{cleanedCount}</p>
        </article>
        <article className="rounded-[18px] border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Economia</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-mint">
            {formatSize(totalCleanedMB)}
          </p>
        </article>
      </div>

      <div className="space-y-3">
        <button type="button" onClick={() => onNavigate("scan")} className="primary-action focus-ring">
          Analisar armazenamento
        </button>
        <button
          type="button"
          onClick={() => onNavigate("settings")}
          className="secondary-action focus-ring"
        >
          Configurações de limpeza
        </button>
      </div>
    </div>
  );
}
