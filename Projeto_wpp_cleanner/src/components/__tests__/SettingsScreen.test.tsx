import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsScreen from "@/components/SettingsScreen";
import type { CleanerSettings } from "@/types";

const settings: CleanerSettings = {
  days: "30 dias",
  autoScan: true,
  keepStarred: true,
  notification: true,
  backup: false,
};

describe("SettingsScreen", () => {
  it("returns to the home screen", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();

    render(<SettingsScreen onNavigate={onNavigate} settings={settings} setSettings={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /voltar/i }));
    expect(onNavigate).toHaveBeenCalledWith("home");
  });

  it("updates the selected minimum period", async () => {
    const user = userEvent.setup();
    const setSettings = jest.fn();

    render(<SettingsScreen onNavigate={jest.fn()} settings={settings} setSettings={setSettings} />);

    await user.selectOptions(screen.getByLabelText("Periodo minimo"), "60 dias");

    const updater = setSettings.mock.calls[0][0];
    expect(updater(settings)).toEqual({ ...settings, days: "60 dias" });
  });

  it("toggles boolean settings", async () => {
    const user = userEvent.setup();
    const setSettings = jest.fn();

    render(<SettingsScreen onNavigate={jest.fn()} settings={settings} setSettings={setSettings} />);

    await user.click(screen.getByRole("button", { name: "Alternar backup" }));

    const updater = setSettings.mock.calls[0][0];
    expect(updater(settings)).toEqual({ ...settings, backup: true });
  });
});
