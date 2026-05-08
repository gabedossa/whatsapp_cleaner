"use client";

import type { CleanerSettings, Screen } from "@/types";

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
  settings: CleanerSettings;
  setSettings: (updater: (prev: CleanerSettings) => CleanerSettings) => void;
}

type ToggleKey = Exclude<keyof CleanerSettings, "days">;
type SettingField =
  | {
      key: "days";
      label: string;
      sub: string;
      type: "select";
      options: string[];
    }
  | {
      key: ToggleKey;
      label: string;
      sub: string;
      type: "toggle";
    };

const settingFields: SettingField[] = [
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
    label: "Manter favoritas",
    sub: "Preservar mensagens marcadas",
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
    sub: "Exportar dados antes de excluir",
    type: "toggle",
  },
];

export default function SettingsScreen({
  onNavigate,
  settings,
  setSettings,
}: SettingsScreenProps) {
  const toggleField = (key: ToggleKey) => {
    setSettings((previous) => ({ ...previous, [key]: !previous[key] }));
  };

  const updateField = (value: string) => {
    setSettings((previous) => ({ ...previous, days: value }));
  };

  return (
    <div className="screen animate-fadeUp">
      <header className="mb-6 pt-5">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="focus-ring mb-5 inline-flex rounded-full px-1 py-1 text-sm font-bold text-white/[0.48] transition hover:text-white/75"
        >
          Voltar
        </button>
        <h2 className="title-lg">Configurações</h2>
        <p className="muted-copy mt-2">Ajuste como a limpeza deve se comportar.</p>
      </header>

      <div className="space-y-3">
        {settingFields.map((field) => (
          <section
            key={field.key}
            className="glass-card flex flex-col gap-4 p-4 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between"
          >
            <div className="min-w-0">
              <h3 className="text-[0.95rem] font-bold text-white">{field.label}</h3>
              <p className="mt-1 text-sm leading-snug text-white/[0.42]">{field.sub}</p>
            </div>

            {field.type === "toggle" ? (
              <button
                type="button"
                onClick={() => toggleField(field.key)}
                aria-label={`Alternar ${field.key}`}
                aria-pressed={settings[field.key]}
                className={`focus-ring relative h-8 w-[3.35rem] shrink-0 rounded-full transition ${
                  settings[field.key] ? "bg-mint" : "bg-white/[0.14]"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-lg transition ${
                    settings[field.key] ? "left-[1.55rem]" : "left-1"
                  }`}
                />
              </button>
            ) : (
              <select
                aria-label="Periodo minimo"
                value={settings.days}
                onChange={(event) => updateField(event.target.value)}
                className="focus-ring w-full shrink-0 rounded-xl border border-mint/30 bg-mint/[0.12] px-3 py-2 text-sm font-bold text-mint outline-none min-[380px]:w-auto"
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
