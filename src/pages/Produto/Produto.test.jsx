import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Produto from "./index";
import { renderComApp } from "../../testes/utilsDeTeste";

const abrir = (id) => renderComApp(<Produto />, { caminho: "/Catalogo/:id", rota: `/Catalogo/${id}` });

beforeEach(() => {
  localStorage.clear();
});

describe("página Produto", () => {
  test("mostra o jogo da rota", () => {
    abrir(1);

    expect(screen.getByRole("heading", { name: "Neon Drift" })).toBeInTheDocument();
  });

  test("adicionar ao carrinho atualiza o Header", async () => {
    const usuario = userEvent.setup();
    abrir(1);

    expect(screen.getByText("Carrinho (0)")).toBeInTheDocument();
    await usuario.click(screen.getByRole("button", { name: /adicionar ao carrinho/i }));

    expect(screen.getByText("Carrinho (1)")).toBeInTheDocument();
  });

  test("respeita o limite quando o estoque é menor que 3", async () => {
    const usuario = userEvent.setup();
    abrir(4);

    await usuario.click(screen.getByRole("button", { name: /adicionar/i }));
    await usuario.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(screen.queryByRole("button", { name: /adicionar/i })).not.toBeInTheDocument();
    expect(screen.getByText(/máximo permitido/i)).toBeInTheDocument();
  });

  test("jogo esgotado não mostra o botão", () => {
    abrir(6);

    expect(screen.queryByRole("button", { name: /adicionar/i })).not.toBeInTheDocument();
    expect(screen.getByText("Jogo indisponível")).toBeInTheDocument();
  });

  test("jogo inexistente mostra mensagem", () => {
    abrir(9999);

    expect(screen.getByText(/inexistente/i)).toBeInTheDocument();
  });
});
