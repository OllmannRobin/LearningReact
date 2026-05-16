import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CountButton from "./CountButton";

describe("CountButton", () => {
  it("est ce que le bouton est dans le DOM", () => {
    render(<CountButton onCountChange={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it('affiche le label par défaut "Clics"', () => {
    render(<CountButton onCountChange={() => {}} />);
    expect(screen.getByRole("button", { name: /clics/i })).toBeInTheDocument();
  });

  it("affiche un label personnalisé si fourni", () => {
    render(<CountButton label="je suis là" onCountChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: /je suis là/i }),
    ).toBeInTheDocument();
  });

  it("appelle onCountChange avec 1 au premier clic", async () => {
    const user = userEvent.setup();
    const onCountChange = vi.fn();

    render(<CountButton onCountChange={onCountChange} />);
    await user.click(screen.getByRole("button"));

    expect(onCountChange).toHaveBeenCalledTimes(1);
    expect(onCountChange).toHaveBeenCalledWith(1);
  });

  it("incrémente correctement à chaque clic", async () => {
    const user = userEvent.setup();
    const onCountChange = vi.fn();

    render(<CountButton onCountChange={onCountChange} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    expect(onCountChange).toHaveBeenLastCalledWith(3);
  });
});
