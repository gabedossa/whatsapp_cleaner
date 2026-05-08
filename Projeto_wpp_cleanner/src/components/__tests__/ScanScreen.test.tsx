import { act, fireEvent, render, screen } from "@testing-library/react";
import ScanScreen from "@/components/ScanScreen";

describe("ScanScreen", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(1);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("shows results after scanning", () => {
    render(<ScanScreen onNavigate={jest.fn()} onClean={jest.fn()} />);

    expect(screen.getByText("Analisando")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText("8 conversas encontradas")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tudo" })).toBeInTheDocument();
  });

  it("selects all conversations and completes cleaning", () => {
    const onClean = jest.fn();
    const onNavigate = jest.fn();

    render(<ScanScreen onNavigate={onNavigate} onClean={onClean} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByRole("button", { name: "Tudo" }));
    expect(screen.getByRole("button", { name: /excluir 8 conversas/i })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /excluir 8 conversas/i }));

    act(() => {
      jest.advanceTimersByTime(1600);
    });

    const [selected, totalMB] = onClean.mock.calls[0];
    expect(selected).toBeInstanceOf(Set);
    expect(selected.size).toBe(8);
    expect(totalMB).toBe(1588);
    expect(onNavigate).toHaveBeenCalledWith("done");
  });
});
