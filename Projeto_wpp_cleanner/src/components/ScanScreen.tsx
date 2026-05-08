"use client";

import { useEffect, useState } from "react";
import { MOCK_CONVERSATIONS } from "@/data/conversations";
import type { Conversation, Screen } from "@/types";
import { calcSelectedSize, formatSize } from "@/utils/format";

type FilterKey = "all" | "media" | "old";

interface ScanScreenProps {
  onNavigate: (screen: Screen) => void;
  onClean: (selected: Set<number>, totalMB: number) => void;
}

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "media", label: "Mais mídia" },
  { key: "old", label: "+60 dias" },
];

export default function ScanScreen({ onNavigate, onClean }: ScanScreenProps) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<FilterKey>("all");
  const [deleting, setDeleting] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  const eligible = conversations.filter((conversation) => conversation.age >= 30);
  const totalSelectedMB = calcSelectedSize(selected, eligible);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 18 + 8;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setScanning(false), 300);
      }
      setProgress(Math.min(Math.round(currentProgress), 100));
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const toggleSelect = (id: number) => {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filtered = eligible.filter((conversation) => {
    if (filter === "media") return conversation.mediaCount > 100;
    if (filter === "old") return conversation.age > 60;
    return true;
  });

  const selectAll = () => setSelected(new Set(filtered.map((conversation) => conversation.id)));
  const clearAll = () => setSelected(new Set());

  const handleDelete = () => {
    if (selected.size === 0 || deleting) return;

    setDeleting(true);
    const ids = [...selected];
    let index = 0;

    const interval = setInterval(() => {
      setDeletingIds((previous) => new Set([...previous, ids[index]]));
      index += 1;

      if (index >= ids.length) {
        clearInterval(interval);
        setTimeout(() => {
          setConversations((previous) =>
            previous.filter((conversation) => !selected.has(conversation.id))
          );
          onClean(selected, totalSelectedMB);
          onNavigate("done");
        }, 400);
      }
    }, 120);
  };

  if (scanning) {
    const status =
      progress < 40
        ? "Lendo conversas..."
        : progress < 70
        ? "Calculando tamanhos..."
        : "Finalizando...";

    return (
      <div className="screen-tight flex flex-1 flex-col items-center justify-center text-center animate-fadeUp md:py-12">
        <div className="mb-9">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border border-mint/20 bg-mint/10 text-3xl font-black text-mint animate-softPulse">
            <span aria-hidden="true">⌕</span>
          </div>
          <h2 className="title-lg">Analisando</h2>
          <p className="muted-copy mt-2">Verificando conversas, anexos e arquivos antigos.</p>
        </div>

        <div className="w-full max-w-[300px] md:max-w-[420px]">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mint to-cyan transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <span className="truncate text-white/45">{status}</span>
            <span className="font-display font-bold text-mint">{progress}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col animate-fadeUp">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <header className="mb-5 pt-8 lg:pt-10">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="focus-ring mb-5 inline-flex items-center rounded-full px-1 py-1 text-sm font-bold text-white/[0.48] transition hover:text-white/75"
          >
            Voltar
          </button>
          <h2 className="title-lg">{eligible.length} conversas encontradas</h2>
          <p className="muted-copy mt-2">Com mais de 30 dias de inatividade.</p>
        </header>

        <div className="mb-5 space-y-3 md:flex md:items-end md:justify-between md:gap-4 md:space-y-0">
          <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
            {filters.map((item) => {
              const active = filter === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  className={`focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                    active
                      ? "border-mint bg-mint/[0.14] text-mint"
                      : "border-white/10 bg-white/[0.045] text-white/[0.58] hover:bg-white/[0.07]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 md:w-56 md:shrink-0">
            <button
              type="button"
              onClick={selectAll}
              className="focus-ring rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/55 transition hover:bg-white/[0.06]"
            >
              Tudo
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="focus-ring rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/55 transition hover:bg-white/[0.06]"
            >
              Nenhum
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pb-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((conversation, index) => {
            const isSelected = selected.has(conversation.id);
            const isBeingDeleted = deletingIds.has(conversation.id);

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => !deleting && toggleSelect(conversation.id)}
                className={`focus-ring flex w-full items-center gap-3 overflow-hidden rounded-[20px] border p-4 text-left transition ${
                  isSelected
                    ? "border-mint/40 bg-mint/[0.08]"
                    : "border-white/10 bg-white/[0.045] hover:bg-white/[0.07]"
                } ${isBeingDeleted ? "animate-deleteOut" : "animate-fadeUp"}`}
                style={{ animationDelay: isBeingDeleted ? "0ms" : `${index * 42}ms` }}
                disabled={deleting && !isSelected}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-lg font-black"
                  style={{
                    backgroundColor: `${conversation.color}24`,
                    borderColor: `${conversation.color}66`,
                    color: conversation.color,
                  }}
                >
                  {conversation.avatar}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex min-w-0 items-start justify-between gap-3">
                    <span className="truncate text-[0.95rem] font-bold text-white">
                      {conversation.name}
                    </span>
                    <span className="shrink-0 font-display text-sm font-bold text-coral">
                      {formatSize(conversation.sizeMB)}
                    </span>
                  </span>
                  <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-white/[0.42]">
                    <span>{conversation.lastMsg}</span>
                    <span>{conversation.mediaCount} arquivos</span>
                  </span>
                </span>

                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 text-xs font-black transition ${
                    isSelected
                      ? "border-mint bg-mint text-ink-900"
                      : "border-white/20 bg-transparent text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <footer className="shrink-0 border-t border-white/[0.07] bg-ink-900/95 px-5 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-3 backdrop-blur sm:px-6 md:px-8 lg:flex lg:items-center lg:gap-6 lg:px-10 lg:pb-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm lg:mb-0 lg:flex-1">
          <span className="text-white/50">
            {selected.size === 0
              ? "Toque nas conversas para selecionar"
              : `${selected.size} conversa${selected.size > 1 ? "s" : ""} selecionada${
                  selected.size > 1 ? "s" : ""
                }`}
          </span>
          {selected.size > 0 && (
            <span className="font-display font-bold text-coral">
              {formatSize(totalSelectedMB)} a liberar
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={selected.size === 0 || deleting}
          className={`focus-ring primary-action lg:max-w-sm ${
            selected.size > 0
              ? "bg-gradient-to-r from-danger to-coral text-white shadow-danger"
              : ""
          }`}
        >
          {deleting
            ? "Excluindo conversas..."
            : selected.size > 0
            ? `Excluir ${selected.size} conversa${selected.size > 1 ? "s" : ""}`
            : "Selecione conversas"}
        </button>
      </footer>
    </div>
  );
}
