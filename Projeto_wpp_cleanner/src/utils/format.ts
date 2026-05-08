// ─────────────────────────────────────────────
// Funções utilitárias do WhatsApp Cleaner
// ─────────────────────────────────────────────

/**
 * Formata um valor em MB para exibição legível.
 * Acima de 1000 MB exibe em GB.
 */
export function formatSize(mb: number): string {
  if (mb >= 1000) return `${(mb / 1000).toFixed(1)} GB`;
  return `${mb} MB`;
}

/**
 * Retorna a cor de destaque com base no percentual de uso.
 * Vermelho quando uso > 70%, verde caso contrário.
 */
export function getStorageColor(percent: number): string {
  return percent > 70 ? "#FF6B6B" : "#00E5A0";
}

/**
 * Calcula o total em MB de um conjunto de IDs selecionados
 * a partir da lista de conversas.
 */
export function calcSelectedSize(
  selected: Set<number>,
  conversations: { id: number; sizeMB: number }[]
): number {
  return [...selected].reduce((sum, id) => {
    const conv = conversations.find((c) => c.id === id);
    return sum + (conv ? conv.sizeMB : 0);
  }, 0);
}
