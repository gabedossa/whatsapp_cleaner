export function formatSize(mb: number): string {
  if (mb >= 1000) return `${(mb / 1000).toFixed(1)} GB`;
  return `${mb} MB`;
}

export function getStorageColor(percent: number): string {
  if (percent > 78) return "#FF6B6B";
  if (percent > 62) return "#FFE66D";
  return "#00E5A0";
}

export function calcSelectedSize(
  selected: Set<number>,
  conversations: { id: number; sizeMB: number }[]
): number {
  return [...selected].reduce((sum, id) => {
    const conversation = conversations.find((item) => item.id === id);
    return sum + (conversation ? conversation.sizeMB : 0);
  }, 0);
}
