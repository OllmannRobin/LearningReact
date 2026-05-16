import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import AxiosButton from "./AxiosButton";
import type { TodoType } from "../types/todotype";

// On dit à Vitest : remplace axios par une fausse version contrôlée
vi.mock("axios");

// Données fictives qui simulent ce que l'API renverrait
const fakeTodos: TodoType[] = [
  { id: 1, userId: 1, title: "Apprendre le TDD", completed: false },
  { id: 2, userId: 1, title: "Écrire des tests", completed: true },
];

describe("AxiosButton", () => {
  beforeEach(() => {
    // Remet les espions à zéro avant chaque test
    vi.clearAllMocks();
  });

  it('affiche le label par défaut "Appel axios"', () => {
    render(<AxiosButton onGetTodos={() => {}} />);
    expect(
      screen.getByRole("button", { name: /appel axios/i }),
    ).toBeInTheDocument();
  });

  it("affiche un label personnalisé si fourni", () => {
    render(<AxiosButton label="Charger les todos" onGetTodos={() => {}} />);
    expect(
      screen.getByRole("button", { name: /charger les todos/i }),
    ).toBeInTheDocument();
  });

  it("appelle onGetTodos avec les données reçues au clic", async () => {
    // On programme axios.get pour retourner nos données fictives
    vi.mocked(axios.get).mockResolvedValue({ data: fakeTodos });

    const user = userEvent.setup();
    const onGetTodos = vi.fn();

    render(<AxiosButton onGetTodos={onGetTodos} />);
    await user.click(screen.getByRole("button"));

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos",
    );
    expect(onGetTodos).toHaveBeenCalledWith(fakeTodos);
  });

  it("ne plante pas si axios échoue", async () => {
    
    


    // On simule une erreur réseau
    vi.mocked(axios.get).mockRejectedValue(new Error("Réseau indisponible"));

    const user = userEvent.setup();
    const onGetTodos = vi.fn();

    render(<AxiosButton onGetTodos={onGetTodos} />);
    await user.click(screen.getByRole("button"));

    // onGetTodos ne doit jamais être appelé en cas d'erreur
    expect(onGetTodos).not.toHaveBeenCalled();
  });
});
