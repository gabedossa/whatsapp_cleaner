import { calcSelectedSize, formatSize, getStorageColor } from "@/utils/format";

describe("format utils", () => {
  it("formats storage values in MB and GB", () => {
    expect(formatSize(999)).toBe("999 MB");
    expect(formatSize(1000)).toBe("1.0 GB");
    expect(formatSize(1588)).toBe("1.6 GB");
  });

  it("returns storage colors based on usage", () => {
    expect(getStorageColor(40)).toBe("#00E5A0");
    expect(getStorageColor(70)).toBe("#FFE66D");
    expect(getStorageColor(90)).toBe("#FF6B6B");
  });

  it("sums only selected conversations", () => {
    const conversations = [
      { id: 1, sizeMB: 120 },
      { id: 2, sizeMB: 80 },
      { id: 3, sizeMB: 40 },
    ];

    expect(calcSelectedSize(new Set([1, 3]), conversations)).toBe(160);
    expect(calcSelectedSize(new Set([4]), conversations)).toBe(0);
  });
});
