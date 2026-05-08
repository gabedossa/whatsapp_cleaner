import type { Conversation } from "@/types";

// ─────────────────────────────────────────────
// Dados simulados de conversas do WhatsApp
// Em um app real, esses dados viriam da API
// do sistema de arquivos do dispositivo
// ─────────────────────────────────────────────
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Família ❤️",
    avatar: "F",
    color: "#FF6B6B",
    lastMsg: "há 45 dias",
    mediaCount: 312,
    sizeMB: 487,
    type: "group",
    age: 45,
  },
  {
    id: 2,
    name: "Trabalho Dev",
    avatar: "T",
    color: "#4ECDC4",
    lastMsg: "há 62 dias",
    mediaCount: 204,
    sizeMB: 312,
    type: "group",
    age: 62,
  },
  {
    id: 3,
    name: "Ana Costa",
    avatar: "A",
    color: "#FFE66D",
    lastMsg: "há 38 dias",
    mediaCount: 98,
    sizeMB: 145,
    type: "contact",
    age: 38,
  },
  {
    id: 4,
    name: "Pedro Alves",
    avatar: "P",
    color: "#A8E6CF",
    lastMsg: "há 91 dias",
    mediaCount: 54,
    sizeMB: 89,
    type: "contact",
    age: 91,
  },
  {
    id: 5,
    name: "Futebol ⚽",
    avatar: "F",
    color: "#FF8B94",
    lastMsg: "há 33 dias",
    mediaCount: 187,
    sizeMB: 256,
    type: "group",
    age: 33,
  },
  {
    id: 6,
    name: "Lucas M.",
    avatar: "L",
    color: "#B8B8FF",
    lastMsg: "há 55 dias",
    mediaCount: 41,
    sizeMB: 67,
    type: "contact",
    age: 55,
  },
  {
    id: 7,
    name: "Promoções",
    avatar: "P",
    color: "#FFDAC1",
    lastMsg: "há 120 dias",
    mediaCount: 89,
    sizeMB: 134,
    type: "contact",
    age: 120,
  },
  {
    id: 8,
    name: "Vizinhos 🏠",
    avatar: "V",
    color: "#C7CEEA",
    lastMsg: "há 44 dias",
    mediaCount: 76,
    sizeMB: 98,
    type: "group",
    age: 44,
  },
];

/** Armazenamento total simulado em MB */
export const TOTAL_STORAGE_MB = 1588;
