// ─────────────────────────────────────────────
// Tipos principais do WhatsApp Cleaner
// ─────────────────────────────────────────────

/** Representa uma conversa do WhatsApp */
export interface Conversation {
  id: number;
  name: string;
  avatar: string;       // Letra inicial para o avatar
  color: string;        // Cor do avatar em hex
  lastMsg: string;      // Ex: "há 45 dias"
  mediaCount: number;   // Quantidade de arquivos de mídia
  sizeMB: number;       // Tamanho em MB
  type: "group" | "contact";
  age: number;          // Dias desde a última mensagem
}

/** Configurações de limpeza do usuário */
export interface CleanerSettings {
  days: string;           // Período mínimo: "15 dias" | "30 dias" | "60 dias" | "90 dias"
  autoScan: boolean;      // Análise automática semanal
  keepStarred: boolean;   // Manter mensagens favoritas
  notification: boolean;  // Alertar ao ultrapassar 80%
  backup: boolean;        // Fazer backup antes de limpar
}

/** Telas disponíveis no app */
export type Screen = "home" | "scan" | "done" | "settings";

/** Estado global do app */
export interface AppState {
  screen: Screen;
  cleaned: number;          // Quantas conversas foram limpas
  totalCleanedMB: number;   // Total de MB liberados
  settings: CleanerSettings;
}

/** Props do componente Toast */
export interface ToastProps {
  message: string;
  visible: boolean;
}

/** Props do CircularProgress */
export interface CircularProgressProps {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: React.ReactNode;
}

/** Props do Counter animado */
export interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}
