import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

afterEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe("theme switcher", () => {
  it("applies and persists light, dark, and system preferences", () => {
    render(<ThemeSwitcher />);

    const light = screen.getByRole("button", { name: /use light theme/i });
    const dark = screen.getByRole("button", { name: /use dark theme/i });
    const system = screen.getByRole("button", { name: /use system theme/i });

    expect(system).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(light);
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(window.localStorage.getItem("sunsum-theme")).toBe("light");

    fireEvent.click(dark);
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(window.localStorage.getItem("sunsum-theme")).toBe("dark");

    fireEvent.click(system);
    expect(document.documentElement).toHaveAttribute("data-theme", "system");
    expect(window.localStorage.getItem("sunsum-theme")).toBe("system");
  });
});
