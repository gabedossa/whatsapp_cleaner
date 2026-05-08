export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  color: string;
  lastMsg: string;
  mediaCount: number;
  sizeMB: number;
  type: "group" | "contact";
  age: number;
}

export interface CleanerSettings {
  days: string;
  autoScan: boolean;
  keepStarred: boolean;
  notification: boolean;
  backup: boolean;
}

export type Screen = "home" | "scan" | "done" | "settings";

export interface AppState {
  screen: Screen;
  cleaned: number;
  totalCleanedMB: number;
  settings: CleanerSettings;
}

export interface ToastProps {
  message: string;
  visible: boolean;
}

export interface CircularProgressProps {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: React.ReactNode;
}

export interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}
