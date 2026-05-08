"use client";

import type { Screen, CleanerSettings } from "@/types";

// ─────────────────────────────────────────────
// Tela: Configurações
// Permite ao usuário personalizar o comportamento
// da limpeza automática
// ─────────────────────────────────────────────

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
  settings: CleanerSettings;
  setSettings: (updater: (prev: CleanerSettings) => CleanerSettings) => void;
}

// Definição dos campos de configuração
type SettingField =
  | { key: keyof CleanerSettings; label: string; sub: string; type: "toggle" }
  | { key: keyof CleanerSettings; label: string; sub: string; type: "select"; options: string[] };

const SETTING_FIELDS: SettingField[] = [
  {
    key: "days",
    label: "Período mínimo",
    sub: "Limpar conversas mais antigas que...",
    type: "select",
    options: ["15 dias", "30 dias", "60 dias", "90 dias"],
  },
  {
    key: "autoScan",
    label: "Análise automática",
    sub: "Verificar semanalmente",
    type: "toggle",
  },
  {
    key: "keepStarred",
    label: "Manter mensagens favoritas",
    sub: "Não apagar mensagens com ★",
    type: "toggle",
  },
  {
    key: "notification",
    label: "Notificações",
    sub: "Alertar quando ultrapassar 80%",
    type: "toggle",
  },
  {
    key: "backup",
    label: "Backup antes de limpar",
    sub: "Exportar antes de excluir",
    type: "toggle",
  },
];

export default function SettingsScreen({
  onNavigate,
  settings,
  setSettings,
}: SettingsScreenProps) {
  // Alterna um campo booleano nas configurações
  const toggleField = (key: keyof CleanerSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Atualiza um campo string (select) nas configurações
  const updateField = (key: keyof CleanerSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: "0 20px 100px", animation: "fadeUp 0.4s ease" }}>
      {/* Cabeçalho */}
      <div style={{ paddingTop: 60, marginBottom: 28 }}>
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
            margin: 0,
          }}
        >
          Configurações
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          Personalize o comportamento da limpeza
        </p>
      </div>

      {/* Lista de campos */}
      {SETTING_FIELDS.map((field) => (
        <div
          key={field.key}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            padding: "18px 20px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Label e descrição */}
          <div>
            <div
              style={{
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {field.label}
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 2 }}>
              {field.sub}
            </div>
          </div>

          {/* Toggle ou Select */}
          {field.type === "toggle" ? (
            <div
              onClick={() => toggleField(field.key)}
              style={{
                width: 50,
                height: 28,
                borderRadius: 100,
                cursor: "pointer",
                position: "relative",
                background: settings[field.key] ? "#00E5A0" : "rgba(255,255,255,0.12)",
                transition: "background 0.3s",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: settings[field.key] ? 24 : 3,
                  width: 22,
                  height: 22,
                  borderRadius: 100,
                  background: "#fff",
                  transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          ) : (
            <select
              value={settings[field.key] as string}
              onChange={(e) => updateField(field.key, e.target.value)}
              style={{
                background: "rgba(0,229,160,0.15)",
                border: "1px solid rgba(0,229,160,0.3)",
                borderRadius: 10,
                color: "#00E5A0",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                padding: "6px 10px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {(field as { options: string[] }).options.map((opt) => (
                <option key={opt} value={opt} style={{ background: "#0A0F1E" }}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
