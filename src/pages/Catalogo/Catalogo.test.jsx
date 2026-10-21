import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Catalogo from "./index";
import { renderComApp } from "../../testes/utilsDeTeste";

beforeEach(() => {
  localStorage.clear();
});

describe("página Catálogo", () => {
  test("lista todos os jogos", () => {
    renderComApp(<Catalogo />, { caminho: "/Catalogo", rota: "/Catalogo" });

    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(10);
  });

  test("a busca filtra os jogos", async () => {
    const usuario = userEvent.setup();
    renderComApp(<Catalogo />, { caminho: "/Catalogo", rota: "/Catalogo" });

    await usuario.type(screen.getByPlaceholderText("Buscar jogo..."), "neon");

    expect(screen.getByRole("heading", { name: "Neon Drift" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Iron Orbit" })).not.toBeInTheDocument();
  });

  test("filtro de plataforma e busca sem resultado", async () => {
    const usuario = userEvent.setup();
    renderComApp(<Catalogo />, { caminho: "/Catalogo", rota: "/Catalogo" });

    await usuario.selectOptions(screen.getByLabelText("Plataforma"), "Switch");
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(3);

    await usuario.type(screen.getByPlaceholderText("Buscar jogo..."), "zelda");
    expect(screen.getByText("Nenhum jogo encontrado.")).toBeInTheDocument();
  });
});
