import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("<Card />", () => {
  test("mostra o nome do jogo", () => {
    render(<Card nome="Neon Drift" plataforma="PS5" preco={249.9} estoque={5} />);

    expect(screen.getByRole("heading", { name: "Neon Drift" })).toBeInTheDocument();
  });

  test("mostra o preço formatado em real", () => {
    render(<Card nome="Neon Drift" preco={249.9} estoque={5} />);

    expect(screen.getByText("R$ 249,90")).toBeInTheDocument();
  });

  test("mostra Esgotado quando o estoque é zero", () => {
    render(<Card nome="Storm Legion" preco={89.9} estoque={0} />);

    expect(screen.getByText("Esgotado")).toBeInTheDocument();
  });

  test("não quebra quando o jogo vem sem preço", () => {
    render(<Card nome="Jogo Sem Preço" />);

    expect(screen.getByText("R$ 0,00")).toBeInTheDocument();
  });
});
