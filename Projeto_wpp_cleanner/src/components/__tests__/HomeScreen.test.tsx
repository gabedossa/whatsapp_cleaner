import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomeScreen from "@/components/HomeScreen";

describe("HomeScreen", () => {
  it("renders the dashboard summary", () => {
    render(<HomeScreen onNavigate={jest.fn()} totalCleanedMB={256} cleanedCount={2} />);

    expect(screen.getByText("Limpador WA")).toBeInTheDocument();
    expect(screen.getByText("Armazenamento WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Conversas antigas")).toBeInTheDocument();
    expect(screen.getByText("Economia")).toBeInTheDocument();
  });

  it("navigates to scan and settings", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();

    render(<HomeScreen onNavigate={onNavigate} totalCleanedMB={0} cleanedCount={0} />);

    await user.click(screen.getByRole("button", { name: /analisar armazenamento/i }));
    expect(onNavigate).toHaveBeenCalledWith("scan");

    await user.click(screen.getByRole("button", { name: /configura/i }));
    expect(onNavigate).toHaveBeenCalledWith("settings");
  });
});
