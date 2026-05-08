"use client";

import { useState, useEffect } from "react";
import type { Conversation, Screen } from "@/types";
import { MOCK_CONVERSATIONS } from "@/data/conversations";
import { formatSize, calcSelectedSize } from "@/utils/format";

// ─────────────────────────────────────────────
// Tela: Scan / Resultados
// Escaneia e lista conversas elegíveis para limpeza
// ─────────────────────────────────────────────

type FilterKey = "all" | "media" | "old";

interface ScanScreenProps {
  onNavigate: (screen: Screen) => void;
  onClean: (selected: Set<number>, totalMB: number) => void;
}

export default function ScanScreen({ onNavigate, onClean }: ScanScreenProps) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<FilterKey>("all");
  const [deleting, setDeleting] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  // Conversas com mais de 30 dias
  const eligible = conversations.filter((c) => c.age >= 30);

  // Total em MB das conversas selecionadas
  const totalSelectedMB = calcSelectedSize(selected, eligible);

  // Simula o progresso do scan
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setScanning(false), 300);
      }
      setProgress(Math.min(Math.round(p), 100));
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Selecionar / desselecionar uma conversa
  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Filtra conversas conforme a aba ativa
  const filtered = eligible.filter((c) => {
    if (filter === "media") return c.mediaCount > 100;
    if (filter === "old") return c.age > 60;
    return true;
  });

  const selectAll = () => setSelected(new Set(filtered.map((c) => c.id)));
  const clearAll = () => setSelected(new Set());

  // Anima e exclui as conversas selecionadas
  const handleDelete = () => {
    if (selected.size === 0 || deleting) return;
    setDeleting(true);
    const ids = [...selected];
    let i = 0;

    // Remove um item a cada 120ms para efeito visual
    const interval = setInterval(() => {
      setDeletingIds((prev) => new Set([...prev, ids[i]]));
      i++;
      if (i >= ids.length) {
        clearInterval(interval);
        setTimeout(() => {
          setConversations((prev) => prev.filter((c) => !selected.has(c.id)));
          onClean(selected, totalSelectedMB);
          onNavigate("done");
        }, 400);
      }
    }, 120);
  };

  // ── Tela de scanning ──
  if (scanning) {
    return (
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          animation: "fadeUp 0.4s ease",
        }}
      >
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16, animation: "pulse 1.5s ease infinite" }}>
            🔍
          </div>
          <h2
            style={{
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              margin: "0 0 8px",
            }}
          >
            Analisando...
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              margin: 0,
            }}
          >
            Verificando conversas e mídias
          </p>
        </div>

        {/* Barra de progresso */}
        <div style={{ width: "100%", maxWidth: 280 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 100,
              height: 6,
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #00E5A0, #00B4D8)",
                borderRadius: 100,
                transition: "width 0.2s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
            >
              {progress < 40
                ? "Lendo conversas..."
                : progress < 70
                ? "Calculando tamanhos..."
                : "Finalizando..."}
            </span>
            <span
              style={{
                color: "#00E5A0",
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── Tela de resultados ──
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        animation: "fadeUp 0.4s ease",
      }}
    >
      {/* Área scrollável */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        {/* Cabeçalho */}
        <div style={{ paddingTop: 60, marginBottom: 24 }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              padding: 0,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ← Voltar
          </button>
          <h2
            style={{
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              margin: "0 0 4px",
            }}
          >
            {eligible.length} conversas encontradas
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              margin: 0,
            }}
          >
            Com mais de 30 dias de inatividade
          </p>
        </div>

        {/* Filtros + Selecionar tudo */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {(
            [
              { key: "all", label: "Todas" },
              { key: "media", label: "Mais mídia" },
              { key: "old", label: "+60 dias" },
            ] as { key: FilterKey; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "8px 16px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: filter === f.key ? "#00E5A0" : "rgba(255,255,255,0.12)",
                background:
                  filter === f.key ? "rgba(0,229,160,0.15)" : "rgba(255,255,255,0.04)",
                color: filter === f.key ? "#00E5A0" : "rgba(255,255,255,0.6)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={selectAll}
              style={{
                padding: "8px 14px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "none",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Tudo
            </button>
            <button
              onClick={clearAll}
              style={{
                padding: "8px 14px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "none",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Nenhum
            </button>
          </div>
        </div>

        {/* Lista de conversas */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 16 }}>
          {filtered.map((conv, i) => {
            const isSelected = selected.has(conv.id);
            const isBeingDeleted = deletingIds.has(conv.id);

            return (
              <div
                key={conv.id}
                onClick={() => !deleting && toggleSelect(conv.id)}
                style={{
                  background: isSelected
                    ? "rgba(0,229,160,0.08)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    isSelected ? "rgba(0,229,160,0.35)" : "rgba(255,255,255,0.08)"
                  }`,
                  borderRadius: 18,
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: deleting ? "default" : "pointer",
                  transition: "all 0.2s",
                  overflow: "hidden",
                  // Animação de exclusão ao confirmar
                  animation: isBeingDeleted
                    ? "deleteOut 0.4s ease forwards"
                    : `fadeUp 0.3s ease ${i * 0.05}s both`,
                }}
              >
                {/* Avatar colorido */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: conv.color + "30",
                    border: `2px solid ${conv.color}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: conv.color,
                    flexShrink: 0,
                  }}
                >
                  {conv.avatar}
                </div>

                {/* Informações da conversa */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {conv.name}
                    </span>
                    <span
                      style={{
                        color: "#FF6B6B",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {formatSize(conv.sizeMB)}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      🕐 {conv.lastMsg}
                    </span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      📎 {conv.mediaCount} arquivos
                    </span>
                  </div>
                </div>

                {/* Checkbox de seleção */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 8,
                    border: `2px solid ${isSelected ? "#00E5A0" : "rgba(255,255,255,0.2)"}`,
                    background: isSelected ? "#00E5A0" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <span style={{ color: "#0A0F1E", fontSize: 14, fontWeight: 900 }}>✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Barra de ação fixa na parte inferior ── */}
      <div
        style={{
          flexShrink: 0,
          padding: "12px 20px 24px",
          background: "rgba(10,15,30,0.98)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Resumo de seleção */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
            }}
          >
            {selected.size === 0
              ? "Toque nas conversas para selecionar"
              : `${selected.size} conversa${selected.size > 1 ? "s" : ""} selecionada${
                  selected.size > 1 ? "s" : ""
                }`}
          </span>
          {selected.size > 0 && (
            <span
              style={{
                color: "#FF6B6B",
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {formatSize(totalSelectedMB)} a liberar
            </span>
          )}
        </div>

        {/* Botão de exclusão — sempre visível */}
        <button
          onClick={handleDelete}
          disabled={selected.size === 0 || deleting}
          onMouseDown={(e) => {
            if (selected.size > 0)
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 18,
            background:
              selected.size > 0
                ? "linear-gradient(135deg, #FF4757, #FF6B6B)"
                : "rgba(255,255,255,0.06)",
            border: selected.size > 0 ? "none" : "1px solid rgba(255,255,255,0.1)",
            cursor: selected.size > 0 ? "pointer" : "not-allowed",
            fontFamily: "'Syne', sans-serif",
            fontSize: 16,
            fontWeight: 800,
            color: selected.size > 0 ? "#fff" : "rgba(255,255,255,0.25)",
            letterSpacing: 0.4,
            boxShadow: selected.size > 0 ? "0 8px 28px rgba(255,71,87,0.4)" : "none",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {deleting ? (
            <>
              <span style={{ fontSize: 18, animation: "pulse 0.8s ease infinite" }}>🗑️</span>
              Excluindo conversas...
            </>
          ) : (
            <>
              <span style={{ fontSize: 18 }}>🗑️</span>
              {selected.size > 0
                ? `Excluir ${selected.size} conversa${selected.size > 1 ? "s" : ""}`
                : "Selecione conversas"}
            </>
          )}
        </button>
      </div>

      {/* Keyframes de exclusão */}
      <style>{`
        @keyframes deleteOut {
          0%   { opacity: 1; transform: translateX(0); max-height: 100px; }
          50%  { opacity: 0.2; transform: translateX(50px); }
          100% { opacity: 0; transform: translateX(80px); max-height: 0;
                 padding-top: 0; padding-bottom: 0; margin: 0; border-width: 0; }
        }
      `}</style>
    </div>
  );
}
